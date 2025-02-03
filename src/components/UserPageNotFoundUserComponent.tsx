import { motion } from "framer-motion";
import { NextPage } from "next";
import { Fragment } from "react";
import { FiUserX } from "react-icons/fi";

interface Props {
  username: string;
}

const UserPageNotFoundUserComponent: NextPage<Props> = ({ username }) => {
  return (
    <Fragment>
      <div className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
        <div className="text-center">
          <motion.div
            className="mb-4 flex justify-center"
            animate={{ x: [0, -5, 5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              repeatDelay: 2.4,
            }}
          >
            <FiUserX size={96} className="text-red-500 dark:text-white" />
          </motion.div>
          <div className="text-lg text-gray-700 dark:text-white">
            <em className="font-bold text-red-500">404.</em> There is no user
            with username:{" "}
            <em className="font-bold dark:text-white">{username}.</em>
            <div>
              If so, this user might freeze his/her account or entirely deleted
              it. Or might be banned for unwanted attitude.
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserPageNotFoundUserComponent;
