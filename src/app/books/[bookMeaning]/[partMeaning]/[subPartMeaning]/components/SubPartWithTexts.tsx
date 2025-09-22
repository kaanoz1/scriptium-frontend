import { useScripturePreferences } from "@/hooks/useScripture";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import Settings from "../[divisionMeaning]/components/Settings";
import Tools from "../[divisionMeaning]/components/Tools";
import TranslationIndicator from "../[divisionMeaning]/components/TranslationIndicatator";
import { getSharedTranslation } from "../[divisionMeaning]/utils/function";
import BreadCrumbs from "./BreadCrumbs";
import Text from "../[divisionMeaning]/components/BookText";
import { BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText";

type Props = {
  subPartNode: BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText;
};

const SubPartWithTexts: FC<Props> = ({ subPartNode }) => {
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);

  const {
    preference,
    setShowFootnotes,
    setShowOriginalText,
    setShowTranslations,
    setShowTransliterations,
  } = useScripturePreferences("t"); //For now, will be filtered according to book selected.

  //Book -> Part -> SubPart

  const texts = subPartNode.getTexts();

  const subPartMeaning = subPartNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const subPartName = subPartNode.getName();

  const translation = getSharedTranslation(texts);

  const subPartHeading = subPartMeaning
    ? `${subPartMeaning} (${subPartName})`
    : subPartName;

  const description = subPartNode.getDescription();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black pt-6 pb-16 min-h-[calc(100vh-130px)]"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:block">
        <BreadCrumbs subPartNode={subPartNode} />

        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {subPartMeaning
            ? `${subPartMeaning} (${subPartName})`
            : `${subPartHeading} - ${subPartName}`}
        </motion.h1>

        {description && (
          <motion.h3
            className="text-center text-xl py-5 font-thin mb-4 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {description}
          </motion.h3>
        )}

        <div className="w-full flex flex-col">
          <div className="w-full py-1.5 px-2.5">
            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 px-1">
              <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                <TranslationIndicator translation={translation} />
              </div>
              <div className="w-full sm:w-auto">
                <Tools
                  functionWhichOpensSettingsModal={() =>
                    setIsSettingsModelOpen(true)
                  }
                />
              </div>
            </div>
          </div>
          {texts.map((t) => (
            <Text
              text={t}
              selectedTranslation={translation}
              preference={preference}
            />
          ))}
        </div>
      </div>

      <Settings
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        preference={preference}
        setShowTranslation={setShowTranslations}
        setShowTransliteration={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
      />
    </motion.div>
  );
};

export default SubPartWithTexts;
