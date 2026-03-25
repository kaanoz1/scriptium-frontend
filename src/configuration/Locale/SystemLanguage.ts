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
    Tooltip: {
        Platform: {
            NotActive: string;
        }
    }

};