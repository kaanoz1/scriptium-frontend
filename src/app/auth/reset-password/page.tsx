"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import {
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { ResponseMessage } from "@/types/response";
import axios from "axios";
import { displayErrorToast } from "@/util/utils";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { RiLockPasswordLine } from "react-icons/ri";
import InternalServerError from "@/components/UI/InternalServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import { addToast } from "@heroui/toast";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetForm>();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = handleSubmit(async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      const res = await axiosNoCredentialInstance.post<ResponseMessage>(
        `/auth/reset-password`,
        {
          email,
          token,
          newPassword: formData.password,
        }
      );

      if (res.status === OK_HTTP_RESPONSE_CODE) {
        addToast({title: "Password reset successfully.", color: "success"});
        router.push("/auth/signin");
      }
    } catch (err) {
      if (!axios.isAxiosError<ResponseMessage>(err)) {
        console.error(err);
        setErrorCode(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);
        return;
      }

      const status = err.response?.status;
      setErrorCode(status ?? INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);

      displayErrorToast(
        err.response?.data.message ?? "Failed to reset password."
      );
    }
  });

  if (!token || !email) return <p className="text-center mt-20">Invalid URL.</p>;

  if (errorCode === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;
  if (errorCode === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <InternalServerError />;

  return (
    <div className="h-[calc(100vh-130px)] flex justify-center items-center bg-gray-50 dark:bg-dark px-4">
      <motion.form
        onSubmit={onSubmit}
        className="flex flex-col bg-white dark:bg-black/90 p-8 rounded-2xl shadow-2xl w-full border dark:border-gray-900 max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter a new password for your Scriptium account.
        </p>

        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
              maxLength: {
                value: 256,
                message: "Password cannot exceed 256 characters.",
              },
              pattern: {
                value: /[a-zA-Z]/,
                message: "Password must contain at least one letter.",
              },
            })}
            variant="underlined"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            placeholder="New password"
            startContent={
              <RiLockPasswordLine size={20} className="text-gray-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FaRegEye size={20} className="text-gray-500" />
                ) : (
                  <FaRegEyeSlash size={20} className="text-gray-500" />
                )}
              </button>
            }
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
            })}
            variant="underlined"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            placeholder="Confirm password"
            startContent={
              <RiLockPasswordLine size={20} className="text-gray-400" />
            }
            className="w-full"
          />
        </div>

        <Button
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          type="submit"
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>
      </motion.form>
    </div>
  );
};

export default ResetPasswordForm;
