import axiosCredentialInstance from "@/client/axiosCredentialInstance";
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
import { useForm } from "react-hook-form";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeRemoved: UserFetched;
  stateControlFunctionOfUserToBeRemoved: Dispatch<
    SetStateAction<UserFetched | null>
  >;
}

type RemoveFollowerForm = {
  username: string;
};

const UserPageRemoveFollowerConfirmationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeRemoved,
  stateControlFunctionOfUserToBeRemoved,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RemoveFollowerForm>();

  const onRemoveFollowerSubmit = handleSubmit(
    async (formData: RemoveFollowerForm) => {
      formData.username = userToBeRemoved.username;
      try {
        const response = await axiosCredentialInstance.delete(
          `/follow/remove`,
          {
            data: { username: formData.username },
          }
        );

        switch (response.status) {
          case OK_RESPONSE_CODE:
            stateControlFunctionOfUserToBeRemoved(
              (prev) =>
                prev && {
                  ...prev,
                  followStatusUserInspected: undefined,
                  followingCount: prev.followingCount - 1,
                }
            );

            return;

          default:
            return; //TODO: Add toast.
        }
      } catch (error) {
        //TODO: Add toast.
        console.error(error);
        return;
      }
    }
  );

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <form onSubmit={onRemoveFollowerSubmit}>
          <ModalHeader>Confirm Remove Follower</ModalHeader>
          <ModalBody>
            Are you sure you want to remove @{userToBeRemoved.username} from
            your followers?
            {errors && (
              <p className="italic text-red-500/80">
                {errors.username?.message}
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              isLoading={isSubmitting}
              type="submit"
              color="danger"
              onPress={() => setIsModalOpen(false)}
            >
              Remove
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserPageRemoveFollowerConfirmationModal;
