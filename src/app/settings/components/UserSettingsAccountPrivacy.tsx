import { NextPage } from "next";
import { useState } from "react";
import { Switch } from "@heroui/switch";
import { FaLock } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import TooManyRequestComponent from "../../../components/UI/TooManyRequest";
import ServerErrorComponent from "../../../components/UI/ServerErrorComponent";
import { UserOwnDTO } from "@/types/classes/User";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  CONFLICT_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

interface Props {
  user: UserOwnDTO;
  setUser: (user: UserOwnDTO | null) => void;
}

const UserSettingsAccountPrivacy: NextPage<Props> = ({ user, setUser }) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(!!user.getPrivateFrom());
  const [error, setError] = useState<
    T_NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const handleToggle = async () => {
    const previousValue = isPrivate;
    setIsPrivate(!previousValue);

    try {
      const response = await axiosCredentialInstance.put(`/session/alter`);

      switch (response.status) {
        case OK_HTTP_RESPONSE_CODE:
          user.togglePrivateFrom();
          setUser(user);
          addToast({
            title: previousValue
              ? "Account is now public"
              : "Account is now private",
            description: previousValue
              ? "Your account is visible to everyone."
              : "Only your approved followers can see your profile.",
            color: "success",
          });
          return;

        case CONFLICT_HTTP_RESPONSE_CODE:
          setIsPrivate(previousValue); // Geri al
          addToast({
            title: "Conflict Detected",
            description:
              "Privacy setting could not be updated due to a conflict.",
            color: "warning",
          });
          return;

        case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
          setIsPrivate(previousValue); // Geri al
          setError(429);
          addToast({
            title: "Too Many Requests",
            description: "You're switching too fast. Please wait a moment.",
            color: "warning",
          });
          return;

        default:
          setIsPrivate(previousValue); // Geri al
          setError(500);
          addToast({
            title: "Unexpected Error",
            description: "Something went wrong while updating your settings.",
            color: "danger",
          });
          return;
      }
    } catch (error) {
      console.error(error);
      setIsPrivate(previousValue);
      setError(INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE);

      if (!axios.isAxiosError(error)) {
        addToast({
          title: "Unknown Error",
          description: "An unexpected error occurred.",
          color: "danger",
        });
      } else if (error.code === "ERR_NETWORK") {
        addToast({
          title: "Network Error",
          description: "Please check your internet connection.",
          color: "warning",
        });
      } else {
        addToast({
          title: "Server Error",
          description:
            error.response?.data?.message ??
            "Unable to update privacy settings.",
          color: "danger",
        });
      }
    }
  };

  if (error && error === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE)
    return <TooManyRequestComponent />;

  if (error && error === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE)
    return <ServerErrorComponent />;

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Account Privacy</h3>
      <div className="w-full border p-4 rounded-md flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-md">Private account</span>
          <p className="text-sm text-neutral-500">
            When your account is private, only approved followers can see your
            posts and profile details. If your account is public, anyone can
            view your profile and posts. Additionally,{" "}
            <span className="underline">
              {" "}
              whenever you alter your account to public, if there are/is pending
              requests, they would automatically be accepted.
            </span>{" "}
            You can check{" "}
            <em className="italic font-bold">Followers & Followings</em> section
            for more information about your following requests.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Switch
            isSelected={isPrivate}
            startContent={<FaLock size={15} />}
            endContent={<MdOutlinePublic size={20} />}
            onValueChange={handleToggle}
            aria-label="Private account switch"
            size="lg"
          />
          <em className="text-sm">{isPrivate ? "Private" : "Public"}</em>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsAccountPrivacy;
