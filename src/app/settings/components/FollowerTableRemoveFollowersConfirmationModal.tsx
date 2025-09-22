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
  selectedUsernameToRemove: string;
  handleRemoveFollower: (username: string) => Promise<void>;
}

const FollowerTableRemoveFollowersConfirmationModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  selectedUsernameToRemove,
  handleRemoveFollower,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Removal</ModalHeader>
        <ModalBody>
          Are you sure you want to remove @{selectedUsernameToRemove} from your
          followers?
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={() => {
              if (selectedUsernameToRemove)
                handleRemoveFollower(selectedUsernameToRemove).then(() =>
                  setIsModalOpen(false)
                );
            }}
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FollowerTableRemoveFollowersConfirmationModal;
