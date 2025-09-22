import { NextPage } from "next";
import { FaLock } from "react-icons/fa";

interface Props {
  username: string;
}

const UserProfilePrivateProfile: NextPage<Props> = ({ username }) => {
  return (
    <div className="pt-12 flex flex-col items-center text-center space-y-2">
      <FaLock className="text-5xl text-gray-400 dark:text-neutral-200" />
      <p className="text-gray-600 text-sm dark:text-neutral-200">
        This account is private. Only owner and followers can see @{username}
        &apos;s actions.
      </p>
    </div>
  );
};

export default UserProfilePrivateProfile;
