import React from "react";
import { NextPage } from "next";
import Main from "./main";
import { cache } from "react";
import { T_RootPageParams } from "@/types/types";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { ERROR_METADATA } from "@/util/constants";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { RootCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/DivineCacheKeyBuilder/RootCacheKeyBuilder/RootCacheKeyBuilder";
import { fetchRootAndCreateMetadataIfValid } from "./utils/fetchRootAndCreateMetadataIfValid";

export const generateMetadata = cache(
  async ({ params }: { params: Promise<T_RootPageParams> }) => {
    const { scriptureCode: scriptureCodeParam, rootLatin: rootLatinParam } =
      await params;

    const helper = new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

    if (helper === undefined) return ERROR_METADATA;

    const redisCache = new RedisClient();

    const cacheKeyBuilder =
      new RootCacheKeyBuilder().setScriptureCodeAndRootLatin(
        helper.getCode(),
        rootLatinParam
      );

    const cachedMetadata = await redisCache.getMetadata(cacheKeyBuilder);

    if (cachedMetadata) return cachedMetadata;

    return await fetchRootAndCreateMetadataIfValid(helper, rootLatinParam);
  }
);

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
