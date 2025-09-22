import { FC, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useForm } from "react-hook-form";
import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";

const passwordValidation = {
  required: { value: true, message: "Password is required." },
  minLength: { value: 6, message: "Minimum 6 characters." },
};

const DeleteAccountCard: FC = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ password: string; confirmPassword: string }>();

  const onSubmit = handleSubmit(async (formData) => {
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axiosCredentialInstance.delete(`/session/delete`, {
        data: { password: formData.password },
      });
      if (res.status !== 200) throw new Error();
      setOpen(false);
      reset();
    } catch {
      setError("Failed to delete account.");
    }
  });

  return (
    <Card className="max-w-md w-full">
      <CardBody className="flex flex-col gap-4">
        <h3 className="font-semibold text-xl text-red-600">Delete Account</h3>
        <p className="text-sm text-default-500">
          Deleting your account is permanent after 15 days.
        </p>
        <Button onPress={() => setOpen(true)} color="danger">
          Delete Account
        </Button>
      </CardBody>

      <Modal
        isOpen={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) reset();
        }}
      >
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <form onSubmit={onSubmit}>
            <ModalBody>
              <Input
                type="password"
                label="Password"
                {...register("password", passwordValidation)}
                fullWidth
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <Input
                type="password"
                label="Confirm Password"
                {...register("confirmPassword", passwordValidation)}
                fullWidth
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
              {error && (
                <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="danger" isLoading={isSubmitting}>
                Delete
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default DeleteAccountCard;
