import { Metadata, NextPage } from "next";
import Main from "./main";
import { T_SubPartMeaningPageRouteParams } from "./utils/types";
import { cache } from "react";
import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { fetchSubPartNodeAndCreateMetadata } from "./utils/fetchSubPartNodeAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_SubPartMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const {
      bookMeaning: bookMeaningRouteParam,
      partMeaning: partMeaningRouteParam,
      subPartMeaning: subPartMeaningRouteParam,
    } = await params;

    const builder = new BookCacheKeyBuilder()
      .setBookMeaning(bookMeaningRouteParam)
      .setPartNodeMeaning(partMeaningRouteParam)
      .setSubPartMeaning(subPartMeaningRouteParam);

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchSubPartNodeAndCreateMetadata(
      bookMeaningRouteParam,
      partMeaningRouteParam,
      subPartMeaningRouteParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
