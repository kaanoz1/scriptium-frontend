import { UserFetched } from "@/types/types";
import { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  statisticsOfUser: UserFetched;
}

const UserPageUserStatistics: NextPage<Props> = ({ statisticsOfUser }) => {
  return (
    <Fragment>
      <div className="flex mt-4 space-x-6">
        {statisticsOfUser.reflectionCount && (
          <span>
            <span className="font-semibold">
              {statisticsOfUser.reflectionCount}
            </span>{" "}
            Reflections
          </span>
        )}
        {statisticsOfUser.noteCount && (
          <span>
            <span className="font-semibold">{statisticsOfUser.noteCount}</span>{" "}
            Notes
          </span>
        )}
        <span>
          <span className="font-semibold">
            {statisticsOfUser.followerCount}
          </span>{" "}
          Followers
        </span>
        <span>
          <span className="font-semibold">
            {statisticsOfUser.followingCount}
          </span>{" "}
          Following
        </span>
      </div>
    </Fragment>
  );
};

export default UserPageUserStatistics;
