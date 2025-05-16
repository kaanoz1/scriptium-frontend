"use client";

import UIWrapper from "@/components/UI/UIWrapper";
import UserSavingComponent from "@/components/UserSavingComponent";
import { useUser } from "@/hooks/useUser";
import { SIGN_IN_URL } from "@/util/utils";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";

const Page: NextPage = () => {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) return <LoadingSpinnerFullH />;

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
