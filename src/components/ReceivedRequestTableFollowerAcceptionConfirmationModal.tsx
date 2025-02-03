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
  selectedUsernameToConfirmToFollow: string;
  handleAcceptRequest: (username: string) => Promise<void>;
}

const ReceivedRequestTableFollowerAcceptionConfirmationModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  selectedUsernameToConfirmToFollow,
  handleAcceptRequest,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Accept Follow Request</ModalHeader>
        <ModalBody>
          Are you sure you want to accept the follow request from @
          {selectedUsernameToConfirmToFollow}?
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            color="success"
            onPress={() => {
              if (selectedUsernameToConfirmToFollow)
                handleAcceptRequest(selectedUsernameToConfirmToFollow);

              setIsModalOpen(false);
            }}
          >
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReceivedRequestTableFollowerAcceptionConfirmationModal;
