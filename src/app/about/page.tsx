"use client";
import { NextPage } from "next";
import UIWrapper from "@/components/UI/UIWrapper";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import {
  AvailableScriptureKey,
  InformationalTranslatorsDTO,
} from "@/types/types";
import {
  TOO_MANY_REQUEST_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  PROJECT_EMAIL_ADDRESS,
  DISCORD_BOT_ADD_URL,
  PATREON_SUPPORT_URL,
  PAYPAL_SUPPORT_URL,
  GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL,
  GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL,
  GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL,
  GITHUB_SCRIPTIUM_PROJECT_URL,
  PROJECT_INSTAGRAM_ADDRESS,
  PROJECT_X_ADDRESS,
  PROJECT_NAME,
  NOT_FOUND_RESPONSE_CODE,
} from "@/util/utils";
import { useState } from "react";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import AboutPageTranslatorExplanation from "@/components/AboutPageTranslatorExplanation";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { RiNextjsFill, RiPaypalLine, RiTwitterXLine } from "react-icons/ri";
import { FaPatreon } from "react-icons/fa6";
import { SiDotnet, SiKotlin } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { motion, Variants } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const cardHover = {
  scale: 1.02,
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
};

const iconHover = {
  scale: 1.2,
  rotate: 15,
};

interface Props {}

