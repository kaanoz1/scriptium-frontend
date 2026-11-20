"use client";

import React, { useEffect } from "react";
import { THadithListItem, TNarratorComplete, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/jt/ao/narrator/[id]/main";

type Props = { narrator: TNarratorComplete; hadiths: TPaged<THadithListItem>; activeBook: number | null };

const Client: React.FC<Props> = (props) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return <Main {...props} />;
};

export default Client;
