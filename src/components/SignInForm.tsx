"use client";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { FC, useState } from "react";
import { Input } from "@heroui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";
import {
  NoAuthenticationRequestErrorCode,
  ResponseMessage,
} from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  TOO_MANY_REQUEST_RESPONSE_CODE,
  TOOL_TIP_CLASS_NAMES,
  UNAUTHORIZED_RESPONSE_CODE,
} from "@/util/utils";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import ServerError from "./UI/ServerError";
import TooManyRequest from "./UI/TooManyRequest";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import LoadingSpinnerFullH from "./UI/LoadingSpinnerFullH";

type SignInForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const SignInForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>();

  const { isLoading, fetchUser } = useUser();

  const router = useRouter();

  const onSubmit = handleSubmit(async (formData: SignInForm) => {
    const response = await axiosCredentialInstance.post<ResponseMessage>(
      `/auth/login`,
      {
        email: formData.email,
        password: formData.password,
      }
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        await fetchUser();
        router.push("/");
        return;

      case UNAUTHORIZED_RESPONSE_CODE:
        setError(UNAUTHORIZED_RESPONSE_CODE);
        setFormError("password", {
          message: response.data.message,
        });
        //TODO: Add toast.
        return;

      default:
        setError(response.status as NoAuthenticationRequestErrorCode);
        return;
    }
  });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center bg-gray-50 dark:bg-dark px-4 space-y-28">
      <motion.form
        onSubmit={onSubmit}
        className="flex flex-col bg-white dark:bg-black/90 p-8 rounded-2xl shadow-2xl w-full border border-transparent dark:border-gray-900"
        initial={{ width: "28rem" }}
        exit={{ width: "56rem" }}
        transition={{ type: "linear", duration: 0.4 }}
      >
        <motion.h2
          className="w-full text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 inline-block text-left"
          initial={{ x: "50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "50%", opacity: 0 }}
          transition={{
            opacity: { type: "linear", duration: 0.4 },
            type: "tween",
            ease: "easeInOut",
          }}
        >
          Sign In
        </motion.h2>
        <div className="flex justify-end">
          <motion.div
            className="flex-grow"
            initial={{ display: "none" }}
            exit={{ display: "block" }}
            transition={{
              opacity: { duration: 0.4, ease: "easeInOut" },
              duration: 0,
            }}
          ></motion.div>

          <motion.div
            initial={{ width: "28rem" }}
            exit={{ width: "20rem" }}
            transition={{ type: "tween" }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="py-2">
                <Input
                  {...register("email", {
                    required: { value: true, message: "Email is required." },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  variant="underlined"
                  isInvalid={!!errors.email}
                  placeholder="Enter your email..."
                  startContent={
                    <HiOutlineMail size={20} className="text-gray-400" />
                  }
                  errorMessage={errors.email?.message}
                  className="w-full"
                />
              </div>

              <div className="py-2">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
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
                  variant="underlined"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  placeholder="Enter your password"
                  startContent={
                    <RiLockPasswordLine size={20} className="text-gray-400" />
                  }
                  endContent={
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
                  }
                  className="w-full"
                />
              </div>

              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Checkbox
                    {...register("rememberMe")}
                    isSelected={rememberMe}
                    onValueChange={setRememberMe}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </div>
                <Link
                  underline="hover"
                  href="#"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </motion.div>
            <div className="my-3 pt-2">
              <Button
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-md"
                type="submit"
                isLoading={isSubmitting}
              >
                {isSubmitting || (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "linear", duration: 0.1 }}
                  >
                    Sign in
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
                  transition={{ type: "linear", duration: 0.1 }}
                >
                  Sign in with
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
                  transition={{ type: "linear", duration: 0.1 }}
                >
                  Sign in with
                </motion.span>
                <BsTwitterX size={20} className="text-inherit" />
              </Button>
            </div>

            <motion.div
              className="flex justify-center items-center my-3 text-center text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "linear", duration: 0.1 }}
            >
              Don&apos;t have an account?
              <Tooltip
                showArrow
                placement="right"
                classNames={TOOL_TIP_CLASS_NAMES}
                radius="sm"
                content={"TODO: Implement"}
              >
                <Link
                  underline="hover"
                  href="/auth/signup"
                  className="text-blue-600 dark:text-blue-400 mx-2"
                >
                  Sign Up
                </Link>
              </Tooltip>
            </motion.div>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default SignInForm;
