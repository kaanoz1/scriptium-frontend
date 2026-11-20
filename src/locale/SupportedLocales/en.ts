import { enHadith } from "@/locale/SupportedLocales/Hadith/en";
import { enJarhTadil } from "@/locale/SupportedLocales/JarhTadil/en";
import { SystemLanguage } from "@/locale/SystemLanguage";

export const en: SystemLanguage = {
  Navbar: {
    Placeholder: "Search..",
    QuickNavigation: {
      Header: "Quick Navigation",
      Description: "Access directly using surah and verse numbers.",
      ValidSeparators: "VALID SEPARATORS:",
      ExampleDescriptions: {
        Header: "Examples",
        Surah: "Surah",
        Verse: "Verse",
        GoesToSurah: "Goes to surah:",
        WarningDescription:
          "Destination existence is not verified before navigation. Ensure the Surah/Verse exists in the Quran.",
      },
      MobileHamburgerButton: {
        Title: "Menu",
        Language: "Language",
        Resources: "Resources",
        Appearance: "Appearance",
        Explore: "Explore",
        Home: "Home",
        Light: "Light",
        Dark: "Dark",
        Soon: "Soon",
      },
      MobileSearchModal: {
        SearchInputPlaceholder: "Search...",
        PressEnterToNavigateDirectly: "Click to navigate directly",
        IfThisPersistContactUs: "If this persists, contact us",
        NoResultsFound: "No results found",
        TryAdjustingYourSearch: "Try adjusting your search",
      },
    },
    Configuration: {
      Header: "Search Configuration",
      Apply: "Apply",
      SearchAlgorithms: {
        TranslationSearch: {
          Header: "Translation Search",
          Description: "Search within translations based on words or phrases.",
          Configuration: {
            Methodology: {
              Header: "Search Methodology",
              SearchPreference: {
                MatchSearch: {
                  Header: "Exact Match",
                  Description:
                    "Shows results where your keywords appear exactly.",
                },
                SemanticSearch: {
                  Header: "Semantic Search",
                  Description: "Searches by considering synonyms and context.",
                },
              },
              ResultConfigs: {
                Header: "Result Configuration",
                EmphasizeMatches: {
                  Header: "Emphasize Matches",
                  Description: "Highlights search terms within the results.",
                },
                FilterDuplicates: {
                  Header: "Filter Duplicates",
                  Description: "Prevents repetitive similar results.",
                },
              },
            },
          },
        },
        RootSearch: {
          Header: "Root Search. NOT ACTIVE YET",
          Description: "Search based on Arabic word roots.",
        },
      },
    },
    Buttons: {
      LanguageChange: {
        Header: "Change Language",
        Description: "Select the application language.",
      },
      Documentation: {
        About: {
          Header: "About",
          Description: "Learn more about the Scriptium project.",
        },
        Discord: {
          Header: "Discord",
          Description: "Join our community.",
        },
        ForDevelopers: {
          Header: "For Developers",
          Description: "API and documentation details.",
        },
      },
      Statistics: "Statistics",
    },
  },
  Footer: {
    AllRightsReserved: "All rights reserved.",
  },
  Tooltip: {
    Platform: {
      NotActive: "Not active yet.",
    },
  },
  Pages: {
    Home: {
      HeroSubtitle: "Theology library.",
      Eyebrow: "Open theology library",
      HeroTagline:
        "Read, search and study the world's sacred texts, word by word, root by root.",
      CollectionTitle: "Traditions",
      CollectionDescription:
        "Choose a tradition to explore its sacred texts and scholarship.",
      Explore: "Explore",
      ComingSoon: "Coming soon",
      QuickAccess: "Jump in",
      QuickLinks: {
        Fatiha: "Al-Fatiha",
        AyatAlKursi: "Ayat al-Kursi",
        Ikhlas: "Al-Ikhlas",
        Roots: "Word roots",
      },
      IslamCard: {
        Title: "Islam",
        NativeTitle: "الإسلام",
        Description:
          "The Qur'an and the classical Islamic sciences: tafsir, hadith, fiqh, kalam and more.",
      },
      ChristianityCard: {
        Title: "Christianity",
        NativeTitle: "Χριστιανισμός",
        Description:
          "The Old and New Testaments with comparative translation analysis.",
      },
      JudaismCard: {
        Title: "Judaism",
        NativeTitle: "יהדות",
        Description:
          "The Torah and the Hebrew scriptures with cross-linguistic tools.",
      },
      HinduismCard: {
        Title: "Hinduism",
        SanskritTitle: "Sanatana Dharma",
        Description:
          "Vedic texts, Upanishads, and philosophical analysis of ancient Sanskrit scriptures.",
      },
      BuddhismCard: {
        Title: "Buddhism",
        PaliTitle: "Buddhadharma",
        Description:
          "Analysis of Pali Canon, Sutras, and the core teachings of the enlightened path.",
      },
      Messages: {
        DatabaseIncapability:
          "Our databases do not have enough capability for this book yet. We are constantly searching for data to provide for our users.",
      },
    },
    Islam: {
      Index: {
        Eyebrow: "Islamic sciences",
        Title: "Islam",
        Description:
          "The Qur'an and the classical disciplines built around it, from exegesis and hadith criticism to law and theology.",
        Available: "Available",
        ComingSoon: "Coming soon",
        Open: "Open",
        Sciences: {
          Quran: {
            Title: "Qur'an",
            NativeTitle: "القرآن الكريم",
            Description:
              "Arabic text, translations, word-by-word analysis and root search.",
          },
          Tafsir: {
            Title: "Tafsir",
            NativeTitle: "التفسير",
            Description: "Classical and modern exegesis of the Qur'an.",
          },
          Hadith: {
            Title: "Hadith",
            NativeTitle: "الحديث",
            Description:
              "Reports attributed to Muhammad and his companions, with their chains of narration.",
          },
          JarhTadil: {
            Title: "Jarh wa Ta'dil",
            NativeTitle: "الجرح والتعديل",
            Description:
              "Narrator criticism: assessing the reliability of hadith transmitters.",
          },
          Fiqh: {
            Title: "Fiqh",
            NativeTitle: "الفقه",
            Description: "Islamic jurisprudence across the schools of law.",
          },
          Usul: {
            Title: "Usul al-Fiqh",
            NativeTitle: "أصول الفقه",
            Description:
              "The principles and methodology behind legal reasoning.",
          },
          Kalam: {
            Title: "Kalam",
            NativeTitle: "علم الكلام",
            Description: "Systematic theology and its schools of thought.",
          },
          Sirah: {
            Title: "Sirah",
            NativeTitle: "السيرة النبوية",
            Description: "The life of the Prophet Muhammad.",
          },
          Tasawwuf: {
            Title: "Tasawwuf",
            NativeTitle: "التصوف",
            Description: "Islamic spirituality and its classical literature.",
          },
        },
      },
      Hadith: enHadith,
      JarhTadil: enJarhTadil,
      Quran: {
        Components: {
          Header: {
            FilterPlaceholder: "Filter by name, meaning or number…",
            Header: "Al-Qur'an Chapters",
            Description: "Select a Surah below to read.",
          },
          ChapterCard: {
            Verses: "Verses",
          },
        },
        Chapter: {
          Components: {
            Header: {
              Header: "Surah Details",
              Description:
                "Explore the verses, translations, and transliterations of this chapter.",
            },
            TranslationIndicator: {
              Translations: "Translations",
            },
            Settings: {
              Title: "Reading Settings",
              Description: "Customize your reading experience.",
              FontFamily: "Arabic Font Family",
              FontSize: "Arabic Font Size",
              Min: "Min",
              Max: "Max",
              Done: "Done",
            },
            Translations: {
              Title: "Translations",
              Description:
                "Select the translations you want to display alongside the Arabic text.",
              Done: "Done",
            },
            Share: {
              Title: "Share Surah",
              Description: "Share this chapter with others.",
              Copy: "Copy",
              Close: "Close",
            },
            VerseContainer: {
              VerseContainerHeader: {
                UtilToolButtons: {
                  AudioPlayButton: {
                    NotActiveYet: "Audio playback is not available yet.",
                  },
                  NextChapterButton: {
                    NoNextChapter: "You are at the last chapter.",
                  },
                  PreviousChapterButton: {
                    NoPreviousChapter: "You are at the first chapter.",
                  },
                  ShareButton: {
                    Title: "Share",
                    Description:
                      "Share the text below via social media or copy it to your clipboard.",
                    Copy: "Copy",
                    Close: "Close",
                    CopySuccessful: "Text copied to clipboard!",
                    CopyFailed: "Failed to copy text. Please try again.",
                  },
                  QuranTranslationChangeButton: {
                    Title: "Translations",
                    Description:
                      "Select the translations you would like to display alongside the Arabic text.",
                    Done: "Done",
                  },
                  QuranConfigurationButton: {
                    Title: "Reading Settings",
                    Description:
                      "Customize the appearance and content of the Quran view.",
                    FontFamily: "Arabic Font Family",
                    FontSize: "Arabic Font Size",
                    Disclaimer:
                      "Variation names and their text structures are strictly provided and categorized by our",
                    DataProvider: "Data Provider",
                    Done: "Done",
                    ViewSettings: "View Options",
                    TextVariations: "Text Variations",
                    Preview: "Preview",
                    ShowArabicText: "Show Arabic Text",
                    ShowArabicTextDescription:
                      "Display the original Arabic verses.",
                    ShowTranslation: "Show Translation",
                    ShowTranslationDescription:
                      "Display the selected translations.",
                    ShowTransliteration: "Show Transliteration",
                    ShowTransliterationDescription:
                      "Display Latin pronunciation of the Arabic text.",
                  },
                },
              },
              VerseBox: {
                NoTransliterationAvailable:
                  "No transliteration available for this verse.",
                VerseBoxTranslation: {
                  NoProvidedTranslation:
                    "No translation available for the selected source.",
                },
              },
            },
          },
          Verse: {
            Components: {
              VerseTranslation: {
                Header: "Translations",
                Description: "Compare different translations for this verse.",
              },
              VerseTransliterations: {
                NoTransliterationAvailable:
                  "No transliteration available for this verse.",
              },
              VerseWordTable: {
                Sequence: "Sequence",
                Word: "Text",
                Root: "Root(s)",
                Words: "Word(s)",
                StickyToggleInfo:
                  "Enable sticky mode to keep this table visible while scrolling the page.",
              },
              UtilToolButtons: {
                NextVerseButton: {
                  NoNextVerse: "You are at the last verse.",
                },
                PreviousVerseButton: {
                  NoPreviousVerse: "You are at the first verse.",
                },
                ShareButton: {
                  Title: "Share Verse",
                  Description:
                    "Share the text below via social media or copy it to your clipboard.",
                  Copy: "Copy",
                  Close: "Done",
                },
                AudioPlayButton: {
                  NotActiveYet: "Audio playback is not available yet.",
                },
                QuranTranslationChangeButton: {
                  Title: "Translations",
                  Description: "Change the translation of the Quran",
                  Done: "Done",
                },
                QuranConfigurationButton: {
                  Title: "Reading Settings",
                  Description:
                    "Customize the appearance and content of the Quran view.",
                  FontFamily: "Arabic Font Family",
                  FontSize: "Arabic Font Size",
                  Disclaimer:
                    "Variation names and their text structures are strictly provided and categorized by our",
                  DataProvider: "Data Provider",
                  Done: "Done",
                  ViewSettings: "View Options",
                  ShowArabicText: "Show Arabic Text",
                  ShowArabicTextDescription:
                    "Display the original Arabic verses.",
                  ShowTranslation: "Show Translation",
                  ShowTranslationDescription:
                    "Display the selected translations.",
                  ShowTransliteration: "Show Transliteration",
                  ShowTransliterationDescription:
                    "Display Latin pronunciation of the Arabic text.",
                },
              },
              VerseTranslationTable: {
                NoActiveTranslationsSelected:
                  "No active translations selected.",
                StickyToggleInfo:
                  "Enable sticky mode to keep this table visible while scrolling the page.",
                Translations: "Translations",
              },
            },
          },
        },
        Root: {
          Components: {
            Header: {
              Occurrences: "Occurrences",
              SearchPlaceholder: "Search roots…",
              Header: "Roots of Qur'an",
              Description: "",
            },
          },
          Messages: {
            HighOccurrencesWarningTitle: "High number of occurrences",
            HighOccurrencesWarningDesc:
              "We are showing all results. This may cause freezes depending on your device power. We are actively working to optimize this.",
          },
        },
      },
    },
    Christianity: {
      Index: {
        Eyebrow: "Christian scholarship",
        Title: "Christianity",
        Description:
          "Scripture and the theological traditions built around it, from the Church Fathers to the councils.",
        Available: "Available",
        ComingSoon: "Coming soon",
        Open: "Open",
        Sciences: {
          Bible: {
            Title: "Bible",
            NativeTitle: "Βίβλος",
            Description:
              "The Old and New Testaments in their original languages, with translations.",
          },
          Apocrypha: {
            Title: "Apocrypha",
            NativeTitle: "Ἀπόκρυφα",
            Description: "Deuterocanonical and apocryphal writings.",
          },
          Exegesis: {
            Title: "Exegesis",
            NativeTitle: "Ἐξήγησις",
            Description: "Biblical interpretation and hermeneutics.",
          },
          Patristics: {
            Title: "Patristics",
            NativeTitle: "Patres Ecclesiae",
            Description: "The writings of the Church Fathers.",
          },
          Councils: {
            Title: "Councils & Creeds",
            NativeTitle: "Σύνοδοι",
            Description: "Ecumenical councils, creeds and confessions.",
          },
          Dogmatics: {
            Title: "Dogmatics",
            NativeTitle: "Θεολογία",
            Description: "Systematic theology and doctrine.",
          },
          CanonLaw: {
            Title: "Canon Law",
            NativeTitle: "Ius Canonicum",
            Description: "Church law and its sources.",
          },
          Liturgy: {
            Title: "Liturgy",
            NativeTitle: "Λειτουργία",
            Description: "Worship, rites and liturgical texts.",
          },
          History: {
            Title: "Church History",
            NativeTitle: "Historia Ecclesiastica",
            Description: "The history of the Church.",
          },
        },
      },
    },
    Judaism: {
      Index: {
        Eyebrow: "Jewish scholarship",
        Title: "Judaism",
        Description:
          "The Hebrew Bible and the rabbinic literature that interprets it, from the Mishnah to the responsa.",
        Available: "Available",
        ComingSoon: "Coming soon",
        Open: "Open",
        Sciences: {
          Tanakh: {
            Title: "Tanakh",
            NativeTitle: "תנ״ך",
            Description: "The Hebrew Bible: Torah, Nevi'im and Ketuvim.",
          },
          Mishnah: {
            Title: "Mishnah",
            NativeTitle: "מִשְׁנָה",
            Description: "The first written compilation of the Oral Torah.",
          },
          Talmud: {
            Title: "Talmud",
            NativeTitle: "תַּלְמוּד",
            Description: "The Babylonian and Jerusalem Talmuds.",
          },
          Midrash: {
            Title: "Midrash",
            NativeTitle: "מִדְרָשׁ",
            Description: "Rabbinic interpretation of the biblical text.",
          },
          Targum: {
            Title: "Targum",
            NativeTitle: "תַּרְגּוּם",
            Description: "Aramaic translations of the Hebrew Bible.",
          },
          Halakha: {
            Title: "Halakha",
            NativeTitle: "הֲלָכָה",
            Description: "Jewish law and its codifications.",
          },
          Responsa: {
            Title: "Responsa",
            NativeTitle: "שו״ת",
            Description:
              "Rabbinic answers to legal questions across the centuries.",
          },
          Philosophy: {
            Title: "Jewish Philosophy",
            NativeTitle: "הגות",
            Description: "Medieval and modern Jewish philosophy.",
          },
          Kabbalah: {
            Title: "Kabbalah",
            NativeTitle: "קַבָּלָה",
            Description: "Jewish mysticism and its classical texts.",
          },
        },
      },
    },
    About: {
      WhatIsScriptium: {
        Badge: "About the Project",
        Title: "What is Scriptium?",
        Description:
          "Scriptium is a dedicated platform built to collect, structure, and present the world's most profound theological and philosophical sources in a modern, accessible format.",
      },
      BetaWarning: {
        Title: "Beta Version Warning",
        Description:
          "Scriptium is currently in Beta. You may occasionally encounter incoherent data or incomplete features. If you spot any issues, please help us by reporting them to ",
      },
      DataSuppliers: {
        Title: "Data Suppliers",
        Description:
          "We extend our deepest gratitude to the following platforms for providing the comprehensive Quranic data and translations that power Scriptium's Islamic texts.",
      },
      Contact: {
        Title: "Contact Us",
        Description:
          "Have a question, feedback, or want to contribute? Reach out to us directly.",
      },
      Discord: {
        Title: "Discord Community",
        Description: "Our Discord bot is currently under construction.",
        Status: "Coming Soon",
      },
      Support: {
        DisabledStatus: "Not Active Yet.",
        NotActiveYet: "Not Active Yet.",
        Title: "Support the Project",
        Description:
          "Funding options are currently disabled, but we appreciate your willingness to support us!",
      },
    },
  },
  Terms: {
    General: {
      HomePage: "Home",
    },
    Islam: {
      this: "Islam",
      Quran: {
        this: "Qur'an",
        Chapter: {
          this: "Chapter",
        },
        Verse: {
          this: "Verse",
        },
        Root: {
          this: "Root",
        },
      },
    },
  },
  Util: {
    Components: {
      Error: {
        NotFound: {
          Title: "Not Found",
          DefaultDescription:
            "The manuscript or record you are looking for does not exist in our library.",
        },
        RateLimit: {
          Title: "Whoa, slow down!",
          DefaultDescription:
            "You are making requests too quickly. Please wait a moment before trying again.",
        },
        ServerError: {
          Title: "Internal Server Error",
          DefaultDescription:
            "Something went wrong on our end. Our scribes have been notified and are working on a fix.",
        },
        UnknownError: {
          Title: "An Unknown Error Occurred",
          DefaultDescription:
            "An unexpected anomaly disrupted your request. Please try refreshing the page or navigating back.",
        },
      },
      ThisPageIsUnderConstruction: {
        Header: "Under Construction",
        Description:
          "We are currently working hard to bring this page to life. Please check back later!",
      },
    },
  },
} as const;

export default en;
