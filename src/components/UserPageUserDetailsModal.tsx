import { UserFetched } from "@/types/types";
import { formatDateDMY } from "@/util/utils";
import { Divider } from "@heroui/divider";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Dispatch, FC, SetStateAction } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import {
  IoCalendarOutline,
  IoSyncOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeInformedWith: UserFetched;
}

const UserPageUserDetailsModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeInformedWith,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <FaCircleInfo className="text-lg text-blue-500" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            User Details
          </span>
        </ModalHeader>
        <ModalBody className="space-y-4 pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-100">
            These details give you insight into when this user joined, how often
            they have updated their account, how many suggestions they have
            made, and whether their account is private.
          </p>
          <Divider className="h-0.5" />

          <div className="flex items-center gap-3">
            <IoCalendarOutline className="text-xl text-green-600" />
            <div>
              <strong className="block text-gray-700 dark:text-gray-100">
                Joined At
              </strong>
              <span className="text-sm text-gray-600 dark:text-gray-100">
                {formatDateDMY(userToBeInformedWith.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IoSyncOutline size={25} className="text-xl text-yellow-600" />
            <div>
              <strong className="block text-gray-700 dark:text-gray-100">
                Update Count
              </strong>
              <span className="text-sm text-gray-600 dark:text-gray-100">
                {userToBeInformedWith.updateAccountCount} updates.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaLightbulb className="text-xl text-blue-600" />
            <div>
              <strong className="block text-gray-700 dark:text-gray-100">
                Suggestion Count
              </strong>
              <span className="text-sm text-gray-600 dark:text-gray-100">
                {userToBeInformedWith.suggestionCount} suggestions made by this
                user.
              </span>
            </div>
          </div>

          {userToBeInformedWith.privateFrom && (
            <div className="flex items-center gap-3 pb-3">
              <IoInformationCircleOutline className="text-xl text-red-600" />
              <div>
                <strong className="block text-gray-700 dark:text-gray-100">
                  Private From
                </strong>
                <span className="text-sm text-gray-600 dark:text-gray-100">
                  This account became private on{" "}
                  {formatDateDMY(userToBeInformedWith.privateFrom)}.
                </span>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserPageUserDetailsModal;
