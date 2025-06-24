import { getFormattedNameAndSurname } from "@/util/utils";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FaBan } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import UserPageFollowStatusButton from "./UserPageFollowStatusButton";
import { UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userToBeInformedWith: UserFetchedDTO;
  stateControlFunctionOfUserToBeInformedWith: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
  isOwnProfile?: boolean;
  user: UserOwnDTO;
  stateControlFunctionOfUserDetailModal: Dispatch<SetStateAction<boolean>>;
  stateControlFunctionOfBlockUserConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;
  stateControlFunctionOfUnblockUserConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;

  stateControlFunctionOfRejectFollowerConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;
  stateControlFunctionOfRemoveFollowerConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;
}

const UserPageInformationModal: NextPage<Props> = ({
  isModalOpen,
  setIsModalOpen,
  userToBeInformedWith,
  isOwnProfile = false,
  stateControlFunctionOfUserDetailModal,
  stateControlFunctionOfBlockUserConfirmationModal,
  stateControlFunctionOfUnblockUserConfirmationModal,
  stateControlFunctionOfRejectFollowerConfirmationModal,
  stateControlFunctionOfRemoveFollowerConfirmationModal,
  stateControlFunctionOfUserToBeInformedWith,
  user,
}) => {
  const formattedName = getFormattedNameAndSurname(userToBeInformedWith);

  const blockProcessDecider = () => {
    stateControlFunctionOfUnblockUserConfirmationModal(false);
    stateControlFunctionOfBlockUserConfirmationModal(false);

    if (userToBeInformedWith.getIsUserInspectedBlocked())
      stateControlFunctionOfUnblockUserConfirmationModal(true);
    else stateControlFunctionOfBlockUserConfirmationModal(true);
  };

  const imagePath = userToBeInformedWith.getImage();

  const usernameOfuserToBeInformedWith: string =
    userToBeInformedWith.getUsername();

  const isUserInspectedBlocked =
    userToBeInformedWith.getIsUserInspectedBlocked();

  return (
    <Modal size="lg" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col items-center mb-4">
            <Avatar
              className="h-24 w-24 mb-2"
              size="lg"
              name={formattedName}
              src={imagePath}
            />

            <h2 className="text-xl font-semibold">{formattedName}</h2>

            <p className="text-gray-500">@{usernameOfuserToBeInformedWith}</p>
          </div>
          {!isOwnProfile && user && (
            <div className="">
              <UserPageFollowStatusButton
                userInspected={userToBeInformedWith}
                stateControlFunctionOfUserInspected={
                  stateControlFunctionOfUserToBeInformedWith
                }
                stateControlFunctionOfRejectFollowerConfirmationModal={
                  stateControlFunctionOfRejectFollowerConfirmationModal
                }
                stateControlFunctionOfRemoveFollowerConfirmationModal={
                  stateControlFunctionOfRemoveFollowerConfirmationModal
                }
              />
            </div>
          )}

          {!isOwnProfile && (
            <div className="flex flex-col items-start gap-2 w-full text-sm">
              <Button
                color="primary"
                variant="light"
                className="w-full"
                onPress={() => stateControlFunctionOfUserDetailModal(true)}
              >
                <FaCircleInfo size={18} className="mr-2" /> Get information
                about this user
              </Button>
              <Button
                color={isUserInspectedBlocked ? "success" : "danger"}
                variant="light"
                className="w-full"
                onPress={blockProcessDecider}
              >
                <FaBan size={18} className="mr-2" />
                {isUserInspectedBlocked ? "Unblock" : "Block"} this user
              </Button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserPageInformationModal;
