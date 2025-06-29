"use client";
import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import CollectionModal from "@/components/VerseCollectionModal";
import WordVerse from "@/components/UI/WordVerse";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ScriptureCode, T_VersePageParams } from "@/types/types";
import {
  DEFAULT_LANG_CODE,
  getShareTextOfVerse,
  SOMETHING_WENT_WRONG_TOAST,
  TOOL_TIP_CLASS_NAMES,
} from "@/util/utils";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { GrNext, GrPrevious, GrShareOption } from "react-icons/gr";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFormatListNumbered, MdTranslate } from "react-icons/md";
import VersePageTabs from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/VersePageTabs";
import { Tooltip } from "@heroui/tooltip";
import VersePageTranslationModal from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/VersePageTranslationModal";
import { useUser } from "@/hooks/useUser";
import VersePageNotFoundComponent from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/VersePageNotFoundComponent";
import VersePageShareModal from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/VersePageShareModal";
import { addToast } from "@heroui/toast";
import { ScriptureDTO } from "@/types/classes/Scripture";
import {
  T_VerseBothDTOConstructorParametersJSON,
  VerseBothDTO,
} from "@/types/classes/Verse";
import { SectionUpperDTO } from "@/types/classes/Section";
import { TranslationTextDTO } from "@/types/classes/TranslationText";
import CollectionModelMustSignIn from "@/components/UI/CollectionModalMustSignIn";
import axios from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import { ChapterUpperDTO } from "@/types/classes/Chapter";
import { useScripturePreferences } from "@/hooks/useScripture";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  PROJECT_URL,
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getScriptureIfCodeIsValid } from "@/util/func";
import { ScriptureDetail } from "@/util/scriptureDetails";
import Verse from "@/components/verse/Verse";
import { TranslationDTO } from "@/types/classes/Translation";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [shareText, setShareText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    useState<boolean>(false);

  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
    chapterNumber: chapterNumberParam,
    verseNumber: verseNumberParam,
  } = useParams<T_VersePageParams>();

  const scriptureDetail: Readonly<ScriptureDetail> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const {
    preference,
    setTranslationIdMultiple,
    setShowTranslations,
    setShowTransliterations,
    setShowOriginalText,
    setOriginalTextVariation,
    setShowFootnotes,
  } = useScripturePreferences("t"); //TODO: Amend;

  const { data: verse = null, isLoading } = useQuery({
    queryKey: [
      "verse-page",
      scriptureCodeParam,
      sectionNumberParam,
      chapterNumberParam,
      verseNumberParam,
    ],
    queryFn: async () =>
      await fetchVerse(
        scriptureDetail,
        sectionNumberParam,
        chapterNumberParam,
        verseNumberParam
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { user, isUserLoading } = useUser();

  if (isLoading || isUserLoading) return <LoadingSpinnerFullH />;

  if (verse == null || isNoAuthenticationRequestErrorCode(verse))
    return getErrorComponent({
      code: verse,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <VersePageNotFoundComponent
            scriptureCode={scriptureCodeParam}
            sectionNumber={sectionNumberParam}
            chapterNumber={chapterNumberParam}
            verseNumber={verseNumberParam}
          />
        ),
      },
    });

  if (scriptureDetail === null)
    return (
      <VersePageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
        chapterNumber={chapterNumberParam}
        verseNumber={verseNumberParam}
      />
    );

  const options = preference.getOptions();

  const verseNumber = verse.getNumber();

  const chapter: Readonly<ChapterUpperDTO> = verse.getChapter();
  const chapterNumber = chapter.getNumber();

  const section: Readonly<SectionUpperDTO> = chapter.getSection();
  const sectionNameInOwnLanguage: string = section.getName();
  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNumber = section.getNumber();

  const scripture: Readonly<ScriptureDTO> = section.getScripture();
  const scriptureCode: T_ScriptureCode = scripture.getCode();
  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage: string = scripture.getName();

  const { doesNextVerseExists, doesPreviousVerseExists } =
    scriptureDetail.getVerseInformation(
      sectionNumber,
      chapterNumber,
      verseNumber
    );

  const translationTexts: ReadonlyArray<TranslationTextDTO> =
    verse.getTranslationTexts();

  const shareTextString: string = getShareTextOfVerse(
    verse,
    chapter,
    translationTexts
  );

  const showFootnotes = options.getShowFootnotes();
  const textVariation = options.getVariation();

  const selectedTranslations: Array<TranslationDTO> = scriptureDetail
    .getTranslations()
    .filter((t) =>
      preference.getPreferredTranslationIdMultiple().has(t.getId())
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
                    {/*Since items-center tag does not affect this span as it is located in Tooltip, I had to adjust it again. */}
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
                  href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${
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
                  href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${
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
            <Verse
              verse={verse}
              selectedTranslations={selectedTranslations}
              preference={preference}
              showTranslationHeader
            />

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
                      <div className="px-2 flex gap-5">Root/Lemma(s)</div>
                    </div>
                  </div>

                  {verse.getWords().map((w) => (
                    <WordVerse
                      variation={textVariation}
                      key={w.getSequenceNumber()}
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
                  translationTexts={translationTexts}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <VersePageTranslationModal
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preference={preference}
        scriptureDetail={scriptureDetail}
        setTranslationIdMultiple={setTranslationIdMultiple}
      />

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        scriptureDetail={scriptureDetail}
        preference={preference}
        setShowTranslation={setShowTranslations}
        setShowTransliteration={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
        setOriginalTextVariation={setOriginalTextVariation}
      />

      <VersePageShareModal
        shareTextState={shareText}
        stateControlFunctionOfShareTextState={setShareText}
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
        handleShareFunction={handleShare}
      />

      {user ? (
        <CollectionModal
          user={user}
          isCollectionModalOpen={isCollectionModalOpen}
          setIsCollectionModalOpen={setIsCollectionModalOpen}
          setIsSaved={setIsSaved}
          verse={verse}
        />
      ) : (
        <CollectionModelMustSignIn
          isCollectionModalOpen={isCollectionModalOpen}
          setIsCollectionModalOpen={setIsCollectionModalOpen}
        />
      )}
    </Fragment>
  );
};

export default Page;

const fetchVerse = async (
  scriptureDetail: Readonly<ScriptureDetail> | null,
  sectionNumber: number | string,
  chapterNumber: number | string,
  verseNumber: number | string
): Promise<VerseBothDTO | T_NoAuthenticationRequestErrorCode> => {
  const parsedSectionNumber = Number(sectionNumber);
  const parsedChapterNumber = Number(chapterNumber);
  const parsedVerseNumber = Number(verseNumber);

  if (
    scriptureDetail == null ||
    Number.isNaN(parsedSectionNumber) ||
    Number.isNaN(parsedChapterNumber) ||
    Number.isNaN(parsedVerseNumber)
  )
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scriptureDetail.getNumber();
  try {
    const response = await axiosCredentialInstance.get<
      Response<T_VerseBothDTOConstructorParametersJSON>
    >(
      `/verse/${scriptureNumber}/${parsedSectionNumber}/${parsedChapterNumber}/${parsedVerseNumber}`
    );

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return VerseBothDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);

    if (
      !axios.isAxiosError(error) ||
      !error.response ||
      !isNoAuthenticationRequestErrorCode(error.response.status)
    )
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;

    return error.response.status;
  }
};

const handleShare = async (platform: string) => {
  console.log(`Sharing content to: ${platform}`);
  //TODO: Will be implemented
};
