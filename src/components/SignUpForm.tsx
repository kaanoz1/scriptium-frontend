"use client";
import { NextPage } from "next";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { User } from "@heroui/user";
import { ImFilePicture } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { Tooltip } from "@heroui/tooltip";
import PasswordStrengthMeter from "./UI/PasswordStrengthMeter";
import { passwordStrength as checkPasswordStrength } from "check-password-strength";
import {
  CONFLICT_RESPONSE_CODE,
  getFormattedNameAndSurnameFromString,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  SIGN_IN_URL,
  TOO_MANY_REQUEST_RESPONSE_CODE,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/utils";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import ServerError from "./UI/ServerError";
import TooManyRequest from "./UI/TooManyRequest";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import {
  NoAuthenticationRequestErrorCode,
  ResponseMessage,
} from "@/types/response";

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
  const [username, setUsername] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [surname, setSurname] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<
    T_PasswordStrength | undefined
  >();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { user, fetchUser } = useUser();
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const router = useRouter();

  useEffect(() => {
    if (password ?? false)
      setPasswordStrength(
        checkPasswordStrength(password ?? "").value as T_PasswordStrength
      );
  }, [password]);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpForm>();

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePicture(URL.createObjectURL(file));
    else setProfilePicture("");
  };

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const onSubmit = handleSubmit(async (formData: ISignUpForm) => {
    const formDataObj = new FormData();

    if (formData.name) formDataObj.append("name", formData.name);
    if (formData.surname) formDataObj.append("surname", formData.surname);
    formDataObj.append("email", formData.email);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    if (formData.image?.[0]) formDataObj.append("image", formData.image[0]);

    const response = await axiosNoCredentialInstance.post<ResponseMessage>(
      `/auth/register`,
      formDataObj,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        await fetchUser();
        router.push(user ? `user/${user.getUsername()}` : SIGN_IN_URL);
        return;
      case CONFLICT_RESPONSE_CODE:
        switch (response.data.message) {
          case "Username already exists.":
            setFormError("username", {
              message: "Username is in use.",
            });
            return;
          case "Email already exists.":
            setFormError("email", {
              message: "Email already in use.",
            });
            return;
          default:
            setFormError("root", {
              message:
                "Something went wrong. This might has to do something with server.",
            });
            return;
        }
      case TOO_MANY_REQUEST_RESPONSE_CODE:
        setError(429);
        return undefined;
      default:
        setError(500);
        return undefined;
    }
  });

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  return (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center bg-gray-50 dark:bg-dark px-4">
      <motion.form
        onSubmit={onSubmit}
        className="flex flex-col bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl w-full border border-transparent dark:border-gray-700"
        initial={{ width: "56rem" }}
        exit={{ width: "28rem" }}
        transition={{ type: "linear", duration: 0.1 }}
      >
        <motion.h2
          className="w-full text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 inline-block text-right"
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-40%", opacity: 0 }}
          transition={{
            opacity: { type: "linear", duration: 0.3 },
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
                      onValueChange={setName}
                    />

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
                      onValueChange={setSurname}
                    />
                  </div>
                  <div>
                    <Input
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Username is required.",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Username must be at least 5 characters long.",
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
                      onValueChange={setUsername}
                      description="This username must be unique."
                    />
                  </div>
                  <div>
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
                          value:
                            /^[a-z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/i,
                          message:
                            "Email must be a valid address with known extensions.",
                        },
                      })}
                      type="email"
                      isInvalid={!!errors.email}
                      label={
                        <span className="flex w-full items-center">
                          <HiOutlineMail
                            size={20}
                            className="text-gray-400 me-1"
                          />
                          Email
                          <span className="text-red-500">*</span>
                        </span>
                      }
                      errorMessage={errors.email?.message}
                      className="w-full"
                      description="A confirmation email will be sent to this email address."
                    />
                  </div>
                  <div className="flex justify-between gap-10">
                    <Input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required.",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long.",
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
                      onValueChange={setPassword}
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
                              <FaRegEyeSlash
                                size={20}
                                className="text-gray-500"
                              />
                            )}
                          </button>
                        </div>
                      }
                      className="w-full"
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
                      <Input
                        {...register("confirmPassword", {
                          required: {
                            value: true,
                            message: "Please confirm your password.",
                          },
                          validate: (value) =>
                            value === password || "Passwords do not match.",
                        })}
                        type="password"
                        isInvalid={!!errors.confirmPassword}
                        label="Confirm Password"
                        errorMessage={errors.confirmPassword?.message}
                        className="w-full"
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
            transition={{ type: "linear", duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            >
              <div className="pb-1 pt-[1.6px]">
                <Input
                  startContent={<ImFilePicture size={15} />}
                  className="w-full"
                  label="Profile Picture"
                  type="file"
                  accept=".jpeg,.jpg"
                  isInvalid={!!errors.image}
                  errorMessage={errors.image?.message}
                  {...register("image", {
                    validate: {
                      size: (fileList?: FileList) => {
                        const file = fileList?.[0];

                        return (
                          !file ||
                          file.size <= 4 * 800 * 800 ||
                          "File size should be less than 2MB"
                        );
                      },
                      type: (fileList?: FileList) => {
                        const file = fileList?.[0];

                        return (
                          !file ||
                          /image\/jpeg|image\/jpg/.test(file.type) ||
                          "Only JPEG or JPG formats are allowed."
                        );
                      },
                      dimensions: async (fileList?: FileList) => {
                        const file = fileList?.[0];
                        if (!file) return true;

                        try {
                          const image = new Image();
                          const url = URL.createObjectURL(file);
                          image.src = url;

                          await new Promise((resolve, reject) => {
                            image.onload = resolve;
                            image.onerror = reject;
                          });

                          const isSquare =
                            image.width === image.height &&
                            image.width <= 1080 &&
                            image.height <= 1080;

                          URL.revokeObjectURL(url);

                          return (
                            isSquare ||
                            "Image must be square and max 1080x1080."
                          );
                        } catch (error) {
                          return "Invalid image file.";
                        }
                      },
                    },
                  })}
                  onChange={handleProfilePictureChange}
                />
              </div>

              <div className="py-1">
                <User
                  name={
                    name
                      ? getFormattedNameAndSurnameFromString(name, surname)
                      : "*Name* *Surname*"
                  }
                  description={`@${username || "username"}`}
                  avatarProps={{
                    src: profilePicture,
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
                      type: "linear",
                      duration: 0.1, //stiffness: 200,
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
                    type: "linear",
                    duration: 0.1, //stiffness: 200
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
                    type: "linear",
                    duration: 0.1, // stiffness: 200
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
                type: "linear",
                duration: 0.1, // stiffness: 200,
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
    </div>
  );
};

export default SignUpForm;
