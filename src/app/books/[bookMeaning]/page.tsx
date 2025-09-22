import { NextPage, Metadata } from "next";
import Main from "./main";
import { cache } from "react";
import { T_BookMeaningPageRouteParams } from "./utils/types";
import { BookCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/TraditionCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder/BookCacheKeyBuilder";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { fetchBookAndCreateMetadata } from "./utils/fetchBookAndCreateMetadata";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_BookMeaningPageRouteParams>;
  }): Promise<Metadata> => {
    const { bookMeaning: bookMeaningRouteParam } = await params;

    const builder = new BookCacheKeyBuilder().setBookMeaning(
      bookMeaningRouteParam
    );

    const redisCache = new RedisClient();

    const cachedMetadata = await redisCache.getMetadata(builder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchBookAndCreateMetadata(bookMeaningRouteParam);
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
