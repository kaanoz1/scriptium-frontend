"use client";
import { NextPage } from "next";
import { useState, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";

import { Divider } from "@heroui/divider";
import { Avatar } from "@heroui/avatar";
import {
  Response,
  ResponseMessage,
  T_AuthenticationRequestErrorCode,
} from "@/types/response";
import { useUser } from "@/hooks/useUser";
import { Toast, UserPageParams } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import GetUserRoleSymbolsComponent from "@/components/GetUserRoleSymbolsComponent";
import PrivateAccountIcon from "@/components/UI/PrivateAccountIcon";
import UserPageBlockUserConfirmationModal from "@/app/user/[username]/components/UserPageBlockUserConfirmationModal";
import UserPageFollowButtonComponent from "@/app/user/[username]/components/UserPageFollowButtonComponent";
import UserPageFollowOperationConfirmationModal from "@/app/user/[username]/components/UserPageFollowOperationConfirmationModal";
import UserPageInformationButton from "@/app/user/[username]/components/UserPageInformationButton";
import UserPageInformationModal from "@/app/user/[username]/components/UserPageInformationModal";
import UserPageNotFoundUserComponent from "@/app/user/[username]/components/UserPageNotFoundUserComponent";
import UserPageRemoveFollowerConfirmationModal from "@/app/user/[username]/components/UserPageRemoveFollowerConfirmationModal";
import UserPageSkeleton from "@/app/user/[username]/components/UserPageSkeleton";
import UserPageUnblockUserConfirmationModal from "@/app/user/[username]/components/UserPageUnblockUserConfirmationModal";
import UserPageUserDetailsModal from "@/app/user/[username]/components/UserPageUserDetailsModal";
import UserPageUserStatistics from "@/app/user/[username]/components/UserPageUserStatistics";
import UserProfilePrivateProfile from "@/components/UserProfilePrivateProfile";
import UserProfileTabs from "@/components/UserProfileTabs";
import UserPageRejectFollowerConfirmationModal from "@/components/UserRejectFollowerConfirmationModal";
import { addToast } from "@heroui/toast";
import {
  T_UserFetchedDTOConstructorParametersJSON,
  UserFetchedDTO,
} from "@/types/classes/User";
import {
  OK_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  SIGN_IN_URL,
  isAuthenticationRequestErrorCode,
} from "@/util/constants";
import {
  SOMETHING_WENT_WRONG_TOAST,
  getFormattedNameAndSurname,
} from "@/util/utils";
import axios from "axios";
import { getErrorComponent } from "@/util/reactUtil";

const Page: NextPage = () => {
  const [isInformationModelOpen, setIsInformationModelOpen] = useState(false);
  const [
    isFollowOperationConfirmationModelOpen,
    setIsFollowOperationConfirmationModelOpen,
  ] = useState(false);
  const [isRemoveFollowerConfirmOpen, setIsRemoveFollowerConfirmOpen] =
    useState(false);

  const [isRejectFollowerConfirmOpen, setIsRejectFollowerConfirmOpen] =
    useState(false);
  const [isBlockConfirmationOpen, setIsBlockConfirmationOpen] = useState(false);
  const [isUnblockConfirmationOpen, setIsUnblockConfirmationOpen] =
    useState(false);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);

  const { username: usernameParam } = useParams<UserPageParams>();

  const router = useRouter();

  const { user, isUserLoading } = useUser();

  const { data: userFetched = null, isLoading } = useQuery({
    queryKey: ["user-page", usernameParam],
    queryFn: async () => await fetchUserByUsername(usernameParam),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 60,
  });

  const queryClient = useQueryClient();

  const setUserFetched = (
    updater:
      | UserFetchedDTO
      | ((prev: UserFetchedDTO | null) => void | UserFetchedDTO | null)
  ) => {
    queryClient.setQueryData<UserFetchedDTO | null>(
      ["user-page", usernameParam],
      (prev) => {
        if (typeof updater === "function") {
          const result = updater(prev ?? null);
          return result === undefined ? prev : result;
        }
        return updater;
      }
    );
  };

  if (isLoading || isUserLoading) return <UserPageSkeleton />;

  if (!user) {
    const unauthorizedToast: Toast = {
      title: "Unauthorized access!",
      description: "You cannot inspect a user without being logged!",
      color: "warning",
    };

    addToast(unauthorizedToast);
    router.push(SIGN_IN_URL);

    return null;
  }

  if (userFetched === null || isAuthenticationRequestErrorCode(userFetched))
    return getErrorComponent({
      code: userFetched,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <UserPageNotFoundUserComponent username={usernameParam} />
        ),
      },
    });

  const isOwnProfile = user && user.getId() === userFetched.getId();

  const formattedName = getFormattedNameAndSurname(userFetched);

  const hasPermissionToSeeUserProfile =
    (!userFetched.getIsFrozen() ||
      (userFetched.getIsFrozen() &&
        userFetched.getFollowStatusUserInspecting() == "Accepted") ||
      isOwnProfile) &&
    !userFetched.getIsUserInspectedBlocked();

  const userFetchedPrivateFrom: Readonly<Date> | null =
    userFetched.getPrivateFrom();
  const userFetchedUsername: string = userFetched.getUsername();
  const userFetchedBiography: string | null = userFetched.getBiography();

  return (
    <Fragment>
      <main className="flex justify-center min-h-screen bg-white shadow-lg dark:bg-dark/50">
        <div className="w-full max-w-4xl p-6 bg-white shadow-lg dark:bg-dark rounded-md mt-6 mx-auto">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
              <Avatar
                className="h-32 w-32"
                size="lg"
                name={formattedName}
                src={userFetched.getImage() ?? ""}
              />
            </div>

            <div className="flex-grow flex flex-col gap-4 justify-items-center">
              {/* Üst Bilgi */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    {formattedName}
                    {userFetchedPrivateFrom && <PrivateAccountIcon />}
                    <GetUserRoleSymbolsComponent user={userFetched} />
                  </h2>
                  <p className="text-gray-500">@{userFetchedUsername}</p>
                </div>

                <div className="flex gap-2">
                  <UserPageFollowButtonComponent
                    isOwnProfile={isOwnProfile}
                    stateControlFunctionOfFollowOperationConfirmationModelOpen={
                      setIsFollowOperationConfirmationModelOpen
                    }
                    stateConfirmationModalOfUnblockModalOpen={
                      setIsUnblockConfirmationOpen
                    }
                    userFetched={userFetched}
                    stateControlFunctionOfUserToBeProcessedOn={setUserFetched}
                  />

                  {!isOwnProfile && (
                    <UserPageInformationButton
                      stateFunctionOfInformationModal={
                        setIsInformationModelOpen
                      }
                    />
                  )}
                </div>
              </div>

              {/* Alt Bilgi */}
              <UserPageUserStatistics statisticsOfUser={userFetched} />
              {userFetchedBiography && (
                <div className="text-gray-700 dark:text-gray-300">
                  {userFetchedBiography}
                </div>
              )}
            </div>
          </div>

          <span className="w-full flex justify-center mt-6">
            <Divider className="h-0.5 w-full" />
          </span>

          {hasPermissionToSeeUserProfile ? (
            <UserProfileTabs
              user={user}
              userInspected={userFetched}
              isOwnProfile={isOwnProfile}
            />
          ) : (
            <UserProfilePrivateProfile username={userFetchedUsername} />
          )}
        </div>
      </main>

      <UserPageFollowOperationConfirmationModal
        isModalOpen={isFollowOperationConfirmationModelOpen}
        setIsModalOpen={setIsFollowOperationConfirmationModelOpen}
        userToBeProcessedOn={userFetched}
        stateControlFunctionOfUserToBeProcessedOn={setUserFetched}
      />

      <UserPageInformationModal
        stateControlFunctionOfUserToBeInformedWith={setUserFetched}
        isModalOpen={isInformationModelOpen}
        setIsModalOpen={setIsInformationModelOpen}
        userToBeInformedWith={userFetched}
        user={user}
        stateControlFunctionOfUserDetailModal={setIsUserDetailsModalOpen}
        stateControlFunctionOfBlockUserConfirmationModal={
          setIsBlockConfirmationOpen
        }
        stateControlFunctionOfRejectFollowerConfirmationModal={
          setIsRejectFollowerConfirmOpen
        }
        stateControlFunctionOfRemoveFollowerConfirmationModal={
          setIsRemoveFollowerConfirmOpen
        }
        stateControlFunctionOfUnblockUserConfirmationModal={
          setIsUnblockConfirmationOpen
        }
      />

      <UserPageUserDetailsModal
        userToBeInformedWith={userFetched}
        setIsModalOpen={setIsUserDetailsModalOpen}
        isModalOpen={isUserDetailsModalOpen}
      />

      <UserPageRemoveFollowerConfirmationModal
        userToBeRemoved={userFetched}
        stateControlFunctionOfUserToBeRemoved={setUserFetched}
        isModalOpen={isRemoveFollowerConfirmOpen}
        setIsModalOpen={setIsRemoveFollowerConfirmOpen}
      />

      <UserPageRejectFollowerConfirmationModal
        isModalOpen={isRejectFollowerConfirmOpen}
        setIsModalOpen={setIsRejectFollowerConfirmOpen}
        userToBeRejected={userFetched}
        stateControlFunctionOfUserToBeRejected={setUserFetched}
      />

      <UserPageUnblockUserConfirmationModal
        isModalOpen={isUnblockConfirmationOpen}
        setIsModalOpen={setIsUnblockConfirmationOpen}
        stateControlFunctionOfInformationModal={setIsInformationModelOpen}
        userToBeUnblocked={userFetched}
        stateControlFunctionOfUserToBeUnblocked={setUserFetched}
      />

      <UserPageBlockUserConfirmationModal
        isModalOpen={isBlockConfirmationOpen}
        setIsModalOpen={setIsBlockConfirmationOpen}
        stateControlFunctionOfInformationModalOpen={setIsInformationModelOpen}
        userToBeBlocked={userFetched}
        stateControlFunctionOfSetUserToBeBlocked={setUserFetched}
      />
    </Fragment>
  );
};

