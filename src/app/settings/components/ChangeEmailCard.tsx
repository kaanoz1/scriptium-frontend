"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {
  displayErrorToast,
} from "@/util/utils";
import {
  OK_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { ResponseMessage } from "@/types/response";
import { addToast } from "@heroui/toast";

type FormData = {
  newEmail: string;
  password: string;
  confirmPassword: string;
};

const ChangeEmailCard: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axiosCredentialInstance.post<ResponseMessage>(
        "/session/change-email",
        {
          newEmail: data.newEmail,
          password: data.password,
        }
      );

      if (res.status === OK_HTTP_RESPONSE_CODE) {
        addToast({title: "Email updated successfully!", color: "success"});
        reset();
      } else {
        displayErrorToast(res.data.message ?? "Failed to update email.");
      }
    } catch (err: any) {
      displayErrorToast(
        err?.response?.data?.message ?? "Something went wrong."
      );
      setError("newEmail", {
        type: "manual",
        message: "Email could not be changed.",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <motion.div
      className="w-full max-w-lg bg-white dark:bg-black/90 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Change Email
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          {...register("newEmail", {
            required: "New email is required.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address.",
            },
          })}
          type="email"
          placeholder="Enter new email..."
          variant="underlined"
          isInvalid={!!errors.newEmail}
          errorMessage={errors.newEmail?.message}
          startContent={
            <HiOutlineMail size={20} className="text-gray-400" />
          }
        />

        <Input
          {...register("password", {
            required: "Current password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter current password"
          variant="underlined"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          startContent={
            <RiLockPasswordLine size={20} className="text-gray-400" />
          }
          endContent={
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => setIsPasswordVisible((v) => !v)}
            >
              {isPasswordVisible ? (
                <FaRegEye size={20} className="text-gray-500" />
              ) : (
                <FaRegEyeSlash size={20} className="text-gray-500" />
              )}
            </button>
          }
        />

        <Input
          {...register("confirmPassword", {
            required: "Please confirm your password.",
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Confirm current password"
          variant="underlined"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          startContent={
            <RiLockPasswordLine size={20} className="text-gray-400" />
          }
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
        >
          Update Email
        </Button>
      </form>
    </motion.div>
  );
};

export default ChangeEmailCard;
