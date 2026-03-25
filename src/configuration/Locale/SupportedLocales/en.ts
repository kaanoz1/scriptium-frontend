import {SystemLanguage} from "@/configuration/Locale/SystemLanguage";

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
    }
} as const;

export default en;