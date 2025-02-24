"use client";
import {
    RootDTO,
    RootPageParams,
    VerseAndTranslationForRoot,
    VerseTextVariation,
} from "@/types/types";
import {
    DEFAULT_LANG_CODE,
    DEFAULT_NOTFOUND_WORD,
    getArrangedVerseAndTranslationForRootArray,
    getRootSimpleDTOFromRootDTO,
    getScripture,
    INTERNAL_SERVER_ERROR_RESPONSE_CODE,
    NOT_FOUND_RESPONSE_CODE,
    OK_RESPONSE_CODE, SOMETHING_WENT_WRONG_TOAST,
    TOO_MANY_REQUEST_RESPONSE_CODE,
    UNDEFINED_TRANSLATION_DTO,
} from "@/util/utils";
import {NextPage} from "next";
import {useParams} from "next/navigation";
import {Fragment, Key, useState} from "react";
import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import RootPageNotFoundComponent from "@/components/RootPageNotFoundComponent";
import {useQuery} from "@tanstack/react-query";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import {NoAuthenticationRequestErrorCode, Response} from "@/types/response";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import {useScripture} from "@/hooks/useScripture";
import UIWrapper from "@/components/UI/UIWrapper";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import {IoSettingsOutline} from "react-icons/io5";
import {MdTranslate} from "react-icons/md";
import ChapterPageTranslationModel from "@/components/ChapterPageTranslationModel";
import {Divider} from "@heroui/divider";
import Root from "@/components/UI/Root";
import {Accordion, AccordionItem} from "@heroui/accordion";
import {addToast} from "@heroui/toast";

