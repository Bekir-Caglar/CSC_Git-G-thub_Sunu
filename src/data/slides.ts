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
        title: "1. Versiyon Kontrolü Nedir?",
        type: 'theory',
        content: [
            "• Projenizin 'Zaman Makinesi'dir. Geçmişe dönmenizi sağlar.",
            "• 'Save Point' (Kayıt Noktası) mantığıyla çalışır.",
            "• Kim, ne zaman, hangi dosyada, ne değişiklik yaptı? Sorularına cevap verir."
        ]
    },
    {
        id: 2,
        title: "2. Neden Git?",
        type: 'theory',
        content: [
            "• Dağıtık Yapı: İnternet olmasa bile tam tarihçe ile çalışabilirsiniz.",
            "• Hız & Performans: Dosyaların kopyasını değil, değişimlerin (snapshot) izini tutar.",
            "• Standart: Yazılım dünyasının %90'ı tarafından kullanılır (Linux, Microsoft, Google vb.)."
        ]
    },

    // ==========================================
    // 2. Başlangıç (Terminal)
    // ==========================================
    {
        id: 3,
        title: "3. Kurulum ve Kimlik (Config)",
        type: 'terminal',
        content: [
            "Git'e kendimizi bir kez tanıtmamız gerekir. Bu bilgiler commit'lerde görünür."
        ],
        codeLines: [
            "# Kullanıcı adı ve e-posta tanımlama",
            "git config --global user.name \"Ad Soyad\"",
            "git config --global user.email \"email@ornek.com\"",
            "",
            "# Ayarları kontrol etme",
            "git config --list"
        ],
        fileName: "setup.sh"
    },
    {
        id: 4,
        title: "4. Proje Başlatma (Init & Clone)",
        type: 'terminal',
        content: [
            "Sıfırdan proje başlatabilir veya mevcut bir projeyi indirebilirsiniz."
        ],
        codeLines: [
            "# Yöntem 1: Sıfırdan Başlama",
            "mkdir yeni_proje",
            "cd yeni_proje",
            "git init  # .git klasörünü oluşturur",
            "",
            "# Yöntem 2: Mevcut Projeyi İndirme",
            "git clone https://github.com/kullanici/proje.git"
        ],
        fileName: "init.sh"
    },

    // ==========================================
    // 3. Çalışma Döngüsü (Workflow)
    // ==========================================
    {
        id: 5,
        title: "5. Temel Döngü: Add & Commit",
        type: 'terminal',
        content: [
            "Working Dir -> Staging Area -> Repository"
        ],
        codeLines: [
            "# 1. Durumu gör",
            "git status",
            "",
            "# 2. Sahneye (Staging Area) al",
            "git add dosya.txt",
            "git add .         # Tüm değişiklikleri ekle",
            "",
            "# 3. Onayla ve Kaydet (Commit)",
            "git commit -m \"İlk özellik eklendi\""
        ],
        fileName: "basic_cycle.sh"
    },
    {
        id: 6,
        title: "Staging Area Mantığı",
        type: 'interactive',
        content: [
            "Dosyaların Working Directory'den Staging Area'ya ve oradan Repository'ye geçişini deneyimleyin."
        ],
        component: "StagingDemo"
    },
    {
        id: 7,
        title: "6. Geçmişe Bakış (Log)",
        type: 'terminal',
        content: [
            "Neler yapıldığını incelemek için."
        ],
        codeLines: [
            "# Tüm geçmişi listele",
            "git log",
            "",
            "# Tek satırda özet gör",
            "git log --oneline",
            "",
            "# Detaylı değişiklikleri gör",
            "git log -p"
        ],
        fileName: "log_history.sh"
    },
    {
        id: 8,
        title: "7. Görmezden Gelme (.gitignore)",
        type: 'theory',
        content: [
            "• Her dosyayı Git'e atmamalıyız (örn: şifreler, derlenmiş dosyalar, node_modules).",
            "• '.gitignore' dosyasına yazılanlar Git tarafından YOK SAYILIR.",
            "• Genellikle proje başında bir kez ayarlanır."
        ]
    },

    // ==========================================
    // 4. Dallanma (Branching)
    // ==========================================
    {
        id: 9,
        title: "8. Dallanma (Branching) Nedir?",
        type: 'theory',
        content: [
            "• Ana kod (main) bozulmadan yeni özellikler geliştirmek için kullanılır.",
            "• Paralel evrenler gibidir: Bir tarafta 'Login' sayfası yaparken, diğer tarafta 'Bug' düzeltebilirsiniz.",
            "• İş bitince ana dal ile birleştirilir (Merge)."
        ]
    },
    {
        id: 10,
        title: "9. Branch & Merge",
        type: 'interactive',
        content: [
            "Branch oluşturma ve birleştirme (merge) işlemini görselleştirin."
        ],
        component: "BranchingDemo"
    },
    {
        id: 11,
        title: "10. Branch Komutları",
        type: 'terminal',
        content: [
            "Dalları yönetmek için temel komutlar."
        ],
        codeLines: [
            "# Yeni dal oluştur",
            "git branch yeni-ozellik",
            "",
            "# Dala geçiş yap (Checkout)",
            "git checkout yeni-ozellik",
            "",
            "# (Kısa yol) Oluştur ve geç",
            "git checkout -b hizli-ozellik",
            "",
            "# Ana dala birleştir (Merge)",
            "git checkout main",
            "git merge yeni-ozellik"
        ],
        fileName: "branching.sh"
    },

    // ==========================================
    // 5. Uzak Sunucu (Remote / GitHub)
    // ==========================================
    {
        id: 12,
        title: "11. Uzak Sunucu (Remote)",
        type: 'theory',
        content: [
            "• Git yereldir, GitHub/GitLab ise bu yerel deponun buluttaki kopyasıdır.",
            "• Takım çalışması ve yedekleme için kullanılır.",
            "• 'origin' genelde ana uzak sunucunun takma adıdır."
        ]
    },
    {
        id: 13,
        title: "12. Push & Pull (Senkronizasyon)",
        type: 'terminal',
        content: [
            "Kodları buluta gönderme ve alma."
        ],
        codeLines: [
            "# Yereldeki commitleri sunucuya gönder",
            "git push origin main",
            "",
            "# Sunucudaki değişiklikleri al",
            "git pull origin main",
            "",
            "# Uzak sunucu ekleme (İlk kez)",
            "git remote add origin https://github.com/..."
        ],
        fileName: "remote_sync.sh"
    },
    {
        id: 14,
        title: "13. Pull Request (PR) Kültürü",
        type: 'theory',
        content: [
            "• Kodunuzu 'main' dala doğrudan atmak yerine, inceleme (review) talep edersiniz.",
            "• Birisi kodunuzu okur, yorum yapar ve onaylar.",
            "• Bu, 'Code Review' sürecinin kalbidir; kaliteyi artırır."
        ]
    },

    // ==========================================
    // 6. İleri Seviye & Kapanış
    // ==========================================
    {
        id: 15,
        title: "14. İleri Seviye (Kısa Bakış)",
        type: 'terminal',
        content: [
            "Git çok derin bir araçtır. İhtiyaç oldukça öğrenilir."
        ],
        codeLines: [
            "# Hatalı değişikliği geri al",
            "git restore dosya.txt",
            "",
            "# Son commit'i düzelt",
            "git commit --amend",
            "",
            "# Commitleri geçici sakla (Stash)",
            "git stash"
        ],
        fileName: "advanced.sh"
    },
    {
        id: 16,
        title: "Teşekkürler",
        type: 'outro',
        content: []
    }
];
