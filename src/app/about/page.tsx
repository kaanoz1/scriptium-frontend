import { Metadata, NextPage } from "next";
import Main from "./main";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/util/constants";

export const metadata: Metadata = {
  title: `About - ${PROJECT_NAME}`,
  description: PROJECT_DESCRIPTION,
};

const Page: NextPage = () => {
  return <Main />;
};
export default Page;
