"use client";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import CollectionModal from "@/components/VerseCollectionModal";
import WordVerse from "@/components/UI/WordVerse";
import { useScripture } from "@/hooks/useScripture";
import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import {
  AvailableScriptureKey,
  ScriptureDetails,
  TranslationTextDTO,
  VerseDTO,
  VerseTextVariation,
} from "@/types/types";
import {
  DEFAULT_LANG_CODE,
  getScripture,
  getShareTextForVersePage,
  getVerseInformation,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  PROJECT_URL,
  TOO_MANY_REQUEST_RESPONSE_CODE,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/utils";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, Key, useState } from "react";
import { GoBookmarkFill, GoBookmark } from "react-icons/go";
import { GrNext, GrPrevious, GrShareOption } from "react-icons/gr";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFormatListNumbered, MdTranslate } from "react-icons/md";
import VersePageTabs from "@/components/VersePageTabs";
import { Tooltip } from "@heroui/tooltip";
import VersePageTranslationModal from "@/components/VersePageTranslationModal";
import { useUser } from "@/hooks/useUser";
import VersePageNotFoundComponent from "@/components/VersePageNotFoundComponent";
import VersePageTranslationBoxComponent from "@/components/VersePageTranslationBoxComponent";
import VersePageShareModal from "@/components/VersePageShareModal";

type VersePageParams = {
  scriptureCode: AvailableScriptureKey | string;
  sectionNumber: string;
  chapterNumber: string;
  verseNumber: string;
};

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const [showFootnotes, setShowFootnotes] = useState<boolean>(true);

  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showOriginalText, setShowOriginalText] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] =
    useState<boolean>(false);

  const [textVariation, setTextVariation] =
    useState<VerseTextVariation>("text");
  const [shareText, setShareText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    useState<boolean>(false);

  const [preferredTranslationIds, setPreferredTranslationIds] = useState<
    Set<Key>
  >(new Set([]));

  const { preferredScriptureContext } = useScripture();

  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
    chapterNumber: chapterNumberParam,
    verseNumber: verseNumberParam,
  } = useParams<VersePageParams>();

  const scripture: ScriptureDetails | undefined =
    getScripture(scriptureCodeParam);

  const sectionNumber: number = Number.parseInt(sectionNumberParam);
  const chapterNumber: number = Number.parseInt(chapterNumberParam);
  const verseNumber: number = Number.parseInt(verseNumberParam);

  const isAvailable: boolean =
    scripture == undefined ||
    Number.isNaN(sectionNumber) ||
    Number.isNaN(chapterNumber) ||
    Number.isNaN(verseNumber);

  const fetchVerse = async () => {
    if (scripture == undefined || isAvailable) {
      //For some reason, even if I checked that scripture variable is not nullish. If do not check that it is, TypeScripts pops up error : "scripture might be undefined." So I checked it manually.
      setError(NOT_FOUND_RESPONSE_CODE);
      return null;
    }

    try {
      const response = await axiosCredentialInstance.get<Response<VerseDTO>>(
        `/verse/${scripture.number}/${sectionNumber}/${chapterNumber}/${verseNumber}`
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          setError(undefined);

          setPreferredTranslationIds(
            preferredScriptureContext[scripture.code]
              .preferredTranslationIdsMultiple
          );

          setIsSaved(response.data.data.isSaved);
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
      //TODO: Add toast.
      console.error(error);
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return null;
    }
  };

  const { data: verse = null, isLoading } = useQuery({
    queryKey: [
      "verse-page",
      scriptureCodeParam,
      sectionNumberParam,
      chapterNumberParam,
      verseNumberParam,
    ],
    queryFn: async () => await fetchVerse(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { user, isLoading: isUserLoading } = useUser();

  if (isLoading || isUserLoading) return <LoadingSpinnerFullH />;

  if (
    (error && error === NOT_FOUND_RESPONSE_CODE) ||
    scripture == undefined ||
    verse == null ||
    isAvailable
  )
    return (
      <VersePageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
        chapterNumber={chapterNumberParam}
        verseNumber={verseNumberParam}
      />
    );

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;
  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      // TODO: Add toast.
    } catch (error) {
      // TODO: Add toast.

      console.log("Failed to copy text.");
    }
  };

  const handleShare = async (platform: string) => {
    console.log(`Sharing content to: ${platform}`);
    //TODO: Will be implemented
  };

  const verseText: string = verse[textVariation] ?? verse.text;

  const scriptureMeaning: string =
    verse.chapter.section.scripture.meanings.find(
      (e) => e.language.langCode === DEFAULT_LANG_CODE
    )?.meaning ?? "Scripture";

  const scriptureCode: AvailableScriptureKey = scripture.code;

  const scriptureNameInOwnLanguage: string =
    verse.chapter.section.scripture.name;

  const sectionNameInOwnLanguage: string = verse.chapter.section.name;

  const sectionMeaning: string =
    verse.chapter.section.meanings.find(
      (e) => e.language.langCode === DEFAULT_LANG_CODE
    )?.meaning ?? "Section";

  const preferredFont: string =
    preferredScriptureContext[scripture.code].preferredScriptureFont;

  const transliteration: string | JSX.Element = verse.transliterations.find(
    (t) => t.language.langCode === DEFAULT_LANG_CODE
  )?.transliteration ?? (
    <span className="italic">No transliteration available.</span>
  );

  const { doesNextVerseExists, doesPreviousVerseExists } = getVerseInformation(
    scriptureCode,
    sectionNumber,
    chapterNumber,
    verseNumber
  );

  const translationTexts: Array<TranslationTextDTO> = verse.translationTexts;

  const shareTextString: string = getShareTextForVersePage(
    scriptureMeaning,
    scriptureNameInOwnLanguage,
    sectionNameInOwnLanguage,
    sectionMeaning,
    chapterNumber,
    preferredTranslationIds,
    verseText,
    verseNumber,
    translationTexts
  );

  return (
    <Fragment>
      <main className="bg-white dark:bg-dark min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-16 text-gray-900 dark:text-gray-200 dark:bg-black/80"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
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
                <BreadcrumbItem
                  href={`${PROJECT_URL}/${scriptureCode}/${sectionNumber}/${chapterNumber}`}
                >
                  {`Chapter ${chapterNumber}`}
                </BreadcrumbItem>
                <BreadcrumbItem>{verseNumber}</BreadcrumbItem>
              </Breadcrumbs>

              <div className="flex justify-center items-center gap-5 pe-10">
                <span>
                  {isSaved ? (
                    <GoBookmarkFill
                      className="cursor-pointer text-violet-700 dark:text-violet-300"
                      onClick={() => setIsCollectionModalOpen(true)}
                      size={20}
                    />
                  ) : (
                    <GoBookmark
                      className="cursor-pointer"
                      onClick={() => setIsCollectionModalOpen(true)}
                      size={20}
                    />
                  )}
                </span>

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
                      <IoPlayOutline size={21} />
                    </Link>
                  </span>
                </Tooltip>

                <GrShareOption
                  size={19}
                  className="cursor-pointer hover:text-teal-700 dark:hover:text-teal-500"
                  onClick={() => {
                    setIsShareModalOpen(true);
                    setShareText(shareTextString);
                  }}
                />

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

                <Link
                  color="foreground"
                  href={`/${scripture.code}/${sectionNumber}/${chapterNumber}/${
                    verseNumber - 1
                  }`}
                  isDisabled={!doesPreviousVerseExists}
                >
                  <GrPrevious
                    size={18}
                    className="cursor-pointer hover:text-blue-700 transition-colors"
                  />
                </Link>

                <Link
                  color="foreground"
                  href={`/${scripture.code}/${sectionNumber}/${chapterNumber}/${
                    verseNumber + 1
                  }`}
                  isDisabled={!doesNextVerseExists}
                >
                  <GrNext
                    size={18}
                    className="cursor-pointer hover:text-blue-700 transition-colors"
                  />
                </Link>
              </div>
            </div>
          </div>

          <Divider className="my-5 text-xss dark:opacity-25 opacity-75" />

          <div className="flex flex-col gap-8">
            {verse.translationTexts
              .filter(
                (
                  t //Weeding out the unwanted translations.
                ) => preferredTranslationIds.has(t.translation.id.toString())
              )
              .map((translationText, i) => (
                <div key={i}>
                  {showTranslation && (
                    <VersePageTranslationBoxComponent
                      translationText={translationText}
                      showFootnotes
                    />
                  )}
                </div>
              ))}

            <div className="flex flex-col gap-2">
              {showOriginalText && (
                <div
                  className={`text-3xl text-right leading-relaxed ${preferredFont}`}
                >
                  {verseText}
                </div>
              )}

              {showTransliteration && (
                <div className="text-sm font-light italic pt-2 text-gray-700 dark:text-gray-400">
                  {transliteration}
                </div>
              )}
            </div>

            <div className="flex flex-row w-full pt-10 gap-10 ">
              <div className="w-full flex-[3] ">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-3 justify-center p-2 px-4 w-full rounded-t-lg border border-neutral-400/50 dark:border-gray-500 bg-gray-100 dark:bg-dark/70 text-gray-700 dark:text-gray-200">
                    <div className="w-full flex justify-start">
                      <span className="p-1 bg-gray-200/80 dark:bg-gray-950 text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
                        <MdOutlineFormatListNumbered size={20} /> Words
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center w-full py-1.5 px-2.5 border-x border-b border-neutral-300 dark:border-gray-600 bg-white dark:bg-dark">
                    <div className="w-full flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300 dark:bg-dark">
                      <span className="px-2">#</span>
                      <span className="px-2">Word</span>
                      <div className="px-2 flex gap-5">Roots</div>
                    </div>
                  </div>

                  {verse.words.map((w) => (
                    <WordVerse
                      variation={textVariation}
                      key={w.sequenceNumber}
                      word={w}
                      scriptureCode={scriptureCode}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-[5] text-gray-600 dark:text-gray-300">
                <VersePageTabs
                  user={user}
                  verse={verse}
                  showFootnotes={showFootnotes}
                  translationTexts={verse.translationTexts}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <VersePageTranslationModal
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preferredTranslationIds={preferredTranslationIds}
        setPreferredTranslationIds={setPreferredTranslationIds}
        translationTexts={verse.translationTexts}
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
        preferredFont={preferredFont}
        setTextVariation={setTextVariation}
        textVariation={textVariation}
        showFootnotes={showFootnotes}
        setShowFootnotes={setShowFootnotes}
      />

      <VersePageShareModal
        shareTextState={shareText}
        stateControlFunctionOfShareTextState={setShareText}
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
        handleCopyFunction={handleCopy}
        handleShareFunction={handleShare}
      />

      <CollectionModal
        isCollectionModalOpen={isCollectionModalOpen}
        setIsCollectionModalOpen={setIsCollectionModalOpen}
        setIsSaved={setIsSaved}
        verseId={verse.id}
      />
    </Fragment>
  );
};

export default Page;
