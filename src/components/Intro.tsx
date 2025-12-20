
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import './Intro.css';

interface IntroProps {
    onStart: () => void;
}

interface Presenter {
    name: string;
    role: string;
    github: string;
    linkedin: string;
}

const presenters: Presenter[] = [
    {
        name: "Emre Özen",
        role: "Bilgisayar Bilimleri 3. Sınıf Öğrencisi",
        github: "https://github.com/eemreozen",
        linkedin: "https://www.linkedin.com/in/emre-ozen6/"
    },
    {
        name: "Bekir Çağlar",
        role: "Bilgisayar Bilimleri 3. Sınıf Öğrencisi",
        github: "https://github.com/Bekir-Caglar",
        linkedin: "https://linkedin.com/in/bekircaglar"
    }
];

export const Intro: React.FC<IntroProps> = ({ onStart }) => {
    const [activePresenter, setActivePresenter] = useState<number | null>(null);
    const [qrModalType, setQrModalType] = useState<'github' | 'linkedin' | null>(null);

    const togglePresenter = (index: number) => {
        setActivePresenter(activePresenter === index ? null : index);
    };

    const openQr = (e: React.MouseEvent, type: 'github' | 'linkedin') => {
        e.stopPropagation();
        setQrModalType(type);
    };

    return (
        <div className="intro-container">
            <div className="club-branding">
                <img src="/logo.jpg" alt="Bilgisayar Bilimleri Kulübü Logo" className="club-logo" />
                <span className="club-name">Bilgisayar Bilimleri Kulübü</span>
            </div>
            <div className="glitch-wrapper">
                <h1 className="glitch" data-text="GIT & GITHUB">GIT & GITHUB</h1>
            </div>
            <p className="intro-subtitle">SÜRÜM KONTROL USTALIĞI</p>

            <button className="start-btn" onClick={onStart}>
                <span className="btn-text">git init_</span>
            </button>

            {/* Presenters Section */}
            <div className="presenters-section">
                <p className="section-label">SUNANLAR:</p>
                <div className="presenters-grid">
                    {presenters.map((p, idx) => (
                        <div
                            key={idx}
                            className={`presenter-card ${activePresenter === idx ? 'active' : ''}`}
                            onClick={() => togglePresenter(idx)}
                        >
                            <div className="presenter-info">
                                <div className="avatar-placeholder">{p.name.charAt(0)}</div>
                                <div>
                                    <h3>{p.name}</h3>
                                    <span>{p.role}</span>
                                </div>
                            </div>

                            {activePresenter === idx && (
                                <div className="link-buttons-row">
                                    <button className="social-btn" onClick={(e) => openQr(e, 'github')}>
                                        Tüm GitHub QR'ları
                                    </button>
                                    <button className="social-btn" onClick={(e) => openQr(e, 'linkedin')}>
                                        Tüm LinkedIn QR'ları
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="scroll-indicator">
                <span>↓</span>
            </div>

            {/* Multi QR Modal */}
            {qrModalType && (
                <div className="qr-modal-overlay" onClick={() => setQrModalType(null)}>
                    <div className="qr-modal-content wide" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">
                            {qrModalType === 'github' ? 'GitHub Profilleri' : 'LinkedIn Profilleri'}
                        </h3>

                        <div className="multi-qr-grid">
                            {presenters.map((p, idx) => (
                                <div key={idx} className="qr-item">
                                    <p className="qr-name">{p.name}</p>
                                    <div className="modal-qr-frame">
                                        <QRCode
                                            value={qrModalType === 'github' ? p.github : p.linkedin}
                                            size={200}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="close-modal" onClick={() => setQrModalType(null)}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
};
