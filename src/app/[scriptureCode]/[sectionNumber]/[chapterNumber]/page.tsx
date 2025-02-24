"use client";

import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import {NoAuthenticationRequestErrorCode, Response} from "@/types/response";
import {
    AvailableScriptureKey,
    ChapterConfinedDTO,
    ChapterPageParams,
    ScriptureDetails,
    VerseTextVariation,
} from "@/types/types";
import {
    DEFAULT_LANG_CODE,
    getChapterInformation,
    getScripture,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE,
    NOT_FOUND_RESPONSE_CODE,
    OK_RESPONSE_CODE,
    PROJECT_NAME,
    PROJECT_URL,
    TOO_MANY_REQUEST_RESPONSE_CODE,
    TOOL_TIP_CLASS_NAMES,
    UNDEFINED_TRANSLATION_TEXT_CHAPTER,
} from "@/util/utils";
import {useQuery} from "@tanstack/react-query";
import {NextPage} from "next";
import {useParams} from "next/navigation";
import {Fragment, Key, useState} from "react";
import {motion} from "framer-motion";
import {BreadcrumbItem, Breadcrumbs} from "@heroui/breadcrumbs";
import {MdTranslate} from "react-icons/md";
import {IoBookOutline, IoPlayOutline, IoSettingsOutline,} from "react-icons/io5";
import {GrNext, GrPrevious, GrShareOption} from "react-icons/gr";
import ChapterVerse from "@/components/UI/ChapterVerse";
import {useScripture} from "@/hooks/useScripture";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import ChapterPageTranslationModel from "@/components/ChapterPageTranslationModel";
import ChapterPageShareModal from "@/components/ChapterPageShareModal";
import {Link} from "@heroui/link";
import {Tooltip} from "@heroui/tooltip";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ChapterPageNotFoundComponent from "@/components/ChapterPageNotFoundComponent";

interface Props {
}

