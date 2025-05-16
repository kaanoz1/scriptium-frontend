"use client";
import UserSettingsAccountPrivacy from "@/components/UserSettingsAccountPrivacy";
import UserSettingsBlocked from "@/components/UserSettingsBlocked";
import UserSettingsComments from "@/components/UserSettingsComments";
import UserSettingsEditUser from "@/components/UserSettingsEditUser";
import UserSettingsFollowerFollowings from "@/components/UserSettingsFollowerFollowings";
import UserSettingsLikes from "@/components/UserSettingsLikes";
import UserSettingsNote from "@/components/UserSettingsNote";
import { useUser } from "@/hooks/useUser";
import { Tab, Tabs } from "@heroui/tabs";
import { NextPage } from "next";
import { AiOutlineUser, AiOutlineLock, AiOutlineHeart } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineBan, HiOutlineChat } from "react-icons/hi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import UserSettingsConfig from "@/components/UserSettingsConfig";
import { useRouter } from "next/navigation";
import { SIGN_UP_URL } from "@/util/utils";
import UIWrapper from "@/components/UI/UIWrapper";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
interface Props {}

const Page: NextPage<Props> = ({}) => {
  const { user, isUserLoading, setUser, fetchUser } = useUser();
  const router = useRouter();

  if (isUserLoading) return <LoadingSpinnerFullH />;

  if (!user) {
    router.push(SIGN_UP_URL);
    return <></>;
  }

  return (
    <div>
      <UIWrapper>
        <Tabs
          classNames={{
            tab: "text-left",
          }}
          size="lg"
          aria-label="settings"
          isVertical={true}
          className="space-y-4"
        >
          <Tab
            className="w-full flex justify-center"
            key="user"
            aria-label="userEditSettingTab"
            title={
              <div className="flex items-center gap-2 justify-start">
                <AiOutlineUser className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Edit Profile
                </span>
              </div>
            }
          >
            <div className="w-[90%]">
              <UserSettingsEditUser
                user={user}
                fetchUser={fetchUser}
                setUser={setUser}
              />
            </div>
          </Tab>

          {/* <Tab
                  className="w-full flex justify-center"
                  key="notifications"
                  aria-label="notificationSettings"
                  title={
                    <div className="flex items-center gap-2 justify-start">
                      <AiOutlineBell className="text-2xl text-neutral-600 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-200">
                        Notifications
                      </span>
                    </div>
                  }
                >
                  <div className="w-[80%]">
                    <UserSettingsNotifications />
                  </div>
                </Tab> TODO:Will be implemented */}

          <Tab
            className="w-full flex justify-center"
            key="privacy"
            aria-label="privacySettingsTab"
            title={
              <div className="flex items-center gap-2 justify-start">
                <AiOutlineLock className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Account Privacy
                </span>
              </div>
            }
          >
            <div className="w-[80%]">
              <UserSettingsAccountPrivacy user={user} setUser={setUser} />
            </div>
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="config"
            title={
              <div className="flex items-center gap-2 justify-start">
                <GrConfigure className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Account Configuration
                </span>
              </div>
            }
          >
            <UserSettingsConfig user={user} setUser={setUser} />
          </Tab>
          <Tab
            className="w-full flex justify-center"
            key="followers"
            aria-label="followerSettings"
            title={
              <div className="flex items-center gap-2 justify-start">
                <FiUserPlus className="text-xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Followers & Followings
                </span>
              </div>
            }
          >
            <div className="w-[90%]">
              <UserSettingsFollowerFollowings user={user} />
            </div>
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="blocked-users"
            aria-label="blockedUserSettings"
            title={
              <div className="flex items-center gap-2 justify-start">
                <HiOutlineBan className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Blocked
                </span>
              </div>
            }
          >
            <div className="w-[90%]">
              <UserSettingsBlocked />
            </div>
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="likes"
            title={
              <div className="flex items-center gap-2 justify-start">
                <AiOutlineHeart className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Likes
                </span>
              </div>
            }
          >
            <div className="w-[90%]">
              <UserSettingsLikes user={user} />
            </div>
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="reflections"
            aria-label="reflectionsSettings"
            title={
              <div className="flex items-center gap-2 justify-start">
                <HiOutlineChat className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Reflections
                </span>
              </div>
            }
          >
            <div className="w-[90%]">
              <UserSettingsComments user={user} />
            </div>
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="notes"
            title={
              <div className="flex items-center gap-2 justify-start">
                <MdOutlineStickyNote2 className="text-2xl text-neutral-600 dark:text-neutral-300" />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                  Notes
                </span>
              </div>
            }
          >
            <UserSettingsNote user={user} />
          </Tab>
        </Tabs>
      </UIWrapper>
    </div>
  );
};

export default Page;
