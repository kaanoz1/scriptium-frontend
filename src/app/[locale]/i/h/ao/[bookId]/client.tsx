"use client";

import React, { useEffect } from "react";
import { TBookComplete, THadithListItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/h/ao/[bookId]/main";

type Props = { book: TBookComplete; hadiths: TPaged<THadithListItem> };

const Client: React.FC<Props> = ({ book, hadiths }) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return <Main book={book} hadiths={hadiths} />;
};

export default Client;
