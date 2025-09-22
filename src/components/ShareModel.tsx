"use client";

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
import { FC, ReactNode } from "react";
import { BsTwitterX } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { T_SharePlatform } from "@/types/types";
import { handleCopy, handleShare } from "@/util/copy";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  shareTextState: string;
  stateControlFunctionOfShareTextState: (shareText: string) => void;
}

const ShareModel: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  shareTextState,
  stateControlFunctionOfShareTextState,
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
          <div className="flex flex-col justify-center gap-3 overflow-hidden">
            <div className="relative w-full">
              <Textarea
                value={shareTextState}
                onValueChange={stateControlFunctionOfShareTextState}
                className="w-full"
                label="Share Text"
              />
              <button
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={async (e) => {
                  e.stopPropagation();
                  await handleCopy(shareTextState);
                }}
              >
                <LuCopy size={20} />
              </button>
            </div>

            <div className="flex flex-row w-full justify-center items-center gap-2">
              <Divider className="h-0.5 w-full" />
              <span className="px-2 opacity-50">OR</span>
              <Divider className="h-0.5 w-full" />
            </div>

            {platforms.map(({ id, label, icon, variant = "solid" }) => (
              <Button
                key={id}
                color="primary"
                variant={variant}
                className="flex items-center gap-2"
                onPress={async () => {
                  const currentUrl =
                    typeof window !== "undefined" ? window.location.href : "";
                  await handleShare(id, shareTextState, currentUrl);
                  setIsModalOpen(false);
                }}
              >
                {icon}
                {label}
              </Button>
            ))}
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

export default ShareModel;

const platforms: {
  id: T_SharePlatform;
  label: string;
  icon: ReactNode;
  variant?: "solid" | "light" | "shadow" | "bordered";
}[] = [
  { id: "twitter", label: "Share on Twitter", icon: <BsTwitterX size={20} /> },
  // { id: "threads", label: "Share on Threads", icon: <FaThreads size={20} /> },
  {
    id: "direct",
    label: "Copy the direct link",
    icon: <LuCopy size={20} />,
    variant: "light",
  },
];
