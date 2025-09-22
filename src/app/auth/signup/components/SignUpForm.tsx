"use client";
import { NextPage } from "next";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { Input } from "@heroui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { User } from "@heroui/user";
import { ImFilePicture } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { Tooltip } from "@heroui/tooltip";
import { passwordStrength as checkPasswordStrength } from "check-password-strength";

import { useRouter } from "next/navigation";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  T_NoAuthenticationRequestErrorCode,
  ResponseMessage,
} from "@/types/response";
import {
  SIGN_IN_URL,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/constants";

import { addToast } from "@heroui/toast";
import axios from "axios";
import { Toast } from "@/types/types";
import CropModal from "@/components/ImageCrop";
import PasswordStrengthMeter from "@/app/auth/signin/components/PasswordStrengthMeter";
import InternalServerError from "@/components/UI/InternalServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";

export type T_PasswordStrength = "Too Weak" | "Weak" | "Medium" | "Strong";

interface ISignUpForm {
  email: string;
  username: string;
  password: string;
  image?: FileList; //TODO: FileList -> File
  name?: string;
  surname?: string;
  confirmPassword: string;
}

const SignUpForm: NextPage = () => {
  // const { fetchUser } = useUser(); // This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
  const fetchUser = async () => {};
  //Placeholders for user context.

  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<T_NoAuthenticationRequestErrorCode>();

  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpForm>();

  const password = watch("password");
  const name = watch("name");
  const surname = watch("surname");
  const username = watch("username");
  const image = watch("image");

  useEffect(() => {
    const file = image?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const isSquare = img.width === img.height;
      const isWithinLimit = img.width <= 1080 && img.height <= 1080;

      if (!isSquare || !isWithinLimit) {
        setTempImageSrc(url);
        setShowCropModal(true);
      }
    };
  }, [image]);

  const handleCropComplete = (blob: Blob) => {
    const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
    const dt = new DataTransfer();
    dt.items.add(file);

    if (blob.size > 2 * 1024 * 1024) {
      alert("Cropped image is still too large. Please try again.");
      return;
    }

    if (inputRef.current) inputRef.current.value = "";
    setValue("image", dt.files);

    setShowCropModal(false);
  };

  const avatarSrc = image?.[0] ? URL.createObjectURL(image[0]) : "";

  const passwordStrength = password
    ? (checkPasswordStrength(password).value as T_PasswordStrength)
    : undefined;

  const onSubmit = handleSubmit(async (formData: ISignUpForm) => {
    const formDataObj = new FormData();
    if (formData.name) formDataObj.append("name", formData.name);
    if (formData.surname) formDataObj.append("surname", formData.surname);
    formDataObj.append("email", formData.email);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    if (formData.image?.[0]) formDataObj.append("image", formData.image[0]);

    try {
      const response = await axiosNoCredentialInstance.post<ResponseMessage>(
        "/auth/register",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        await fetchUser();

        const successToast: Toast = {
          title: "Success!",
          description: `You have successfully registered ${formData.username}`,
          color: "success",
        };
        addToast(successToast);

        router.push(`/user/${formData.username}`);
      }

      throw new Error("Unexpected result. Status: " + response.status);
    } catch (error) {
      if (!axios.isAxiosError<ResponseMessage>(error)) {
        addToast(SOMETHING_WENT_WRONG_TOAST);
        console.error(error);
        return;
      }

      if (error.code === "ERR_NETWORK") {
        const networkErrorToast: Toast = {
          title: "Network Error!",
          description:
            "We couldn’t connect to the server. Please check your internet or try again later.",
          color: "warning",
        };
        addToast(networkErrorToast);
        console.error(error);
        return;
      }

      switch (error.status) {
        case NOT_FOUND_HTTP_RESPONSE_CODE:
          const notFoundToast: Toast = {
            title: "404 Not found!",
            description:
              "This might be something to do with our end!, try again later",
            color: "secondary",
          };
          console.error(error);
          addToast(notFoundToast);
          return;
        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          setError(TOO_MANY_REQUEST_HTTP_RESPONSE_CODE);
          const tooManyRequestToast: Toast = {
            title: "You are using our sources too much!",
            description: "Slow down and try again later.",
            color: "warning",
          };
          addToast(tooManyRequestToast);
          return;
        case CONFLICT_HTTP_RESPONSE_CODE:
          if (error.response?.data.message.includes("Username")) {
            const usernameConflictToast: Toast = {
              title: "Unsuccessful",
              description: "Username is already in use. Try another one!",
              color: "danger",
            };
            addToast(usernameConflictToast);
            setFormError("username", { message: "Username already in user!" });
          } else if (error.response?.data.message.includes("Email")) {
            const emailConflictToast: Toast = {
              title: "Unsuccessful",
              description: "Email is already in use. Try another one!",
              color: "danger",
            };
            addToast(emailConflictToast);

            setFormError("email", { message: "Email already in user!" });
          } else {
            const somethingWentWrongErrorToast: Toast = {
              title: "Something went wrong?",
              description: `${error.response?.data}`,
              color: "danger",
            };
            addToast(somethingWentWrongErrorToast);
          }
          return;
        default:
          console.error(error);
          const unexpectedError: Toast = {
            title: "Something went unexpectedly wrong?",
            description: "We don't even know what the issue is. Check console.",
            color: "warning",
          };
          addToast(unexpectedError);
          return;
      }
    }
  });

  if (error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE) return <TooManyRequest />;
  if (error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <InternalServerError />;

  const toggleVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center bg-gray-50 dark:bg-dark px-4">
      <motion.form
        onSubmit={onSubmit}
        className="flex flex-col bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl w-full border border-transparent dark:border-gray-700"
        initial={{ width: "56rem" }}
        exit={{ width: "28rem" }}
        transition={{ type: "inertia", duration: 0.1 }}
      >
        <motion.h2
          className="w-full text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 inline-block text-right"
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-40%", opacity: 0 }}
          transition={{
            opacity: { type: "inertia", duration: 0.3 },
            type: "tween",
            ease: "easeOut",
          }}
        >
          Sign Up
        </motion.h2>
        <div className="flex justify-end gap-10 ">
          <motion.div
            className="flex-grow h-[424px] "
            initial={{ display: "block", opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ display: "none", opacity: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              duration: 0,
            }}
          >
            <div className="flex gap-10">
              <div className="flex-grow">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between gap-10">
                    <NameInput errors={errors} register={register} />

                    <SurnameInput errors={errors} register={register} />
                  </div>
                  <div>
                    <UsernameInput errors={errors} register={register} />
                  </div>
                  <div>
                    <EmailInput errors={errors} register={register} />
                  </div>
                  <div className="flex justify-between gap-10">
                    <PasswordInput
                      errors={errors}
                      register={register}
                      isPasswordVisible={isPasswordVisible}
                      toggleVisibility={toggleVisibility}
                    />

                    <Tooltip
                      showArrow
                      placement="top"
                      content={
                        "For safety, you need to write your password again."
                      }
                      offset={30}
                      classNames={TOOL_TIP_CLASS_NAMES}
                    >
                      <ConfirmPasswordInput
                        errors={errors}
                        register={register}
                        password={password}
                      />
                    </Tooltip>
                  </div>
                  <div className="flex justify-center items-center">
                    {passwordStrength == undefined || (
                      <PasswordStrengthMeter strength={passwordStrength} />
                    )}
                  </div>
                </div>
              </div>
              <Divider
                className="h-[420px] flex-shrink bg-gray-200 dark:bg-gray-700 w-1"
                orientation="vertical"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ width: "20rem" }}
            exit={{ width: "28rem" }}
            transition={{ type: "inertia", duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            >
              <div className="pb-1 pt-[1.6px]">
                {/* {
                  <ProfilePictureInput
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    inputRef={inputRef}
                  />
                } */}
              </div>

              <div className="py-1">
                <User
                  name={name ? `${name} ${surname}`.trim() : ""}
                  description={`@${username || ""}`}
                  avatarProps={{
                    src: avatarSrc,
                  }}
                />
              </div>
              {
                <div className="flex justify-center items-center py-1 text-xs">
                  <span>
                    By signing up, you would accepted{" "}
                    <Link
                      underline="hover"
                      href="#"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      privacy policy.
                    </Link>
                  </span>
                </div>
              }
            </motion.div>

            <div className="my-3 pt-2">
              <Button
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-md"
                type="submit"
                isLoading={isSubmitting}
              >
                {isSubmitting || (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "inertia",
                      duration: 0.1,
                    }}
                  >
                    Sign up
                  </motion.span>
                )}
              </Button>
            </div>

            <div className="flex items-center my-6 gap-2">
              <Divider className="flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-gray-500 dark:text-gray-400">OR</span>
              <Divider className="flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="transition-[background-position] flex items-center justify-center gap-2 text-black dark:text-white bg-[linear-gradient(to_right,_#4285F4,_#EA4335,_#FBBC05,_#34A853)] dark:bg-[linear-gradient(to_left,_#4285F4,_#EA4335,_#FBBC05,_#34A853)] bg-left dark:bg-right ease-in-out shadow-lg"
                style={{
                  backgroundSize: "200% 100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = "right";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = "left";
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "inertia",
                    duration: 0.1,
                  }}
                >
                  Sign up with
                </motion.span>
                <FcGoogle
                  size={28}
                  className="bg-white rounded-full p-1 shadow-md"
                />
              </Button>

              <Button className="flex items-center justify-center gap-2 text-white hover:text-black dark:text-black dark:hover:text-white bg-black hover:bg-white hover:border hover:border-black dark:hover:bg-black dark:bg-white">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "inertia",
                    duration: 0.1,
                  }}
                >
                  Sign up with
                </motion.span>
                <BsTwitterX size={20} className="text-inherit" />
              </Button>
            </div>

            <motion.div
              className="flex justify-center items-center my-3 text-center text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "inertia",
                duration: 0.1,
              }}
            >
              {"Already have an account?"}

              <Link
                underline="hover"
                href={SIGN_IN_URL}
                className="text-blue-600 dark:text-blue-400 mx-2"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.form>

      {showCropModal && tempImageSrc && (
        <CropModal
          imageSrc={tempImageSrc}
          onCropComplete={handleCropComplete}
          onClose={() => setShowCropModal(false)}
        />
      )}
    </div>
  );
};

