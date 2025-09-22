import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordCard: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordForm>();

  const onSubmit = handleSubmit(async (formData) => {
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const res = await axiosCredentialInstance.put(`/session/password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (res.status === OK_HTTP_RESPONSE_CODE) {
        setSuccess("Password changed successfully.");
        reset();
      } else setError("An unknown error occurred.");
    } catch {
      setError("An unknown error occurred.");
    }
  });

  return (
    <Card className="max-w-md w-full">
      <CardBody className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl">Change Password</h3>
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm font-medium">{success}</div>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            {...register("oldPassword", passwordValidation)}
            type="password"
            label="Current Password"
            variant="bordered"
            fullWidth
            placeholder="Enter your current password"
            isInvalid={!!errors.oldPassword}
            errorMessage={errors.oldPassword?.message}
          />
          <Input
            {...register("newPassword", passwordValidation)}
            type="password"
            label="New Password"
            variant="bordered"
            fullWidth
            placeholder="Enter a new password"
            isInvalid={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />
          <Input
            {...register("confirmPassword", {
              ...passwordValidation,
              validate: (val, formData) =>
                val === formData.newPassword || "Passwords do not match.",
            })}
            type="password"
            label="Confirm New Password"
            variant="bordered"
            fullWidth
            placeholder="Re-enter the new password"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
          <Button color="primary" isLoading={isSubmitting} type="submit">
            Change Password
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ChangePasswordCard;

const passwordValidation = {
  required: { value: true, message: "Password is required." },
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long.",
  },
  maxLength: { value: 256, message: "Password cannot exceed 256 characters." },
  pattern: {
    value: /[a-zA-Z]/,
    message: "Password must contain at least one letter.",
  },
};
