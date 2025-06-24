import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { Toast } from "@/types/types";
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
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeRejected: UserFetchedDTO;
  stateControlFunctionOfUserToBeRejected: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
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
      formData.username = userToBeRejected.getUsername();

      const response = await axiosCredentialInstance.delete(`/follow/reject`, {
        data: { username: formData.username },
      });

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          stateControlFunctionOfUserToBeRejected((prev) => {
            if (!prev) return null;

            prev.setFollowStatusUserInspected(null);
            return prev;
          });
          return;

        default:
          const couldntRejectedToast: Toast = {
            title: "User couldn't be rejected",
            description:
              "User may already receive the request or you may already accepted it.",
          };

          addToast(couldntRejectedToast);

          return;
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
            {userToBeRejected.getUsername()}?
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
