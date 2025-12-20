export interface Slide {
    id: number;
    title: string;
    type: 'theory' | 'terminal' | 'interactive' | 'intro' | 'agenda' | 'outro';
    content: string[];
    codeLines?: string[];
    fileName?: string;
    component?: string; // identifier for which component to render
}

// ... (interfaces maintained)

export const slides: Slide[] = [
    // ==========================================
    // 0. Intro & Agenda
    // ==========================================
    {
        id: 0,
        title: "Intro",
        type: 'intro',
        content: []
    },
    {
        id: 0.5,
        title: "Akış (Agenda)",
        type: 'agenda',
        content: []
    },

    // ==========================================
    // 1. Temel Kavramlar (Theory)
    // ==========================================
    {
        id: 1,
        title: "1. Versiyon Kontrol Sistemi (VCS)",
        type: 'theory',
        content: [
            "• Projenizi zamana karşı koruyan bir 'Zaman Makinesi'dir. Hata yaptığınızda güvenle geri alabilirsiniz.",
            "• Sadece kod yedeklemek değil; 'Kim, Ne Zaman, Neden' değişiklik yaptı sorularının cevabıdır.",
            "• Ekip çalışmasının kalbidir: Aynı dosya üzerinde aynı anda çakışmadan çalışmayı sağlar."
        ]
    },
    {
        id: 2,
        title: "2. Neden Git Kullanmalıyız?",
        type: 'theory',
        content: [
            "• Dağıtık Yapı (Distributed): İnternet kesilse bile projenin tam tarihçesi bilgisayarınızda olur.",
            "• Snapshot (Anlık Durum) Mantığı: Git, dosyalar arasındaki küçük değişiklikleri hesaplamak yerine, her kayıt noktasında projenin o anki bütünsel bir kopyasını (paketini) oluşturur. Dosyaların son haline doğrudan ulaşılabildiği için çok hızlı çalışır.",
            "• Endüstri Standardı: Linux, Android, Google, Microsoft ve dünyadaki geliştiricilerin %95'i Git kullanır."
        ]
    },

    // ==========================================
    // 2. Başlangıç (Terminal)
    // ==========================================
    {
        id: 3,
        title: "3. Kimlik Doğrulama (Config)",
        type: 'terminal',
        content: [
            "Git kurulumundan sonra yapılması gereken İLK işlem kimliğinizi tanıtmaktır.",
            "Bu bilgiler her commit işleminde 'Yazar (Author)' olarak görünecektir."
        ],
        codeLines: [
            "# 1. Kullanıcı Adınızı Tanımlayın",
            "git config --global user.name \"Adınız Soyadınız\"",
            "",
            "# 2. E-posta Adresinizi Tanımlayın",
            "git config --global user.email \"email@adresiniz.com\"",
            "",
            "# 3. Ayarları Kontrol Edin",
            "git config --list"
        ],
        fileName: "config.sh"
    },
    {
        id: 4,
        title: "4. Proje Başlatma (Init & Clone)",
        type: 'terminal',
        content: [
            "Bir projeyi Git ile takibe almak için iki yöntem vardır:",
            "Ya sıfırdan 'init' ile başlatırsınız ya da var olanı 'clone' ile indirirsiniz."
        ],
        codeLines: [
            "# Senaryo A: Yeni Bir Projeye Başlamak",
            "mkdir projem",
            "cd projem",
            "git init      # .git klasörü oluşturulur ve takip başlar",
            "",
            "# Senaryo B: GitHub'dan Proje İndirmek",
            "git clone https://github.com/kullanici/repo.git",
            "# (Tüm tarihçe ve dosyalar bilgisayarınıza iner)"
        ],
        fileName: "start.sh"
    },

    // ==========================================
    // 3. Çalışma Döngüsü (Workflow)
    // ==========================================
    {
        id: 5,
        title: "5. Git Yaşam Döngüsü: 3 Bölge",
        type: 'terminal',
        content: [
            "Git'te dosyalar 3 aşamadan geçer:",
            "1. Working Dir (Çalışma Masası) -> 2. Staging Area (Kargo Kutusu) -> 3. Repository (Kargo Aracı)"
        ],
        codeLines: [
            "# 1. Durumu Kontrol Et (Kırmızı: Takip edilmeyenler)",
            "git status",
            "",
            "# 2. Sahneye Al (Koliye Koy)",
            "git add dosya.txt   # Tek dosya",
            "git add .           # Her şeyi ekle",
            "",
            "# 3. Onayla ve Kaydet (Kargoya Ver)",
            "git commit -m \"Login sayfası eklendi\""
        ],
        fileName: "workflow.sh"
    },
    {
        id: 6,
        title: "Görselleştirme: Staging Area",
        type: 'interactive',
        content: [
            "Soldaki dosyaları seçip (add) sağ tarafa (commit) göndererek yaşam döngüsünü deneyimleyin."
        ],
        component: "StagingDemo"
    },
    {
        id: 7,
        title: "6. Geçmişe Yolculuk (Log)",
        type: 'terminal',
        content: [
            "Projede bugüne kadar kimlerin ne yaptığını görmek için log komutları kullanılır."
        ],
        codeLines: [
            "# Detaylı Tarihçe (Yazar, tarih, mesaj)",
            "git log",
            "",
            "# Özet Görünüm (Sadece ID ve mesaj)",
            "git log --oneline",
            "",
            "# Son 3 Değişikliği Göster",
            "git log -n 3",
            "",
            "# Grafiksel Ağaç Yapısı",
            "git log --graph --oneline --all"
        ],
        fileName: "history.sh"
    },
    {
        id: 8,
        title: "7. Gizli Dosyalar (.gitignore)",
        type: 'theory',
        content: [
            "• Her dosyayı sunucuya göndermek istemeyiz (Şifreler, API Keyler, 500MB'lık node_modules).",
            "• Projenin köküne `.gitignore` adlı bir dosya açıp, içine istemediğimiz dosya isimlerini yazarız.",
            "• Git bu dosyaları YOK SAYAR ve takip etmez."
        ]
    },

    // ==========================================
    // 4. Dallanma (Branching)
    // ==========================================
    {
        id: 9,
        title: "8. Dallanma (Branching) Mantığı",
        type: 'theory',
        content: [
            "• Ana proje (main) bozulmasın diye kopyasını alıp orada çalışmaktır.",
            "• Paralel Evrenler: Bir branch'te 'Login' yaparken diğerinde 'Ödeme Sistemi' yapabilirsiniz.",
            "• İki iş birbirini etkilemez. İş bitince ana projeye (main) birleştirilir (Merge)."
        ]
    },
    {
        id: 10,
        title: "İnteraktif Demo: Branch & Merge",
        type: 'interactive',
        content: [
            "Aşağıdaki butona basarak yeni bir dal oluşturun, commit atın ve main'e bağlayın."
        ],
        component: "BranchingDemo"
    },
    {
        id: 11,
        title: "9. Branch Komutları",
        type: 'terminal',
        content: [
            "Dallar arası geçiş ve yönetim komutları."
        ],
        codeLines: [
            "# Mevcut dalları listele",
            "git branch",
            "",
            "# Yeni özellik için dal oluştur ve geç",
            "git checkout -b yeni-ozellik",
            "",
            "# Ana dala geri dön",
            "git checkout main",
            "",
            "# Özelliği ana projeye dahil et (Merge)",
            "git merge yeni-ozellik",
            "",
            "# İşi biten dalı sil",
            "git branch -d yeni-ozellik"
        ],
        fileName: "branch_ops.sh"
    },

    // ==========================================
    // 5. Uzak Sunucu (Remote / GitHub)
    // ==========================================
    {
        id: 12,
        title: "11. Remote: GitHub Nedir?",
        type: 'theory',
        content: [
            "• Git: Bilgisayarınızdaki (yerel) araçtır. GitHub: Projenizin buluttaki Instagram'ıdır.",
            "• Sosyal Kodlama: Başkalarının kodlarını görebilir, beğenebilir (star) ve kopyalayabilirsiniz (fork).",
            "• Yedekleme: Bilgisayarınız bozulsa bile kodlarınız 'origin' (köken) sunucusunda güvendedir."
        ]
    },

    {
        id: 13,
        title: "12. Push & Pull (Senkronizasyon)",
        type: 'terminal',
        content: [
            "Yerel (Local) ve Uzak (Remote) depo arasındaki veri trafiği."
        ],
        codeLines: [
            "# 1. Uzak Sunucuyu Tanımla (Sadece bir kez)",
            "git remote add origin https://github.com/kullanici/proje.git",
            "",
            "# 2. Gönder: Yereldeki commitleri buluta yükle",
            "git push -u origin main",
            "",
            "# 3. Çek: Arkadaşının attığı değişiklikleri indir",
            "git pull origin main"
        ],
        fileName: "sync.sh"
    },
    {
        id: 14,
        title: "13. Pull Request (PR) Kültürü",
        type: 'theory',
        content: [
            "• Profesyonel dünyada 'main' dala direkt kod atılmaz.",
            "• PR (İstek): 'Ben bu özelliği yaptım, lütfen inceleyip ana projeye ekler misiniz?' demektir.",
            "• Code Review: Takım arkadaşlarınızın kodunuzu okuyup hata veya öneri sunduğu aşamadır."
        ]
    },

    // ==========================================
    // 6. İleri Seviye & Kapanış
    // ==========================================
    {
        id: 15,
        title: "14. Git: Hayat Kurtaran Komutlar",
        type: 'terminal',
        content: [
            "Hata yaptığınızda panik yapmayın. Git'te neredeyse her şeyin geri dönüşü vardır."
        ],
        codeLines: [
            "# Yanlışlıkla değiştirdiğin dosyayı eski haline getir",
            "git restore dosya.txt",
            "",
            "# Son commit mesajını yanlış mı yazdın? Düzelt:",
            "git commit --amend -m \"Yeni doğru mesaj\"",
            "",
            "# Acil iş çıktı, değişiklikleri 'cepte' sakla",
            "git stash       # Sakla",
            "git stash pop   # Geri getir"
        ],
        fileName: "panic_button.sh"
    },
    {
        id: 15.1,
        title: "Kısa Bir Ara",
        type: 'interactive',
        content: [],
        component: "ShortBreak"
    },
    {
        id: 15.2,
        title: "2. OTURUM",
        type: 'theory',
        content: []
    },
    {
        id: 16,
        title: "Git vs GitHub",
        type: 'theory',
        content: [
            "• Git: Dağıtık versiyon kontrol sistemi (Yerel Zaman Makinesi - Araba).",
            "• GitHub: Git projelerini depoladığımız uzak sunucu (Bulut Depo - Otopark).",
            "• Git internet olmadan çalışır; GitHub paylaşım için vardır."
        ]
    },
    {
        id: 17,
        title: "Neden GitHub Kullanıyoruz?",
        type: 'theory',
        content: [
            "• Altyapı & Maliyet: Sunucu bakımı, elektrik, yedekleme derdi yok.",
            "• Güvenlik: Profesyonel güvenlik ekipleri, 2FA, SMS koruması.",
            "• İşbirliği (Collaboration): Pull Request, Code Review ve Issue takibi.",
            "• Standartlaşma: Sektörün %90'ı burada.",
            "• Portfolyo: Yazılımcının yeni CV'si."
        ]
    },
    {
        id: 18,
        title: "Sadece GitHub mı? (Alternatifler)",
        type: 'theory',
        content: [
            "• GitLab: DevOps/CI-CD süreçlerinde çok güçlü. Self-hosted imkanı.",
            "• Bitbucket: Jira/Trello (Atlassian) entegrasyonu. Kurumsal tercih.",
            "• Mantık aynı: Yerelde Git -> Uzakta Depo."
        ]
    },
    {
        id: 19,
        title: "GitHub'ın Süper Güçleri",
        type: 'theory',
        content: [
            "• Issues: Proje ajandası, görev ve hata takibi (Bug/Feature).",
            "• Pull Request (PR): Kod inceleme, onaylama ve birleştirme süreci.",
            "• Conflict Resolution: Çakışan kodları arayüzden çözme.",
            "• Fork & Open Source: Başka projeyi kopyala (Fork) -> Geliştir -> Geri Gönder (PR)."
        ]
    },
    {
        id: 20,
        title: "Bir Okul Olarak GitHub",
        type: 'theory',
        content: [
            "• 'Stripe API nasıl kullanılır?' -> Google yerine GitHub'da arat.",
            "• 'Most Stars' filtresiyle en iyi örnekleri bul.",
            "• Başkalarının kodu (Best Practices) en iyi öğretmendir."
        ]
    },
    {
        id: 21,
        title: "Yeni CV'niz: GitHub Profili",
        type: 'theory',
        content: [
            "• İşe alımlarda diplomalardan önce 'yeşil kutucuklara' (Contribution Graph) bakılıyor.",
            "• Boş bir profil = Pasif bir yazılımcı.",
            "• Düzenli commit atmak, istikrarın ve öğrenme azminin kanıtıdır."
        ]
    },
    {
        id: 22,
        title: "Special Repository (README)",
        type: 'theory',
        content: [
            "• `kullaniciadi/kullaniciadi` formatında bir repo oluşturun.",
            "• İçine eklediğiniz `README.md` profilinizin vitrini olur.",
            "• Kullandığınız teknolojileri, projelerinizi ve istatistiklerinizi sergileyin."
        ]
    },
    {
        id: 23,
        title: "IDE ile Git Kullanımı (VS Code)",
        type: 'terminal',
        content: [
            "• Terminal komutlarını bilmek şarttır ama her gün yazmak zorunda değilsiniz.",
            "• VS Code Source Control paneli hız kazandırır.",
            "• Görsel Diff: Değişiklikleri yan yana renkli görmek hataları önler.",
            "• Tek tıkla Stage, Commit ve Sync (Push/Pull)."
        ],
        component: "IdeDemo" // Placeholder for visual if needed
    },
    {
        id: 24,
        title: "Uygulama Zamanı: Beraber Kodlayalım",
        type: 'interactive',
        content: [
            "1. Bu sunumu yaptığımız reposunu forklayacağız ve sonra clone edeceğiz.",
            "2. Cloneladığımız projede src->participants.ts dosyasına yeni bir katılımcı ekleyeceğiz.",
            "3. Kendi adınıza bir branch oluşturacağız ve checkout edeceğiz.",
            "4. Değişiklik yapıp commit atacağız ve sonrasında push edeceğiz.",
            "5. Push ettiğimizde bu sunumun reposuna gelip pr sekmesinden Pr açacağız ve yaptığımız değişikliği ana koda eklemiş olacağız.",
            "6. Eğer PR sorunsuzsa, ana koda eklenmiş olacak ve sunumda göreceğiz."
        ]
    },
    {
        id: 25,
        title: "Kapanış & Kahoot",
        type: 'theory',
        content: [
            "• Öğrendiklerimizi test edelim: Kahoot Yarışması!",
            "• Sorular & Cevaplar",
            "• Teşekkürler."
        ]
    },
    {
        id: 26,
        title: "Teşekkürler",
        type: 'outro',
        content: []
    }
];
