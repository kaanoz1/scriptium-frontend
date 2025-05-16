import { Tab, Tabs } from "@heroui/tabs";
import { FaRegLightbulb, FaRegStickyNote } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import UserProfileSavingTab from "./UserSavingComponent";
import UserPageReflectionsTab from "./UserPageReflectionsTab";
import UserPageNotesTab from "./UserPageNotesTab";
import { FC } from "react";
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
        <Tab
          key="reflections"
          title={
            <div className="flex items-center space-x-2">
              <FaRegLightbulb />
              <span>Reflections</span>
            </div>
          }
        >
          <UserPageReflectionsTab user={user} commentsOfUser={userInspected} />
        </Tab>
        <Tab
          key="notes"
          title={
            <div className="flex items-center space-x-2">
              <FaRegStickyNote />
              <span>Notes</span>
            </div>
          }
        >
          <UserPageNotesTab user={user} notesOfUser={userInspected} />
        </Tab>
        {isOwnProfile ? (
          <Tab
            key="savings"
            title={
              <div className="flex gap-2 items-center space-x-2">
                <GoBookmark size={19} />
                <span>Savings</span>
              </div>
            }
          >
            <UserProfileSavingTab user={user} />
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};

export default UserProfileTabs;
