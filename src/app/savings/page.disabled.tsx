"use client";

import UIWrapper from "@/components/UI/UIWrapper";
import UserSavingComponent from "@/app/user/[username]/components/UserSavingComponent";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { SIGN_IN_URL } from "@/util/constants";

const Page: NextPage = () => {
  // const { user, isLoadingUser } = useUser(); // This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
  const user = null;
  const isUserLoading: boolean = false;
  //Placeholders for user context.

  const router = useRouter();

  if (isUserLoading) return <LoadingSpinnerFullHeight />;

  if (!user) {
    router.push(SIGN_IN_URL);
    return null;
  }

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <UIWrapper>
          <UserSavingComponent user={user} />
        </UIWrapper>
      </motion.div>
    </div>
  );
};

export default Page;
