import { NextPage, Metadata } from "next";
import Main from "./main";
import { T_SectionPageParams } from "@/types/types";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { ScriptureCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/DivineCacheKeyBuilder/ScriptureCacheKeyBuilder/ScriptureCacheKeyBuilder";
import { ERROR_METADATA } from "@/util/constants";
import { cache } from "react";
import { fetchSectionAndCreateMetadataIfValid } from "./utils/fetchSectionAndCreateMetadataIfValid";

export const generateMetadata = cache(
  async ({
    params,
  }: {
    params: Promise<T_SectionPageParams>;
  }): Promise<Metadata> => {
    const {
      scriptureCode: scriptureCodeParam,
      sectionNumber: sectionNumberParam,
    } = await params;

    const parsedSectionNumberParam = parseInt(sectionNumberParam);

    if (Number.isNaN(parsedSectionNumberParam)) return ERROR_METADATA;

    const helper = new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

    if (
      helper === undefined ||
      !helper.isSectionExists(parsedSectionNumberParam)
    )
      return ERROR_METADATA;

    const redisCache = new RedisClient();

    const cacheKeyBuilder = new ScriptureCacheKeyBuilder()
      .setScriptureCode(helper.getCode())
      .setSectionNumber(parsedSectionNumberParam);

    const cachedMetadata = await redisCache.getMetadata(cacheKeyBuilder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchSectionAndCreateMetadataIfValid(
      helper,
      parsedSectionNumberParam
    );
  }
);

const Page: NextPage = () => {
  return <Main />;
};
export default Page;