const Page: NextPage<Props> = () => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const fetchTranslators =
    async (): Promise<Array<InformationalTranslatorsDTO> | null> => {
      try {
        const response = await axiosNoCredentialInstance.get<
          Response<Array<InformationalTranslatorsDTO>>
        >(`/translations/`);

        switch (response.status) {
          case OK_RESPONSE_CODE:
            setError(undefined);
            return response.data.data;
          case NOT_FOUND_RESPONSE_CODE:
            setError(NOT_FOUND_RESPONSE_CODE);
            return null;
          case TOO_MANY_REQUEST_RESPONSE_CODE:
            setError(TOO_MANY_REQUEST_RESPONSE_CODE);
            return null;
          default:
            setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
            return null;
        }
      } catch (error) {
        // TODO: Add toast.
        console.error(error);
        setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return null;
      }
    };

  const { data = null, isLoading } =
    useQuery<Array<InformationalTranslatorsDTO> | null>({
      queryKey: ["about-translations"],
      queryFn: fetchTranslators,
      staleTime: Infinity,
    });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if ((error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE) || data === null)
    return <ServerError />;

  //For now, this is the only scripture key.
  const torahCode: AvailableScriptureKey = "t";

  return (
    <UIWrapper>
      <motion.div
        className="w-full flex flex-col gap-6 dark:bg-black"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 mb-8 shadow-md dark:bg-black dark:text-white"
          variants={itemVariants}
        >
          <div className="max-w-5xl mx-auto px-4">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              About {PROJECT_NAME}
            </motion.h1>
          </div>
        </motion.section>

        <motion.section
          className="max-w-5xl mx-auto px-4 flex flex-col gap-8"
          variants={itemVariants}
        >
          <motion.section
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              What is {PROJECT_NAME}?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {PROJECT_NAME} is a project designed to make it easier to study
              and research religious scriptures regarded as sacred by people
              worldwide. The platform provides additional features that can be
              developed based on user requests and needs. Alongside these tools,
              {PROJECT_NAME} creates avenues for users to interact—sharing
              insights, offering knowledge, and discussing findings. All
              information presented through {PROJECT_NAME} is sourced from
              widely accepted and reputable references available on the
              internet.
            </p>
          </motion.section>

          <motion.div variants={itemVariants}>
            <Divider className="my-2 dark:border-gray-700" />
          </motion.div>

          <motion.section
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Where does {PROJECT_NAME} get its sources?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-medium">For Torah:</span>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4 mb-4">
              <li>
                <span className="font-medium">Text of the Torah:</span>{" "}
                <Link
                  href="https://www.sefaria.org/"
                  isExternal
                  showAnchorIcon
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  Sefaria
                </Link>{" "}
                and{" "}
                <Link
                  href="https://openscriptures.org/"
                  isExternal
                  showAnchorIcon
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  Open Scriptures
                </Link>
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-100 mb-2">
              Below are the translators of the Torah supported on this platform:
            </p>

            <div className="grid grid-cols-1 gap-4 mt-4">
              {data
                .filter((t) => t.scripture.code === torahCode)
                .map((t, i) => (
                  <AboutPageTranslatorExplanation key={i} translation={t} />
                ))}
            </div>
          </motion.section>
        </motion.section>

        <motion.section
          className="max-w-5xl mx-auto px-4 w-full"
          variants={itemVariants}
        >
          <motion.main
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer mb-8 dark:bg-black dark:border dark:border-gray-700"
          >
            <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Contact Us
            </h4>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed flex flex-col gap-2 dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              <span className="flex items-center gap-2">
                <MdOutlineEmail size={19} />
                <strong>Email:</strong> {PROJECT_EMAIL_ADDRESS}
              </span>
              <span className="flex items-center gap-2">
                <FaInstagram size={19} />
                <strong>Instagram:</strong> {PROJECT_INSTAGRAM_ADDRESS}
              </span>
              <span className="flex items-center gap-2">
                <RiTwitterXLine size={19} />
                <strong>X:</strong> {PROJECT_X_ADDRESS}
              </span>
            </p>
          </motion.main>
        </motion.section>

        <motion.section
          className="max-w-5xl mx-auto px-4 mb-8 w-full flex flex-col gap-6"
          variants={itemVariants}
        >
          <motion.main
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Support {PROJECT_NAME}!
            </header>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              {PROJECT_NAME} does not charge users. If you wish, you can support
              {PROJECT_NAME}
              {"'"} server and performance costs. The {PROJECT_NAME} project
              depends on its community. All the money users has contributed will
              be cost ONLY on server necessaries.
              <div className="flex items-center gap-4 mt-3">
                <Link href={PATREON_SUPPORT_URL} isExternal showAnchorIcon>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 underline">
                    <motion.div whileHover={iconHover} className="inline-block">
                      <FaPatreon size={28} />
                    </motion.div>
                    Patreon
                  </div>
                </Link>
                <Link href={PAYPAL_SUPPORT_URL} isExternal showAnchorIcon>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 underline">
                    <motion.div whileHover={iconHover} className="inline-block">
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
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              {PROJECT_NAME} is an Open Source Project!
            </header>
            <p
              className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed overflow-auto
                           dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700"
            >
              {PROJECT_NAME} is open source and relies on user contributions.
              Here are the details of the {PROJECT_NAME} Project:
              <div className="mt-2 flex flex-col gap-4 pl-4">
                <div className="flex items-center gap-3">
                  <motion.div whileHover={iconHover} className="inline-block">
                    <RiNextjsFill size={30} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL}
                    className="text-indigo-600 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Frontend (NextJS, TypeScript)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div whileHover={iconHover} className="inline-block">
                    <SiDotnet size={32} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL}
                    className="text-indigo-600 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Backend (.NET, EF Core, C#)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div whileHover={iconHover} className="inline-block">
                    <SiKotlin size={25} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL}
                    className="text-indigo-600 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Mobile (Kotlin, Java)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div whileHover={iconHover} className="inline-block">
                    <FaNodeJs size={28} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL}
                    className="text-indigo-600 dark:text-indigo-400 underline"
                    isExternal
                    showAnchorIcon
                  >
                    Discord Bot (Node, TypeScript)
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div whileHover={iconHover} className="inline-block">
                    <VscGithubAlt size={28} />
                  </motion.div>
                  <Link
                    href={GITHUB_SCRIPTIUM_PROJECT_URL}
                    className="text-indigo-600 dark:text-indigo-400 underline"
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
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <motion.div whileHover={iconHover} className="inline-block">
                <FaDiscord size={28} />
              </motion.div>
              <Link
                href={DISCORD_BOT_ADD_URL}
                isExternal
                showAnchorIcon
                className="text-indigo-600 dark:text-indigo-400 underline flex items-center gap-1"
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
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Reflections (or Comment System) in {PROJECT_NAME}
            </header>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The diagrams and rules below illustrate SCRIPTIUM’ unique approach
              to comments, visibility, and privacy:
            </p>

            <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed overflow-auto dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              {`
The {PROJECT_NAME} project has an unusual comment system aligned with the project's purpose.

CAPITAL letters (A, B, C, X, etc.) represent users.
A tilde (~) next to a capital letter (e.g., B~) indicates a private account.
Each comment is prefixed with "c" (e.g., cA is user A’s comment).
Parentheses to the right (+ or -) represent whether an external user is able to view the comment.

Example:

    cA(+)
         cB~(+)

Here, user A is the external user. cA is A’s top-level comment. cB~, which is user B’s reply with a private account, is still visible to A because they are the parent comment’s owner.

In {PROJECT_NAME}’ comment system, the following rules apply:
  1. Users can see comments made by users they follow.
  2. Users can see their own comments.
  3. Users cannot see replies to their own comments unless:
     - The replier’s account is private, AND
     - The user does not follow the replier.
  4. Users can reply to any comment they are able to see.

Below are two example states to demonstrate visibility in different scenarios:

-------------------------------------------------------
State 1:
  External user: X
  V is followed by K and Z. X follows V and Z.

  cV(+) 1*
       cX(+) 2*
       cK(-) 3*
            cV(-) 4*
       cZ(+) 5*
            cV(+) 1*

  1* : X can see cV because X follows V.
  2* : X can see cX because it is X’s own comment.
  3* : X cannot see cK because X does NOT follow K.
  4* : X cannot see cV here because it’s replying under a comment (cK) that X cannot see.
  5* : X can see cZ because X follows Z.

-------------------------------------------------------
State 2:
  External user: X
  X follows no one.

  cX(+) 1*
       cK(+) 2*
            cK(-) 3*
            cX(+) 4*
  cV(+) 5*
       cX(+) 6*
  cS~(-) 7*
         cV(-) 8*

  1* : X can see cX because it is X’s own comment.
  2* : X can see this comment because it is a reply to X’s comment, and user K is not private.
  3* : X cannot see cK because X doesn’t follow K (private status does not matter here).
  4* : X can see cX because it is X’s own comment.
  5* : X can see cV if X follows V. (If not, this becomes hidden.)
  6* : X can see cX because it is X’s own comment.
  7* : X cannot see cS~ because S is private and X does not follow S, even if it replies to X’s comment.
  8* : X cannot see cV because it’s replying under cS~, which X cannot see.

Note on "Notes":
  "Notes" are considered top-level comments for whomever they belong to (this will be implemented later).
`}
            </pre>
          </motion.main>

          <motion.main
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-white p-6 rounded-md shadow-sm cursor-pointer dark:bg-black dark:border dark:border-gray-700"
          >
            <header className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              What are Suggestions?
            </header>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md leading-relaxed dark:bg-black dark:text-gray-300 dark:border dark:border-gray-700">
              Suggestions is a feature of {PROJECT_NAME} that allows users to
              make translation suggestions anonymously. This helps translators
              improve their work based on community feedback without
              compromising user privacy.
            </p>
          </motion.main>
        </motion.section>
      </motion.div>
    </UIWrapper>
  );
};

export default Page;
