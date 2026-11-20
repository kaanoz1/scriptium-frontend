"use client";

import React, { useEffect } from "react";
import { TCorpusOverview } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/h/ao/main";

type Props = { overview: TCorpusOverview };

const Client: React.FC<Props> = ({ overview }) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return <Main overview={overview} />;
};

export default Client;
