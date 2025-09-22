import { NextPage, Metadata } from "next";
import Main from "./main";
import { cache } from "react";
import { T_PartMeaningPageRouteParams } from "./utils/types";
import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { fetchPartNodeAndCreateMetadata } from "./utils/fetchPartNodeAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_PartMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const {
      bookMeaning: bookMeaningRouteParam,
      partMeaning: partMeaningRouteParam,
    } = await params;

    const builder = new BookCacheKeyBuilder()
      .setBookMeaning(bookMeaningRouteParam)
      .setPartNodeMeaning(partMeaningRouteParam);

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchPartNodeAndCreateMetadata(
      bookMeaningRouteParam,
      partMeaningRouteParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
