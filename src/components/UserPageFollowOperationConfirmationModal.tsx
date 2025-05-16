import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { Toast } from "@/types/types";
import { OK_RESPONSE_CODE } from "@/util/utils";
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

const handleRetrieve = async (
  userToBeProcessedOn: UserFetchedDTO,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  const response = await axiosCredentialInstance.delete(`/follow/retrieve`, {
    data: { username: userToBeProcessedOn.getUsername() },
  });

  switch (response.status) {
    case OK_RESPONSE_CODE:
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;

        prev.setFollowStatusUserInspecting(null);
        return prev;
      });
      return;

    default:
      const couldnotRetrieveToast: Toast = {
        title: "Request could not be retrieved.",
        description: "You may not have a pending follow request to this user.",
        color: "danger",
      };

      addToast(couldnotRetrieveToast);
      return;
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
  const response = await axiosCredentialInstance.delete<ResponseMessage>(
    `/follow/unfollow`,
    {
      data: { username: userToBeProcessedOn.getUsername() },
    }
  );

  switch (response.status) {
    case OK_RESPONSE_CODE:
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;

        prev.setFollowStatusUserInspecting(null);
        prev.decreaseFollowerCount();
        return prev;
      });
      return;

    default:
      const couldnotUnfollowed: Toast = {
        title: "Could not unfollow.",
        description:
          "You may be already not following this user or user might not found.",
        color: "danger",
      };

      addToast(couldnotUnfollowed);

      return;
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
  if (userToBeProcessedOn.getFollowStatusUserInspecting() === "Accepted")
    await handleUnfollow(
      userToBeProcessedOn,
      stateControlFunctionOfUserToBeProcessedOn
    );
  else
    await handleRetrieve(
      userToBeProcessedOn,
      stateControlFunctionOfUserToBeProcessedOn
    );
};

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
