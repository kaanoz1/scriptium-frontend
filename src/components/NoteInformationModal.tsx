import { PROJECT_NAME } from "@/util/constants";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NoteInformationModal: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      onOpenChange={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      backdrop="opaque"
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">About notes:</ModalHeader>
        <ModalBody className="text-sm leading-normal text-foreground/90">
          <p>
            {PROJECT_NAME} provide an big information about notes. Notes might
            be public or private. If it is private, the owner can see it only.
            Otherwise, followers as well as owner.
          </p>

          <p className="mt-2">
            For more details, visit our <Link href="/about">About page</Link>.
          </p>
        </ModalBody>
        <ModalFooter className="gap-3" />
      </ModalContent>
    </Modal>
  );
};

export default NoteInformationModal;