export default SignUpForm;

const NameInput = ({
  errors,
  register,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
}): ReactNode => {
  return (
    <Input
      {...register("name", {
        required: {
          value: true,
          message: "Name is required.",
        },
        maxLength: {
          value: 16,
          message: "Name cannot exceed 16 characters.",
        },
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "Name must contain only letters (A-Z).",
        },
      })}
      type="text"
      isInvalid={!!errors.name}
      label={
        <span className="flex w-full items-center">
          Name
          <span className="text-red-500">*</span>
        </span>
      }
      errorMessage={errors.name?.message}
    />
  );
};

const SurnameInput = ({
  errors,
  register,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
}) => {
  return (
    <Input
      {...register("surname", {
        maxLength: {
          value: 16,
          message: "Surname cannot exceed 16 characters.",
        },
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "Surname must contain only letters (A-Z).",
        },
      })}
      type="text"
      isInvalid={!!errors.surname}
      label="Surname"
      errorMessage={errors.surname?.message}
      className="w-full"
    />
  );
};

const UsernameInput = ({
  errors,
  register,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
}): ReactNode => {
  return (
    <Input
      {...register("username", {
        required: {
          value: true,
          message: "Username is required.",
        },
        minLength: {
          value: 5,
          message: "Username must be at least 5 characters long.",
        },
        maxLength: {
          value: 16,
          message: "Username cannot exceed 16 characters.",
        },
        pattern: {
          value: /^(?=.*[a-z])[a-z0-9._]+$/,
          message:
            "Username must contain at least one lowercase letter and can only include lowercase letters, numbers, '.', and '_'.",
        },
      })}
      type="text"
      isInvalid={!!errors.username}
      label={
        <span className="flex w-full items-center">
          <FiUser size={20} className="text-gray-400 me-1" />
          Username
          <span className="text-red-500">*</span>
        </span>
      }
      errorMessage={errors.username?.message}
      className="w-full"
      description="This username must be unique."
    />
  );
};

