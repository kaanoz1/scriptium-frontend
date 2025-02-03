import { Tab, Tabs } from "@heroui/tabs";
import { NextPage } from "next";
import { FaHourglass, FaUserCheck, FaUserPlus } from "react-icons/fa";
import FollowerTable from "./FollowerTable";
import FollowingTable from "./FollowingTable";
import SentRequestTable from "./SentRequestTable";
import ReceivedRequestTable from "./ReceivedRequestTable";
import { User } from "@/types/types";

interface Props {
  user: User;
}

const UserSettingsFollowerFollowings: NextPage<Props> = ({ user }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Followers & Followings</h3>
      <div className="w-full border p-4 rounded-md flex flex-col gap-2">
        <Tabs
          aria-label="followTab"
          color="primary"
          variant="bordered"
          classNames={{ base: "flex", tabList: "w-full" }}
        >
          <Tab
            key="followers"
            title={
              <div className="flex items-center space-x-2">
                <FaUserCheck />
                <span>Followers</span>
              </div>
            }
          >
            <FollowerTable />
          </Tab>
          <Tab
            key="followings"
            title={
              <div className="flex items-center space-x-2">
                <FaUserPlus />
                <span>Followings</span>
              </div>
            }
          >
            <FollowingTable />
          </Tab>
          <Tab
            key="sendedPending"
            title={
              <div className="flex items-center space-x-2">
                <FaHourglass />
                <span>Sended Requests</span>
              </div>
            }
          >
            <SentRequestTable />
          </Tab>
          {user?.privateFrom ? (
            <Tab
              key="receivedPending"
              title={
                <div className="flex items-center space-x-2">
                  <FaHourglass />
                  <span>Received Requests</span>
                </div>
              }
            >
              <ReceivedRequestTable />
            </Tab>
          ) : undefined}
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettingsFollowerFollowings;
