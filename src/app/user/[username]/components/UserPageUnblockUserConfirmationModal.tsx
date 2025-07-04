import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import {  UnblockUserForm } from "@/types/types";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";
import {
  CONFLICT_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { displayErrorToast } from "@/util/utils";
import axios from "axios";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeUnblocked: UserFetchedDTO;
  stateControlFunctionOfInformationModal: Dispatch<SetStateAction<boolean>>;
  stateControlFunctionOfUserToBeUnblocked: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
}

const UserPageUnblockUserConfirmationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeUnblocked,
  stateControlFunctionOfInformationModal,
  stateControlFunctionOfUserToBeUnblocked,
}) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UnblockUserForm>();

  const onUnblockSubmit = handleSubmit(async (formData: UnblockUserForm) => {
    formData.username = userToBeUnblocked.getUsername();

    try {
      const response = await axiosCredentialInstance.delete(`/block/unblock`, {
        data: formData,
      });

      if (
        response.status === OK_HTTP_RESPONSE_CODE ||
        response.status === CONFLICT_HTTP_RESPONSE_CODE
      ) {
        stateControlFunctionOfUserToBeUnblocked((prev) => {
          if (!prev) return null;
          prev.setIsUserInspectedBlocked(false);
          prev.setFollowStatusUserInspecting(null);
          prev.setFollowStatusUserInspected(null);
          return prev;
        });
        return;
      }

      addToast({
        title: "Could not unblock",
        description:
          "User may already be unblocked. Please refresh the page and try again.",
        color: "danger",
      });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        console.error(error);
        addToast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
          color: "warning",
        });
        return;
      }

      if (error.code === "ERR_NETWORK") {
        console.error(error);
        addToast({
          title: "Network Error",
          description:
            "We couldn't connect to the server. Please check your internet connection.",
          color: "warning",
        });
        return;
      }

      switch (error.response?.status) {
        case OK_HTTP_RESPONSE_CODE:
          addToast({
            title: "User Not Found",
            description: "User may no longer exist or be frozen.",
            color: "secondary",
          });
          break;
        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          addToast({
            title: "Too Many Requests",
            description: "Slow down and try again later.",
            color: "warning",
          });
          break;
        case INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE:
        default:
          displayErrorToast(error);
          break;
      }
    }
  });


  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Unblock User</ModalHeader>
        <form onSubmit={onUnblockSubmit}>
          <ModalBody>
            Are you sure you want to unblock @{userToBeUnblocked.getUsername()}?
            {errors && (
              <p className="italic text-red-500/80">
                {errors.username?.message}
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsModalOpen(false)}
              isLoading={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              color="success"
              type="submit"
              onPress={() => {
                setIsModalOpen(false);
                stateControlFunctionOfInformationModal(false);
              }}
            >
              Unblock
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserPageUnblockUserConfirmationModal;
