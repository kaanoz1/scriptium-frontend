import {SystemLanguage} from "@/locale/SystemLanguage";

export const en: SystemLanguage = {
    Navbar: {
        Placeholder: "Search...",
        QuickNavigation: {
            Header: "Quick Navigation",
            Description: "Access directly using surah and verse numbers.",
            ValidSeparators: "VALID SEPARATORS:",
            ExampleDescriptions: {
                Header: "Examples",
                Surah: "Surah",
                Verse: "Verse",
                GoesToSurah: "Goes to surah:",
                WarningDescription: "Destination existence is not verified before navigation. Ensure the Surah/Verse exists in the Quran."
            }
        },
        Configuration: {
            Header: "Search Configuration",
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
                                    Description: "Shows results where your keywords appear exactly."
                                },
                                SemanticSearch: {
                                    Header: "Semantic Search",
                                    Description: "Searches by considering synonyms and context."
                                }
                            },
                            ResultConfigs: {
                                Header: "Result Configuration",
                                EmphasizeMatches: {
                                    Header: "Emphasize Matches",
                                    Description: "Highlights search terms within the results."
                                },
                                FilterDuplicates: {
                                    Header: "Filter Duplicates",
                                    Description: "Prevents repetitive similar results."
                                }
                            }
                        }
                    }
                },
                RootSearch: {
                    Header: "Root Search",
                    Description: "Search based on Arabic word roots."
                }
            }
        },
        Buttons: {
            LanguageChange: {
                Header: "Change Language",
                Description: "Select the application language."
            },
            Documentation: {
                About: {
                    Header: "About",
                    Description: "Learn more about the Scriptium project."
                },
                Discord: {
                    Header: "Discord",
                    Description: "Join our community."
                },
                ForDevelopers: {
                    Header: "For Developers",
                    Description: "API and documentation details."
                }
            }
        }
    },
    Footer: {
        AllRightsReserved: "All rights reserved.",
    },
    Tooltip: {
        Platform: {
            NotActive: "Not active yet."
        }
    },
    Pages: {
        Islam: {
            Quran: {
                Components: {
                    Header: {
                        Header: "Al-Qur'an Chapters",
                        Description: "Select a Surah below to read."
                    },
                    ChapterCard: {
                        Verses: "Verses"
                    }
                },
                Chapter: {
                    Components: {
                        Header: {
                            Header: "Surah Details",
                            Description: "Explore the verses, translations, and transliterations of this chapter."
                        },
                        TranslationIndicator: {
                            Translations: "Translations"
                        },
                        Settings: {
                            Title: "Reading Settings",
                            Description: "Customize your reading experience.",
                            FontFamily: "Arabic Font Family",
                            FontSize: "Arabic Font Size",
                            Min: "Min",
                            Max: "Max",
                            Done: "Done"
                        },
                        Translations: {
                            Title: "Translations",
                            Description: "Select the translations you want to display alongside the Arabic text.",
                            Done: "Done"
                        },
                        Share: {
                            Title: "Share Surah",
                            Description: "Share this chapter with others.",
                            Copy: "Copy",
                            Close: "Close"
                        },
                        VerseContainer: {
                            VerseContainerHeader: {
                                UtilToolButtons: {
                                    AudioPlayButton: {
                                        NotActiveYet: "Audio playback is not available yet."
                                    },
                                    NextChapterButton: {
                                        NoNextChapter: "You are at the last chapter."
                                    },
                                    PreviousChapterButton: {
                                        NoPreviousChapter: "You are at the first chapter."
                                    },
                                    ShareButton: {
                                        Title: "Share",
                                        Description: "Share the text below via social media or copy it to your clipboard.",
                                        Copy: "Copy",
                                        Close: "Close",
                                        CopySuccessful: "Text copied to clipboard!",
                                        CopyFailed: "Failed to copy text. Please try again."
                                    },
                                    QuranTranslationChangeButton: {
                                        Title: "Translations",
                                        Description: "Select the translations you would like to display alongside the Arabic text.",
                                        Done: "Done"
                                    },
                                    QuranConfigurationButton: {
                                        Title: "Reading Settings",
                                        Description: "Customize the appearance and content of the Quran view.",
                                        FontFamily: "Arabic Font Family",
                                        FontSize: "Arabic Font Size",
                                        Disclaimer: "Variation names and their text structures are strictly provided and categorized by our",
                                        DataProvider: "Data Provider",
                                        Done: "Done",
                                        ViewSettings: "View Options",
                                        ShowArabicText: "Show Arabic Text",
                                        ShowArabicTextDescription: "Display the original Arabic verses.",
                                        ShowTranslation: "Show Translation",
                                        ShowTranslationDescription: "Display the selected translations.",
                                        ShowTransliteration: "Show Transliteration",
                                        ShowTransliterationDescription: "Display Latin pronunciation of the Arabic text."
                                    }
                                }
                            },
                            VerseBox: {
                                NoTransliterationAvailable: "No transliteration available for this verse.",
                                VerseBoxTranslation: {
                                    NoProvidedTranslation: "No translation available for the selected source."
                                }
                            }
                        },
                    },
                    Verse: {
                        Components: {
                            VerseTranslation: {
                                Header: "Translations",
                                Description: "Compare different translations for this verse."
                            },
                            VerseTransliterations: {
                                NoTransliterationAvailable: "No transliteration available for this verse."
                            },
                            VerseWordTable: {
                                Sequence: "Sequence",
                                Word: "Text",
                                Root: "Root(s)",
                                Words: "Word(s)",
                                StickyToggleInfo: "Enable sticky mode to keep this table visible while scrolling the page."
                            },
                            UtilToolButtons: {
                                NextVerseButton: {
                                    NoNextVerse: "You are at the last verse."
                                },
                                PreviousVerseButton: {
                                    NoPreviousVerse: "You are at the first verse."
                                },
                                ShareButton: {
                                    Title: "Share Verse",
                                    Description: "Share the text below via social media or copy it to your clipboard.",
                                    Copy: "Copy",
                                    Close: "Done"
                                },
                                AudioPlayButton: {
                                    NotActiveYet: "Audio playback is not available yet."
                                },
                                QuranTranslationChangeButton: {
                                    Title: "Translations",
                                    Description: "Change the translation of the Quran",
                                    Done: "Done"
                                },
                                QuranConfigurationButton: {
                                    Title: "Reading Settings",
                                    Description: "Customize the appearance and content of the Quran view.",
                                    FontFamily: "Arabic Font Family",
                                    FontSize: "Arabic Font Size",
                                    Disclaimer: "Variation names and their text structures are strictly provided and categorized by our",
                                    DataProvider: "Data Provider",
                                    Done: "Done",
                                    ViewSettings: "View Options",
                                    ShowArabicText: "Show Arabic Text",
                                    ShowArabicTextDescription: "Display the original Arabic verses.",
                                    ShowTranslation: "Show Translation",
                                    ShowTranslationDescription: "Display the selected translations.",
                                    ShowTransliteration: "Show Transliteration",
                                    ShowTransliterationDescription: "Display Latin pronunciation of the Arabic text."
                                }
                            },
                            VerseTranslationTable: {
                                NoActiveTranslationsSelected: "No active translations selected.",
                                StickyToggleInfo: "Enable sticky mode to keep this table visible while scrolling the page.",
                                Translations: "Translations"
                            }
                        }
                    }
                },
                Root: {
                    Components: {
                        Header: {
                            Occurrences: "Occurrences",
                            Header: "Roots of Qur'an",
                            Description: ""
                        }
                    },
                    Messages: {
                        HighOccurrencesWarningTitle: "High number of occurrences",
                        HighOccurrencesWarningDesc: "We are showing all results. This may cause freezes depending on your device power. We are actively working to optimize this.",
                    }
                }
            }
        }
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
                    this: "Chapter"
                },
                Verse: {
                    this: "Verse"
                },
                Root: {
                    this: "Root"
                }
            },

        }
    },
    Util: {
        Components: {
            Error: {
                NotFound: {
                    Title: "Not Found",
                    DefaultDescription: "The manuscript or record you are looking for does not exist in our library."
                },
                RateLimit: {
                    Title: "Whoa, slow down!",
                    DefaultDescription: "You are making requests too quickly. Please wait a moment before trying again."
                },
                ServerError: {
                    Title: "Internal Server Error",
                    DefaultDescription: "Something went wrong on our end. Our scribes have been notified and are working on a fix."
                },
                UnknownError: {
                    Title: "An Unknown Error Occurred",
                    DefaultDescription: "An unexpected anomaly disrupted your request. Please try refreshing the page or navigating back."
                }
            }
        }
    }
} as const;

export default en;