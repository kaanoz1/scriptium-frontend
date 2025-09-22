"use client";
import UserSettingsAccountPrivacy from "@/app/settings/components/UserSettingsAccountPrivacy";
import UserSettingsBlocked from "@/app/settings/components/UserSettingsBlocked";
import UserSettingsEditUser from "@/app/settings/components/UserSettingsEditUser";
import UserSettingsFollowerFollowings from "@/app/settings/components/UserSettingsFollowerFollowings";
import UserSettingsLikes from "@/app/settings/components/UserSettingsLikes";
import UserSettingsNote from "@/app/settings/components/UserSettingsNote";
import { Tab, Tabs } from "@heroui/tabs";
import { NextPage } from "next";
import { AiOutlineUser, AiOutlineLock, AiOutlineHeart } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineBan } from "react-icons/hi";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import UserSettingsConfig from "@/app/settings/components/UserSettingsConfig";
import { useRouter } from "next/navigation";
import UIWrapper from "@/components/UI/UIWrapper";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { ReactNode } from "react";
import { SIGN_UP_URL } from "@/util/constants";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  // const { user, isUserLoading } = useUser(); // This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
  const user = null;
  const isUserLoading: boolean = false;
  const setUser = (user: unknown) => {
    user;
    return void 0;
  };
  //Placeholders for user context.
  const router = useRouter();

  if (isUserLoading) return <LoadingSpinnerFullHeight />;

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
        >
          <Tab
            className="w-full flex justify-center"
            key="user"
            aria-label="userEditSettingTab"
            title={EDIT_USER_TAB_TITLE}
          >
            <UserSettingsEditUser user={user} setUser={setUser} />
          </Tab>
          {/* 
          <Tab
            className="w-full flex justify-center"
            key="notifications"
            aria-label="notificationSettings"
            title={NOTIFICATIONS_TAB_TITLE}
          >
            <div className="w-[80%]">
              <UserSettingsNotifications />
            </div>
          </Tab> */}

          <Tab
            className="w-full flex justify-center"
            key="privacy"
            aria-label="privacySettingsTab"
            title={ACCOUNT_PRIVACY_TAB_TITLE}
          >
            <UserSettingsAccountPrivacy user={user} setUser={setUser} />
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="config"
            title={USER_CONFIG_TAB_TITLE}
          >
            <UserSettingsConfig user={user} setUser={setUser} />
          </Tab>
          <Tab
            className="w-full flex justify-center"
            key="followers"
            aria-label="followerSettings"
            title={FOLLOWERS_AND_FOLLOWINGS_TAB_TITLE}
          >
            <UserSettingsFollowerFollowings user={user} />
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="blocked-users"
            aria-label="blockedUserSettings"
            title={BLOCKED_TAB_TITLE}
          >
            <UserSettingsBlocked />
          </Tab>

          <Tab
            className="w-full flex justify-center"
            key="likes"
            title={LIKES_TAB_TITLE}
          >
            <UserSettingsLikes user={user} />
          </Tab>
          {/* 
          <Tab
            className="w-full flex justify-center"
            key="reflections"
            aria-label="reflectionsSettings"
            title={COMMENTS_TAB_TITLE}
          >
            <UserSettingsComments user={user} />
          </Tab> */}

          <Tab
            className="w-full flex justify-center"
            key="notes"
            title={NOTES_TAB_TITLE}
          >
            <UserSettingsNote user={user} />
          </Tab>
        </Tabs>
      </UIWrapper>
    </div>
  );
};

export default Page;

const EDIT_USER_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <AiOutlineUser className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Edit Profile
    </span>
  </div>
);

const ACCOUNT_PRIVACY_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <AiOutlineLock className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Account Privacy
    </span>
  </div>
);

const USER_CONFIG_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <GrConfigure className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Account Configuration
    </span>
  </div>
);

const FOLLOWERS_AND_FOLLOWINGS_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <FiUserPlus className="text-xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Followers & Followings
    </span>
  </div>
);

const BLOCKED_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <HiOutlineBan className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Blocked
    </span>
  </div>
);

const LIKES_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <AiOutlineHeart className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Likes
    </span>
  </div>
);

// const COMMENTS_TAB_TITLE: ReactNode = (
//   <div className="flex items-center gap-2 justify-start">
//     <HiOutlineChat className="text-2xl text-neutral-600 dark:text-neutral-300" />
//     <span className="text-sm text-neutral-700 dark:text-neutral-200">
//       Reflections
//     </span>
//   </div>
// );

const NOTES_TAB_TITLE: ReactNode = (
  <div className="flex items-center gap-2 justify-start">
    <MdOutlineStickyNote2 className="text-2xl text-neutral-600 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-200">
      Notes
    </span>
  </div>
);

// const NOTIFICATIONS_TAB_TITLE: ReactNode = (
//   <div className="flex items-center gap-2 justify-start">
//     <AiOutlineBell className="text-2xl text-neutral-600 dark:text-neutral-300" />
//     <span className="text-sm text-neutral-700 dark:text-neutral-200">
//       Notifications
//     </span>
//   </div>
// );
