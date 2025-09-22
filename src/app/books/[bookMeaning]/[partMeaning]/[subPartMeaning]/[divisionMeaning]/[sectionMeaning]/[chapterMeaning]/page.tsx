import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { Metadata } from "next";
import { cache } from "react";
import Main from "./main";
import { T_ChapterMeaningPageRouteParams } from "./utils/types";
import { fetchChapterNodeAndCreateMetadata } from "./utils/fetchChapterNodeAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_ChapterMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const {
      bookMeaning: bookMeaningRouteParam,
      partMeaning: partMeaningRouteParam,
      subPartMeaning: subPartMeaningRouteParam,
      divisionMeaning: divisionMeaningRouteParam,
      sectionMeaning: sectionMeaningRouteParam,
      chapterMeaning: chapterMeaningRouteParam,
    } = await params;

    const builder = new BookCacheKeyBuilder()
      .setBookMeaning(bookMeaningRouteParam)
      .setPartNodeMeaning(partMeaningRouteParam)
      .setSubPartMeaning(subPartMeaningRouteParam)
      .setDivisionMeaning(divisionMeaningRouteParam)
      .setSectionMeaning(sectionMeaningRouteParam)
      .setChapterMeaning(chapterMeaningRouteParam);

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchChapterNodeAndCreateMetadata(
      bookMeaningRouteParam,
      partMeaningRouteParam,
      subPartMeaningRouteParam,
      divisionMeaningRouteParam,
      sectionMeaningRouteParam,
      chapterMeaningRouteParam
    );
  }
);

const Page = () => {
  return <Main />;
};
export default Page;
