// TODO: Will be extended.

export type SystemLanguage = {
    Navbar: {
        Placeholder: string,

        QuickNavigation: {
            Header: string;
            Description: string;
            ValidSeparators: string;

            ExampleDescriptions: {
                Header: string,

                Surah: string;
                Verse: string;
                GoesToSurah: string;
                WarningDescription: string;
            },
            MobileHamburgerButton: {
                Title: string;
                Language: string;
                Resources: string;
                Appearance: string;
            }
            MobileSearchModal: {
                SearchInputPlaceholder: string,
                PressEnterToNavigateDirectly: string;
                IfThisPersistContactUs: string;
                NoResultsFound: string;
                TryAdjustingYourSearch: string;
            }
        }
        Configuration: {
            Header: string,
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
                                }

                                SemanticSearch: {
                                    Header: string;
                                    Description: string;
                                }
                            }

                            ResultConfigs: {
                                Header: string;
                                EmphasizeMatches: {
                                    Header: string;
                                    Description: string;
                                }

                                FilterDuplicates: {
                                    Header: string;
                                    Description: string;
                                }
                            }
                        }
                    }
                },

                RootSearch: {
                    Header: string;
                    Description: string;
                }

            }

        },
        Buttons: {
            Statistics: string;
            LanguageChange: {
                Header: string;
                Description: string;
            }
            Documentation: {
                About: {
                    Header: string;
                    Description: string;
                },
                Discord: {
                    Header: string;
                    Description: string;
                },
                ForDevelopers: {
                    Header: string;
                    Description: string;
                }
            }
        }
    },
    Footer: {
        AllRightsReserved: string;
    }
    Tooltip: {
        Platform: {
            NotActive: string;
        }
    },
    Pages:
        {
            Home: {
                HeroSubtitle: string;
                QuranCard: {
                    Title: string;
                    ArabicTitle: string;
                    Description: string;
                },
                BibleCard: {
                    Title: string;
                    Description: string;
                    GreekTitle: string;
                },
                TorahCard: {
                    Title: string;
                    Description: string;
                    HebrewTitle: string;
                },
                HinduismCard: {
                    Title: string;
                    Description: string;
                    SanskritTitle: string;
                },
                BuddhismCard: {
                    Title: string;
                    Description: string;
                    PaliTitle: string;
                },

                Messages: {
                    DatabaseIncapability: string;
                };
            }
            Islam: {
                Quran: {
                    Components: {
                        Header: {
                            Header: string;
                            Description: string;
                        }
                        ChapterCard: {
                            Verses: string;
                        }
                    },
                    Chapter: {
                        Components: {
                            Header: {
                                Header: string;
                                Description: string;
                            },
                            TranslationIndicator: {
                                Translations: string;
                            },
                            Settings: {
                                Title: string;
                                Description: string;
                                FontFamily: string;
                                FontSize: string;
                                Min: string;
                                Max: string;
                                Done: string;
                            },
                            Translations: {
                                Title: string;
                                Description: string;
                                Done: string;
                            },
                            Share: {
                                Title: string;
                                Description: string;
                                Copy: string;
                                Close: string;
                            },
                            VerseContainer: {
                                VerseContainerHeader: {
                                    UtilToolButtons: {
                                        AudioPlayButton: {
                                            NotActiveYet: string;
                                        },
                                        NextChapterButton: {
                                            NoNextChapter: string;
                                        },
                                        PreviousChapterButton: {
                                            NoPreviousChapter: string;
                                        },
                                        ShareButton: {
                                            Title: string,
                                            Description: string,
                                            Copy: string,
                                            Close: string,
                                            CopySuccessful: string;
                                            CopyFailed: string;
                                        },
                                        QuranTranslationChangeButton: {
                                            Title: string,
                                            Description: string,
                                            Done: string,
                                        },
                                        QuranConfigurationButton: {
                                            Title: string,
                                            Description: string,
                                            FontFamily: string,
                                            FontSize: string,
                                            Disclaimer: string,
                                            DataProvider: string,
                                            Done: string,
                                            ViewSettings: string;
                                            ShowArabicText: string;
                                            ShowArabicTextDescription: string;
                                            ShowTranslation: string;
                                            ShowTranslationDescription: string;
                                            ShowTransliteration: string;
                                            ShowTransliterationDescription: string;
                                        }
                                    }
                                },
                                VerseBox: {
                                    NoTransliterationAvailable: string;
                                    VerseBoxTranslation: {
                                        NoProvidedTranslation: string;
                                    }
                                }
                            }
                        },
                        Verse: {
                            Components: {
                                VerseTranslation: {
                                    Header: string;
                                    Description: string;
                                },

                                VerseTranslationTable: {
                                    NoActiveTranslationsSelected: string;
                                    Translations: string;
                                    StickyToggleInfo: string;
                                }
                                VerseTransliterations: {
                                    NoTransliterationAvailable: string;
                                },
                                VerseWordTable: {
                                    Sequence: string;
                                    Word: string;
                                    Root: string;
                                    Words: string;
                                    StickyToggleInfo: string;
                                }
                                UtilToolButtons: {
                                    NextVerseButton: {
                                        NoNextVerse: string;
                                    },
                                    PreviousVerseButton: {
                                        NoPreviousVerse: string;
                                    },
                                    ShareButton: {
                                        Title: string,
                                        Description: string,
                                        Copy: string,
                                        Close: string;
                                    },
                                    AudioPlayButton: {
                                        NotActiveYet: string;
                                    },
                                    QuranTranslationChangeButton: {
                                        Title: string,
                                        Description: string,
                                        Done: string;
                                    },
                                    QuranConfigurationButton: {
                                        Title: string,
                                        Description: string,
                                        FontFamily: string,
                                        FontSize: string,
                                        Disclaimer: string,
                                        DataProvider: string,
                                        Done: string,
                                        ViewSettings: string,
                                        ShowArabicText: string,
                                        ShowArabicTextDescription: string,
                                        ShowTranslation: string,
                                        ShowTranslationDescription: string,
                                        ShowTransliteration: string,
                                        ShowTransliterationDescription: string
                                    }
                                }
                            }
                        }
                    },
                    Root: {
                        Messages: {
                            HighOccurrencesWarningTitle: string;
                            HighOccurrencesWarningDesc: string
                        },
                        Components: {
                            Header: {
                                Header: string;
                                Description: string;
                                Occurrences: string;
                            },
                        }
                    }
                }
            },
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
            },
        },
    Terms: {
        General: {
            HomePage: string;
        }
        Islam: {
            this: string;
            Quran: {
                this: string;
                Chapter: {
                    this: string;
                },
                Verse: {
                    this: string;
                },
                Root: {
                    this: string;
                }
            },

        }
    },
    Util: {
        Components: {
            ThisPageIsUnderConstruction: {
                Header: string;
                Description: string;
            },
            Error: {
                NotFound: {
                    Title: string;
                    DefaultDescription: string;
                }
                RateLimit: {
                    Title: string;
                    DefaultDescription: string;
                },
                ServerError: {
                    Title: string;
                    DefaultDescription: string;
                },
                UnknownError: {
                    Title: string;
                    DefaultDescription: string;
                }

            }
        }
    }
};