import { NextPage, Metadata } from "next";
import Main from "./main";
import { T_ChapterPageParams } from "@/types/types";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { ScriptureCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/DivineCacheKeyBuilder/ScriptureCacheKeyBuilder/ScriptureCacheKeyBuilder";
import { ERROR_METADATA } from "@/util/constants";
import { cache } from "react";
import { fetchChapterAndCreateMetadataIfValid } from "./utils/fetchChapterAndCreateMetadataIfValid";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_ChapterPageParams>;
  }): Promise<Metadata> => {
    const {
      scriptureCode: scriptureCodeParam,
      sectionNumber: sectionNumberParam,
      chapterNumber: chapterNumberParam,
    } = await params;

    const parsedSectionNumberParam = parseInt(sectionNumberParam);
    const parsedChapterNumberParam = parseInt(chapterNumberParam);

    if (
      Number.isNaN(parsedSectionNumberParam) ||
      Number.isNaN(parsedChapterNumberParam)
    )
      return ERROR_METADATA;

    const helper = new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

    if (
      helper === undefined ||
      !helper.isSectionExists(parsedSectionNumberParam) ||
      !helper.isChapterExist(parsedSectionNumberParam, parsedChapterNumberParam)
    )
      return ERROR_METADATA;

    const redisCache = new RedisClient();

    const cacheKeyBuilder = new ScriptureCacheKeyBuilder()
      .setScriptureCode(helper.getCode())
      .setSectionNumber(parsedSectionNumberParam)
      .setChapterNumber(parsedChapterNumberParam);

    const cachedMetadata = await redisCache.getMetadata(cacheKeyBuilder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchChapterAndCreateMetadataIfValid(
      helper,
      parsedSectionNumberParam,
      parsedChapterNumberParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
