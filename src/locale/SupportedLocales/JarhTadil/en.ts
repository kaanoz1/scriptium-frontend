/**
 * UI strings of the jarh wa ta'dil section (Pages.Islam.JarhTadil). The shape
 * of this object is the type every other locale must match (see ./types.ts).
 * Narrator and critic pages also use the shared strings of
 * Pages.Islam.Hadith (Common, Ranks, Narrators, Narrator, Scholars, Scholar).
 */
export const enJarhTadil = {
  Index: {
    Eyebrow: "Narrator criticism",
    Title: "Jarh wa Ta'dil",
    Description:
      "The science of assessing hadith transmitters: who they were, whom they heard from, and what the critics said about their reliability.",
    Available: "Available",
    ComingSoon: "Coming soon",
    Open: "Open",
    Sciences: {
      ArabicOnly: {
        Title: "Arabic Only Jarh wa Ta'dil Corpus",
        NativeTitle: "الجرح والتعديل",
        Description:
          "About 50,000 narrators and 127,000 statements by over 1,000 critics, in the original Arabic.",
      },
      Translated: {
        Title: "Translated Works",
        NativeTitle: "الكتب المترجمة",
        Description:
          "Works of narrator criticism together with translations into other languages.",
      },
    },
  },
  Common: {
    CorpusShort: "Arabic corpus",
  },
  Corpus: {
    Eyebrow: "Arabic only",
    Title: "Jarh wa Ta'dil Corpus",
    Description:
      "Biographies of the narrators who appear in the hadith chains, their teachers and students, and the verdicts of the critics on each of them.",
    Companions: "Companions",
    Critics: "Critics",
    Links: "Teacher–student links",
    RankDistribution: "Narrators by grade",
    RankDistributionDescription:
      "Grades summarise the critics' verdicts as recorded by the source. They report what the critics said, not the site's own judgement of anyone.",
    TopNarrators: "Narrators with the most hadiths",
    TopScholars: "Critics with the most statements",
    Explore: {
      Narrators: {
        Title: "Narrators",
        Description:
          "{count} narrators with grades, dates, teachers and students.",
      },
      Scholars: {
        Title: "Critics",
        Description:
          "{count} scholars of jarh wa ta'dil and everything they said about narrators.",
      },
    },
  },
};
