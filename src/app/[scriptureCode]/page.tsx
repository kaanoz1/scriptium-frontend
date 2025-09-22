import { Metadata, NextPage } from "next";
import { ReactNode } from "react";
import Main from "./main";
import { T_ScripturePageParams } from "@/types/types";
import { RedisClient } from "@/types/classes/client/Redis/Redis";
import { ScriptureCacheKeyBuilder } from "@/types/classes/client/Redis/MetadataKeyBuilder/DivineCacheKeyBuilder/ScriptureCacheKeyBuilder/ScriptureCacheKeyBuilder";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { fetchScriptureAndCreateMetadataIfValid } from "./utils/fetchScriptureAndCreateMetadataIfValid";

type Props = {
  params: Promise<T_ScripturePageParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scriptureCode: scriptureCodeParam } = await params;

  const helper = new ScriptureHelperCollection().getScriptureHelperIfExist(
    scriptureCodeParam
  );

  if (!helper) return INVALID_METADATA;

  const redisCache = new RedisClient();

  const cacheKeyBuilder = new ScriptureCacheKeyBuilder().setScriptureCode(
    helper.getCode()
  );

  const cachedMetadata = await redisCache.getMetadata(cacheKeyBuilder);

  if (cachedMetadata) return cachedMetadata;

  return await fetchScriptureAndCreateMetadataIfValid(helper);
}

const Page: NextPage = (): ReactNode => {
  return <Main />;
};

export default Page;

const INVALID_METADATA: Metadata = {
  title: "Scripture not found.",
  description: "Invalid scriptureCode",
};
