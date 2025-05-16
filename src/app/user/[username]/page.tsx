"use client";
import { NextPage } from "next";
import { useState, Fragment, Dispatch, SetStateAction } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getFormattedNameAndSurname,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  SIGN_IN_URL,
  SOMETHING_WENT_WRONG_TOAST,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { Divider } from "@heroui/divider";
import { Avatar } from "@heroui/avatar";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { useUser } from "@/hooks/useUser";
import { UserPageParams } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TooManyRequest from "@/components/UI/TooManyRequest";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import GetUserRoleSymbolsComponent from "@/components/GetUserRoleSymbolsComponent";
import PrivateAccountIcon from "@/components/UI/PrivateAccountIcon";
import UserPageBlockUserConfirmationModal from "@/components/UserPageBlockUserConfirmationModal";
import UserPageFollowButtonComponent from "@/components/UserPageFollowButtonComponent";
import UserPageFollowOperationConfirmationModal from "@/components/UserPageFollowOperationConfirmationModal";
import UserPageInformationButton from "@/components/UserPageInformationButton";
import UserPageInformationModal from "@/components/UserPageInformationModal";
import UserPageNotFoundUserComponent from "@/components/UserPageNotFoundUserComponent";
import UserPageRemoveFollowerConfirmationModal from "@/components/UserPageRemoveFollowerConfirmationModal";
import UserPageSkeleton from "@/components/UserPageSkeleton";
import UserPageUnblockUserConfirmationModal from "@/components/UserPageUnblockUserConfirmationModal";
import UserPageUserDetailsModal from "@/components/UserPageUserDetailsModal";
import UserPageUserStatistics from "@/components/UserPageUserStatistics";
import UserProfilePrivateProfile from "@/components/UserProfilePrivateProfile";
import UserProfileTabs from "@/components/UserProfileTabs";
import UserPageRejectFollowerConfirmationModal from "@/components/UserRejectFollowerConfirmationModal";
import ServerError from "@/components/UI/ServerError";
import { addToast } from "@heroui/toast";
import { UserFetchedDTO } from "@/types/classes/User";

const fetchUserByUsername = async (
  username: string,
  setStateActionFunctionForError: Dispatch<
    SetStateAction<AuthenticationRequestErrorCode | undefined>
  >
): Promise<UserFetchedDTO | null> => {
  try {
    const response = await axiosCredentialInstance.get<
      Response<UserFetchedDTO>
    >(`/user/${username}`);
    switch (response.status) {
      case OK_RESPONSE_CODE:
        setStateActionFunctionForError(undefined);

        return response.data.data;
      case NOT_FOUND_RESPONSE_CODE:
        setStateActionFunctionForError(NOT_FOUND_RESPONSE_CODE);
        return null;
      case TOO_MANY_REQUEST_RESPONSE_CODE:
        setStateActionFunctionForError(TOO_MANY_REQUEST_RESPONSE_CODE);
        return null;
      default:
        setStateActionFunctionForError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return null;
    }
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);
    setStateActionFunctionForError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
    return null;
  }
};

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

  const [error, setError] = useState<
    AuthenticationRequestErrorCode | undefined
  >(undefined);

  const { username: usernameParam } = useParams<UserPageParams>();

  const router = useRouter();

  const { user, isUserLoading } = useUser();

  const { data: userFetched = null, isLoading } = useQuery({
    queryKey: ["user-page", usernameParam],
    queryFn: async () => await fetchUserByUsername(usernameParam, setError),
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
    router.push(SIGN_IN_URL);
    return null;
  }

  if ((error && error == NOT_FOUND_RESPONSE_CODE) || userFetched == null)
    return <UserPageNotFoundUserComponent username={usernameParam} />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

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
          <div className="flex flex-col items-center pl-8">
            <header className="flex-shrink-0 mb-4">
              <Avatar
                className="h-32 w-32"
                size="lg"
                name={formattedName}
                src={userFetched.getImage()}
              />
            </header>
            <div className="flex-grow">
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold flex items-center">
                    {formattedName}
                    {userFetchedPrivateFrom && <PrivateAccountIcon />}
                    <GetUserRoleSymbolsComponent rolesOfUser={userFetched} />
                  </h2>
                  <p className="text-gray-500">@{userFetchedUsername}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
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

                  {isOwnProfile || (
                    <UserPageInformationButton
                      stateFunctionOfInformationModal={
                        setIsInformationModelOpen
                      }
                    />
                  )}
                </div>
              </div>
              <UserPageUserStatistics statisticsOfUser={userFetched} />
              {userFetchedBiography && (
                <div className="mt-4 text-gray-700 dark:text-gray-300">
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
