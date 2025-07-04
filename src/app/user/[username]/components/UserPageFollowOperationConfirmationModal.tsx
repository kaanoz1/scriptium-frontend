import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { Toast } from "@/types/types";
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
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";
import { INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE, NOT_FOUND_HTTP_RESPONSE_CODE, OK_HTTP_RESPONSE_CODE, TOO_MANY_REQUEST_HTTP_RESPONSE_CODE } from "@/util/constants";
import { displayErrorToast } from "@/util/utils";
import axios from "axios";



interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeProcessedOn: UserFetchedDTO;
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
}

const UserPageFollowOperationConfirmationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeProcessedOn,
  stateControlFunctionOfUserToBeProcessedOn,
}) => {
  const followStatusUserInspecting =
    userToBeProcessedOn.getFollowStatusUserInspecting();

  const privateFromOfUserToBeProcessedOn = userToBeProcessedOn.getPrivateFrom();
  const usernameOfUserToBeProcessedOn = userToBeProcessedOn.getUsername();

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>
          {followStatusUserInspecting === "Accepted"
            ? "Confirm Unfollow"
            : "Confirm Retrieve"}
        </ModalHeader>
        <ModalBody>
          {followStatusUserInspecting !== "Accepted" &&
          privateFromOfUserToBeProcessedOn
            ? `Do you want to retrieve your follow request to ${usernameOfUserToBeProcessedOn}?`
            : `Are you sure you want to unfollow ${usernameOfUserToBeProcessedOn}?`}
          {privateFromOfUserToBeProcessedOn &&
          followStatusUserInspecting === "Accepted"
            ? ` @${usernameOfUserToBeProcessedOn} has private account. You will have to follow him/her again to see the reflections, notes etc.`
            : undefined}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color={
              followStatusUserInspecting === "Accepted" ? "danger" : "primary"
            }
            onPress={() => {
              handleFollowProcess(
                userToBeProcessedOn,
                stateControlFunctionOfUserToBeProcessedOn
              ).then(() => setIsModalOpen(false));
            }}
          >
            {followStatusUserInspecting === "Accepted"
              ? "Unfollow"
              : "Retrieve"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserPageFollowOperationConfirmationModal;


const handleRetrieve = async (
  userToBeProcessedOn: UserFetchedDTO,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  try {
    const response = await axiosCredentialInstance.delete(`/follow/retrieve`, {
      data: { username: userToBeProcessedOn.getUsername() },
    });

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;
        prev.setFollowStatusUserInspecting(null);
        return prev;
      });
      return;
    }

    addToast({
      title: "Could not retrieve request",
      description: "No pending follow request to retrieve.",
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
          "We couldn’t connect to the server. Please check your internet connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        addToast({
          title: "User Not Found",
          description: "This user may not exist or be frozen.",
          color: "secondary",
        });
        break;
      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        addToast({
          title: "Too Many Requests",
          description: "Please try again later.",
          color: "warning",
        });
        break;
      case INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE:
      default:
        displayErrorToast(error);
        break;
    }
  }
};

const handleUnfollow = async (
  userToBeProcessedOn: UserFetchedDTO,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  try {
    const response = await axiosCredentialInstance.delete<ResponseMessage>(
      `/follow/unfollow`,
      {
        data: { username: userToBeProcessedOn.getUsername() },
      }
    );

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;
        prev.setFollowStatusUserInspecting(null);
        prev.decreaseFollowerCount();
        return prev;
      });
      return;
    }

    addToast({
      title: "Could not unfollow",
      description: "You may already not be following this user.",
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
          "We couldn’t connect to the server. Please check your internet connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        addToast({
          title: "User Not Found",
          description: "User may not exist or be frozen.",
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
};

const handleFollowProcess = async (
  userToBeProcessedOn: UserFetchedDTO,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  if (userToBeProcessedOn.getFollowStatusUserInspecting() === "Accepted") {
    await handleUnfollow(
      userToBeProcessedOn,
      stateControlFunctionOfUserToBeProcessedOn
    );
  } else {
    await handleRetrieve(
      userToBeProcessedOn,
      stateControlFunctionOfUserToBeProcessedOn
    );
  }
};