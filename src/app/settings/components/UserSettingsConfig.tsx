"use client";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { OK_HTTP_RESPONSE_CODE } from "@/util/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useForm } from "react-hook-form";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { UserOwnDTO } from "@/types/classes/User";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  user: UserOwnDTO;
  setUser: (user: UserOwnDTO | null) => void;
};

type FreezeAccountForm = {
  password: string;
};

type DeleteAccountForm = {
  password: string;
};

const passwordValidation = {
  required: { value: true, message: "Password is required." },
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long.",
  },
  maxLength: {
    value: 256,
    message: "Password cannot exceed 256 characters.",
  },
  pattern: {
    value: /[a-zA-Z]/,
    message: "Password must contain at least one letter.",
  },
};

const UserSettingsConfig: NextPage<Props> = ({ setUser }) => {
  const router = useRouter();

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [generalSuccess, setGeneralSuccess] = useState<string | null>(null);

  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [freezeError, setFreezeError] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    register: registerChangePass,
    handleSubmit: handleSubmitChangePass,
    formState: {
      errors: errorsChangePass,
      isSubmitting: isChangePassSubmitting,
    },
    reset: resetChangePass,
  } = useForm<ChangePasswordForm>();

  const {
    register: registerFreeze,
    handleSubmit: handleSubmitFreeze,
    formState: { errors: errorsFreeze, isSubmitting: isFreezeSubmitting },
    reset: resetFreeze,
  } = useForm<FreezeAccountForm>();

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete, isSubmitting: isDeleteSubmitting },
    reset: resetDelete,
  } = useForm<DeleteAccountForm>();

  const onChangePassword = handleSubmitChangePass(async (formData) => {
    setGeneralError(null);
    setGeneralSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setGeneralError("New passwords do not match.");
      return;
    }
    try {
      const response = await axiosCredentialInstance.put(`/session/password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          setGeneralSuccess("Password changed successfully.");
          resetChangePass();
          return;
        default:
          setGeneralError("An unknown error occurred.");
          return;
      }
    } catch (error) {
      console.error(error);
      setGeneralError("An unknown error occurred.");
      return;
    }
  });

  const onFreezeAccount = handleSubmitFreeze(async (formData) => {
    setFreezeError(null);
    setGeneralError(null);
    setGeneralSuccess(null);

    const response = await axiosCredentialInstance.post(`/session/freeze`, {
      password: formData.password,
    });

    if (response.status === 200) {
      setGeneralSuccess("Your account has been frozen.");
      setShowFreezeModal(false);
      resetFreeze();
      setUser(null);
      router.push("/");
    } else setFreezeError("An unknown error occurred.");
  });

  const onDeleteAccount = handleSubmitDelete(async (formData) => {
    setDeleteError(null);
    setGeneralError(null);
    setGeneralSuccess(null);

    const response = await axiosCredentialInstance.delete(`/session/delete`, {
      data: { password: formData.password },
    });

    if (response.status === 200) {
      setGeneralSuccess("Your account has been scheduled for deletion.");
      setShowDeleteModal(false);
      resetDelete();
    } else setDeleteError("An unknown error occurred.");
  });

  return (
    <section className="flex flex-col items-center py-10 px-4 min-h-screen gap-6">
      <h2 className="mb-4 font-bold text-2xl">Account Configuration</h2>

      <Card className="max-w-md w-full">
        <CardBody className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Change Password</h3>

          {generalError && (
            <div className="text-red-500 text-sm font-medium">
              {generalError}
            </div>
          )}
          {generalSuccess && (
            <div className="text-green-500 text-sm font-medium">
              {generalSuccess}
            </div>
          )}

          <form onSubmit={onChangePassword} className="flex flex-col gap-4">
            <Input
              type="password"
              label="Current Password"
              variant="bordered"
              fullWidth
              placeholder="Enter your current password"
              isInvalid={!!errorsChangePass.oldPassword}
              errorMessage={errorsChangePass.oldPassword?.message}
              {...registerChangePass("oldPassword", passwordValidation)}
            />

            <Input
              type="password"
              label="New Password"
              variant="bordered"
              fullWidth
              placeholder="Enter a new password"
              isInvalid={!!errorsChangePass.newPassword}
              errorMessage={errorsChangePass.newPassword?.message}
              {...registerChangePass("newPassword", passwordValidation)}
            />

            <Input
              type="password"
              label="Confirm New Password"
              variant="bordered"
              fullWidth
              placeholder="Re-enter the new password"
              isInvalid={!!errorsChangePass.confirmPassword}
              errorMessage={errorsChangePass.confirmPassword?.message}
              {...registerChangePass("confirmPassword", {
                ...passwordValidation,
                validate: (value, formData) =>
                  value === formData.newPassword || "Passwords do not match.",
              })}
            />

            <Button
              color="primary"
              isLoading={isChangePassSubmitting}
              type="submit"
            >
              Change Password
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card className="max-w-md w-full">
        <CardBody className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl">Freeze Account</h3>
          <p className="text-sm text-default-500">
            Freezing your account will restrict access to your data. When you
            next log in, the account will automatically be unfrozen. All
            sessions will expire immediately.
          </p>
          <Button
            color="primary"
            variant="bordered"
            onPress={() => setShowFreezeModal(true)}
          >
            Freeze Account
          </Button>
        </CardBody>
      </Card>

      <Card className="max-w-md w-full">
        <CardBody className="flex flex-col gap-4">
          <h3 className="font-semibold text-xl text-red-600">Delete Account</h3>
          <p className="text-sm text-default-500">
            Deleting your account starts a 30-day countdown. During this time,
            your data is inaccessible. If you log in within 30 days, deletion is
            canceled. Otherwise, your account will be permanently removed after
            that period.
          </p>
          <Button
            color="danger"
            variant="solid"
            onPress={() => setShowDeleteModal(true)}
          >
            Delete Account
          </Button>
        </CardBody>
      </Card>

      <Modal
        isOpen={showFreezeModal}
        onOpenChange={(open) => {
          setShowFreezeModal(open);
          if (!open) resetFreeze();
        }}
      >
        <ModalContent>
          <ModalHeader>Confirm Freeze</ModalHeader>
          <form onSubmit={onFreezeAccount}>
            <ModalBody>
              <p>Please enter your password to freeze your account:</p>
              <Input
                type="password"
                label="Password"
                variant="bordered"
                fullWidth
                placeholder="Enter your password"
                isInvalid={!!errorsFreeze.password}
                errorMessage={errorsFreeze.password?.message}
                {...registerFreeze("password", passwordValidation)}
              />
              {freezeError && (
                <div className="text-red-500 text-sm font-medium mt-2">
                  {freezeError}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setShowFreezeModal(false)}>
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                type="submit"
                isLoading={isFreezeSubmitting}
              >
                Freeze
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onOpenChange={(open) => {
          setShowDeleteModal(open);
          if (!open) resetDelete();
        }}
      >
        <ModalContent>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <form onSubmit={onDeleteAccount}>
            <ModalBody>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone. Please enter your password:
              </p>
              <Input
                type="password"
                label="Password"
                variant="bordered"
                fullWidth
                placeholder="Enter your password"
                isInvalid={!!errorsDelete.password}
                errorMessage={errorsDelete.password?.message}
                {...registerDelete("password", passwordValidation)}
              />
              {deleteError && (
                <div className="text-red-500 text-sm font-medium mt-2">
                  {deleteError}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="solid"
                color="danger"
                type="submit"
                isLoading={isDeleteSubmitting}
              >
                Yes, Delete
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UserSettingsConfig;
