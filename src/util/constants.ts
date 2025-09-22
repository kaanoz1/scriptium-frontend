import { ChapterUpper } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpper";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { Verse } from "@/types/classes/model/Verse/Verse/Verse";
import type { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import type {
  T_SystemLanguageId,
  T_SystemLanguageCode,
  Toast,
} from "@/types/types";
import { Metadata } from "next";

export const PROJECT_NAME = "Scriptium";
export const PROJECT_DESCRIPTION =
  "Open-source platform that brings together sacred and theological texts from across traditions—designed for researchers, students, and seekers to explore, compare, and study ancient wisdom in a modern interface.";

export const SERVER_URL = process.env["NEXT_PUBLIC_SERVER_URL"];

if (!SERVER_URL) throw new Error("SERVER_URL is not initialized.");

export const PROJECT_EMAIL_ADDRESS = "info@scriptium.net";
export const PROJECT_INSTAGRAM_ADDRESS =
  "https://www.instagram.com/scriptium_en/";
export const PROJECT_X_ADDRESS = "https://x.com/Scriptium_en";
export const DISCORD_BOT_ADD_URL =
  "https://discord.com/oauth2/authorize?client_id=1336220556227383327";

export const PATREON_SUPPORT_URL = "https://www.patreon.com/Scriptium";

export const PAYPAL_SUPPORT_URL = undefined;

export const GITHUB_SCRIPTIUM_PROJECT_URL =
  "https://github.com/scriptium-project";
export const GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL =
  "https://github.com/scriptium-project/scriptium-frontend";
export const GITHUB_SCRIPTIUM_BACKEND_PROJECT_URL =
  "https://github.com/scriptium-project/scriptium-backend";
export const GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL =
  "https://github.com/scriptium-project/scriptium-discord-bot";
export const GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL =
  "https://github.com/scriptium-project/scriptium-mobile";

export const VALID_PROFILE_PICTURE_EXTENSIONS: ReadonlyArray<string> = [
  "image/jpeg",
  "image/jpg",
] as const;

export const SystemLanguages: Readonly<
  Record<T_SystemLanguageId, T_SystemLanguageCode>
> = {
  1: "en",
} as const;

export const NOT_FOUND_HTTP_RESPONSE_CODE = 404;
export const CONFLICT_HTTP_RESPONSE_CODE = 409;
export const UNAUTHORIZED_HTTP_RESPONSE_CODE = 401;
export const TOO_MANY_REQUEST_HTTP_RESPONSE_CODE = 429;
export const INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE = 500;

export const METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE = 405;

export const OK_HTTP_RESPONSE_CODE = 200;

export const isNoAuthenticationRequestErrorCode: (
  input: T_NoAuthenticationRequestErrorCode | unknown
) => input is T_NoAuthenticationRequestErrorCode = (
  input: T_NoAuthenticationRequestErrorCode | unknown
) => {
  return (
    input === UNAUTHORIZED_HTTP_RESPONSE_CODE ||
    input === NOT_FOUND_HTTP_RESPONSE_CODE ||
    input === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE ||
    input === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE ||
    input === CONFLICT_HTTP_RESPONSE_CODE
  );
};

export const DEFAULT_LANG_CODE = "en";
export const SIGN_UP_URL = "/auth/signup";
export const SIGN_IN_URL = "/auth/signin";

export const MAX_LENGTH_FOR_COLLECTION_NAME = 24;
export const MAX_LENGTH_FOR_COLLECTION_DESCRIPTION = 72;
export const MAX_LENGTH_FOR_COMMENT = 250;
export const MAX_LENGTH_FOR_NOTE = 1000;

export const MAX_USER_COLLECTION_COUNT = 3;

export const TOOL_TIP_CLASS_NAMES: Record<string, string[]> = {
  content: ["text-white bg-black dark:text-black dark:bg-white"],
  base: [`before:bg-black dark:before:bg-white`],
} as const;

export const SOMETHING_WENT_WRONG_TOAST: Toast = {
  title: "Something went unexpectedly wrong?",
  description:
    "An unexpected issue occurred. If the issue persists, please report it.",
  color: "danger",
};

export const getShareTextOfVerse = (
  verse: Verse,
  chapter: Readonly<ChapterUpper>,
  selectedTranslationTexts: ReadonlyArray<TranslationText>
): string => {
  const verseNumber = verse.getNumber();
  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();

  const scripture = section.getScripture();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();

  return `${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}, Verse: ${verseNumber}\n
${selectedTranslationTexts
  .map((tt) => {
    const text = tt.getText();

    const translation = tt.getTranslation();
    const translationName = translation.getName();

    return `${translationName}:\n${text}`;
  })
  .join("\n\n")
  .concat("\n\n")
  .concat(window.location.href)}`;
};

export const ERROR_METADATA: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};
