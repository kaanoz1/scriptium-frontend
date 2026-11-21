/**
 * UI strings of the hadith section (Pages.Islam.Hadith). The shape of this
 * object is the type every other locale must match (see ./types.ts).
 */
export const enHadith = {
  Index: {
    Eyebrow: "Hadith literature",
    Title: "Hadith",
    Description:
      "Reports of the words, deeds and approvals attributed to Muhammad and to his companions and their successors, each preserved with the chain of narrators through which it was transmitted.",
    Available: "Available",
    ComingSoon: "Coming soon",
    Open: "Open",
    Sciences: {
      ArabicOnly: {
        Title: "Arabic Only Hadith Corpus",
        NativeTitle: "موسوعة الحديث الشريف",
        Description:
          "425 classical books, 715,000 narrations, 577,000 chains and 50,000 narrators in the original Arabic, with grades and narrator criticism.",
      },
      Translated: {
        Title: "Translated Collections",
        NativeTitle: "الكتب المترجمة",
        Description:
          "Hadith collections together with translations into other languages.",
      },
    },
  },
  Common: {
    CorpusShort: "Arabic corpus",
    AH: "AH",
    DiedIn: "d. {year}",
    Hadiths: "Hadiths",
    Chains: "Chains",
    Narrators: "Narrators",
    Statements: "Statements",
    Books: "Books",
    Topics: "Subjects",
    Scholars: "Scholars",
    Search: "Search",
    Grade: "Grade",
    Type: "Type",
    Rank: "Grade",
    All: "All",
    AllBooks: "All books",
    ShowAll: "Show all",
    Clear: "Clear",
    None: "None recorded.",
    NoResults: "Nothing found.",
    ReadFull: "Open the hadith to read the full text.",
    ShowingRange: "Showing {from}–{to} of {total}",
    LoadMore: "Load more ({shown} of {total})",
    Pagination: "Pagination",
    Previous: "Previous",
    Next: "Next",
    Share: "Share",
    Copied: "Link copied",
    GradeTooltip:
      "Grades come from the source database and reflect its assessment of the chains; scholars may differ.",
    GradeExplanation:
      "The grade (hukm) is the verdict on a narration's authenticity, mostly decided by its chain: sahih (sound) and hasan (good) are acceptable, da'if (weak) and below are not, mawdu' is fabricated. Mawquf and maqtu' mark reports that stop at a companion or a successor. Grades are the source's; scholars may differ.",
    RankTooltip:
      "Narrator grade on the source's twelve-step scale, with the verbal judgement shown in Arabic.",
    SourceNote:
      "Texts, chains, grades and narrator data come from an Arabic hadith database (2017 snapshot) and are shown as published there. Grades are the source's assessment, not a ruling by Scriptium; consult the specialists for religious questions.",
  },
  Grades: {
    NoChain: "No chain",
    Sahih: "Sahih",
    Hasan: "Hasan",
    Daif: "Da'if",
    VeryWeak: "Very weak",
    AccusedOfForgery: "Suspected forgery",
    Mawdu: "Fabricated",
    Mawquf: "Mawquf",
    Maqtu: "Maqtu'",
    NoSupport: "Unsupported",
  },
  Types: {
    Qudsi: "Qudsi",
    Marfu: "Marfu'",
    Mawquf: "Mawquf",
    Maqtu: "Maqtu'",
  },
  TypeDescriptions: {
    Qudsi:
      "Hadith qudsi: words attributed to God, transmitted through Muhammad.",
    Marfu: "Attributed to Muhammad himself.",
    Mawquf: "Stops at a companion: the companion's own words or deeds.",
    Maqtu: "Stops at a successor (tabi'i) or later.",
  },
  Ranks: {
    NotGraded: "Not graded",
    Companion: "Companion",
    HighlyReliable: "Highly reliable",
    Reliable: "Reliable",
    Truthful: "Truthful",
    TruthfulWithErrors: "Truthful, errs",
    Acceptable: "Acceptable",
    UnknownCondition: "Status unknown",
    Weak: "Weak",
    Unknown: "Unknown",
    Abandoned: "Abandoned",
    Suspected: "Suspected of lying",
    AttributedWithLying: "Attributed with lying",
  },
  Corpus: {
    Eyebrow: "Arabic only",
    Title: "Hadith Corpus",
    Description:
      "Read every narration in the original Arabic, follow each chain narrator by narrator, and see what the critics said about them.",
    GradeDistribution: "Hadiths by grade",
    BooksDescription: "{count} books, grouped by genre.",
    BookCount: "{count} books",
    TopNarrators: "Most prolific narrators",
    Explore: {
      Narrators: {
        Title: "Narrators",
        Description: "{count} narrators with grades, teachers and students.",
      },
      Scholars: {
        Title: "Critics",
        Description: "{count} scholars of jarh wa ta'dil and their statements.",
      },
      Topics: {
        Title: "Subjects",
        Description: "{count} entries in the subject index.",
      },
      Books: {
        Title: "Books",
        Description: "{count} collections, from the Sahihs to the histories.",
      },
    },
  },
  Book: {
    City: "City",
    Publisher: "Publisher",
    Edition: "Edition",
    QuranQuotes: "Qur'an quotations",
    Range: "Numbers",
    JumpTo: "Go to hadith number",
    Go: "Go",
    NumberNotFound: "This book has no hadith with that number.",
    SearchInBook: "Search in this book",
  },
  Hadith: {
    PageInBook: "page {page}",
    Taraf: "Opening (taraf)",
    QuranQuote: "Qur'an {ref}",
    QuranQuotes: "Qur'an verses quoted",
    Chains: "Chains of narration ({count})",
    ChainsDescription:
      "Each chain runs from the companion at the top down to the author of the book.",
    ChainN: "Chain {n}",
    ChainLength: "{n} narrators",
    Author: "Author",
    Origin: "Origin",
    UnknownNarrator: "Narrator not described in the source",
    ShowAllChains: "Show all {count} chains",
    ShowFewerChains: "Show fewer chains",
    NoChains: "The source gives no analysed chain for this narration.",
    OtherNarrations: "Other narrations of this hadith",
    OtherNarrationsDescription:
      "The same report is narrated {count} times across the books.",
    OpenGroup: "All narrations",
  },
  Isnad: {
    Title: "Isnad tree",
    Toggle: "Draw the tree",
    Loading: "Loading…",
    Error: "The isnad tree could not be loaded.",
    Empty: "No chains to draw.",
    HadithDescription: "All chains of this narration merged into one tree.",
    GroupDescription:
      "All chains of every narration of this hadith, merged: companions on top, book authors (dashed) at the bottom.",
    Legend:
      "Merged from {chains} chains. Line width shows how many chains share a link; click a narrator to open their page.",
    Truncated:
      "Links used by fewer than {min} chains are hidden to keep the tree readable.",
    EdgeTitle: "{count} chains",
    NodeChains: "{count} chains",
  },
  Search: {
    Eyebrow: "Full-text search",
    Title: "Search the hadith",
    Description:
      "Search the matn of every narration in Arabic. Diacritics are optional.",
    Placeholder: "e.g. إنما الأعمال بالنيات",
    Submit: "Search",
    Mode: "Match",
    Modes: {
      Smart: {
        Title: "Smart",
        Description:
          "Also matches attached particles (و ب ف ل ك ال) and word endings.",
      },
      Exact: {
        Title: "Exact words",
        Description: "Every word must appear exactly as typed.",
      },
      Phrase: {
        Title: "Phrase",
        Description: "The words must appear together, in order.",
      },
    },
    InBook: "Searching in",
    AllCategories: "All genres",
    NoResults: "No hadith matched. Try fewer words or the Smart mode.",
    TipsTitle: "Search tips",
    Tips: {
      Diacritics:
        "Type with or without harakat: الصلاة, الصلاه and الصَّلَاة find the same words.",
      Smart: "Smart mode finds وبالنية when you search نية.",
      Phrase: "Use Phrase mode for an exact wording such as لا ضرر ولا ضرار.",
    },
  },
  Settings: {
    Title: "Reading",
    Font: "Arabic font",
    FontSize: "Font size",
    ShowIsnad: {
      Title: "Show the isnad",
      Description: "Hide it to read only the report itself.",
    },
    ShowIsnadTree: {
      Title: "Draw the isnad tree",
      Description: "Merge all chains into one tree below the text.",
    },
    HighlightNarrators: {
      Title: "Link narrators",
      Description: "Underline names, coloured by grade.",
    },
    HighlightQuran: {
      Title: "Mark Qur'an quotations",
      Description: "Highlight and link quoted verses.",
    },
  },
  Narrators: {
    Eyebrow: "Rijal",
    Title: "Narrators",
    Description:
      "Everyone who appears in a chain, with their grade, dates and the hadiths they transmitted.",
    SearchPlaceholder: "Name or kunya, e.g. أبو هريرة",
    Found: "{count} narrators",
    HadithCount: "{count} hadiths",
  },
  Narrator: {
    Born: "Born",
    Died: "Died",
    Age: "Age",
    Generation: "Generation (tabaqa)",
    Residence: "Lived in",
    DeathPlace: "Died in",
    Lineage: "Lineage",
    Profession: "Profession",
    InBukhari: "Narrator of al-Bukhari",
    InMuslim: "Narrator of Muslim",
    Ikhtilat: "Memory deteriorated (ikhtilat)",
    Tadlis: "Known for tadlis",
    StubNote:
      "The source does not describe this narrator; the name was taken from chain texts.",
    Statements: "What the critics said",
    StatementsDescription:
      "Jarh wa ta'dil statements, ordered by the critic's death date.",
    Teachers: "Teachers",
    TeachersDescription:
      "Narrators they report from, by number of shared chains.",
    Students: "Students",
    StudentsDescription:
      "Narrators who report from them, by number of shared chains.",
    GradesOfHadiths: "Their hadiths by grade",
    Hadiths: "Hadiths they narrated",
    HadithsDescription: "Every narration whose chain includes this narrator.",
  },
  Scholars: {
    Eyebrow: "Jarh wa ta'dil",
    Title: "Critics of narrators",
    Description:
      "The scholars whose judgements on narrators decide how chains are graded.",
    FilterPlaceholder: "Filter by name…",
    Sort: { Statements: "Most statements", Death: "Earliest first" },
    Count: "{count} scholars",
    StatementCount: "{count} statements",
  },
  Scholar: {
    Statements: "Statements",
    StatementsDescription:
      "Narrators they judged, most prolific narrators first.",
  },
  Topics: {
    Eyebrow: "Subject index",
    Title: "Subjects",
    Description:
      "A tree of subjects, from broad themes down to individual reports.",
    LinkedGroup: "Hadith on this subject · {count} narrations",
    Subtopics: "{count} entries",
    Narrations: "{count} narrations",
  },
  Group: {
    Breadcrumb: "Narrations",
    Eyebrow: "One hadith, every narration",
    Description:
      "These narrations report the same meaning; they differ in wording, chain and book.",
    Narrations: "Narrations",
    Companions: "Companions",
    CompanionsDescription:
      "Narrators at the top of the chains and how many chains start with them.",
    GradesOfNarrations: "Narrations by grade",
  },
  Quran: {
    Eyebrow: "Qur'an in hadith",
    Title: "Hadith citing {ref}",
    Description: "Narrations that quote this verse.",
    OpenVerse: "Open the verse",
    None: "No hadith in the corpus quotes this verse.",
    CitingThisVerse: "Hadith citing this verse ({count})",
    SeeAll: "See all",
  },
} as const;