const EmailInput = ({
  errors,
  register,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
}) => {
  return (
    <Input
      {...register("email", {
        required: {
          value: true,
          message: "Email is required.",
        },
        maxLength: {
          value: 255,
          message: "Email cannot exceed 255 characters.",
        },
        pattern: {
          value: /^[a-z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/i,
          message: "Email must be a valid address with known extensions.",
        },
      })}
      type="email"
      isInvalid={!!errors.email}
      label={
        <span className="flex w-full items-center">
          <HiOutlineMail size={20} className="text-gray-400 me-1" />
          Email
          <span className="text-red-500">*</span>
        </span>
      }
      errorMessage={errors.email?.message}
      className="w-full"
      description="A confirmation email will be sent to this email address."
    />
  );
};

const PasswordInput = ({
  errors,
  register,
  isPasswordVisible,
  toggleVisibility,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  isPasswordVisible: boolean;
  toggleVisibility: () => void;
}) => {
  return (
    <Input
      {...register("password", {
        required: {
          value: true,
          message: "Password is required.",
        },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters long.",
        },
        maxLength: {
          value: 256,
          message: "Password cannot exceed 256 characters",
        },
        pattern: {
          value: /[a-zA-Z]/,
          message: "Password must contain at least one letter.",
        },
      })}
      type={isPasswordVisible ? "text" : "password"}
      isInvalid={!!errors.password}
      label="Password"
      errorMessage={errors.password?.message}
      endContent={
        <div className="h-full flex items-center">
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isPasswordVisible ? (
              <FaRegEye size={20} className="text-gray-500" />
            ) : (
              <FaRegEyeSlash size={20} className="text-gray-500" />
            )}
          </button>
        </div>
      }
      className="w-full"
    />
  );
};

