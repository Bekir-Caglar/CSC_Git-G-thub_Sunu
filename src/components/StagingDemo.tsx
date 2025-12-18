
import React, { useState } from 'react';

type FileStatus = 'modified' | 'staged' | 'committed';

interface GitFile {
    id: number;
    name: string;
    status: FileStatus;
}

export const StagingDemo: React.FC = () => {
    const [files, setFiles] = useState<GitFile[]>([
        { id: 1, name: 'index.html', status: 'modified' },
        { id: 2, name: 'style.css', status: 'modified' },
        { id: 3, name: 'script.js', status: 'modified' },
    ]);

    const [message, setMessage] = useState("Değişiklikleri Stage'e almak için dosyalara tıkla!");

    const handleFileClick = (file: GitFile) => {
        if (file.status === 'modified') {
            updateFileStatus(file.id, 'staged');
            setMessage("Harika! Dosya şimdi 'Staging Area'da. Commit etmeye hazır.");
        } else if (file.status === 'staged') {
            updateFileStatus(file.id, 'modified');
            setMessage("Dosya Staging Area'dan çıkarıldı (Unstage).");
        }
    };

    const updateFileStatus = (id: number, status: FileStatus) => {
        setFiles(files.map(f => f.id === id ? { ...f, status } : f));
    };

    const handleCommit = () => {
        const stagedFiles = files.filter(f => f.status === 'staged');
        if (stagedFiles.length === 0) {
            setMessage("Commit edecek dosya yok! Önce 'git add' yapmalısın (Dosyalara tıkla).");
            return;
        }

        // Animate commit
        setFiles(files.map(f => f.status === 'staged' ? { ...f, status: 'committed' } : f));
        setMessage(`Tebrikler! ${stagedFiles.length} dosya snapshot olarak veritabanına kaydedildi.`);
    };

    const resetDemo = () => {
        setFiles([
            { id: 1, name: 'index.html', status: 'modified' },
            { id: 2, name: 'style.css', status: 'modified' },
            { id: 3, name: 'script.js', status: 'modified' },
        ]);
        setMessage("Değişiklikleri Stage'e almak için dosyalara tıkla!");
    };

    return (
        <div className="demo-container">
            <div className="areas-grid">
                {/* Working Directory */}
                <div className="area working">
                    <h4>Working Directory</h4>
                    <div className="file-list">
                        {files.filter(f => f.status === 'modified').map(f => (
                            <div key={f.id} className="file-card modified" onClick={() => handleFileClick(f)}>
                                📄 {f.name}
                                <span className="action-hint">git add</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <div className="arrow">➜</div>

                {/* Staging Area */}
                <div className="area staging">
                    <h4>Staging Area (Index)</h4>
                    <div className="file-list">
                        {files.filter(f => f.status === 'staged').map(f => (
                            <div key={f.id} className="file-card staged" onClick={() => handleFileClick(f)}>
                                📄 {f.name}
                                <span className="action-hint">unstage</span>
                            </div>
                        ))}
                    </div>
                    <button className="commit-btn" onClick={handleCommit}>
                        git commit -m "Save"
                    </button>
                </div>

                {/* Arrow */}
                <div className="arrow">➜</div>

                {/* Repository */}
                <div className="area repo">
                    <h4>Local Repository (.git)</h4>
                    <div className="file-list">
                        {files.filter(f => f.status === 'committed').map(f => (
                            <div key={f.id} className="file-card committed">
                                🔒 {f.name} (v1)
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="reset-btn" onClick={resetDemo}>⟲ Reset Demo</button>
        </div>
    );
};