const Page: NextPage = ({}) => {
    const {rootLatin: rootLatinParam, scriptureCode: scriptureCodeParam} =
        useParams<RootPageParams>();

    const [error, setError] = useState<
        NoAuthenticationRequestErrorCode | undefined
    >(undefined);

    const [preferredTranslationId, setPreferredTranslationId] = useState<
        Set<Key>
    >(new Set([]));

    const [showTranslation, setShowTranslation] = useState<boolean>(true);
    const [showOriginalText, setShowOriginalText] = useState<boolean>(true);
    const [showTransliteration, setShowTransliteration] =
        useState<boolean>(false);
    const [showFootnotes, setShowFootnotes] = useState<boolean>(true);

    const [textVariation, setTextVariation] =
        useState<VerseTextVariation>("text");

    const [isTranslationModelOpen, setIsTranslationModelOpen] =
        useState<boolean>(false);
    const [isSettingsModelOpen, setIsSettingsModelOpen] =
        useState<boolean>(false);

    const {preferredScriptureContext} = useScripture();

    const scripture = getScripture(scriptureCodeParam);

    const {data: root = null, isLoading} = useQuery<RootDTO | null>({
        queryKey: ["root", scriptureCodeParam, rootLatinParam],
        queryFn: async () => await fetchRoot(),
        refetchOnWindowFocus: false,
    });

    const fetchRoot = async (): Promise<RootDTO | null> => {
        if (scripture == undefined) return null;

        try {
            const response = await axiosNoCredentialInstance.get<Response<RootDTO>>(
                `/root/${scripture.number}/${rootLatinParam}`
            );

            switch (response.status) {
                case OK_RESPONSE_CODE:
                    setError(undefined);
                    setPreferredTranslationId(
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

            addToast(SOMETHING_WENT_WRONG_TOAST)
            setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
            return null;
        }
    };

    if (isLoading) return <LoadingSpinnerFullH/>;

    if (
        (error && error === NOT_FOUND_RESPONSE_CODE) ||
        scripture == undefined ||
        root == null
    )
        return (
            <RootPageNotFoundComponent
                rootLatinParam={rootLatinParam}
                scriptureCodeParam={scriptureCodeParam}
            />
        );

    if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
        return <TooManyRequest/>;

    if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
        return <ServerError/>;

    const preferredScripture = preferredScriptureContext[scripture.code];

    const arrangedRoots: VerseAndTranslationForRoot[] =
        getArrangedVerseAndTranslationForRootArray(root, preferredTranslationId);

    const preferredTranslation =
        root.translations.find((t) =>
            preferredScripture.preferredTranslationIdSingle.has(t.translation.id)
        )?.translation ?? UNDEFINED_TRANSLATION_DTO;

    return (
        <Fragment>
            <UIWrapper>
                <div className="w-full flex-col justify-center">
                    <div className="w-full py-2 px-5 flex items-center justify-between">
                        <div className="flex gap-2 items-center justify-start">
              <span
                  className={`font-bold ${preferredScripture.preferredScriptureFont} text-4xl`}
              >
                {root.own}
              </span>
                            <span>-</span>
                            <span className="italic opacity-50">{root.latin}</span>
                            <span className="italic opacity-50"> | </span>
                            <span className="italic opacity-50">
                {root.verses.length} verses have found for including root{" "}
                                {root.own} - {root.latin}
              </span>
                        </div>
                        <div className="flex items-center gap-2 justify-evenly">
                            <MdTranslate
                                size={19}
                                className="cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors"
                                onClick={() => setIsTranslationModelOpen(true)}
                            />
                            <IoSettingsOutline
                                size={19}
                                className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                                onClick={() => setIsSettingsModelOpen(true)}
                            />
                        </div>
                    </div>

                    <Divider className="w-full px-2"/>
                </div>
                <Accordion selectionMode="multiple">
                    {arrangedRoots.map((r, i) => {
                        const verse = r.verse;

                        const scriptureMeaning =
                            verse.chapter.section.scripture.meanings.find(
                                (e) => e.language.langCode === DEFAULT_LANG_CODE
                            )?.meaning ?? "Scripture";

                        const sectionMeaning =
                            verse.chapter.section.meanings.find(
                                (e) => e.language.langCode === DEFAULT_LANG_CODE
                            )?.meaning ?? "Section";

                        const chapterNumber = verse.chapter.number;
                        const verseNumber = verse.number;

                        const word =
                            verse.words.find((w) =>
                                w.roots.some((r) => r.latin === root.latin)
                            ) ?? DEFAULT_NOTFOUND_WORD;

                        const wordText = word[textVariation] ?? word.text;

                        const sequenceNumber = word.sequenceNumber;

                        return (
                            <AccordionItem
                                key={i}
                                textValue={`${i}'th accordion.`}
                                title={
                                    <div className="w-full flex items-center">
                                        <div>
                                            <span>#{i + 1}</span> <span>{scriptureMeaning},</span>{" "}
                                            <span>{sectionMeaning},</span>{" "}
                                            <span>Chapter: {chapterNumber},</span>{" "}
                                            <span>Verse: {verseNumber}</span> {" : "}
                                            <span>{sequenceNumber}</span> <span>{" | "}</span>{" "}
                                            <span className="text-xl">{wordText}</span>{" "}
                                        </div>
                                    </div>
                                }
                            >
                                <Root
                                    root={getRootSimpleDTOFromRootDTO(root)}
                                    verse={r.verse}
                                    translation={preferredTranslation}
                                    translationText={r.translation}
                                    showFootnotes={showFootnotes}
                                    showOriginalText={showOriginalText}
                                    showTranslation={showTranslation}
                                    showTransliteration={showTransliteration}
                                    verseTextVariation={textVariation}
                                    preferredFont={preferredScripture.preferredScriptureFont}
                                />
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </UIWrapper>

            <ChapterPageTranslationModel
                isModalOpen={isTranslationModelOpen}
                setIsModalOpen={setIsTranslationModelOpen}
                preferredTranslationId={preferredTranslationId}
                stateControlFunctionOfPreferredTranslationId={setPreferredTranslationId}
                translations={root.translations}
            />

            <VerseAndChapterPageSettingsModel
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
                preferredFont={preferredScripture.preferredScriptureFont}
                setTextVariation={setTextVariation}
                textVariation={textVariation}
                showFootnotes={showFootnotes}
                setShowFootnotes={setShowFootnotes}
            />
        </Fragment>
    );
};

export default Page;
