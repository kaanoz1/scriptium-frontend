import { PROJECT_NAME } from "@/util/constants";
import { Link } from "@heroui/link";
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
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CommentInformationModal: FC<Props> = ({ isModalOpen, setModalOpen }) => {
  return (
    <Modal
      onOpenChange={() => setModalOpen(false)}
      isOpen={isModalOpen}
      backdrop="opaque"
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Reflections System - Information
        </ModalHeader>
        <ModalBody className="text-sm leading-normal text-foreground/90">
          <p>
            {PROJECT_NAME} uses an{" "}
            <strong>infinite-depth reflection system</strong>, meaning each
            comment can have replies, and those replies can also have their own
            replies, and so on.
          </p>
          <p className="mt-2">
            However, to keep things easy to read, this page only displays{" "}
            <strong>top-level comments and their immediate replies</strong>. If
            you want to explore deeper comment threads, you can use the{" "}
            <strong>“Inspect”</strong> option (found in the three-dot menu). By
            selecting “Inspect,” that comment becomes the new top-level, and
            you&apos;ll see its first-level replies. You can repeat this process
            to navigate through any level of nested comments.
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

export default CommentInformationModal;
