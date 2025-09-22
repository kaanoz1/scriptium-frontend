import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "@heroui/link";
import { SIGN_IN_URL } from "@/util/constants";

interface Props {
  isCollectionModalOpen: boolean;
  setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CollectionModelMustSignIn: NextPage<Props> = ({
  isCollectionModalOpen,
  setIsCollectionModalOpen,
}) => {
  return (
    <Modal
      onOpenChange={() => setIsCollectionModalOpen(false)}
      isOpen={isCollectionModalOpen}
      backdrop="opaque"
      size="3xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Your Collections
        </ModalHeader>
        <ModalBody>
          <div className="w-full flex flex-col">
            <div className="space-y-3 p-4 overflow-y-auto">
              <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-neutral-200 dark:bg-neutral-700 p-4 text-gray-800 dark:text-gray-200">
                <FiLogIn size={28} className="text-current" />
                <div className="flex flex-col">
                  <span className="font-semibold text-md mb-1">
                    Sign In Required
                  </span>
                  <p className="text-sm leading-5">
                    You must{" "}
                    <Link
                      href={SIGN_IN_URL}
                      className="underline font-medium hover:text-black dark:hover:text-gray-300"
                    >
                      log in
                    </Link>{" "}
                    to save this verse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            onPress={() => setIsCollectionModalOpen(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionModelMustSignIn;
