
import React, { useEffect, useState } from 'react';
import './Agenda.css';

const session1 = [
    "1. Giriş: VCS ve Git'in Önemi",
    "2. Temel Kavramlar & Kurulum",
    "3. Git Yaşam Döngüsü (Life Cycle)",
    "4. Temel Komutlar (add, commit, log)",
    "5. Branching (Dallanma) Stratejileri"
];

const session2 = [
    "1. Giriş: GitHub Nedir?",
    "2. GitHub Profili & CV: Special Repo",
    "3. IDE üstünde Git Temelleri",
    "4. Etkileşimli Uygulama: Fork -> Edit -> PR",
    "5. Kapanış: Kahoot & Fotoğraf"
];

export const Agenda: React.FC = () => {
    const [visibleItems1, setVisibleItems1] = useState<number>(0);
    const [visibleItems2, setVisibleItems2] = useState<number>(0);

    useEffect(() => {
        // Animate Session 1
        const interval1 = setInterval(() => {
            setVisibleItems1(prev => {
                if (prev < session1.length) return prev + 1;
                clearInterval(interval1);
                // Start Session 2 animation after Session 1
                startSession2();
                return prev;
            });
        }, 200);

        const startSession2 = () => {
            const interval2 = setInterval(() => {
                setVisibleItems2(prev => {
                    if (prev < session2.length) return prev + 1;
                    clearInterval(interval2);
                    return prev;
                });
            }, 200);
        };

        return () => clearInterval(interval1);
    }, []);

    return (
        <div className="agenda-container">
            <h2 className="agenda-title">PROGRAM AKIŞI</h2>
            <div className="agenda-wrapper">
                <div className="session-column">
                    <h3 className="session-title">1. OTURUM: GIT</h3>
                    <div className="agenda-list-column">
                        {session1.map((item, index) => (
                            <div
                                key={index}
                                className={`agenda-item ${index < visibleItems1 ? 'visible' : ''}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <span className="bullet">➜</span>
                                <span className="text">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="session-column">
                    <h3 className="session-title">2. OTURUM: GITHUB</h3>
                    <div className="agenda-list-column">
                        {session2.map((item, index) => (
                            <div
                                key={index}
                                className={`agenda-item ${index < visibleItems2 ? 'visible' : ''}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <span className="bullet">➜</span>
                                <span className="text">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
