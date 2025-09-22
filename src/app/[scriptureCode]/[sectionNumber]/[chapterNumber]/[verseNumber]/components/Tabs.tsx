"use client";

import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { FC } from "react";
import VersePageTabs from "./VersePageTabs";

type Props = {
  verse: VerseBoth;
  user: UserOwn | null;
  preference: ScripturePreference;
  translationTexts: readonly TranslationText[];
};

const Tabs: FC<Props> = ({ verse, user, preference, translationTexts }) => {
  const showFootnotes = preference.getOptions().getShowFootnotes();

  return (
    <div className="order-1 sm:order-2 text-gray-600 dark:text-gray-300">
      <VersePageTabs
        user={user}
        verse={verse}
        showFootnotes={showFootnotes}
        translationTexts={translationTexts}
      />
    </div>
  );
};

export default Tabs;
