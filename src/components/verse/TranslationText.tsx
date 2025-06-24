import {TranslationDTO} from "@/types/classes/Translation";
import {TranslationTextDTO} from "@/types/classes/TranslationText";
import {FC} from "react";
import TranslatedTextWithFootnotes from "@/components/UI/TranslatedTextWithFootnotes";
import {ScripturePreference} from "@/types/classes/Scripture";


type Props = {
    translation: TranslationDTO
    translationText: TranslationTextDTO | undefined
    preference: ScripturePreference
}

const TranslationText: FC<Props> = ({translation, translationText, preference}) => {

    const translationName = translation.getName();

    const translatorNamesGathered = translation
        .getTranslators()
        .map((t) => t.getName())
        .join(", ");


    const options = preference.getOptions();
    const showFootnotes = options.getShowFootnotes();

    return <div className="w-full p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        <div className="mb-2 flex items-center gap-2">
            <span className="font-bold">{translationName}</span>
            <span className="text-gray-400 dark:text-gray-500">—</span>
            <span className="italic text-sm opacity-80">
          {translatorNamesGathered}
        </span>
        </div>

        <div className="leading-relaxed">
            {translationText ? <TranslatedTextWithFootnotes
                    translationText={translationText}
                    showFootnotes={showFootnotes}
                /> :
                <span>This translation does not have a text for this verse.</span>
            }
        </div>
    </div>
}

export default TranslationText;