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
  GITHUB_SCRIPTIUM_PROJECT_URL,
  PATREON_SUPPORT_URL,
  TOOL_TIP_CLASS_NAMES,
  PROJECT_X_ADDRESS,
} from "@/util/constants";
import { Tooltip } from "@heroui/tooltip";

const Footer: FC = () => {
  return (
    <footer className="bg-white dark:bg-dark flex flex-col gap-1 w-full items-center relative z-10">
      <Divider className="w-4/5" />

      <section className="w-11/12 sm:w-5/6 md:w-4/5 px-2 sm:px-4 py-1 flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-3">
        <Link
          color="foreground"
          href="/about"
          className="flex flex-row py-2 gap-2 sm:gap-3 items-center justify-between"
          isExternal
        >
          <Logo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black dark:text-white dark:bg-dark" />
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {PROJECT_NAME}
          </p>
        </Link>

        <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <Link
            color="foreground"
            href={`mailto:${PROJECT_EMAIL_ADDRESS}`}
            aria-label="Email"
            isExternal
          >
            <AiOutlineMail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
          <Link
            color="foreground"
            href={PROJECT_INSTAGRAM_ADDRESS}
            aria-label="Instagram"
            isExternal
          >
            <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>

          <Link
            color="foreground"
            href={PROJECT_X_ADDRESS}
            aria-label="Twitter"
            isExternal
          >
            <RiTwitterXLine className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>

          <Link
            color="foreground"
            href={"/discord"}
            aria-label="Discord"
            isExternal
          >
            <FaDiscord className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
          <Link
            color="foreground"
            href={GITHUB_SCRIPTIUM_PROJECT_URL}
            aria-label="GitHub"
            isExternal
          >
            <VscGithubAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
          <Link
            color="foreground"
            href={PATREON_SUPPORT_URL}
            aria-label="Patreon"
            isExternal
          >
            <FaPatreon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>

          <Tooltip
            classNames={TOOL_TIP_CLASS_NAMES}
            showArrow
            content="Not active yet."
          >
            <span className="inline-flex opacity-50 cursor-not-allowed">
              <RiPaypalLine className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </span>
          </Tooltip>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