const Page: NextPage<Props> = ({}) => {
    const {
        scriptureCode: scriptureCodeParam,
        sectionNumber: sectionNumberParam,
        chapterNumber: chapterNumberParam,
    } = useParams<ChapterPageParams>();

    const [error, setError] = useState<
        NoAuthenticationRequestErrorCode | undefined
    >(undefined);

    const [showTranslation, setShowTranslation] = useState<boolean>(true);
    const [showOriginalText, setShowOriginalText] = useState<boolean>(true);

    const [showTransliteration, setShowTransliteration] =
        useState<boolean>(false);

    const [textVariation, setTextVariation] =
        useState<VerseTextVariation>("text");

    const [preferredTranslationId, setPreferredTranslationId] = useState<
        Set<Key>
    >(new Set<Key>([0]));

    const [showFootnotes, setShowFootnotes] = useState<boolean>(true);

    const [shareText, setShareText] = useState<string>("");

    const [isTranslationModelOpen, setIsTranslationModelOpen] =
        useState<boolean>(false);

    const [isSettingsModelOpen, setIsSettingsModelOpen] =
        useState<boolean>(false);

    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    const scripture: ScriptureDetails | undefined =
        getScripture(scriptureCodeParam);

    const {preferredScriptureContext} = useScripture();

    const sectionNumber = parseInt(sectionNumberParam);

    const chapterNumber = parseInt(chapterNumberParam);

    const fetchChapter = async () => {
        if (scripture == undefined) {
            setError(NOT_FOUND_RESPONSE_CODE);
            return null;
        }

        try {
            const response = await axiosNoCredentialInstance.get<
                Response<ChapterConfinedDTO>
            >(
                `/verse/${scripture.number}/${sectionNumberParam}/${chapterNumberParam}`
            );

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    setError(undefined);

                    setPreferredTranslationId(
                        //Setting up preferred translation.
                        preferredScriptureContext[scripture.code]
                            .preferredTranslationIdSingle
                    );

                    return response.data.data;

                case NOT_FOUND_RESPONSE_CODE:
                    setError(NOT_FOUND_RESPONSE_CODE);
                    return null;
                case TOO_MANY_REQUEST_RESPONSE_CODE:
                    setError(TOO_MANY_REQUEST_RESPONSE_CODE);
                    return null;
                default:
                    setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
                    return null;
            }
        } catch (error) {
            console.error(error);
            setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
            return null;
        }
    };


    const {data: chapter = null, isLoading} =
        useQuery<ChapterConfinedDTO | null>({
            queryKey: [
                "chapter-page",
                scriptureCodeParam,
                sectionNumberParam,
                chapterNumberParam,
            ],
            queryFn: async () => await fetchChapter(),
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        });

    if (isLoading) return <LoadingSpinnerFullH/>;

    if (
        (error && error === NOT_FOUND_RESPONSE_CODE) ||
        scripture == undefined ||
        chapter == null ||
        Number.isNaN(sectionNumber) ||
        Number.isNaN(chapterNumber)
    )
        return (
            <ChapterPageNotFoundComponent
                scriptureCode={scriptureCodeParam}
                sectionNumber={sectionNumberParam}
                chapterNumber={chapterNumberParam}
            />
        );

    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequest/>;
    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerError/>;

    const {
        translation: {translators, name: translationName},
        translationTexts,
    } =
    chapter.translations.find((c) =>
        preferredTranslationId.has(c.translation.id.toString())
    ) ?? UNDEFINED_TRANSLATION_TEXT_CHAPTER;

    const {
        scriptureMeanings,
        scriptureName: scriptureNameInOwnLanguage,
        sectionName: sectionNameInOwnLanguage,
        sectionMeanings,
        verses,
    } = chapter;

    const handleShare = (platform: string) => {
        console.log(`Sharing content to: ${platform}`);
        //TODO: Will be implemented.
    };

    const scriptureMeaning: string =
        scriptureMeanings.find((e) => e.language.langCode === DEFAULT_LANG_CODE)
            ?.meaning ?? "Scripture";

    const scriptureCode: AvailableScriptureKey = scripture.code;

    const sectionMeaning: string =
        sectionMeanings.find((e) => e.language.langCode === DEFAULT_LANG_CODE)
            ?.meaning ?? "Section";

    const preferredScripture = preferredScriptureContext[scripture.code];

    const preferredFont: string = preferredScripture.preferredScriptureFont;

    const translatorNamesGathered: string = translators
        .map((e) => e.name)
        .join(", ");

    const {doesPreviousChapterExists, doesNextChapterExists} =
        getChapterInformation(scripture.code, sectionNumber, chapterNumber);

    return (
        <Fragment>
            <motion.div
                initial={{opacity: 0, x: 30}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -30}}
                transition={{duration: 0.4, ease: "easeInOut"}}
                className="min-h-screen bg-white dark:bg-black/80 text-gray-900 dark:text-gray-200 transition-colors duration-300 pt-6 pb-16"
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="my-4 flex justify-between">
                        <Breadcrumbs size="lg">
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
                                {scriptureMeaning} ({scriptureNameInOwnLanguage})
                            </BreadcrumbItem>
                            <BreadcrumbItem
                                href={`${PROJECT_URL}/${scriptureCode}/${sectionNumber}`}
                            >
                                {sectionMeaning} ({sectionNameInOwnLanguage})
                            </BreadcrumbItem>
                            <BreadcrumbItem>Chapter {chapterNumber}</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    <motion.h1
                        className="text-center text-3xl py-5 sm:text-4xl font-bold mb-4"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {sectionMeaning} {chapterNumber}
                    </motion.h1>

                    <div className="flex flex-col">
                        <div
                            className="flex justify-center w-full py-1.5 px-2.5 rounded-t-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-neutral-900">
                            <div className="w-full flex justify-between items-center px-1">
                <span
                    className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
                  <IoBookOutline size={17}/>
                  <span>{translationName}</span>
                  <span> / </span>
                  <span>{translatorNamesGathered}</span>
                </span>
                                <div className="py-1 px-2 flex items-center justify-evenly gap-5">
                                    <Link
                                        color="foreground"
                                        href={`/${scripture.code}/${sectionNumber}/${
                                            chapterNumber - 1
                                        }`}
                                        isDisabled={!doesPreviousChapterExists}
                                    >
                                        <GrPrevious
                                            size={18}
                                            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        />
                                    </Link>
                                    <Link
                                        color="foreground"
                                        href={`/${scripture.code}/${sectionNumber}/${
                                            chapterNumber + 1
                                        }`}
                                        isDisabled={!doesNextChapterExists}
                                    >
                                        <GrNext
                                            size={18}
                                            className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        />
                                    </Link>

                                    <Tooltip
                                        content="Not supported yet."
                                        classNames={TOOL_TIP_CLASS_NAMES}
                                        showArrow
                                        delay={250}
                                        closeDelay={0}
                                    >
                    <span className="flex items-center justify-center">
                      {/*Since items-center tag does not effect this span as it is located in Tooltip, I had to adjust it again. */}
                        <Link isDisabled={true} color="foreground">
                        <IoPlayOutline size={21}/>
                      </Link>
                    </span>
                                    </Tooltip>
                                    <IoSettingsOutline
                                        className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                                        onClick={() => setIsSettingsModelOpen(true)}
                                        size={19}
                                    />
                                    <MdTranslate
                                        className="cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                        onClick={() => setIsTranslationModelOpen(true)}
                                        size={19}
                                    />
                                    <GrShareOption
                                        size={19}
                                        className="cursor-pointer hover:text-teal-700 dark:hover:text-teal-500 transition-colors"
                                        onClick={() => {
                                            setIsShareModalOpen(true);
                                            setShareText(
                                                `${PROJECT_NAME},\n${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber} \n\n${window.location.href}`
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {verses.map((v, i) => (
                            <ChapterVerse
                                font={preferredFont}
                                key={i}
                                verse={v}
                                verseOptions={{
                                    showOriginalText,
                                    showTranslation,
                                    showTransliteration,
                                }}
                                operations={{
                                    setShareText,
                                    setIsShareModalOpen,
                                }}
                                verseDetails={{
                                    scriptureCode,
                                    sectionNumber,
                                    scriptureMeaning,
                                    scriptureNameInOwnLanguage,
                                    sectionMeaning,
                                    sectionNameInOwnLanguage,
                                    chapterNumber,
                                    translationName,
                                    variation: textVariation,
                                }}
                                translationText={translationTexts.at(i)!}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <VerseAndChapterPageSettingsModel
                showFootnotes={showFootnotes}
                setShowFootnotes={setShowFootnotes}
                isSettingsModelOpen={isSettingsModelOpen}
                setIsSettingsModelOpen={setIsSettingsModelOpen}
                showTranslation={showTranslation}
                setShowTransliteration={setShowTransliteration}
                textSymbol={scripture.textSymbol}
                textSimplifiedSymbol={scripture.textSimplifiedSymbol}
                textWithoutVowelSymbol={scripture.textWithoutVowelSymbol}
                setShowOriginalText={setShowOriginalText}
                setShowTranslation={setShowTranslation}
                showOriginalText={showOriginalText}
                showTransliteration={showTransliteration}
                preferredFont={preferredFont}
                setTextVariation={setTextVariation}
                textVariation={textVariation}
            />
            <ChapterPageTranslationModel
                isModalOpen={isTranslationModelOpen}
                setIsModalOpen={setIsTranslationModelOpen}
                preferredTranslationId={preferredTranslationId}
                stateControlFunctionOfPreferredTranslationId={setPreferredTranslationId}
                translations={chapter.translations}
            />
            <ChapterPageShareModal
                isModalOpen={isShareModalOpen}
                setIsModalOpen={setIsShareModalOpen}
                shareText={shareText}
                stateControlFunctionOfShareText={setShareText}
                handleShareFunction={handleShare}
            />
        </Fragment>
    );
};

export default Page;
