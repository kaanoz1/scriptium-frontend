import axiosCredentialInstance from "@/client/axiosCredentialInstance";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { Response, ResponseMessage } from "@/types/response";
import { Toast } from "@/types/types";
import { SlotsToClasses } from "@heroui/theme";
import { addToast } from "@heroui/toast";

import { TextVariationDTO, VerseDTO } from "@/types/classes/Verse";
import { TranslationDTO } from "@/types/classes/Translation";
import {
  TranslationTextDTO,
  TranslationTextWithVerseUpperMeanDTO,
} from "@/types/classes/TranslationText";
import { LanguageDTO, Meaning } from "@/types/classes/Language";
import { TranslatorDTO } from "@/types/classes/Translator";
import { WordDTO } from "@/types/classes/Word";
import { UserDTO, UserFetchedDTO, UserOwnDTO } from "@/types/classes/User";
import { FootNoteDTO } from "@/types/classes/FootNote";
import { NoteOwnDTO } from "@/types/classes/Note";
import { ChapterUpperDTO } from "@/types/classes/Chapter";
import { CommentBaseDTO } from "@/types/classes/Comment";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "./constants";
import { ScripturesDetails } from "./scriptureDetails";

export function formatDate(input: string): string;
export function formatDate(input: Readonly<Date>): string;
export function formatDate(input: string | Readonly<Date>): string {
  let date: Date;

  if (input instanceof Date) date = input;
  else date = new Date(input);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-US", options).replace(",", "");
}

