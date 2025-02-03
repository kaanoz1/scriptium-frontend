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
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeRejected: UserFetched;
  stateControlFunctionOfUserToBeRejected: Dispatch<
    SetStateAction<UserFetched | null>
  >;
}

type UserRejectFollowerForm = {
  username: string;
};

const UserPageRejectFollowerConfirmationModal: FC<Props> = ({
  userToBeRejected,
  isModalOpen,
  setIsModalOpen,
  stateControlFunctionOfUserToBeRejected,
}) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRejectFollowerForm>();

  const handleRejectFollower = handleSubmit(
    async (formData: UserRejectFollowerForm) => {
      formData.username = userToBeRejected.username;

      const response = await axiosCredentialInstance.delete(`/follow/reject`, {
        data: { username: formData.username },
      });

      switch (response.status) {
        case OK_RESPONSE_CODE:
          stateControlFunctionOfUserToBeRejected(
            (prev) => prev && { ...prev, followStatusUserInspected: undefined }
          );

          return;

        default:
          return; //TODO: Add toast.
      }
    }
  );

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <form onSubmit={handleRejectFollower}>
          <ModalHeader>Confirm Reject Follow Request</ModalHeader>
          <ModalBody>
            Are you sure you want to reject the follow request from @
            {userToBeRejected.username}?
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
              color="danger"
              type="submit"
              isLoading={isSubmitting}
              onPress={() => {
                setIsModalOpen(false);
              }}
            >
              Reject
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserPageRejectFollowerConfirmationModal;
