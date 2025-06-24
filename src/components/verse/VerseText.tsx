import {VerseSimpleDTO} from "@/types/classes/Verse";
import {FC, ReactNode} from "react";
import {ScripturePreference} from "@/types/classes/Scripture";


type Props = {
    verse: VerseSimpleDTO
    preference: ScripturePreference;
}

const VerseText: FC<Props> = ({verse, preference}): ReactNode => {
    const preferredFont = preference.getPreferredFont();
    const preferredVariation = preference.getPreferredOriginalScriptureTextVariationKey();
    const verseText: string = verse.getTextOfVariationOrUsual(preferredVariation);

    return <div className={`text-3xl text-right w-full leading-relaxed ${preferredFont}`}>
        {verseText}
    </div>

}

export default VerseText