"use client";
import { NextPage } from "next";
import { useState, Fragment, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  arrangeImageAndReturns,
  getFormattedNameAndSurname,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  SIGN_IN_URL,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { Divider } from "@heroui/divider";
import { Avatar } from "@heroui/avatar";
import { AuthenticationRequestErrorCode, Response } from "@/types/response";
import { useUser } from "@/hooks/useUser";
import { ImageObject, UserFetched, UserPageParams } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
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

const Page: NextPage = () => {
  const [userFetched, setUserFetched] = useState<UserFetched | null>(null);

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

  const { user, isLoading: isUserLoading } = useUser();
  const fetchUserByUsername = async (
    username: string
  ): Promise<UserFetched | null> => {
    try {
      const response = await axiosCredentialInstance.get<Response<UserFetched>>(
        `/user/${username}`
      );
      switch (response.status) {
        case OK_RESPONSE_CODE:
          const userReceived = arrangeImageAndReturns(
            response.data.data as ImageObject
          ) as UserFetched;

          setError(undefined);

          setUserFetched(userReceived);
        case NOT_FOUND_RESPONSE_CODE:
          setError(NOT_FOUND_RESPONSE_CODE);
          return null;
        case TOO_MANY_REQUEST_RESPONSE_CODE:
          setError(TOO_MANY_REQUEST_RESPONSE_CODE);
          return null;
        default:
          setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
          return null;
      }
    } catch (error) {
      //TODO: Add toast.
      console.error(error);
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return null;
    }
  };

  const { data: queriedUser = null, isLoading } = useQuery({
    queryKey: ["user-page", usernameParam],
    queryFn: async () => await fetchUserByUsername(usernameParam),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 60,
  });

  useEffect(() => {
    if (queriedUser != null) setUserFetched(queriedUser);
  }, [queriedUser]);

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

  const isOwnProfile = user && user.id === userFetched.id;

  const formattedName = getFormattedNameAndSurname(userFetched);

  const hasPermissionToSeeUserProfile =
    (!userFetched.privateFrom ||
      (userFetched.privateFrom &&
        userFetched.followStatusUserInspecting == "Accepted") ||
      isOwnProfile) &&
    !userFetched.isUserInspectedBlocked;

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
                src={userFetched.image ?? undefined}
              />
            </header>
            <div className="flex-grow">
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold flex items-center">
                    {formattedName}
                    {userFetched.privateFrom && <PrivateAccountIcon />}
                    <GetUserRoleSymbolsComponent rolesOfUser={userFetched} />
                  </h2>
                  <p className="text-gray-500">@{userFetched.username}</p>
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
              {userFetched.biography && (
                <div className="mt-4 text-gray-700 dark:text-gray-300">
                  {userFetched.biography}
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
            <UserProfilePrivateProfile username={userFetched.username} />
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
