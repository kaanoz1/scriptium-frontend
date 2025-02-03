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
  selectedUsernameToRejectToFollow: string;
  handleRejectRequest: (username: string) => Promise<void>;
}

const ReceivedRequestTableFollowerRejectionConfirmationModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  selectedUsernameToRejectToFollow,
  handleRejectRequest,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Reject Follow Request</ModalHeader>
        <ModalBody>
          Are you sure you want to reject the follow request from @
          {selectedUsernameToRejectToFollow}?
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={() => {
              if (selectedUsernameToRejectToFollow) {
                handleRejectRequest(selectedUsernameToRejectToFollow);
              }
              setIsModalOpen(false);
            }}
          >
            Reject
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReceivedRequestTableFollowerRejectionConfirmationModal;
