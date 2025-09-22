import axiosCredentialInstance from "@/lib/client/axiosCredentialInstance";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { FaBan, FaUserCheck, FaHourglass, FaUserPlus } from "react-icons/fa";
import { addToast } from "@heroui/toast";
import {
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { displayErrorToast } from "@/util/utils";
import axios from "axios";
import { UserFetched } from "@/types/classes/model/User/User";

interface Props {
  isOwnProfile: boolean;
  userFetched: UserFetched;
  stateConfirmationModalOfUnblockModalOpen: Dispatch<SetStateAction<boolean>>;
  stateControlFunctionOfFollowOperationConfirmationModelOpen: Dispatch<
    SetStateAction<boolean>
  >;
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetched
      | ((prev: UserFetched | null) => void | UserFetched | null)
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

const handleFollow = async (
  userToBeFollowed: UserFetched,
  stateControlFunctionOfUserToBeProcessedOn: (
    updater:
      | UserFetched
      | ((prev: UserFetched | null) => void | UserFetched | null)
  ) => void
) => {
  try {
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
        addToast({
          title: "Follow request failed",
          description:
            "You may already be following this user or a request is pending.",
          color: "danger",
        });
        return;
    }
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      console.error(error);
      addToast({
        title: "Unexpected error",
        description: "Something went wrong. Please try again later.",
        color: "warning",
      });
      return;
    }

    if (error.code === "ERR_NETWORK") {
      console.error(error);
      addToast({
        title: "Network Error",
        description:
          "We couldn’t connect to the server. Please check your internet connection.",
        color: "warning",
      });
      return;
    }

    switch (error.response?.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        addToast({
          title: "User Not Found",
          description:
            "The user might not exist, be frozen, or you are blocked by the user.",
          color: "secondary",
        });
        break;
      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        addToast({
          title: "Too Many Requests",
          description: "You’re making requests too quickly. Try again later.",
          color: "warning",
        });
        break;
      case CONFLICT_HTTP_RESPONSE_CODE:
        addToast({
          title: "Already Following",
          description:
            "You already follow this user or the request is pending.",
          color: "secondary",
        });
        break;
      case INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE:
      default:
        displayErrorToast(error);
        break;
    }
  }
};
