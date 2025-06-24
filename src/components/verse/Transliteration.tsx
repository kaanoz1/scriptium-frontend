import {FC, ReactNode} from "react";
import {VerseSimpleDTO} from "@/types/classes/Verse";
import {DEFAULT_LANG_CODE} from "@/util/utils";

type Props = {
    verse: VerseSimpleDTO
}

const Transliteration: FC<Props> = ({verse}): ReactNode => {

    const transliteration: string | ReactNode = verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ??
        <span className="italic">No transliteration available.</span>


    return <div className="text-sm font-light italic pt-2 text-gray-700 dark:text-gray-400">
        {transliteration}
    </div>
}

export default Transliteration;