export function formatDateDMY(input: Date): string;
export function formatDateDMY(input: string): string;
export function formatDateDMY(input: string | Date): string {
  let date: Date;

  if (input instanceof Date) date = input;
  else date = new Date(input);

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getLocalItemFromLocalStorage: (key: string) => string | null = (
  key: string
) => localStorage.getItem(key);

export const setLocalItemToLocalStore: (key: string, data: unknown) => void = (
  key: string,
  data: unknown
) => {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(key, stringifyData);
};

export const UNKNOWN_LANGUAGE: LanguageDTO = new LanguageDTO({
  langCode: "en",
  langEnglish: "unknown",
  langOwn: "unknown",
});

export const UNKNOWN_TRANSLATOR: TranslatorDTO = new TranslatorDTO({
  name: "Unknown Translator",
  language: UNKNOWN_LANGUAGE,
  url: null,
});
export const UNKNOWN_TRANSLATION: TranslationDTO = new TranslationDTO({
  id: 0,
  name: "Unknown Translation",
  language: UNKNOWN_LANGUAGE,
  translators: [UNKNOWN_TRANSLATOR],
  isEager: false,
});

export const UNKNOWN_FOOTNOTES: FootNoteDTO = new FootNoteDTO({
  index: 0,
  text: "Unknown footnote.",
});

export const UNDEFINED_TRANSLATION_TEXT_DTO: TranslationTextDTO =
  new TranslationTextDTO({
    text: "Unknown Text",
    translation: UNKNOWN_TRANSLATION,
    footNotes: [UNKNOWN_FOOTNOTES],
  });

export const UNKNOWN_TEXT_VARIATION: TextVariationDTO = new TextVariationDTO({
  usual: "NOTFOUND",
  simplified: null,
  withoutVowel: null,
});

export const DEFAULT_NOTFOUND_WORD: WordDTO = new WordDTO({
  id: 0,
  sequenceNumber: 0,
  variation: UNKNOWN_TEXT_VARIATION,
  meanings: [new Meaning({ text: "UNKNOWN", language: UNKNOWN_LANGUAGE })],
});

export function getFormattedNameAndSurname(
  user:
    | Readonly<UserDTO>
    | Readonly<UserFetchedDTO>
    | Readonly<UserOwnDTO>
    | UserDTO
    | UserFetchedDTO
    | UserOwnDTO
): string {
  const name: string = user.getName();
  const surname: string | null = user.getSurname();

  return `${name} ${surname}`.trim();
}

export const likeCommentAttachedToEntityAndReturnResponse = async (
  comment: CommentBaseDTO,
  entityId: number
) => {
  const commentId = comment.getId();
  return await axiosCredentialInstance.post<ResponseMessage>(
    `/like/comment/verse`,
    { commentId, entityId }
  );
};

export function getFormattedNameAndSurnameFromString(
  name: string,
  surname: string | null | undefined
) {
  return `${name} ${surname}`.trim();
}

export const unlikeCommentAttachedToEntityAndReturnResponse = async (
  comment: CommentBaseDTO,
  entityId: number
) => {
  const commentId = comment.getId();

  return await axiosCredentialInstance.delete<ResponseMessage>(
    `/like/unlike/comment`,
    { data: { commentId, entityId } }
  );
};

export const handleNoteLike = async (note: NoteOwnDTO) => {
  return await axiosCredentialInstance.post<ResponseMessage>(`/like/note`, {
    note: note.getId(),
  });
};

export const handleNoteUnlike = async (note: NoteOwnDTO) => {
  return await axiosCredentialInstance.delete<ResponseMessage>(
    `/like/unlike/note`,
    { data: { noteId: note.getId() } }
  );
};

export const TOOL_TIP_CLASS_NAMES: SlotsToClasses<
  "base" | "content" | "arrow"
> = {
  content: ["text-white bg-black dark:text-black dark:bg-white"],
  base: [`before:bg-black dark:before:bg-white`],
};

export const fetchQuery = async (query: string) => {
  try {
    const response = await axiosNoCredentialInstance.get<
      Response<TranslationTextWithVerseUpperMeanDTO[]>
    >(`/query/search?query=${encodeURIComponent(query)}`);

    return response.data.data ?? [];
  } catch (error) {
    console.error(error);
    addToast(SOMETHING_WENT_WRONG_TOAST);
    return [];
  }
};

export const SOMETHING_WENT_WRONG_TOAST: Toast = {
  title: "Something went unexpectedly wrong?",
  description:
    "An unexpected issue occurred. If the issue persists, please report it.",
  color: "danger",
};

export const getErrorToast = (error: unknown, description?: string): Toast => {
  const toast: Toast = {
    title: "Error?",
    description:
      description ??
      "Something went wrong, please try again later. If persist, please report this situation.",
    color: "danger",
  };

  if (error instanceof Error) toast.description = error.message;

  return toast;
};

export const displayErrorToast = (error: unknown, description?: string) => {
  const errorToast: Toast = getErrorToast(error, description);
  addToast(errorToast);
};

export const handleCopy = async (textToBeCopied: string) => {
  let toastToBeDisplayed: Toast | null = null;
  try {
    await navigator.clipboard.writeText(textToBeCopied);

    toastToBeDisplayed = {
      title: "Copied!",
      color: "success",
    };
  } catch (error) {
    console.error(error);

    toastToBeDisplayed = {
      title: "Couldn't copy. Try again later.",
      description: `Error: ${error}`,
      color: "danger",
    };
  } finally {
    addToast(toastToBeDisplayed as Toast);
  }
};

export const getShareTextOfVerse = (
  verse: VerseDTO,
  chapter: Readonly<ChapterUpperDTO>,
  selectedTranslationTexts: ReadonlyArray<TranslationTextDTO>
): string => {
  const verseNumber = verse.getNumber();
  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();

  const scripture = section.getScripture();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();

  return `${PROJECT_NAME},\n${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}, Verse: ${verseNumber}\n\n
${selectedTranslationTexts
  .map((tt) => {
    const text = tt.getText();

    const translation = tt.getTranslation();
    const translationName = translation.getName();

    return `${translationName}:\n     ${text}`;
  })
  .join("\n\n")
  .concat("\n\n")
  .concat(window.location.href)}`;
};
export { DEFAULT_LANG_CODE, ScripturesDetails };
