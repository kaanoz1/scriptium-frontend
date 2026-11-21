import { HadithMessages } from "@/locale/SupportedLocales/Hadith/types";
import { JarhTadilMessages } from "@/locale/SupportedLocales/JarhTadil/types";

// TODO: Will be extended.

export type SystemLanguage = {
  Navbar: {
    Placeholder: string;

    QuickNavigation: {
      Header: string;
      Description: string;
      ValidSeparators: string;

      ExampleDescriptions: {
        Header: string;

        Surah: string;
        Verse: string;
        GoesToSurah: string;
        WarningDescription: string;
      };
      MobileHamburgerButton: {
        Title: string;
        Language: string;
        Resources: string;
        Appearance: string;
        Explore: string;
        Home: string;
        Light: string;
        Dark: string;
        Soon: string;
      };
      MobileSearchModal: {
        SearchInputPlaceholder: string;
        PressEnterToNavigateDirectly: string;
        IfThisPersistContactUs: string;
        NoResultsFound: string;
        TryAdjustingYourSearch: string;
      };
    };
    Configuration: {
      Header: string;
      Apply: string;
      SearchAlgorithms: {
        TranslationSearch: {
          Header: string;
          Description: string;
          Configuration: {
            Methodology: {
              Header: string;
              SearchPreference: {
                MatchSearch: {
                  Header: string;
                  Description: string;
                };

                SemanticSearch: {
                  Header: string;
                  Description: string;
                };
              };

              ResultConfigs: {
                Header: string;
                EmphasizeMatches: {
                  Header: string;
                  Description: string;
                };

                FilterDuplicates: {
                  Header: string;
                  Description: string;
                };
              };
            };
          };
        };

        RootSearch: {
          Header: string;
          Description: string;
        };
      };
    };
    Buttons: {
      Statistics: string;
      LanguageChange: {
        Header: string;
        Description: string;
      };
      Documentation: {
        About: {
          Header: string;
          Description: string;
        };
        Discord: {
          Header: string;
          Description: string;
        };
        ForDevelopers: {
          Header: string;
          Description: string;
        };
      };
    };
  };
  Footer: {
    AllRightsReserved: string;
  };
  Tooltip: {
    Platform: {
      NotActive: string;
    };
  };
  Pages: {
    Home: {
      HeroSubtitle: string;
      Eyebrow: string;
      HeroTagline: string;
      CollectionTitle: string;
      CollectionDescription: string;
      Explore: string;
      ComingSoon: string;
      QuickAccess: string;
      QuickLinks: {
        Quran: string;
        Bible: string;
        Tanakh: string;
      };
      IslamCard: {
        Title: string;
        NativeTitle: string;
        Description: string;
      };
      ChristianityCard: {
        Title: string;
        NativeTitle: string;
        Description: string;
      };
      JudaismCard: {
        Title: string;
        NativeTitle: string;
        Description: string;
      };
      HinduismCard: {
        Title: string;
        Description: string;
        SanskritTitle: string;
      };
      BuddhismCard: {
        Title: string;
        Description: string;
        PaliTitle: string;
      };

      Messages: {
        DatabaseIncapability: string;
      };
    };
    Islam: {
      Index: {
        Eyebrow: string;
        Title: string;
        Description: string;
        Available: string;
        ComingSoon: string;
        Open: string;
        Sciences: {
          Quran: { Title: string; NativeTitle: string; Description: string };
          Tafsir: { Title: string; NativeTitle: string; Description: string };
          Hadith: { Title: string; NativeTitle: string; Description: string };
          JarhTadil: {
            Title: string;
            NativeTitle: string;
            Description: string;
          };
          Fiqh: { Title: string; NativeTitle: string; Description: string };
          Usul: { Title: string; NativeTitle: string; Description: string };
          Kalam: { Title: string; NativeTitle: string; Description: string };
          Sirah: { Title: string; NativeTitle: string; Description: string };
          Tasawwuf: { Title: string; NativeTitle: string; Description: string };
        };
      };
      Hadith: HadithMessages;
      JarhTadil: JarhTadilMessages;
      Quran: {
        Components: {
          Header: {
            Header: string;
            FilterPlaceholder: string;
            Description: string;
          };
          ChapterCard: {
            Verses: string;
          };
        };
        Chapter: {
          Components: {
            Header: {
              Header: string;
              Description: string;
            };
            TranslationIndicator: {
              Translations: string;
            };
            Settings: {
              Title: string;
              Description: string;
              FontFamily: string;
              FontSize: string;
              Min: string;
              Max: string;
              Done: string;
            };
            Translations: {
              Title: string;
              Description: string;
              Done: string;
            };
            Share: {
              Title: string;
              Description: string;
              Copy: string;
              Close: string;
            };
            VerseContainer: {
              VerseContainerHeader: {
                UtilToolButtons: {
                  AudioPlayButton: {
                    NotActiveYet: string;
                  };
                  NextChapterButton: {
                    NoNextChapter: string;
                  };
                  PreviousChapterButton: {
                    NoPreviousChapter: string;
                  };
                  ShareButton: {
                    Title: string;
                    Description: string;
                    Copy: string;
                    Close: string;
                    CopySuccessful: string;
                    CopyFailed: string;
                  };
                  QuranTranslationChangeButton: {
                    Title: string;
                    Description: string;
                    Done: string;
                  };
                  QuranConfigurationButton: {
                    Title: string;
                    Description: string;
                    FontFamily: string;
                    FontSize: string;
                    Disclaimer: string;
                    DataProvider: string;
                    Done: string;
                    ViewSettings: string;
                    TextVariations: string;
                    Preview: string;
                    ShowArabicText: string;
                    ShowArabicTextDescription: string;
                    ShowTranslation: string;
                    ShowTranslationDescription: string;
                    ShowTransliteration: string;
                    ShowTransliterationDescription: string;
                  };
                };
              };
              VerseBox: {
                NoTransliterationAvailable: string;
                VerseBoxTranslation: {
                  NoProvidedTranslation: string;
                };
              };
            };
          };
          Verse: {
            Components: {
              VerseTranslation: {
                Header: string;
                Description: string;
              };

              VerseTranslationTable: {
                NoActiveTranslationsSelected: string;
                Translations: string;
                StickyToggleInfo: string;
              };
              VerseTransliterations: {
                NoTransliterationAvailable: string;
              };
              VerseWordTable: {
                Sequence: string;
                Word: string;
                Root: string;
                Words: string;
                StickyToggleInfo: string;
              };
              UtilToolButtons: {
                NextVerseButton: {
                  NoNextVerse: string;
                };
                PreviousVerseButton: {
                  NoPreviousVerse: string;
                };
                ShareButton: {
                  Title: string;
                  Description: string;
                  Copy: string;
                  Close: string;
                };
                AudioPlayButton: {
                  NotActiveYet: string;
                };
                QuranTranslationChangeButton: {
                  Title: string;
                  Description: string;
                  Done: string;
                };
                QuranConfigurationButton: {
                  Title: string;
                  Description: string;
                  FontFamily: string;
                  FontSize: string;
                  Disclaimer: string;
                  DataProvider: string;
                  Done: string;
                  ViewSettings: string;
                  ShowArabicText: string;
                  ShowArabicTextDescription: string;
                  ShowTranslation: string;
                  ShowTranslationDescription: string;
                  ShowTransliteration: string;
                  ShowTransliterationDescription: string;
                };
              };
            };
          };
        };
        Root: {
          Messages: {
            HighOccurrencesWarningTitle: string;
            HighOccurrencesWarningDesc: string;
          };
          Components: {
            Header: {
              Header: string;
              Description: string;
              Occurrences: string;
              SearchPlaceholder: string;
            };
          };
        };
      };
    };
    Christianity: {
      Index: {
        Eyebrow: string;
        Title: string;
        Description: string;
        Available: string;
        ComingSoon: string;
        Open: string;
        Sciences: {
          Bible: { Title: string; NativeTitle: string; Description: string };
          Apocrypha: {
            Title: string;
            NativeTitle: string;
            Description: string;
          };
          Exegesis: { Title: string; NativeTitle: string; Description: string };
          Patristics: {
            Title: string;
            NativeTitle: string;
            Description: string;
          };
          Councils: { Title: string; NativeTitle: string; Description: string };
          Dogmatics: {
            Title: string;
            NativeTitle: string;
            Description: string;
          };
          CanonLaw: { Title: string; NativeTitle: string; Description: string };
          Liturgy: { Title: string; NativeTitle: string; Description: string };
          History: { Title: string; NativeTitle: string; Description: string };
        };
      };
    };
    Judaism: {
      Index: {
        Eyebrow: string;
        Title: string;
        Description: string;
        Available: string;
        ComingSoon: string;
        Open: string;
        Sciences: {
          Tanakh: { Title: string; NativeTitle: string; Description: string };
          Mishnah: { Title: string; NativeTitle: string; Description: string };
          Talmud: { Title: string; NativeTitle: string; Description: string };
          Midrash: { Title: string; NativeTitle: string; Description: string };
          Targum: { Title: string; NativeTitle: string; Description: string };
          Halakha: { Title: string; NativeTitle: string; Description: string };
          Responsa: { Title: string; NativeTitle: string; Description: string };
          Philosophy: {
            Title: string;
            NativeTitle: string;
            Description: string;
          };
          Kabbalah: { Title: string; NativeTitle: string; Description: string };
        };
      };
    };
    About: {
      WhatIsScriptium: {
        Badge: string;
        Title: string;
        Description: string;
      };
      BetaWarning: {
        Title: string;
        Description: string;
      };
      DataSuppliers: {
        Title: string;
        Description: string;
      };
      Contact: {
        Title: string;
        Description: string;
      };
      Discord: {
        Title: string;
        Description: string;
        Status: string;
      };
      Support: {
        DisabledStatus: string;
        NotActiveYet: string;
        Title: string;
        Description: string;
      };
    };
  };
  Terms: {
    General: {
      HomePage: string;
    };
    Islam: {
      this: string;
      Quran: {
        this: string;
        Chapter: {
          this: string;
        };
        Verse: {
          this: string;
        };
        Root: {
          this: string;
        };
      };
    };
  };
  Util: {
    Components: {
      ThisPageIsUnderConstruction: {
        Header: string;
        Description: string;
      };
      Error: {
        NotFound: {
          Title: string;
          DefaultDescription: string;
        };
        RateLimit: {
          Title: string;
          DefaultDescription: string;
        };
        ServerError: {
          Title: string;
          DefaultDescription: string;
        };
        UnknownError: {
          Title: string;
          DefaultDescription: string;
        };
      };
    };
  };
};
