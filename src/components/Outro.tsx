import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import './Outro.css';

interface Presenter {
    name: string;
    github: string;
    linkedin: string;
}

const presenters: Presenter[] = [
    {
        name: "Emre Özen",
        github: "https://github.com/EmreOzen",
        linkedin: "https://linkedin.com/in/EmreOzen"
    },
    {
        name: "Bekir Çağlar",
        github: "https://github.com/bekircaglar",
        linkedin: "https://linkedin.com/in/bekircaglar"
    }
];

export const Outro: React.FC = () => {
    const [deployed, setDeployed] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);

    const handleDeploy = () => {
        setIsDeploying(true);
        setTimeout(() => {
            setIsDeploying(false);
            setDeployed(true);
        }, 1500); // Fake deploy delay
    };

    return (
        <div className="outro-container">
            <h1 className="outro-title">
                {deployed ? "SUNUM TAMAMLANDI" : "SUNUMU BİTİR"}
            </h1>

            {!deployed ? (
                <div className="deploy-section">
                    <p className="status-text">{isDeploying ? "Commit oluşturuluyor..." : "Sunumu tamamlamak için değişiklikleri kaydedin."}</p>
                    <button
                        className="deploy-btn"
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        style={isDeploying ? { animation: 'none', opacity: 0.7, cursor: 'wait' } : {}}
                    >
                        {isDeploying ? "git commit..." : "git commit -m \"Sunum Bitti\""}
                    </button>
                </div>
            ) : (
                <>
                    <div className="success-section">
                        <div className="success-icon">✓</div>
                        <p className="thank-you-text">DİNLEDİĞİNİZ İÇİN TEŞEKKÜRLER</p>
                    </div>

                    <div className="speakers-qr-container">
                        {presenters.map((p, idx) => (
                            <div key={idx} className="speaker-qr-block">
                                <h3 className="speaker-name">{p.name}</h3>
                                <div className="qr-codes-row">
                                    <div className="qr-wrapper">
                                        <div className="qr-frame">
                                            <QRCode value={p.github} size={100} />
                                        </div>
                                        <span>GitHub</span>
                                    </div>
                                    <div className="qr-wrapper">
                                        <div className="qr-frame">
                                            <QRCode value={p.linkedin} size={100} />
                                        </div>
                                        <span>LinkedIn</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
};
