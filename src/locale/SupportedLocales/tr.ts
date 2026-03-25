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
        Platform: {NotActive: "Henüz aktif değil."},

    },
    Pages: {
        Islam: {
            Quran: {
                Components: {
                    Header: {
                        Header: "Sureler",
                        Description: "Bir sure seçin."
                    },
                    ChapterCard: {
                        Verses: "ayet",
                    }
                }
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
            }
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
                    DefaultDescription: "Bizim tarafımızda bir sorun oluştu. Katiplerimiz bilgilendirildi ve bir çözüm üzerinde çalışıyorlar.",
                },
                UnknownError: {
                    Title: "Bilinmeyen Bir Hata Oluştu",
                    DefaultDescription: "Beklenmedik bir anomali isteğinizi kesintiye uğrattı. Lütfen sayfayı yenilemeyi veya geri dönmeyi deneyin."
                }
            }
        }
    }
} as const;

export default tr;