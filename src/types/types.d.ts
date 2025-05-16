import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UUID } from "crypto";
import { CollectionDTO } from "./classes/Collection";
import { ToastProps } from "../../node_modules/@heroui/toast/dist/use-toast";
import { ToastOptions } from "@react-stately/toast";

export type T_ScriptureTextVariationKey =
  | "usual"
  | "simplified"
  | "withoutVowel";

export type T_FollowStatus = "Accepted" | "Pending";

export type T_ScripturePageParams = {
  scriptureCode: string | T_ValidScriptureCode;
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
  scriptureCode: T_ValidScriptureCode | string;
  sectionNumber: string;
  chapterNumber: string;
  verseNumber: string;
};

export type VerseOptions = {
  stateIsTranslationShown: boolean;
  stateIsOrignalTextShown: boolean;
  stateIsTransliterationShown: boolean;
};

export type CreateCollectionForm = {
  collectionName: string;
  description: string | null;
};

export type RefetchDataFunctionType = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<unknown, Error>>;

export type T_ValidScriptureCode = "t";
export type T_ValidScriptureNumber = 1;
export type T_ValidTranslationId = 1;
export type T_ValidScriptureFont = "font-davidLibre";

export type UnblockUserForm = {
  username: string;
};

export type BlockReason = {
  username: string;
  reason: string | null;
};

export type RootPageParams = {
  scriptureCode: string | T_ValidScriptureCode;
  rootLatin: string;
};

export type UserPageParams = {
  username: string;
};

export type Column = { key: string; label: string };

export type HasImage = {
  image: string | null;
};

export type Toast = ToastProps & ToastOptions;

export type Overridden<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
