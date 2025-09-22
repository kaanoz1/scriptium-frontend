"use client";

import { NextPage } from "next";

import { Tab, Tabs } from "@heroui/tabs";

import { IoBookOutline } from "react-icons/io5";
import VersePageTabTranslations from "./VersePageTabTranslations";
import VersePageTabNotes from "./VersePageTabNotes";
import { CiStickyNote } from "react-icons/ci";
import { UserOwn } from "@/types/classes/model/User/User";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";

interface Props {
  readonly translationTexts: ReadonlyArray<TranslationText>;
  showFootnotes: boolean;
  verse: VerseBoth;
  user: UserOwn | null;
}

const VersePageTabs: NextPage<Props> = ({ user, showFootnotes, verse }) => {
  const translationTexts = verse.getTranslationTexts();

  return (
    <div className="flex w-full flex-col bg-white dark:bg-dark rounded-md shadow-sm border border-gray-300 dark:border-gray-700 dark:text-gray-200">
      <Tabs
        aria-label="guest-tabs"
        color="primary"
        variant="underlined"
        className="w-full"
        classNames={{
          tabList: `w-full relative  flex items-center border-b border-gray-300 dark:border-gray-700  gap-4 px-4 bg-white dark:bg-black`,
          tab: `px-0 h-12 text-base font-medium transition-colors data-[selected=true]:text-primary text-foreground/60 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400 inline-flex items-center`,
          panel: `pt-4 px-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200`,
        }}
      >
        <Tab
          key="translations"
          title={
            <div className="flex items-center space-x-2">
              <IoBookOutline
                size={18}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Translations</span>
            </div>
          }
        >
          <VersePageTabTranslations
            showFootnotes={showFootnotes}
            translationTexts={translationTexts}
          />
        </Tab>

        {user && [
          // <Tab
          //   key="comments"
          //   title={
          //     <div className="flex items-center space-x-2">
          //       <BiCommentDetail
          //         size={18}
          //         className="text-gray-500 dark:text-gray-400"
          //       />
          //       <span>Reflections</span>
          //     </div>
          //   }
          // >
          //   <VersePageTabComments verse={verse} user={user} /> //Temporarily disabled
          // </Tab>,
          <Tab
            key="notes"
            title={
              <div className="flex items-center space-x-2">
                <CiStickyNote
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
                <span>Notes</span>
              </div>
            }
          >
            <VersePageTabNotes user={user} verse={verse} />
          </Tab>,
        ]}
      </Tabs>
    </div>
  );
};

export default VersePageTabs;
