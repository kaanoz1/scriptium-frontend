import { NextPage, Metadata } from "next";
import Main from "./main";
import { T_VersePageParams } from "@/types/types";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { ScriptureCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/DivineCacheKeyBuilder/ScriptureCacheKeyBuilder/ScriptureCacheKeyBuilder";
import { ERROR_METADATA } from "@/util/constants";
import { cache } from "react";
import { fetchVerseAndCreateMetadataIfValid } from "./utils/fetchVerseAndCreateMetadataIfValid";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_VersePageParams>;
  }): Promise<Metadata> => {
    const {
      scriptureCode: scriptureCodeParam,
      sectionNumber: sectionNumberParam,
      chapterNumber: chapterNumberParam,
      verseNumber: verseNumberParam,
    } = await params;

    const parsedSectionNumberParam = parseInt(sectionNumberParam);
    const parsedChapterNumberParam = parseInt(chapterNumberParam);
    const parsedVerseNumberParam = parseInt(verseNumberParam);

    if (
      Number.isNaN(parsedSectionNumberParam) ||
      Number.isNaN(parsedChapterNumberParam) ||
      Number.isNaN(parsedVerseNumberParam)
    )
      return ERROR_METADATA;

    const helper = new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

    if (
      helper === undefined ||
      !helper.isVerseExist(
        parsedSectionNumberParam,
        parsedChapterNumberParam,
        parsedVerseNumberParam
      )
    )
      return ERROR_METADATA;

    const redisCache = new RedisClient();

    const cacheKeyBuilder = new ScriptureCacheKeyBuilder()
      .setScriptureCode(helper.getCode())
      .setSectionNumber(parsedSectionNumberParam)
      .setChapterNumber(parsedChapterNumberParam)
      .setVerseNumber(parsedVerseNumberParam);

    const cachedMetadata = await redisCache.getMetadata(cacheKeyBuilder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchVerseAndCreateMetadataIfValid(
      helper,
      parsedSectionNumberParam,
      parsedChapterNumberParam,
      parsedVerseNumberParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
