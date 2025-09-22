import type { Metadata, NextPage } from "next";
import Main from "./page";
import { PROJECT_NAME } from "@/util/constants";

export const metadata: Metadata = {
  title: `Statistics - ${PROJECT_NAME}`,
  description: `Anonymous statistics of ${PROJECT_NAME}`,
  keywords: [
    PROJECT_NAME,
    PROJECT_NAME.toLowerCase(),
    PROJECT_NAME.toUpperCase(),
    "statistics",
    "statistics".toLowerCase(),
    "statistics".toUpperCase(),
  ],
};

const Page: NextPage = () => {
  return <Main />;
};
export default Page;
