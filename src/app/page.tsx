import Main from "./main";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/util/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};

export default function Home() {
  return <Main />;
}
