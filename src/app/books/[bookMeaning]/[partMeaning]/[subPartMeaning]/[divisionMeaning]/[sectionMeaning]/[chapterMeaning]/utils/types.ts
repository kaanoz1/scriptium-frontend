import { T_SectionMeaningPageRouteParams } from "../../utils/types";

export type T_ChapterMeaningPageRouteParams =
  T_SectionMeaningPageRouteParams & {
    chapterMeaning: string;
  };
