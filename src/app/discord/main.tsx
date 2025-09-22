"use client";
import { NextPage } from "next";
import { motion, Variants } from "framer-motion";
import { PROJECT_NAME } from "@/util/constants";
import { Link } from "@heroui/link";
import { FaDiscord, FaGithub } from "react-icons/fa";

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const Main: NextPage = () => {
  return (
    <section className="flex flex-col gap-10 items-center px-4 max-w-4xl mx-auto py-12">
      <header className="text-4xl font-bold text-center flex justify-center items-center">
        <span className="p-2">
          <FaDiscord
            size={40}
            className="text-neutral-800 dark:text-neutral-300"
          />
        </span>
        Discord Bot of {PROJECT_NAME}
      </header>

      <motion.div
        className="w-full flex flex-col gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={itemVariants} id="purpose">
          <h2 className="text-2xl font-semibold mb-2"># Purpose of the Bot</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The {PROJECT_NAME} Discord bot was developed to provide direct
            access to religious scriptures and translations through Discord chat
            commands. It enables users to read specific verses, choose
            translations, and even customize how the original text is displayed.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} id="setup">
          <h2 className="text-2xl font-semibold mb-2">
            # Setup & Installation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To install the bot, visit the official{" "}
            <Link
              isExternal
              href="https://discord.com/oauth2/authorize?client_id=1336220556227383327"
            >
              invite link
            </Link>{" "}
            and add it to your server. Make sure it has permission to use slash
            commands and embed messages. Once added, simply type{" "}
            <code>/read</code> in any channel where the bot has access.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} id="commands">
          <h2 className="text-2xl font-semibold mb-2"># Supported Commands</h2>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <code>/ping</code> — Simple health check to ensure the bot is
              online.
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <code>/scripture</code> — Displays a list of sections (e.g.,
              Genesis, Exodus) belonging to a scripture.
              <h5 className="mt-2 font-medium">Parameters:</h5>
              <ul className="list-disc list-inside mt-1">
                <li>
                  <code>scripture_code*</code>: Code of the scripture. E.g.{" "}
                  <code>t</code> for Torah. Required.
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <code>/section</code> — Fetches information about a specific
              section within a scripture.
              <h5 className="mt-2 font-medium">Parameters:</h5>
              <ul className="list-disc list-inside mt-1">
                <li>
                  <code>scripture_code*</code>: Code of the scripture. Required.
                </li>
                <li>
                  <code>section_number*</code>: The section’s number. Required.
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <code>/chapter</code> — Retrieves chapter details from a specified
              section.
              <h5 className="mt-2 font-medium">Parameters:</h5>
              <ul className="list-disc list-inside mt-1">
                <li>
                  <code>scripture_code*</code>: Code of the scripture. Required.
                </li>
                <li>
                  <code>section_number*</code>: The section number. Required.
                </li>
                <li>
                  <code>chapter_number*</code>: The chapter number. Required.
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <code>/verse</code> — Retrieves a specific verse with optional
              translation and vocalization.
              <h5 className="mt-2 font-medium">Parameters:</h5>
              <ul className="list-disc list-inside mt-1">
                <li>
                  <code>scripture_code*</code>: Code of the scripture. Required.
                </li>
                <li>
                  <code>section_number*</code>: Section number. Required.
                </li>
                <li>
                  <code>chapter_number*</code>: Chapter number. Required.
                </li>
                <li>
                  <code>verse_number*</code>: Verse number. Required.
                </li>
                <li>
                  <code>translation</code>: Optional. e.g. "The Contemporary
                  Torah"
                </li>
                <li>
                  <code>vocalization</code>: Optional. "Usual", "Simplified", or
                  "Without Vowel"
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} id="limitations">
          <h2 className="text-2xl font-semibold mb-2">
            # Known Limitations / Upcoming Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>
              Currently, the bot supports 5 commands:
              <code> /ping</code>, <code>/scripture</code>,{" "}
              <code>/section</code>, <code>/chapter</code>, and{" "}
              <code>/verse</code>.
            </li>
            <li>
              At this stage, only the Torah is available as a scripture source.
            </li>
            <li>
              Support for additional books (e.g. Mishnah, Talmud) and multiple
              translations is under development.
            </li>
            <li>
              All command outputs are currently cached for 10 days; dynamic
              updates will be supported later.
            </li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} id="contribute">
          <h2 className="text-2xl font-semibold mb-2">
            # Open Source / Contribute
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This bot is open source and contributions are welcome! Visit our
            GitHub repository to report issues, suggest features, or contribute
            code.
          </p>
          <Link
            href="https://github.com/scriptium-project/scriptium-discord-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline mt-2 inline-block"
            isExternal
          >
            <span className="flex justify-center items-center gap-3">
              <span>→ View on GitHub</span>
              <FaGithub size={19} />
            </span>
          </Link>
        </motion.section>
      </motion.div>
    </section>
  );
};

export default Main;
