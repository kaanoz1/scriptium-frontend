import Logo from "./Logo";
import { Link } from "@heroui/link";
import { AiOutlineMail } from "react-icons/ai";
import { RiPaypalLine, RiTwitterXLine } from "react-icons/ri";
import { FaDiscord, FaInstagram, FaPatreon } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { Divider } from "@heroui/divider";
import { FC } from "react";
import {
  PROJECT_NAME,
  PROJECT_EMAIL_ADDRESS,
  PROJECT_INSTAGRAM_ADDRESS,
  PROJECT_X_ADDRESS,
  DISCORD_BOT_ADD_URL,
  GITHUB_SCRIPTIUM_PROJECT_URL,
  PATREON_SUPPORT_URL,
  PAYPAL_SUPPORT_URL,
} from "@/util/constants";

const Footer: FC = () => {
  return (
    <footer className="bg-white dark:bg-dark flex flex-col gap-1 w-full items-center">
      <Divider className="w-4/5" />

      <section className="w-4/5 px-4 py-2 flex flex-row items-center justify-between ">
        <Link
          color="foreground"
          href="/about"
          className="flex flex-row py-2  gap-2 items-center justify-between"
        >
          <Logo className="text-xl font-extrabold tracking-wide" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {PROJECT_NAME}
          </p>
        </Link>
        <div className="flex flex-row gap-3">
          <Link color="foreground" href={`mailto:${PROJECT_EMAIL_ADDRESS}`}>
            <AiOutlineMail size={19} />
          </Link>
          <Link color="foreground" href={PROJECT_INSTAGRAM_ADDRESS}>
            <FaInstagram size={19} />
          </Link>
          <Link color="foreground" href={PROJECT_X_ADDRESS}>
            <RiTwitterXLine size={19} />
          </Link>
          <Link color="foreground" href={DISCORD_BOT_ADD_URL}>
            <FaDiscord size={19} />
          </Link>
          <Link color="foreground" href={GITHUB_SCRIPTIUM_PROJECT_URL}>
            <VscGithubAlt size={19} />
          </Link>
          <Link color="foreground" href={PATREON_SUPPORT_URL}>
            <FaPatreon size={19} />
          </Link>
          <Link color="foreground" href={PAYPAL_SUPPORT_URL}>
            <RiPaypalLine size={19} />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
