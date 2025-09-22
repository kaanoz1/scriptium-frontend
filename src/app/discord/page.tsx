import { Metadata, NextPage } from "next";
import Main from "./main";
import { PROJECT_NAME } from "@/util/constants";

export const metadata: Metadata = {
  title: `Discord - ${PROJECT_NAME}`,
  description: "Discord bot of Scriptium",
  keywords: [
    PROJECT_NAME,
    "discord",
    "bot",
    PROJECT_NAME.toLowerCase(),
    PROJECT_NAME.toUpperCase(),
  ],
};

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
