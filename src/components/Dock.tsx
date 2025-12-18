import React from 'react';

interface DockItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
}

interface DockProps {
    items: DockItem[];
}

export const Dock: React.FC<DockProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <div className="dock-wrapper">
            <div className="dock-glass">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`dock-item ${item.isActive ? 'active' : ''}`}
                        onClick={item.onClick}
                    >
                        <div className="dock-icon-container">
                            {item.icon}
                        </div>
                        <div className="dock-tooltip">{item.label}</div>
                        {item.isActive && <div className="dock-dot"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
