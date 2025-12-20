import React from 'react';
import QRCode from 'react-qr-code';

export const ShortBreak: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white',
            textAlign: 'center'
        }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#a0aec0' }}>
                Arada Pixel Art etkinliğimize katılabilirsiniz! 🎨
            </p>
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px' }}>
                <QRCode value="https://ktu-csc.web.app/pixel-art" size={256} />
            </div>
            <p style={{ marginTop: '2rem', fontSize: '1.5rem', opacity: 0.8 }}>https://ktu-csc.web.app/pixel-art</p>
        </div>
    );
};
