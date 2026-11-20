"use client";

import React, { useEffect, useMemo } from "react";
import { THadithComplete } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithComplete } from "@/classes/Islam/Hadith/ArabicOnly/HadithComplete";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/h/ao/[bookId]/[number]/main";

const Client: React.FC<{ hadith: THadithComplete }> = ({ hadith }) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  const instance = useMemo(() => HadithComplete.fromJson(hadith), [hadith]);
  return <Main hadith={instance} />;
};

export default Client;
