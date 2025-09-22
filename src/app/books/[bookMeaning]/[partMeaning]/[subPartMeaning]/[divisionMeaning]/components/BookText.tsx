"use client";

import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import TranslatedTextWithFootnotes from "@/components/TranslatedTextWithFootnotes";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { BookText } from "@/types/classes/model/Book/BookText/BookText/BookText";
import { BookTranslation } from "@/types/classes/model/Book/BookTranslation/BookTranslation/BookTranslation";

interface Props {
  text: BookText;
  selectedTranslation: Readonly<BookTranslation> | undefined;
  preference: ScripturePreference;
}

const Text: FC<Props> = ({ text, preference, selectedTranslation }) => {
  const transliteration: ReactNode = (
    <span className="italic">No transliteration available.</span>
  );

  const sequenceNumber = text.getSequenceNumber();
  const textString = text.getText();

  const preferredTranslationText = text
    .getTranslationTexts()
    .find((tt) => selectedTranslation?.getId() === tt.getTranslation().getId());

  const options = preference.getOptions();
  const isTransliterationShown = options.getShowTransliteration();
  const isOriginalTextShown = options.getShowOriginalText();
  const isTranslationShown = options.getShowTranslation();
  const isFootnotesShown = options.getShowFootnotes();

  const preferredFont = preference.getPreferredFont();

  return (
    <motion.section
      initial="hidden"
      whileHover="visible"
      className="
        w-full
        flex flex-col justify-center items-center
        gap-3 sm:gap-4 md:gap-5
        px-4 sm:px-5 md:px-6
        py-3 sm:py-4 md:py-5
        text-gray-800 dark:text-gray-200
      "
    >
      <div className="py-2 sm:py-3 text-xl sm:text-2xl md:text-3xl">
        <strong>{sequenceNumber}</strong>
      </div>

      {isTranslationShown &&
        (preferredTranslationText ? (
          <div
            className="text-center font-light leading-relaxed py-2 sm:py-3
                        text-[0.95rem] sm:text-base md:text-[1.0625rem]"
          >
            <TranslatedTextWithFootnotes
              translationText={preferredTranslationText}
              showFootnotes={isFootnotesShown}
            />
          </div>
        ) : (
          <span className="italic opacity-70 text-sm sm:text-base">
            The selected translation does not provide a text for this passage.
          </span>
        ))}

      {isOriginalTextShown && (
        <div
          className={`text-center leading-relaxed py-2 sm:py-3 ${preferredFont}
                      text-2xl sm:text-3xl md:text-[2rem] tracking-tight`}
        >
          {textString}
        </div>
      )}

      {isTransliterationShown && (
        <div
          className="italic font-light text-gray-700 dark:text-gray-400 py-2 sm:py-3
                        text-[0.85rem] sm:text-sm md:text-base"
        >
          {transliteration}
        </div>
      )}
    </motion.section>
  );
};

export default Text;
