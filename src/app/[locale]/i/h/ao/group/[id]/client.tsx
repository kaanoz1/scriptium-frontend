"use client";

import React, { useEffect } from "react";
import { THadithListItem, TIsnadGraph, TMeaningGroupComplete, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import Main from "@/app/[locale]/i/h/ao/group/[id]/main";

type Props = {
  group: TMeaningGroupComplete;
  hadiths: TPaged<THadithListItem>;
  isnad: TIsnadGraph | null;
  activeBook: number | null;
};

const Client: React.FC<Props> = (props) => {
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return <Main {...props} />;
};

export default Client;
