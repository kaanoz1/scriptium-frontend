import { AvailableScriptureKey, SectionWithMeaningDTO } from "@/types/types";
import { DEFAULT_LANG_CODE } from "@/util/utils";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  scriptureCode: AvailableScriptureKey;
  section: SectionWithMeaningDTO;
  index: number;
}

const ScripturePageSectionBlockComponent: FC<Props> = ({
  scriptureCode,
  section,
  index: i,
}) => {
  const sectionMeaning: string =
    section.meanings.find((s) => (s.language.langCode = DEFAULT_LANG_CODE))
      ?.meaning ?? "Section";

  const sectionNameInOwnLanguage: string = section.name;

  return (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link
        color="foreground"
        href={`/${scriptureCode}/${i + 1}`}
        className="p-5 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 shadow dark:shadow-gray-800 hover:shadow-md hover:scale-[1.01] transform-gpu focus:outline-none focus:ring-2 dark:focus:ring-2 hover:bg-gray-50 dark:hover:bg-neutral-700 flex flex-col gap-1"
      >
        <h2 className="font-semibold mb-1 dark:text-white">
          {i + 1}. {sectionMeaning} ({sectionNameInOwnLanguage})
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click to read more
        </p>
      </Link>
    </motion.div>
  );
};

export default ScripturePageSectionBlockComponent;
