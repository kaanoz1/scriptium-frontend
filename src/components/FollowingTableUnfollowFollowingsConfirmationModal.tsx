import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedUsernameToUnfollow: string;
  handleUnfollowUser: (username: string) => Promise<void>;
}

const FollowingTableUnfollowFollowingsConfirmationModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  selectedUsernameToUnfollow,
  handleUnfollowUser,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Unfollow</ModalHeader>
        <ModalBody>
          Are you sure you want to unfollow @{selectedUsernameToUnfollow}?
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={() => {
              if (selectedUsernameToUnfollow)
                handleUnfollowUser(selectedUsernameToUnfollow).then(() =>
                  setIsModalOpen(false)
                );
            }}
          >
            Unfollow
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FollowingTableUnfollowFollowingsConfirmationModal;
