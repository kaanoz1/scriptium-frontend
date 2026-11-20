"use client";

import React, { useEffect } from "react";
import { TBookCategoryWithBooks, THadithListItem, THadithSearchMode, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/h/ao/search/main";

type Props = {
  query: string;
  mode: THadithSearchMode;
  results: TPaged<THadithListItem> | null;
  categories: TBookCategoryWithBooks[];
  category: number | null;
  book: number | null;
};

const Client: React.FC<Props> = (props) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return <Main {...props} />;
};

export default Client;
