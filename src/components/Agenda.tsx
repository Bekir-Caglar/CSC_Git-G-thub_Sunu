
import React, { useEffect, useState } from 'react';
import './Agenda.css';

const agendaItems = [
    "1. Versiyon Kontrol Sistemi (VCS) Nedir?",
    "2. Git Nedir? Tarihçesi ve Önemi",
    "3. Temel Kavramlar (Repo, Commit, Branch)",
    "4. Kurulum ve Konfigürasyon",
    "5. Git Yaşam Döngüsü (Working Directory -> Staging -> Repo)",
    "6. Temel Komutlar (init, add, commit, status, log)",
    "7. Branching (Dallanma) ve Merging (Birleştirme)",
    "8. GitHub ve Uzak Sunucu İşlemleri",
    "9. Soru & Cevap"
];

export const Agenda: React.FC = () => {
    const [visibleItems, setVisibleItems] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleItems(prev => {
                if (prev < agendaItems.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 300); // Show next item every 300ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="agenda-container">
            <h2 className="agenda-title">PROGRAM AKIŞI</h2>
            <div className="agenda-list">
                {agendaItems.map((item, index) => (
                    <div
                        key={index}
                        className={`agenda-item ${index < visibleItems ? 'visible' : ''}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <span className="bullet">➜</span>
                        <span className="text">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
