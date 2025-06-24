import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { Toast } from "@/types/types";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FaBan, FaUserCheck, FaHourglass, FaUserPlus } from "react-icons/fa";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";

const handleFollow = async (
  userToBeFollowed: UserFetchedDTO,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void
) => {
  const response = await axiosCredentialInstance.post(`/follow/follow`, {
    username: userToBeFollowed.getUsername(),
  });

  switch (response.data.message) {
    case "You are successfully following the user!":
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;

        prev.setFollowStatusUserInspecting("Accepted");

        prev.increaseFollowerCount();

        return prev;
      });
      return;

    case "Follow request sent successfully.":
      stateControlFunctionOfUserToBeProcessedOn((prev) => {
        if (!prev) return null;
        prev.setFollowStatusUserInspecting("Pending");
        return prev;
      });
      return;

    default:
      const couldntSendRequestToast: Toast = {
        title: "Process couldn't made!",
        description:
          "You may already follow this user or you have a pending request.",
        color: "danger",
      };

      addToast(couldntSendRequestToast);
      return;
  }
};

interface Props {
  isOwnProfile: boolean;
  userFetched: UserFetchedDTO;
  stateConfirmationModalOfUnblockModalOpen: Dispatch<SetStateAction<boolean>>;
  stateControlFunctionOfFollowOperationConfirmationModelOpen: Dispatch<
    SetStateAction<boolean>
  >;
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => void;
}

const UserPageFollowButtonComponent: NextPage<Props> = ({
  isOwnProfile,
  userFetched,
  stateConfirmationModalOfUnblockModalOpen,
  stateControlFunctionOfFollowOperationConfirmationModelOpen,
  stateControlFunctionOfUserToBeProcessedOn,
}) => {
  if (isOwnProfile)
    return (
      <Button as={Link} href="/settings" variant="ghost">
        Edit Profile
      </Button>
    );

  const isUserInspectedBlocked: boolean =
    userFetched.getIsUserInspectedBlocked();

  if (isUserInspectedBlocked)
    return (
      <Button
        variant="solid"
        color="danger"
        className="flex items-center gap-2"
        onPress={() => stateConfirmationModalOfUnblockModalOpen(true)}
      >
        <FaBan size={18} className="mr-2" />
        Blocked
      </Button>
    );

  const followStatusUserInspecting =
    userFetched.getFollowStatusUserInspecting();

  switch (followStatusUserInspecting) {
    case "Accepted":
      return (
        <Button
          variant="solid"
          color="success"
          onPress={() =>
            stateControlFunctionOfFollowOperationConfirmationModelOpen(true)
          }
          className="flex items-center gap-2"
        >
          <FaUserCheck />
          Following
        </Button>
      );
    case "Pending":
      return (
        <Button
          variant="solid"
          color="warning"
          onPress={() =>
            stateControlFunctionOfFollowOperationConfirmationModelOpen(true)
          }
          className="flex items-center gap-2"
        >
          <FaHourglass />
          Pending Request
        </Button>
      );
    default:
      return (
        <Button
          variant="solid"
          color="primary"
          onPress={async () =>
            await handleFollow(
              userFetched,
              stateControlFunctionOfUserToBeProcessedOn
            )
          }
          className="flex items-center gap-2"
        >
          <FaUserPlus />
          Follow
        </Button>
      );
  }
};

export default UserPageFollowButtonComponent;