export default Page;

const fetchUserByUsername = async (
  username: string
): Promise<UserFetchedDTO | T_AuthenticationRequestErrorCode> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_UserFetchedDTOConstructorParametersJSON>
    >(`/user/${username}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return UserFetchedDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    if (!axios.isAxiosError<ResponseMessage>(error)) {
      addToast(SOMETHING_WENT_WRONG_TOAST);
      console.error(error);
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }

    if (error.code === "ERR_NETWORK") {
      const networkErrorToast: Toast = {
        title: "Network Error!",
        description:
          "We couldn’t connect to the server. Please check your internet or try again later.",
        color: "warning",
      };
      addToast(networkErrorToast);
      console.error(error);
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }

    switch (error.status) {
      case NOT_FOUND_HTTP_RESPONSE_CODE:
        const notFoundToast: Toast = {
          title: "404 Not found!",
          description:
            "There is no user with that username. Or he/she might freeze or entirely delete his account.",
          color: "secondary",
        };
        console.error(error);
        addToast(notFoundToast);
        return NOT_FOUND_HTTP_RESPONSE_CODE;
      case TOO_MANY_REQUEST_HTTP_RESPONSE_CODE:
        const tooManyRequestToast: Toast = {
          title: "You are using our sources too much!",
          description: "Slow down and try again later.",
          color: "warning",
        };
        addToast(tooManyRequestToast);
        return TOO_MANY_REQUEST_HTTP_RESPONSE_CODE;

      default:
        console.error(error);
        const unexpectedError: Toast = {
          title: "Something went unexpectedly wrong?",
          description: "We don't even know what the issue is. Check console.",
          color: "warning",
        };
        addToast(unexpectedError);
        return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
    }
  }
};
