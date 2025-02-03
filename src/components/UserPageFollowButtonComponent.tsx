import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import { UserFetched } from "@/types/types";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FaBan, FaUserCheck, FaHourglass, FaUserPlus } from "react-icons/fa";

interface Props {
  isOwnProfile: boolean;
  userFetched: UserFetched;
  stateConfirmationModalOfUnblockModalOpen: Dispatch<SetStateAction<boolean>>;
  stateControlFunctionOfFollowOperationConfirmationModelOpen: Dispatch<
    SetStateAction<boolean>
  >;
  stateControlFunctionOfUserToBeProcessedOn: Dispatch<
    SetStateAction<UserFetched | null>
  >;
}

const UserPageFollowButtonComponent: NextPage<Props> = ({
  isOwnProfile,
  userFetched,
  stateConfirmationModalOfUnblockModalOpen,
  stateControlFunctionOfFollowOperationConfirmationModelOpen,
  stateControlFunctionOfUserToBeProcessedOn,
}) => {
  const handleFollow = async () => {
    const response = await axiosCredentialInstance.post(`/follow/follow`, {
      username: userFetched.username,
    });

    switch (response.data.message) {
      case "You are successfully following the user!":
        stateControlFunctionOfUserToBeProcessedOn(
          (prev) =>
            prev && {
              ...prev,
              followStatusUserInspecting: "Accepted",
              followerCount: prev.followerCount + 1,
            }
        );
        return;
      case "Follow request sent successfully.":
        stateControlFunctionOfUserToBeProcessedOn(
          (prev) =>
            prev && {
              ...prev,
              followStatusUserInspecting: "Pending",
              privateFrom: prev.privateFrom || new Date(),
            }
        );
        return;
      default:
        return; //TODO: Add toast.
    }
  };

  if (isOwnProfile)
    return (
      <Button as={Link} href="/settings" variant="ghost">
        Edit Profile
      </Button>
    );

  if (userFetched.isUserInspectedBlocked)
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

  switch (userFetched.followStatusUserInspecting) {
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
          onPress={handleFollow}
          className="flex items-center gap-2"
        >
          <FaUserPlus />
          Follow
        </Button>
      );
  }
};

export default UserPageFollowButtonComponent;
