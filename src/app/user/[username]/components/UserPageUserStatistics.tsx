import { UserFetchedDTO } from "@/types/classes/User";
import { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  statisticsOfUser: UserFetchedDTO;
}

const UserPageUserStatistics: NextPage<Props> = ({ statisticsOfUser }) => {
  const reflectionCountOfUser = statisticsOfUser.getReflectionCount();
  const noteCountOfUser = statisticsOfUser.getNoteCount();
  const followerCountOfUser = statisticsOfUser.getFollowerCount();
  const followedCountOfUser = statisticsOfUser.getFollowedCount();
  return (
    <Fragment>
      <div className="flex mt-4 space-x-6">
        {reflectionCountOfUser && (
          <span>
            <span className="font-semibold">{reflectionCountOfUser}</span>{" "}
            Reflections
          </span>
        )}
        {noteCountOfUser && (
          <span>
            <span className="font-semibold">{noteCountOfUser}</span> Notes
          </span>
        )}
        <span>
          <span className="font-semibold">{followerCountOfUser}</span> Followers
        </span>
        <span>
          <span className="font-semibold">{followedCountOfUser}</span> Following
        </span>
      </div>
    </Fragment>
  );
};

export default UserPageUserStatistics;
