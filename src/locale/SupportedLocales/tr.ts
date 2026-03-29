import {SystemLanguage} from "@/locale/SystemLanguage";

export const tr: SystemLanguage = {
    Navbar: {
        Placeholder: "Arayın...",
        QuickNavigation: {
            Header: "Hızlı Gezinti",
            Description: "Sure ve ayet numaralarını kullanarak doğrudan erişim sağlayın.",
            ValidSeparators: "Geçerli Ayırıcılar:",
            ExampleDescriptions: {
                Header: "Örnekler",
                Surah: "Sure",
                Verse: "Ayet",
                GoesToSurah: "Şu sureye gider:",
                WarningDescription: "Hedefin varlığı navigasyon öncesi doğrulanmaz. Sure/Ayetin Kur'an'da mevcut olduğundan emin olun."
            }
        },
        Configuration: {
            Header: "Arama Ayarları",
            SearchAlgorithms: {
                TranslationSearch: {
                    Header: "Meal Araması",
                    Description: "Kelime veya cümle bazlı mealler içinde arama yapın.",
                    Configuration: {
                        Methodology: {
                            Header: "Arama Metodolojisi",
                            SearchPreference: {
                                MatchSearch: {
                                    Header: "Tam Eşleşme",
                                    Description: "Girdiğiniz kelimelerin tam olarak geçtiği sonuçları gösterir."
                                },
                                SemanticSearch: {
                                    Header: "Anlamsal Arama",
                                    Description: "Kelimelerin anlamdaşlarını ve bağlamını dikkate alarak arama yapar."
                                }
                            },
                            ResultConfigs: {
                                Header: "Sonuç Yapılandırması",
                                EmphasizeMatches: {
                                    Header: "Eşleşmeleri Vurgula",
                                    Description: "Arama terimlerini sonuçlar içinde belirginleştirir."
                                },
                                FilterDuplicates: {
                                    Header: "Tekrarları Filtrele",
                                    Description: "Benzer sonuçların tekrar etmesini engeller."
                                }
                            }
                        }
                    }
                },
                RootSearch: {
                    Header: "Kök Araması",
                    Description: "Kelimelerin Arapça köklerine göre arama yapın."
                }
            }
        },
        Buttons: {
            LanguageChange: {
                Header: "Dil Değiştir",
                Description: "Uygulama dilini seçin."
            },
            Documentation: {
                About: {
                    Header: "Hakkında",
                    Description: "Scriptium projesi hakkında bilgi edinin."
                },
                Discord: {
                    Header: "Discord",
                    Description: "Topluluğumuza katılın."
                },
                ForDevelopers: {
                    Header: "Geliştiriciler İçin",
                    Description: "API ve dökümantasyon detayları."
                }
            }
        }
    },
    Footer: {
        AllRightsReserved: "Tüm hakları saklıdır."
    },
    Tooltip: {
        Platform: {
            NotActive: "Henüz aktif değil."
        }
    },
    Pages: {
        Home: {
            HeroSubtitle: "Evrensel teoloji kütüphanesi.",
            QuranCard: {
                Title: "Kur'an-ı Kerim",
                ArabicTitle: "القرآن الكريم",
                Description: "Tam Arapça metne, çevirilere ve gelişmiş kök kelime metodolojisi aramasına erişin."
            },
            TorahCard: {
                Title: "Tevrat",
                HebrewTitle: "תּוֹרָה",
                Description: "İbranice metinlerin dilbilimsel analizi."
            },
            BibleCard: {
                Title: "İncil",
                GreekTitle: "Biblion",
                Description: "Yeni Ahit metinleri, çeviriler ve inceleme."
            },
            HinduismCard: {
                Title: "Hinduizm",
                SanskritTitle: "Sanatana Dharma",
                Description: "Vedik metinler, Upanişadlar ve antik Sanskrit kaynaklarının felsefi analizi."
            },
            BuddhismCard: {
                Title: "Budizm",
                PaliTitle: "Buddhadharma",
                Description: "Pali Külliyatı, Sutralar ve aydınlanma yolunun temel öğretilerinin incelenmesi."
            },
            Messages: {
                DatabaseIncapability: "Veritabanlarımız henüz bu kitap için yeterli kapasiteye sahip değil. Kullanıcılarımıza sunabileceğimiz veriler için sürekli araştırmalarımıza devam ediyoruz."
            }
        },
        Islam: {
            Quran: {
                Components: {
                    Header: {
                        Header: "Sureler",
                        Description: "Bir sure seçin."
                    },
                    ChapterCard: {
                        Verses: "Ayet"
                    }
                },
                Chapter: {
                    Components: {
                        Header: {
                            Header: "Sure Detayları",
                            Description: "Bu surenin ayetlerini, meallerini ve okunuşlarını inceleyin."
                        },
                        TranslationIndicator: {
                            Translations: "Meal"
                        },
                        Settings: {
                            Title: "Okuma Ayarları",
                            Description: "Okuma deneyiminizi kişiselleştirin.",
                            FontFamily: "Arapça Yazı Tipi",
                            FontSize: "Arapça Yazı Boyutu",
                            Min: "Min",
                            Max: "Maks",
                            Done: "Bitti"
                        },
                        Translations: {
                            Title: "Mealler",
                            Description: "Arapça metnin yanında görüntülemek istediğiniz mealleri seçin.",
                            Done: "Bitti"
                        },
                        Share: {
                            Title: "Sureyi Paylaş",
                            Description: "Bu sureyi başkalarıyla paylaşın.",
                            Copy: "Kopyala",
                            Close: "Kapat"
                        },
                        VerseContainer: {
                            VerseContainerHeader: {
                                UtilToolButtons: {
                                    AudioPlayButton: {
                                        NotActiveYet: "Sesli dinleme henüz aktif değil."
                                    },
                                    NextChapterButton: {
                                        NoNextChapter: "Son suredesiniz."
                                    },
                                    PreviousChapterButton: {
                                        NoPreviousChapter: "İlk suredesiniz."
                                    },
                                    ShareButton: {
                                        Title: "Paylaş",
                                        Description: "Aşağıdaki metni sosyal medya aracılığıyla paylaşın veya panoya kopyalayın.",
                                        Copy: "Kopyala",
                                        Close: "Kapat",
                                        CopySuccessful: "Metin panoya kopyalandı!",
                                        CopyFailed: "Metin kopyalanamadı. Lütfen tekrar deneyin."
                                    },
                                    QuranTranslationChangeButton: {
                                        Title: "Mealler",
                                        Description: "Arapça metnin yanında görüntülemek istediğiniz mealleri seçin.",
                                        Done: "Bitti"
                                    },
                                    QuranConfigurationButton: {
                                        Title: "Okuma Ayarları",
                                        Description: "Kur'an görünümünün tarzını ve içeriğini kişiselleştirin.",
                                        FontFamily: "Arapça Yazı Tipi",
                                        FontSize: "Arapça Yazı Boyutu",
                                        Disclaimer: "Varyasyon isimleri ve metin yapılarının hangi kuruluşlar tarafından sağlandığını incelemek için tıklayın:",
                                        DataProvider: "Veri Sağlayıcıları",
                                        Done: "Bitti",
                                        ViewSettings: "Görünüm Seçenekleri",
                                        ShowArabicText: "Arapça Metni Göster",
                                        ShowArabicTextDescription: "Orijinal Arapça ayetleri görüntüler.",
                                        ShowTranslation: "Meali Göster",
                                        ShowTranslationDescription: "Seçili mealleri görüntüler.",
                                        ShowTransliteration: "Transliterasyonu Göster",
                                        ShowTransliterationDescription: "Arapça metnin Latin harfleriyle okunuşunu görüntüler."
                                    }
                                }
                            },
                            VerseBox: {
                                NoTransliterationAvailable: "Bu ayet için okunuş bilgisi mevcut değil.",
                                VerseBoxTranslation: {
                                    NoProvidedTranslation: "Seçili kaynak için meal bulunamadı."
                                }
                            }
                        },
                    },
                    Verse: {
                        Components: {
                            VerseTranslation: {
                                Header: "Mealler",
                                Description: "Bu ayet için farklı mealleri karşılaştırın."
                            },
                            VerseTransliterations: {
                                NoTransliterationAvailable: "Bu ayet için okunuş bilgisi mevcut değil."
                            },
                            VerseWordTable: {
                                Sequence: "Sıra",
                                Word: "Kelime",
                                Root: "Kök",
                                Words: "Kelimeler",
                                StickyToggleInfo: "Sayfayı kaydırırken bu tablonun ekranda sabit kalması için bu ayarı açın."
                            },
                            UtilToolButtons: {
                                NextVerseButton: {
                                    NoNextVerse: "Son ayettesiniz."
                                },
                                PreviousVerseButton: {
                                    NoPreviousVerse: "İlk ayettesiniz."
                                },
                                ShareButton: {
                                    Title: "Ayeti Paylaş",
                                    Description: "Aşağıdaki metni sosyal medya aracılığıyla paylaşın veya panoya kopyalayın.",
                                    Copy: "Kopyala",
                                    Close: "Kapat"
                                },
                                AudioPlayButton: {
                                    NotActiveYet: "Sesli dinleme henüz aktif değil."
                                },
                                QuranTranslationChangeButton: {
                                    Title: "Mealler",
                                    Description: "Okumak istediğiniz Kuran mealini seçin.",
                                    Done: "Kapat"
                                },
                                QuranConfigurationButton: {
                                    Title: "Okuma Ayarları",
                                    Description: "Kur'an görünümünün tarzını ve içeriğini kişiselleştirin.",
                                    FontFamily: "Arapça Yazı Tipi",
                                    FontSize: "Arapça Yazı Boyutu",
                                    Disclaimer: "Varyasyon isimleri ve metin yapılarının hangi kuruluşlar tarafından sağlandığını incelemek için tıklayın:",
                                    DataProvider: "Veri Sağlayıcıları",
                                    Done: "Bitti",
                                    ViewSettings: "Görünüm Seçenekleri",
                                    ShowArabicText: "Arapça Metni Göster",
                                    ShowArabicTextDescription: "Orijinal Arapça ayetleri görüntüler.",
                                    ShowTranslation: "Meali Göster",
                                    ShowTranslationDescription: "Seçili mealleri görüntüler.",
                                    ShowTransliteration: "Transliterasyonu Göster",
                                    ShowTransliterationDescription: "Arapça metnin Latin harfleriyle okunuşunu görüntüler."
                                }
                            },
                            VerseTranslationTable: {
                                NoActiveTranslationsSelected: "Bir çeviri seçmediniz.",
                                StickyToggleInfo: "Sayfayı kaydırırken bu tablonun ekranda sabit kalması için bu ayarı açın.",
                                Translations: "Çeviri"
                            }
                        }
                    }
                },
                Root: {
                    Components: {
                        Header: {
                            Occurrences: "Tekrar",
                            Header: "Kökler",
                            Description: ""
                        }
                    },
                    Messages: {
                        HighOccurrencesWarningTitle: "Çok fazla tekrar",
                        HighOccurrencesWarningDesc: "Tüm sonuçları gösteriyoruz. Bu, cihazınızın güçünden bağımlı olarak yavaşlamanıza neden olabilir. Bu sorunu optimize etmek için uğraşıyoruz."
                    }
                }
            }
        },
        About: {
            WhatIsScriptium: {
                Badge: "Proje Hakkında",
                Title: "Scriptium Nedir?",
                Description: "Scriptium, dünyanın en derin teolojik ve felsefi kaynaklarını modern ve erişilebilir bir formatta toplamak, yapılandırmak ve sunmak için oluşturulmuş özel bir platformdur."
            },
            BetaWarning: {
                Title: "Beta Sürümü Uyarısı",
                Description: "Scriptium şu anda Beta aşamasındadır. Zaman zaman tutarsız verilerle veya eksik özelliklerle karşılaşabilirsiniz. Herhangi bir sorun fark ederseniz, lütfen bize bildirin: "
            },
            DataSuppliers: {
                Title: "Veri Sağlayıcıları",
                Description: "Scriptium'un İslami metinlerine güç veren kapsamlı Kuran verilerini ve çevirilerini sağladıkları için aşağıdaki platformlara en derin şükranlarımızı sunarız."
            },
            Contact: {
                Title: "İletişim",
                Description: "Bir sorunuz, geri bildiriminiz mi var veya katkıda bulunmak mı istiyorsunuz? Bize doğrudan ulaşın."
            },
            Discord: {
                Title: "Discord Topluluğu",
                Description: "Discord botumuz ve topluluk sunucumuz şu anda yapım aşamasındadır.",
                Status: "Yakında"
            },
            Support: {
                DisabledStatus: "Devre Dışı",
                NotActiveYet: "Aktid değil.",
                Title: "Projeyi Destekle",
                Description: "Bağış ve destek seçenekleri şu anda devre dışıdır, ancak bizi destekleme isteğinizi takdir ediyoruz!"
            }
        }
    },
    Terms: {
        General: {
            HomePage: "Ana Sayfa"
        },
        Islam: {
            this: "İslam",
            Quran: {
                this: "Kur'an",
                Chapter: {
                    this: "Sure"
                },
                Verse: {
                    this: "Ayet"
                },
                Root: {
                    this: "Kök"
                }
            },

        }
    },
    Util: {
        Components: {
            Error: {
                NotFound: {
                    Title: "Bulunamadı",
                    DefaultDescription: "Aradığınız yazıt veya kayıt kütüphanemizde mevcut değil."
                },
                RateLimit: {
                    Title: "Hop, biraz yavaşla!",
                    DefaultDescription: "Çok hızlı istek gönderiyorsunuz. Lütfen tekrar denemeden önce bir süre bekleyin."
                },
                ServerError: {
                    Title: "Sunucu Hatası",
                    DefaultDescription: "Bizim tarafımızda bir sorun oluştu. Katiplerimiz bilgilendirildi ve bir çözüm üzerinde çalışıyorlar."
                },
                UnknownError: {
                    Title: "Bilinmeyen Bir Hata Oluştu",
                    DefaultDescription: "Beklenmedik bir anomali isteğinizi kesintiye uğrattı. Lütfen sayfayı yenilemeyi veya geri dönmeyi deneyin."
                }
            },
            ThisPageIsUnderConstruction: {
                Header: "Yapım Aşamasında",
                Description: "Bu sayfayı hayata geçirmek için yoğun bir şekilde çalışıyoruz. Lütfen daha sonra tekrar kontrol edin!"
            }
        }
    }
} as const;

export default tr;