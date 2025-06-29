import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { Toast } from "@/types/types";
import { Button } from "@heroui/button";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FaHourglass } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";
import { OK_HTTP_RESPONSE_CODE } from "@/util/constants";

const handleAcceptFollower = async (
  userToBeAccepted: UserFetchedDTO,
  stateControlFunctionOfUserInspected: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  const response = await axiosCredentialInstance.put(`/follow/accept`, {
    username: userToBeAccepted.getUsername(),
  });

  switch (response.status) {
    case OK_HTTP_RESPONSE_CODE:
      stateControlFunctionOfUserInspected((prev) => {
        if (!prev) return null;

        prev.setFollowStatusUserInspected("Accepted");

        prev.increaseFollowerCount();

        return prev;
      });
      return;

    default:
      const couldnotAcceptFollowerToast: Toast = {
        title: "Could not accept follow request.",
        description: "You may already have accepted request or retrieved it.",
        color: "warning",
      };

      addToast(couldnotAcceptFollowerToast);

      return;
  }
};

interface Props {
  userInspected: UserFetchedDTO;
  stateControlFunctionOfUserInspected: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
  stateControlFunctionOfRemoveFollowerConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;

  stateControlFunctionOfRejectFollowerConfirmationModal: Dispatch<
    SetStateAction<boolean>
  >;
}

const UserPageFollowStatusButton: NextPage<Props> = ({
  userInspected,
  stateControlFunctionOfRemoveFollowerConfirmationModal,
  stateControlFunctionOfRejectFollowerConfirmationModal,
  stateControlFunctionOfUserInspected,
}) => {
  const followStatusOfInspectedUser =
    userInspected.getFollowStatusUserInspected();

  switch (followStatusOfInspectedUser) {
    case "Accepted":
      return (
        <div className="flex items-center justify-between w-full transition-colors duration-200 cursor-pointer px-2 py-1 rounded-md border border-transparent hover:border-green-500 hover:text-green-500 hover:bg-green-50 group text-sm">
          <div className="flex items-center">
            <FaUserCheck
              size={18}
              className="mr-2 group-hover:text-green-500"
            />
            <span>This user is following you.</span>
          </div>
          <Button
            variant="light"
            color="danger"
            className=" text-sm"
            onPress={() =>
              stateControlFunctionOfRemoveFollowerConfirmationModal(true)
            }
          >
            Remove
          </Button>
        </div>
      );
    case "Pending":
      return (
        <div className="flex flex-row items-center justify-between w-full gap-4 transition-colors duration-200 cursor-pointer px-2 py-1 rounded-md border border-transparent hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950 group">
          <div className="inline-flex items-center">
            <FaHourglass className="mr-2 group-hover:text-yellow-500" />
            <span>Wants to follow you.</span>
          </div>
          <div className="flex gap-2">
            <Button
              color="success"
              variant="light"
              endContent={<IoCheckmark size={20} />}
              onPress={async () =>
                await handleAcceptFollower(
                  userInspected,
                  stateControlFunctionOfUserInspected
                )
              }
            >
              Accept
            </Button>
            <Button
              variant="light"
              color="danger"
              onPress={() =>
                stateControlFunctionOfRejectFollowerConfirmationModal(true)
              }
            >
              Reject
            </Button>
          </div>
        </div>
      );
    default:
      return <span>This user is not following you.</span>;
  }
};

export default UserPageFollowStatusButton;
