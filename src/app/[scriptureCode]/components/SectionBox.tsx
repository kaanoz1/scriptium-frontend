import { Scripture } from "@/types/classes/model/Scripture/Scripture/Scripture";
import { Section } from "@/types/classes/model/Section/Section/Section";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  scripture: Scripture;
  section: Section;
}

const SectionBox: FC<Props> = ({ scripture, section }) => {
  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionNameInOwnLanguage: string = section.getName();
  const sectionNumber = section.getNumber();

  const scriptureCode = scripture.getCode();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}`}
        aria-label={`Open ${sectionMeaning} (${sectionNameInOwnLanguage}) section ${sectionNumber} of ${scriptureCode}`}
        title={`${sectionNumber}. ${sectionMeaning} (${sectionNameInOwnLanguage})`}
        className="group p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 shadow-sm dark:shadow-gray-800 hover:shadow-md hover:scale-[1.01] transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500 hover:bg-gray-50 dark:hover:bg-neutral-700 flex flex-col gap-1 sm:gap-1.5 w-full"
      >
        <h2 className="font-semibold mb-1 sm:mb-1.5 dark:text-white text-base sm:text-lg leading-snug break-words hyphens-auto">
          {sectionNumber}. {sectionMeaning} ({sectionNameInOwnLanguage})
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Click to read more
        </p>
      </Link>
    </motion.div>
  );
};

export default SectionBox;
