import { Tab, Tabs } from "@heroui/tabs";
import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import UserProfileSavingTab from "./UserSavingComponent";
import UserPageReflectionsTab from "../app/user/[username]/components/UserPageReflectionsTab";
import UserPageNotesTab from "../app/user/[username]/components/UserPageNotesTab";
import { FC, ReactNode } from "react";
import { UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";

interface Props {
  isOwnProfile: boolean;
  userInspected: UserFetchedDTO;
  user: UserOwnDTO;
}

const UserProfileTabs: FC<Props> = ({ isOwnProfile, user, userInspected }) => {
  return (
    <div className="mt-6 w-full">
      <Tabs
        aria-label="User Content"
        variant="underlined"
        color="primary"
        classNames={{ base: "flex", tabList: "w-full" }}
      >
        <Tab key="reflections" title={REFLECTIONS_TAB_TITLE}>
          <UserPageReflectionsTab user={user} userInspected={userInspected} />
        </Tab>
        <Tab key="notes" title={NOTES_TITLE_TAB}>
          <UserPageNotesTab user={user} notesOfUser={userInspected} />
        </Tab>
        {isOwnProfile && (
          <Tab key="savings" title={SAVINGS_TAB_TITLE}>
            <UserProfileSavingTab user={user} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfileTabs;

const REFLECTIONS_TAB_TITLE: ReactNode = (
  <div className="flex items-center space-x-2">
    <FaRegLightbulb />
    <span>Reflections</span>
  </div>
);

const NOTES_TITLE_TAB: ReactNode = (
  <div className="flex items-center space-x-2">
    <FaRegStickyNote />
    <span>Notes</span>
  </div>
);

const SAVINGS_TAB_TITLE: ReactNode = (
  <div className="flex gap-2 items-center space-x-2">
    <GoBookmark size={19} />
    <span>Savings</span>
  </div>
);
