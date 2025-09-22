import { Metadata, NextPage } from "next";
import Main from "./main";
import { PROJECT_NAME } from "@/util/constants";

export const metadata: Metadata = {
  title: `Books - ${PROJECT_NAME}`,
  description: `Literature books that ${PROJECT_NAME} has to present.`,
};

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
