"use client";

import React from "react";
import {
  BookOpen,
  BookLock,
  Gavel,
  History,
  Landmark,
  Lightbulb,
  Music,
  NotebookPen,
  Users,
} from "lucide-react";
import TraditionIndex, {
  TraditionSection,
} from "@/app/[locale]/components/TraditionIndex";
import { instrumentSerif } from "@/fonts";

const SECTIONS: TraditionSection[] = [
  {
    key: "Bible",
    icon: <BookOpen size={24} />,
    accent: "59 130 246",
    watermark: "Βίβλος",
  },
  { key: "Apocrypha", icon: <BookLock size={20} />, accent: "100 116 139" },
  { key: "Exegesis", icon: <NotebookPen size={20} />, accent: "20 184 166" },
  {
    key: "Patristics",
    icon: <Users size={20} />,
    accent: "245 158 11",
    watermark: "Patres",
  },
  { key: "Councils", icon: <Landmark size={20} />, accent: "168 85 247" },
  { key: "Dogmatics", icon: <Lightbulb size={20} />, accent: "99 102 241" },
  {
    key: "CanonLaw",
    icon: <Gavel size={20} />,
    accent: "239 68 68",
    watermark: "Ius",
  },
  { key: "Liturgy", icon: <Music size={20} />, accent: "236 72 153" },
  {
    key: "History",
    icon: <History size={20} />,
    accent: "234 88 12",
    watermark: "Historia",
  },
];

const Client: React.FC = () => (
  <TraditionIndex
    namespace="Pages.Christianity.Index"
    basePath="c"
    native="Χριστιανισμός"
    nativeClassName={instrumentSerif.className}
    watermarkClassName={instrumentSerif.className}
    sections={SECTIONS}
  />
);

export default Client;
