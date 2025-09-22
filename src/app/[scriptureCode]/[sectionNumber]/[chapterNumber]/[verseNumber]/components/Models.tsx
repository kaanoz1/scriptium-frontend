"use client";

import CollectionModelMustSignIn from "@/components/collection/CollectionModalMustSignIn";
import ShareModel from "@/components/ShareModel";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import CollectionModal from "../../components/VerseCollectionModal";
import VersePageTranslationModal from "./VersePageTranslationModal";
import { T_OriginalScriptureVocalizationKey } from "@/types/types";
import { Verse } from "@/types/classes/model/Verse/Verse/Verse";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { UserOwn } from "@/types/classes/model/User/User";
type Props = {
  isTranslationModelOpen: boolean;
  preference: ScripturePreference;
  scriptureHelper: Readonly<ScriptureHelper>;
  setTranslationIdMultiple: (key: Set<React.Key>) => void;
  isSettingsModelOpen: boolean;
  setIsSettingsModelOpen: Dispatch<SetStateAction<boolean>>;
  setIsTranslationModelOpen: Dispatch<SetStateAction<boolean>>;

  setShowTranslations: (options: boolean) => void;
  setShowTransliterations: (options: boolean) => void;
  setShowFootnotes: (options: boolean) => void;
  setShowOriginalText: (options: boolean) => void;
  setOriginalTextVariation: (
    variation: T_OriginalScriptureVocalizationKey
  ) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isOpen: boolean) => void;
  shareText: string;
  setShareText: (text: string) => void;
  isCollectionModalOpen: boolean;
  setIsCollectionModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
  verse: Verse;
  user: UserOwn | null;
};

const Models: FC<Props> = ({
  isTranslationModelOpen,
  setIsTranslationModelOpen,
  preference,
  scriptureHelper,
  setTranslationIdMultiple,
  isSettingsModelOpen,
  setIsSettingsModelOpen,
  setShowTranslations,
  setShowTransliterations,
  setShowFootnotes,
  setShowOriginalText,
  setOriginalTextVariation,
  isShareModalOpen,
  setIsShareModalOpen,
  shareText,
  setShareText,
  isCollectionModalOpen,
  setIsCollectionModalOpen,
  verse,
  setIsSaved,

  user,
}) => {
  return (
    <Fragment>
      <VersePageTranslationModal
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preference={preference}
        scriptureHelper={scriptureHelper}
        setTranslationIdMultiple={setTranslationIdMultiple}
      />

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        preference={preference}
        setShowTranslation={setShowTranslations}
        setShowTransliteration={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
        setOriginalTextVariation={setOriginalTextVariation}
        scriptureHelper={scriptureHelper}
      />

      <ShareModel
        shareTextState={shareText}
        stateControlFunctionOfShareTextState={setShareText}
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
      />

      {user ? (
        <CollectionModal
          user={user}
          isCollectionModalOpen={isCollectionModalOpen}
          setIsCollectionModalOpen={setIsCollectionModalOpen}
          setIsSaved={setIsSaved}
          verse={verse}
        />
      ) : (
        <CollectionModelMustSignIn
          isCollectionModalOpen={isCollectionModalOpen}
          setIsCollectionModalOpen={setIsCollectionModalOpen}
        />
      )}
    </Fragment>
  );
};

export default Models;
