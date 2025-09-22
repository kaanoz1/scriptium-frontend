import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { Metadata } from "next";
import { cache } from "react";
import Main from "./main";
import { T_SectionMeaningPageRouteParams } from "./utils/types";
import { fetchSectionNodeAndCreateMetadata } from "./utils/fetchSectionNodeAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_SectionMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const {
      bookMeaning: bookMeaningRouteParam,
      partMeaning: partMeaningRouteParam,
      subPartMeaning: subPartMeaningRouteParam,
      divisionMeaning: divisionMeaningRouteParam,
      sectionMeaning: sectionMeaningRouteParam,
    } = await params;

    const builder = new BookCacheKeyBuilder()
      .setBookMeaning(bookMeaningRouteParam)
      .setPartNodeMeaning(partMeaningRouteParam)
      .setSubPartMeaning(subPartMeaningRouteParam)
      .setDivisionMeaning(divisionMeaningRouteParam)
      .setSectionMeaning(sectionMeaningRouteParam);

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchSectionNodeAndCreateMetadata(
      bookMeaningRouteParam,
      partMeaningRouteParam,
      subPartMeaningRouteParam,
      divisionMeaningRouteParam,
      sectionMeaningRouteParam
    );
  }
);

const Page = () => {
  return <Main />;
};
export default Page;
