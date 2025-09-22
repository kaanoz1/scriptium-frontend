import { T_SharePlatform } from "@/types/types";
import { addToast } from "@heroui/toast";
import { Response, T_AuthenticationRequestErrorCode } from "@/types/response";
import {
  isNoAuthenticationRequestErrorCode,
  METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "./constants";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { Language } from "@/types/classes/model/Language/Language";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { Translator } from "@/types/classes/model/Translator/Translator";
import { Word } from "@/types/classes/model/Word/Word/Word";
import { Meaning } from "@/types/classes/util/Meaning/Meaning";
import {
  SearchResult,
  T_SearchResultConstructorParametersJSON,
} from "@/types/classes/util/SearchResult/SearchResult";
import { Vocalization } from "@/types/classes/model/Verse/Util/Vocalization";
import { Footnote } from "@/types/classes/model/Footnote/Footnote";

export const handleShare = async (platform: T_SharePlatform, text: string) => {
  const currentUrl = window.location.href;
  const combinedText = `${text}\n${currentUrl}`;

  switch (platform) {
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          combinedText
        )}`,
        "_blank"
      );
      break;

    case "threads":
      window.open(
        `https://www.threads.net/intent/post?text=${encodeURIComponent(
          combinedText
        )}`,
        "_blank"
      );
      break;

    case "direct":
      try {
        await handleCopy(combinedText);
      } catch {
        addToast({ title: "Failed to copy link.", color: "danger" });
      }
      break;

    default:
      addToast({ title: "Unknown platform selected.", color: "danger" });
  }
};

export const handleCopy = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    addToast({ title: "Copied to clipboard!", color: "success" });
  } catch (error) {
    console.error("Failed to copy:", error);
    addToast({ title: "Failed to copy to clipboard.", color: "danger" });
  }
};

export const isAuthenticationRequestErrorCode = (
  input: T_AuthenticationRequestErrorCode | unknown
): input is T_AuthenticationRequestErrorCode => {
  return (
    isNoAuthenticationRequestErrorCode(input) ||
    input == METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE
  );
};

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

export const UNKNOWN_LANGUAGE: Language = new Language({
  langCode: "en",
  langEnglish: "unknown",
  langOwn: "unknown",
});

export const UNKNOWN_TRANSLATOR: Translator = new Translator({
  name: "Unknown Translator",
  language: UNKNOWN_LANGUAGE,
  url: null,
});
export const UNKNOWN_TRANSLATION: Translation = new Translation({
  id: 0,
  name: "Unknown Translation",
  language: UNKNOWN_LANGUAGE,
  translators: [UNKNOWN_TRANSLATOR],
  isEager: false,
});

export const UNKNOWN_FOOTNOTES: Footnote = new Footnote({
  index: 0,
  text: "Unknown footnote.",
});

export const UNDEFINED_TRANSLATION_TEXT_: TranslationText = new TranslationText(
  {
    text: "Unknown Text",
    translation: UNKNOWN_TRANSLATION,
    footNotes: [UNKNOWN_FOOTNOTES],
  }
);

export const UNKNOWN_TEXT_VARIATION: Vocalization = new Vocalization({
  usual: "NOTFOUND",
  simplified: null,
  withoutVowel: null,
});

export const DEFAULT_NOTFOUND_WORD: Word = new Word({
  id: 0,
  sequenceNumber: 0,
  variation: UNKNOWN_TEXT_VARIATION,
  meanings: [new Meaning({ text: "UNKNOWN", language: UNKNOWN_LANGUAGE })],
});

export const fetchQuery = async (
  query: string
): Promise<SearchResult | null> => {
  const length = query.trim().length;
  if (length < 3 || length > 126) return null;

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_SearchResultConstructorParametersJSON>
    >(`/query/search?query=${encodeURIComponent(query)}`);

    return SearchResult.createFromJSON(response.data.data);
  } catch (error) {
    console.error(error);
    addToast(SOMETHING_WENT_WRONG_TOAST);
    return null;
  }
};
export function shuffleArray(array: string[]): string[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }

  return shuffled;
}
