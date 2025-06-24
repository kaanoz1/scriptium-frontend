import {FC, ReactNode} from "react";
import {TranslationDTO} from "@/types/classes/Translation";
import {IoBookOutline} from "react-icons/io5";

type Props = {
    preferredTranslations: Set<TranslationDTO>
}

const ChapterPageTranslatorsIndicator: FC<Props> = ({preferredTranslations}): ReactNode => {
    if (preferredTranslations.size !== 1)
        return <span
                    className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
                    <IoBookOutline size={17}/>
            <p>Selected {preferredTranslations.size}</p>
    </span>


    const selectedTranslation = Array.from(preferredTranslations).at(0)!; //Already checked
    const translationName = selectedTranslation.getName();
    const translatorNamesGathered = selectedTranslation.getTranslators().join(", ");
    return <span
            className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
                    <IoBookOutline size={17}/>
                    <span>{translationName}</span>
                    <span> / </span>
                    <span>{translatorNamesGathered}</span>
        </span>





}

export default ChapterPageTranslatorsIndicator;