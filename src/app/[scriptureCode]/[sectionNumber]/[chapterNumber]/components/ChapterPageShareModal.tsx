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
import {handleCopy} from "@/util/utils";
import { handleShare } from "@/util/func";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  shareText: string;
  stateControlFunctionOfShareText: Dispatch<SetStateAction<string>>;
}

const ChapterPageShareModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  shareText,
  stateControlFunctionOfShareText,
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
            <div className="w-full">
              <div className="relative w-full">
                <Textarea
                  value={shareText}
                  onValueChange={stateControlFunctionOfShareText}
                  className="w-full"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => handleCopy(shareText)}
                >
                  <LuCopy size={20} />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center">
              <Divider className="h-0.5 w-2/5 " />
              <span className="px-2 opacity-50">OR</span>
              <Divider className="h-0.5 w-2/5 " />
            </div>

            <Button
              onPress={() => {
                handleShare("twitter", shareText);
                setIsModalOpen(false);
              }}
            >
              <BsTwitterX size={20} /> Share on Twitter
            </Button>
            <Button
              onPress={() => {
                handleShare("threads", shareText);
                setIsModalOpen(false);
              }}
            >
              <FaThreads size={20} /> Share on Threads
            </Button>
            <Button
              onPress={() => {
                handleShare("direct", shareText);
                setIsModalOpen(false);
              }}
            >
              <LuCopy size={20} /> Copy the direct link
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

export default ChapterPageShareModal;
