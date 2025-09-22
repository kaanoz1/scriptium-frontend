"use client";
import { NextPage } from "next";
import UIWrapper from "@/components/UI/UIWrapper";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useQuery } from "@tanstack/react-query";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { FaDiscord } from "react-icons/fa";
import { RiNextjsFill, RiPaypalLine } from "react-icons/ri";
import { FaPatreon } from "react-icons/fa6";
import { SiDotnet, SiKotlin } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { motion, Variants } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { TranslationWithScripture } from "@/types/classes/model/Translation/TranslationWithScripture";
import { T_ScriptureCode } from "@/types/types";
import { getErrorComponent } from "@/util/reactUtil";
import {
  isNoAuthenticationRequestErrorCode,
  PROJECT_NAME,
  PROJECT_EMAIL_ADDRESS,
  PATREON_SUPPORT_URL,
  PAYPAL_SUPPORT_URL,
  GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL,
  GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL,
  GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL,
  GITHUB_SCRIPTIUM_PROJECT_URL,
} from "@/util/constants";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import AboutPageTranslatorExplanation from "./components/AboutPageTranslatorExplanation";
import { USED_TECHNOLOGIES } from "./components/USED_TECHNOLOGIES";
import TechnologyCard from "./components/TechnologyCard";
import fetchTranslators from "./utils/fetchTranslators";

interface Props {}

