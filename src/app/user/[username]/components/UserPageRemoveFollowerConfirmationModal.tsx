import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { displayErrorToast } from "@/util/utils";
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
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import axios from "axios";
import { UserFetched } from "@/types/classes/model/User/User";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeRemoved: UserFetched;
  stateControlFunctionOfUserToBeRemoved: (
    updater:
      | UserFetched
      | ((prev: UserFetched | null) => void | UserFetched | null)
  ) => void;
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
      formData.username = userToBeRemoved.getUsername();

      try {
        const response = await axiosCredentialInstance.delete(
          `/follow/remove`,
          {
            data: { username: formData.username },
          }
        );

        if (response.status === OK_HTTP_RESPONSE_CODE) {
          stateControlFunctionOfUserToBeRemoved((prev) => {
            if (!prev) return null;
            prev.setFollowStatusUserInspected(null);
            prev.decreaseFollowedCount();
            return prev;
          });
          return;
        }

        addToast({
          title: "Could not remove follower",
          description: "The user may already not be following you.",
          color: "warning",
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
              description: "This user may not exist or already unfollowed you.",
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
    }
  );
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <form onSubmit={onRemoveFollowerSubmit}>
          <ModalHeader>Confirm Remove Follower</ModalHeader>
          <ModalBody>
            Are you sure you want to remove @{userToBeRemoved.getUsername()}{" "}
            from your followers?
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
