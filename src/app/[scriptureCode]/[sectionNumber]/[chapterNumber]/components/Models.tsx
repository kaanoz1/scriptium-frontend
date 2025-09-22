"use client";

import VerseAndChapterPageSettingsModel from "@/app/books/[bookMeaning]/[partMeaning]/[subPartMeaning]/[divisionMeaning]/components/Settings";
import ShareModel from "@/components/ShareModel";
import { FC, Fragment } from "react";
import ChapterPageTranslationModel from "./ChapterPageTranslationModel";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { T_OriginalScriptureVocalizationKey } from "@/types/types";

type Props = {
  isSettingsModelOpen: boolean;
  setIsSettingsModelOpen: (isOpen: boolean) => void;
  isTranslationModelOpen: boolean;
  setIsTranslationModelOpen: (isOpen: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isOpen: boolean) => void;
  shareText: string;
  setShareText: (text: string) => void;
  preference: ScripturePreference;
  setShowTranslations: (options: boolean) => void;
  setShowTransliterations: (options: boolean) => void;
  setShowFootnotes: (options: boolean) => void;
  setShowOriginalText: (options: boolean) => void;
  setOriginalTextVariation: (
    variation: T_OriginalScriptureVocalizationKey
  ) => void;
  setTranslationIdMultiple: (key: Set<React.Key>) => void;
  scriptureHelper: Readonly<ScriptureHelper>;
};

const Models: FC<Props> = ({
  isSettingsModelOpen,
  isShareModalOpen,
  isTranslationModelOpen,
  setIsSettingsModelOpen,
  setIsShareModalOpen,
  setIsTranslationModelOpen,
  setShareText,
  shareText,
  preference,
  setShowTranslations,
  setShowTransliterations,
  setShowFootnotes,
  setShowOriginalText,
  setTranslationIdMultiple,
  scriptureHelper,
}) => {
  return (
    <Fragment>
      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        preference={preference}
        setShowTranslation={setShowTranslations}
        setShowTransliteration={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
      />
      <ChapterPageTranslationModel
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preference={preference}
        setTranslationIdMultiple={setTranslationIdMultiple}
        scriptureHelper={scriptureHelper}
      />

      <ShareModel
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
        shareTextState={shareText}
        stateControlFunctionOfShareTextState={setShareText}
      />
    </Fragment>
  );
};

export default Models;