const Main: NextPage<Props> = () => {
  const { data = [], isLoading } = useQuery<
    Array<TranslationWithScripture> | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["about-translations"],
    queryFn: fetchTranslators,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (data == null || isNoAuthenticationRequestErrorCode(data))
    return getErrorComponent({ code: data, preferredErrorComponent: {} });

  const torahCode: T_ScriptureCode = "t";

  return (
    <UIWrapper>
      <motion.div
        className="w-full flex flex-col gap-6 dark:bg-black"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 sm:py-12 mb-6 sm:mb-8 shadow-md dark:bg-black"
          variants={itemVariants}
        >
          <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              About {PROJECT_NAME}
            </motion.h1>
          </div>
        </motion.section>

        <motion.section
          className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8"
          variants={itemVariants}
        >
          <motion.section
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
              What is {PROJECT_NAME}?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {PROJECT_NAME} is a non-profit project dedicated to making
              religious and theological texts from around the world more
              accessible for study and spiritual exploration. Its mission is to
              simplify theological research and foster a deeper understanding of
              sacred writings across traditions. To that end, {PROJECT_NAME}{" "}
              strives to include as many religious and theological texts as
              possible. While user accounts and interaction features are not yet
              available, {PROJECT_NAME} is being developed to support community
              engagement—allowing users to connect with one another and
              collaborate on theological inquiries in the future. All content
              provided on {PROJECT_NAME} is sourced from reputable and respected
              references within each respective religious community, and these
              sources will be detailed further below. In addition to its
              research-oriented purpose, {PROJECT_NAME} also serves users who
              engage in daily devotional reading, making the platform suitable
              for both scholarly and personal use.
            </p>
          </motion.section>

          <motion.div variants={itemVariants}>
            <Divider className="my-2 dark:border-gray-700" />
          </motion.div>

          <motion.section
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm cursor-pointer border border-yellow-300 dark:bg-black dark:border-yellow-600"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-yellow-700 dark:text-yellow-400">
              We are in Beta!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {PROJECT_NAME} is currently in its{" "}
              <span className="font-medium">beta version</span>. This means that
              some parts of the content may contain inconsistencies or errors.
              We sincerely apologize for any inconvenience this may cause and
              kindly ask for your understanding. We are fully open to
              corrections, feedback, and collaboration — please do not hesitate
              to{" "}
              <Link
                href={`mailto:${PROJECT_EMAIL_ADDRESS}`}
                className="text-indigo-700 dark:text-indigo-400 underline"
              >
                contact us
              </Link>{" "}
              if you notice any inaccuracies.
              <br />
              Moreover, we warmly welcome contributions in the form of
              translations, additional book content, and community-driven
              improvements. Together, we can expand {PROJECT_NAME} into a
              reliable and rich resource for everyone.
              <br />
              <span className="italic text-sm text-gray-600 dark:text-gray-400">
                (Thank you for joining us on this journey — every suggestion and
                contribution helps shape the future of the project.)
              </span>
            </p>
          </motion.section>

          <motion.div variants={itemVariants}>
            <Divider className="my-2 dark:border-gray-700" />
          </motion.div>

          <motion.section
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
              Where does {PROJECT_NAME} get its sources?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-medium">For Judaism:</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4 mb-4">
              <li>
                <span className="font-medium">
                  All information related to Judaism is sourced from the
                  following organizations:{" "}
                </span>
                <Link
                  href="https://www.sefaria.org/"
                  isExternal
                  showAnchorIcon
                  className="text-indigo-700 dark:text-indigo-400 underline"
                >
                  Sefaria
                </Link>{" "}
                and{" "}
                <Link
                  href="https://openscriptures.org/"
                  isExternal
                  showAnchorIcon
                  className="text-indigo-700 dark:text-indigo-400 underline"
                >
                  Open Scriptures
                </Link>
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-100 mb-2">
              The following are the supported Torah translations available on
              this platform:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4">
              {data
                .filter((t) => t.getScripture().getCode() === torahCode)
                .map((t, i) => (
                  <AboutPageTranslatorExplanation key={i} translation={t} />
                ))}
            </div>
          </motion.section>
        </motion.section>

        <motion.section
          className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          variants={itemVariants}
        >
          <motion.main
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm cursor-pointer mb-6 sm:mb-8 dark:bg-black dark:border dark:border-gray-700"
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Contact Us
            </h4>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed flex flex-col gap-2 dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              <span className="flex items-center gap-2 break-words">
                <MdOutlineEmail size={19} />
                <strong>Email:</strong> {PROJECT_EMAIL_ADDRESS}
              </span>
            </p>
          </motion.main>
        </motion.section>

        <motion.section
          className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 w-full flex flex-col gap-6"
          variants={itemVariants}
        >
          <motion.main
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
              Support {PROJECT_NAME}!
            </header>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              {PROJECT_NAME} does not impose any fees on its users. Furthermore,
              the operational costs, including server maintenance and
              infrastructure, are entirely covered by the community. Any
              financial contributions made are exclusively allocated to
              sustaining the project’s technical requirements. Your support
              ensures the continuity and performance of {PROJECT_NAME}.
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
                <Link href={PATREON_SUPPORT_URL} isExternal showAnchorIcon>
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 underline">
                    <motion.div className="inline-block">
                      <FaPatreon size={28} />
                    </motion.div>
                    Patreon
                  </div>
                </Link>
                <Link
                  href={PAYPAL_SUPPORT_URL ?? "#"}
                  isExternal
                  showAnchorIcon
                >
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 underline">
                    <motion.div className="inline-block">
                      <RiPaypalLine size={28} />
                    </motion.div>
                    PayPal
                  </div>
                </Link>
              </div>
            </p>
          </motion.main>

          <motion.main
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
              {PROJECT_NAME} is an Open Source Project!
            </header>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed overflow-auto dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              {PROJECT_NAME} is open source and relies on user contributions.
              Here are the details of the {PROJECT_NAME} Project:
              <div className="mt-2 flex flex-col gap-4 pl-4">
                <div className="flex items-center gap-3">
                  <motion.div className="inline-block">
                    <RiNextjsFill size={30} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL}
                    className="text-indigo-700 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Frontend (NextJS, TypeScript)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div className="inline-block">
                    <SiDotnet size={32} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL}
                    className="text-indigo-700 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Backend (.NET, EF Core, C#)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div className="inline-block">
                    <SiKotlin size={25} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL}
                    className="text-indigo-700 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Mobile (Kotlin, Java) [Not available yet.]
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div className="inline-block">
                    <FaNodeJs size={28} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL}
                    className="text-indigo-700 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Discord Bot (Node, TypeScript)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div className="inline-block">
                    <VscGithubAlt size={28} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_PROJECT_URL}
                    className="text-indigo-700 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Whole Project
                  </Link>
                </div>
              </div>
            </p>
          </motion.main>

          <motion.main
            variants={itemVariants}
            className="bg-white p-5 sm:p-6 rounded-md shadow-sm dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white flex flex-wrap items-center gap-2">
              <motion.div className="inline-block">
                <FaDiscord size={28} />
              </motion.div>
              <Link
                href={"/discord"}
                isExternal
                showAnchorIcon
                className="text-indigo-700 dark:text-indigo-400 underline flex items-center gap-1"
              >
                Add {PROJECT_NAME}Bot to your Discord Server!
              </Link>
            </header>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              With this bot, you can view scripture texts and translations
              directly in Discord. We continually improve the bot (and the whole
              project) based on community requests.
            </p>
          </motion.main>
          <motion.main
            variants={technologyContainer}
            initial="hidden"
            animate="visible"
            className="
        rounded-2xl border bg-white dark:bg-black
        border-neutral-200/70 dark:border-neutral-800
        shadow-sm backdrop-blur-sm
        p-5 sm:p-6
      "
          >
            <header className="mb-2 sm:mb-3">
              <h2
                className="
            text-xl sm:text-2xl font-semibold tracking-tight
            text-neutral-900 dark:text-neutral-100
          "
              >
                <span
                  className="
              bg-gradient-to-r from-neutral-900 to-neutral-600
              dark:from-neutral-100 dark:to-neutral-400
              bg-clip-text text-transparent
            "
                >
                  Technologies Used
                </span>
              </h2>

              <p
                className="
            mt-1 text-sm sm:text-base leading-relaxed
            text-neutral-700 dark:text-neutral-300
          "
              >
                Explore the stack below—each card links to the technology’s
                official website.
              </p>
            </header>

            <motion.div
              variants={technologyContainer}
              className="
          mt-4 sm:mt-5
          grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6
          gap-3 sm:gap-4 place-items-center dark:bg-black
        "
            >
              {USED_TECHNOLOGIES.map((tech, idx) => (
                <motion.div key={idx} variants={techItem} className="w-full">
                  <TechnologyCard technology={tech} />
                </motion.div>
              ))}
            </motion.div>
          </motion.main>
        </motion.section>
      </motion.div>
    </UIWrapper>
  );
};

export default Main;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const technologyContainer: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      delayChildren: 0.19,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const techItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};
