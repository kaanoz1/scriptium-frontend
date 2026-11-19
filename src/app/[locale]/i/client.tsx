"use client";

import React from "react";
import {
  BookOpen,
  Compass,
  Lightbulb,
  NotebookPen,
  Route,
  Scale,
  ScrollText,
  Sparkles,
  UserCheck,
} from "lucide-react";
import TraditionIndex, {
  TraditionSection,
} from "@/app/[locale]/components/TraditionIndex";
import { Amiri } from "@/fonts/Arabic/Amiri";

const SECTIONS: TraditionSection[] = [
  {
    key: "Quran",
    icon: <BookOpen size={24} />,
    accent: "16 185 129",
    path: "q",
    watermark: "القرآن",
  },
  { key: "Tafsir", icon: <NotebookPen size={20} />, accent: "20 184 166" },
  { key: "Hadith", icon: <ScrollText size={20} />, accent: "245 158 11" },
  { key: "JarhTadil", icon: <UserCheck size={20} />, accent: "239 68 68" },
  { key: "Fiqh", icon: <Scale size={20} />, accent: "59 130 246" },
  { key: "Usul", icon: <Compass size={20} />, accent: "99 102 241" },
  { key: "Kalam", icon: <Lightbulb size={20} />, accent: "168 85 247" },
  { key: "Sirah", icon: <Route size={20} />, accent: "234 88 12" },
  { key: "Tasawwuf", icon: <Sparkles size={20} />, accent: "236 72 153" },
];

const Client: React.FC = () => (
  <TraditionIndex
    namespace="Pages.Islam.Index"
    basePath="i"
    native="الإسلام"
    nativeClassName={Amiri.className}
    watermarkClassName={Amiri.className}
    sections={SECTIONS}
  />
);

export default Client;
