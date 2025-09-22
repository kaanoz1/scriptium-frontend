import { Metadata, NextPage } from "next";
import Main from "./main";
import { T_DivisionMeaningPageRouteParams } from "./utils/types";
import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { cache } from "react";
import { fetchDivisionNodeAndCreateMetadata } from "./utils/fetchDivisionNodeAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_DivisionMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const {
      bookMeaning: bookMeaningRouteParam,
      partMeaning: partMeaningRouteParam,
      subPartMeaning: subPartMeaningRouteParam,
      divisionMeaning: divisionMeaningRouteParam,
    } = await params;

    const builder = new BookCacheKeyBuilder()
      .setBookMeaning(bookMeaningRouteParam)
      .setPartNodeMeaning(partMeaningRouteParam)
      .setSubPartMeaning(subPartMeaningRouteParam)
      .setDivisionMeaning(divisionMeaningRouteParam);

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchDivisionNodeAndCreateMetadata(
      bookMeaningRouteParam,
      partMeaningRouteParam,
      subPartMeaningRouteParam,
      divisionMeaningRouteParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
