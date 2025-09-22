"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { displayErrorToast } from "@/util/utils";
import { ResponseMessage } from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";

import { addToast } from "@heroui/toast";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import InternalServerError from "@/components/UI/InternalServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";

type ForgotPasswordFormType = {
  email: string;
};

const ForgotPasswordForm: FC = () => {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordFormType>();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const res = await axiosNoCredentialInstance.post<ResponseMessage>(
        "/auth/reset-password-request",
        email,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === OK_HTTP_RESPONSE_CODE) {
        addToast({
          title: "If this email exists, a reset link was sent.",
          color: "success",
        });
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

      if (status === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE) return;

      setError("email", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });

      displayErrorToast(
        err.response?.data.message ?? "Failed to request password reset."
      );
    }
  });

  if (errorCode === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <InternalServerError />;
  if (errorCode === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequest />;

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
          Forgot Your Password?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <div className="mb-4">
          <Input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address.",
              },
            })}
            type="email"
            variant="underlined"
            isInvalid={!!errors.email}
            placeholder="Enter your email..."
            startContent={<HiOutlineMail size={20} className="text-gray-400" />}
            errorMessage={errors.email?.message}
            className="w-full"
          />
        </div>

        <Button
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          type="submit"
          isLoading={isSubmitting}
        >
          Send Reset Link
        </Button>
      </motion.form>
    </div>
  );
};

export default ForgotPasswordForm;
