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
  usernameOfWhomToBeUnblocked?: string;
  handleUnblockUser: () => Promise<void>;
}

const UserSettingsPageUnblockConfirmationModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  usernameOfWhomToBeUnblocked,
  handleUnblockUser,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader>Confirm Unblock User</ModalHeader>
        <ModalBody>
          Are you sure you want to unblock{" "}
          {`${
            usernameOfWhomToBeUnblocked
              ? `@${usernameOfWhomToBeUnblocked}`
              : "this user"
          }?`}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>

          <Button
            color="success"
            onPress={() => {
              handleUnblockUser();
              setIsModalOpen(false);
            }}
          >
            Unblock
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserSettingsPageUnblockConfirmationModal;
