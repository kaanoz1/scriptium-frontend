import { NextPage } from "next";
import { Tab, Tabs } from "@heroui/tabs";
import { MdOutlineStickyNote2 } from "react-icons/md";

import UserSettingsLikeTabNoteTab from "./UserSettingsLikeTabNoteTab";
import { ReactNode } from "react";
import { UserOwn } from "@/types/classes/model/User/User";

interface Props {
  user: UserOwn;
}

const UserSettingsLikes: NextPage<Props> = ({ user }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Liked Reflection & Notes</h3>
      <div className="w-full border p-4 rounded-md flex flex-col gap-2">
        <Tabs
          aria-label="Likes"
          color="primary"
          variant="bordered"
          classNames={{ base: "flex", tabList: "w-full" }}
        >
          <Tab aria-label="Liked Notes" key="notes" title={<NotesTabTitle />}>
            <UserSettingsLikeTabNoteTab user={user} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettingsLikes;

const NotesTabTitle = (): ReactNode => {
  return (
    <div className="flex items-center space-x-2">
      <MdOutlineStickyNote2 className="text-2xl text-neutral-600 dark:text-neutral-300" />
      <span>Notes</span>
    </div>
  );
};
