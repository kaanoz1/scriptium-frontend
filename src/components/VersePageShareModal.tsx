import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Textarea } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Dispatch, FC, SetStateAction } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaThreads } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  shareTextState: string;
  stateControlFunctionOfShareTextState: Dispatch<SetStateAction<string>>;
  handleCopyFunction: () => Promise<void>;
  handleShareFunction: (platform: string) => Promise<void>;
}

const VersePageShareModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  shareTextState,
  stateControlFunctionOfShareTextState,
  handleCopyFunction,
  handleShareFunction,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
      backdrop="opaque"
      radius="lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-center gap-3">
            <div className="relative w-full">
              <Textarea
                value={shareTextState}
                onValueChange={stateControlFunctionOfShareTextState}
                className="w-full"
                label="Share Text"
              />
              <div
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={handleCopyFunction}
              >
                <LuCopy size={20} />
              </div>
            </div>

            <div className="flex flex-row w-full justify-center items-center gap-2">
              <Divider className="h-0.5 w-full" />
              <span className="px-2 opacity-50">OR</span>
              <Divider className="h-0.5 w-full" />
            </div>

            <Button
              color="primary"
              variant="solid"
              className="flex items-center gap-2"
              onPress={() => {
                handleShareFunction("twitter").then(() =>
                  setIsModalOpen(false)
                );
              }}
            >
              <BsTwitterX size={20} />
              Share on Twitter
            </Button>
            <Button
              color="primary"
              variant="solid"
              className="flex items-center gap-2"
              onPress={() => {
                handleShareFunction("threads").then(() =>
                  setIsModalOpen(false)
                );
              }}
            >
              <FaThreads size={20} />
              Share on Threads
            </Button>
            <Button
              variant="light"
              className="flex items-center gap-2"
              onPress={() => {
                handleShareFunction("direct").then(() => setIsModalOpen(false));
              }}
            >
              <LuCopy size={20} />
              Copy the direct link
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VersePageShareModal;
