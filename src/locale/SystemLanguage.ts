// TODO: Will be extended.

export type SystemLanguage = {
    Navbar: {
        Placeholder: string;
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
                        }
                    }
                }
            }
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
                }
            }
        }
    },
    Util: {
        Components: {
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