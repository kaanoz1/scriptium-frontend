"use client";

import { NextPage } from "next";
import { observer } from "mobx-react-lite";
import { ChapterWithVerses } from "@/classes/Islam/Quran/Chapter/WithVerses";
import Breadcrumbs from "@/app/[locale]/i/q/[chapterNumber]/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/[chapterNumber]/components/Header";
import VerseContainer from "@/app/[locale]/i/q/[chapterNumber]/components/VerseContainer";
import PageShell from "@/components/Page/PageShell";

type Props = {
  chapter: ChapterWithVerses;
};

const Page: NextPage<Props> = observer(({ chapter }) => {
  return (
    <PageShell size="md" className="gap-8">
      <Breadcrumbs chapter={chapter} />
      <Header chapter={chapter} />
      <VerseContainer chapter={chapter} />
    </PageShell>
  );
});

export default Page;
