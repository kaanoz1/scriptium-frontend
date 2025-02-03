import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { ResponseMessage } from "@/types/response";
import { UserFetched } from "@/types/types";
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

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeProcessedOn: UserFetched;
  stateControlFunctionOfUserToBeProcessedOn: Dispatch<
    SetStateAction<UserFetched | null>
  >;
}

const UserPageFollowOperationConfirmationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeProcessedOn,
  stateControlFunctionOfUserToBeProcessedOn,
}) => {
  const handleUnfollow = async () => {
    const response = await axiosCredentialInstance.delete<ResponseMessage>(
      `/follow/unfollow`,
      {
        data: { username: userToBeProcessedOn.username },
      }
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        stateControlFunctionOfUserToBeProcessedOn(
          (prev) =>
            prev && {
              ...prev,
              followStatusUserInspecting: undefined,
              followerCount: prev.followerCount - 1,
            }
        );
        return;

      default:
        return; //TODO: Add toast.
    }
  };

  const handleRetrieve = async () => {
    const response = await axiosCredentialInstance.delete(
      `/follow/retrieve`,
      {
        data: { username: userToBeProcessedOn.username },
      }
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        stateControlFunctionOfUserToBeProcessedOn(
          (prev) => prev && { ...prev, followStatusUserInspecting: undefined }
        );
        return;

      default:
        return; //TODO: Add toast.
    }
  };

  const handleFollowProcess = async () => {
    if (userToBeProcessedOn.followStatusUserInspecting === "Accepted")
      await handleUnfollow();
    else await handleRetrieve();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>
          {userToBeProcessedOn.followStatusUserInspecting === "Accepted"
            ? "Confirm Unfollow"
            : "Confirm Retrieve"}
        </ModalHeader>
        <ModalBody>
          {userToBeProcessedOn.followStatusUserInspecting !== "Accepted" &&
          userToBeProcessedOn.privateFrom
            ? `Do you want to retrieve your follow request to ${userToBeProcessedOn.username}?`
            : `Are you sure you want to unfollow ${userToBeProcessedOn.username}?`}
          {userToBeProcessedOn.privateFrom &&
          userToBeProcessedOn.followStatusUserInspecting === "Accepted"
            ? ` @${userToBeProcessedOn.username} has private account. You will have to follow him/her again to see the reflections, notes etc.`
            : undefined}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color={
              userToBeProcessedOn?.followStatusUserInspecting === "Accepted"
                ? "danger"
                : "primary"
            }
            onPress={() => {
              handleFollowProcess().then(() => setIsModalOpen(false));
            }}
          >
            {userToBeProcessedOn.followStatusUserInspecting === "Accepted"
              ? "Unfollow"
              : "Retrieve"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserPageFollowOperationConfirmationModal;
