import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import { CollectionDTO } from "./classes/Collection";
import { ToastProps } from "../../node_modules/@heroui/toast/dist/use-toast";
import { ToastOptions } from "@react-stately/toast";

export type T_OriginalScriptureTextVariationKey =
  | "usual"
  | "simplified"
  | "withoutVowel";

export type T_FollowStatus = "Accepted" | "Pending";

export type T_ScripturePageParams = {
  scriptureCode: string | T_ScriptureCode;
};
export type T_SectionPageParams = {
  scriptureCode: string;
  sectionNumber: string;
};
export type T_ChapterPageParams = {
  scriptureCode: string;
  sectionNumber: string;
  chapterNumber: string;
};
export type T_VersePageParams = {
  scriptureCode: T_ScriptureCode | string;
  sectionNumber: string;
  chapterNumber: string;
  verseNumber: string;
};

export type T_VerseOptions = {
  stateIsTranslationShown: boolean;
  stateIsOriginalTextShown: boolean;
  stateIsTransliterationShown: boolean;
};

export type T_CollectionCreateForm = {
  collectionName: string;
  description: string | null;
};

export type RefetchDataFunctionType<T> = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<T, Error>>;

export type T_ScriptureCode = "t";
export type T_ValidTranslationId = 1;

export type UnblockUserForm = {
  username: string;
};

export type BlockReason = {
  username: string;
  reason: string | null;
};

export type RootPageParams = {
  scriptureCode: string | T_ScriptureCode;
  rootLatin: string;
};

export type UserPageParams = {
  username: string;
};

export type Column = { key: string; label: string };

export type HasImage = {
  image: string | null;
};

export type T_OriginalScriptureTextFontOfScriptureWithCodeT = "font-davidLibre";

export type T_OriginalScriptureTextFont =
  T_OriginalScriptureTextFontOfScriptureWithCodeT; //Other scriptures shall be added.

export type T_SystemLanguageCode = "en";

export type T_SystemLanguageId = number;

export type Toast = ToastProps & ToastOptions;

export type Overridden<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };

export type T_CreateCollectionForm = {
  collectionName: string;
  description: string | null;
};