const ConfirmPasswordInput = ({
  errors,
  register,
  password,
}: {
  errors: FieldErrors<ISignUpForm>;
  register: UseFormRegister<ISignUpForm>;
  password: string;
}) => {
  return (
    <Input
      {...register("confirmPassword", {
        required: {
          value: true,
          message: "Please confirm your password.",
        },
        validate: (value) => value === password || "Passwords do not match.",
      })}
      type="password"
      isInvalid={!!errors.confirmPassword}
      label="Confirm Password"
      errorMessage={errors.confirmPassword?.message}
      className="w-full"
    />
  );
};

// const ProfilePictureInput = ({
//   errors,
//   register,
// }: {
//   errors: FieldErrors<ISignUpForm>;
//   register: UseFormRegister<ISignUpForm>;
// }) => {
//   return (
//     <Input
//       startContent={<ImFilePicture size={15} />}
//       className="w-full"
//       label="Profile Picture"
//       type="file"
//       accept=".jpeg,.jpg"
//       isInvalid={!!errors.image}
//       errorMessage={errors.image?.message}
//       {...register("image", {
//         validate: {
//           size: (fileList?: FileList) => {
//             const file = fileList?.[0];

//             return (
//               !file ||
//               file.size <= 4 * 800 * 800 ||
//               "File size should be less than 2MB"
//             );
//           },
//           type: (fileList?: FileList) => {
//             const file = fileList?.[0];

//             return (
//               !file ||
//               /image\/jpeg|image\/jpg/.test(file.type) ||
//               "Only JPEG or JPG formats are allowed."
//             );
//           },
//           dimensions: async (fileList?: FileList) => {
//             const file = fileList?.[0];
//             if (!file) return true;

//             try {
//               const image = new Image();
//               const url = URL.createObjectURL(file);
//               image.src = url;

//               await new Promise((resolve, reject) => {
//                 image.onload = resolve;
//                 image.onerror = reject;
//               });

//               const isSquare =
//                 image.width === image.height &&
//                 image.width <= 1081 &&
//                 image.height <= 1081;

//               URL.revokeObjectURL(url);

//               return isSquare || "Image must be square and max 1080x1080.";
//             } catch (error) {
//               return "Invalid image file.";
//             }
//           },
//         },
//       })}
//     />
//   );
// };

type Props = {
  errors: FieldErrors<ISignUpForm>;
  setValue: UseFormSetValue<ISignUpForm>;
  watch: UseFormWatch<ISignUpForm>;
  inputRef: RefObject<HTMLInputElement>;
};

export const ProfilePictureInput = ({
  errors,
  setValue,
  watch,
  inputRef,
}: Props) => {
  const image = watch("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB.");
      return;
    }

    if (!/image\/jpeg|image\/jpg/.test(file.type)) {
      alert("Only JPG or JPEG files are allowed.");
      return;
    }

    setValue("image", fileList);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept=".jpeg,.jpg"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
      />

      <Button
        className="w-full"
        onClick={() => inputRef.current?.click()}
        startContent={<ImFilePicture size={15} />}
      >
        Select Profile Picture
      </Button>

      {image?.[0] && (
        <p className="text-xs text-gray-500">Selected file: {image[0].name}</p>
      )}

      {errors.image && (
        <p className="text-xs text-red-500">{errors.image.message}</p>
      )}
    </div>
  );
};
