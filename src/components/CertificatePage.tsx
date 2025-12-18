import React, { useState } from 'react';
import { participants } from '../data/participants';
import type { Participant } from '../data/participants';
import './CertificatePage.css';
import { Link } from 'react-router-dom';

export const CertificatePage: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

    // Generate a fake hash based on name
    const generateHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(40, '0').substring(0, 40);
    };

    return (
        <div className="cert-page">
            <Link to="/" className="back-link">← Sunuma Dön</Link>

            <div className="hero-section">
                <div className="hero-badge">Eğitim Tamamlandı</div>
                <h1 className="cert-title">GIT & GITHUB MASTERY</h1>
                <p className="cert-subtitle">Versiyon kontrol sistemlerinde uzmanlaşan ve açık kaynak dünyasına ilk adımı atan geliştiriciler.</p>
            </div>

            {!selectedParticipant ? (
                <div className="participant-list-container">
                    <div className="participant-list">
                        {participants.map((p, idx) => (
                            <div
                                key={idx}
                                className="participant-item"
                                onClick={() => setSelectedParticipant(p)}
                            >
                                <div className="participant-item-left">
                                    <img
                                        src={`https://github.com/${p.github}.png`}
                                        className="participant-avatar-small"
                                        alt=""
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://github.com/github.png' }}
                                    />
                                    <div className="participant-info">
                                        <span className="participant-name-list">{p.name}</span>
                                        <span className="participant-handle">@{p.github}</span>
                                    </div>
                                </div>
                                <div className="participant-arrow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        ))}
                        {participants.length === 0 && (
                            <div className="empty-state">
                                <p>Kullanıcı bulunamadı.</p>
                                <p className="empty-subtitle">Lütfen <code>src/data/participants.ts</code> dosyasına eklendiğinizden emin olun.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="cert-modal-overlay" onClick={() => setSelectedParticipant(null)}>
                    <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setSelectedParticipant(null)}>×</button>

                        <div className="certificate-frame">
                            {/* Tech accents */}
                            <div className="cert-border-inner"></div>

                            <div className="cert-logo">
                                <svg height="48" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.27-1.48-.55-1.83 2.38-.27 4.75-1.13 4.75-5.05 0-1.13-.39-2.05-1.04-2.48.1-.26.45-1.18-.1-2.45 0 0-.76-.24-2.48.92C10.74 1.78 9.98 1.7 9.22 1.7c-.76 0-1.52.08-2.24.41-1.72-1.16-2.48-.92-2.48-.92-.55 1.27-.2 2.19-.1 2.45-.64.43-1.04 1.35-1.04 2.48 0 3.93 2.37 4.78 4.74 5.05-.27.42-.51 1.05-.55 1.72-.49.25-1.71.55-2.47-.88 0 0-.46-.55-1.34-.64 0 0-.91-.12-.06.44 0 0 .5.99 2.5 2.13 0 0 1.29 1.99 3.06 1.63V15.5c0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                            </div>

                            <div className="cert-header-text">Mastery Certificate</div>

                            <img
                                className="cert-avatar"
                                src={`https://github.com/${selectedParticipant.github}.png`}
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://github.com/github.png' }}
                                crossOrigin="anonymous"
                                alt="Avatar"
                            />

                            <h2 className="cert-name">{selectedParticipant.name}</h2>

                            <p className="cert-body-text">
                                Git & GitHub Eğitimi'ni başarıyla tamamlayarak, Versiyon Kontrol Sistemi temellerini kanıtlamış ve açık kaynak dünyasına ilk katkısını sunmuştur.
                            </p>

                            <div className="cert-footer">
                                <div className="cert-signature">
                                    <div className="sig-title">Organizasyon</div>
                                    <div className="sig-value">Bilgisayar Bilimleri Kulübü</div>
                                </div>

                                <div className="cert-date">
                                    <div className="sig-title">Tarih</div>
                                    <div className="sig-value">{new Date().toLocaleDateString('tr-TR')}</div>
                                </div>
                            </div>

                            <div className="cert-seal">
                                <svg viewBox="0 0 100 100">
                                    <defs>
                                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <g className="cert-seal-text">
                                        <text fill="#f1e05a" fontSize="12" fontWeight="bold" letterSpacing="2">
                                            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                                                GITHUB MASTERY • 2025 •
                                            </textPath>
                                        </text>
                                    </g>
                                    <path d="M50 35 L54 46 L65 46 L56 54 L59 65 L50 58 L41 65 L44 54 L35 46 L46 46 Z" fill="#f1e05a" />
                                </svg>
                            </div>

                            <div className="git-hash">hash: {generateHash(selectedParticipant.name + selectedParticipant.github)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
