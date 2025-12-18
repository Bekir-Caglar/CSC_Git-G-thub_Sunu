import React, { useState, useEffect } from 'react';
import { slides } from '../data/slides';
import { Terminal } from './Terminal';
import { BackgroundGraph } from './BackgroundGraph';
import { StagingDemo } from './StagingDemo';
import { BranchingDemo } from './BranchingDemo';
import { Intro } from './Intro';
import { Agenda } from './Agenda';
import { Outro } from './Outro';
import { Dock } from './Dock';

export const SlideViewer: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTerminal, setShowTerminal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const slide = slides[currentIndex];

    // Reset terminal modal when slide changes
    useEffect(() => {
        setShowTerminal(false);
        setIsClosing(false);
    }, [currentIndex]);

    const handleCloseTerminal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowTerminal(false);
            setIsClosing(false);
        }, 300);
    };

    const toggleTerminal = () => {
        if (showTerminal) {
            handleCloseTerminal();
        } else {
            setShowTerminal(true);
        }
    };

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showTerminal && e.key === 'Escape') {
                handleCloseTerminal();
                return;
            }

            if (e.key === 'Enter' && slides[currentIndex].type === 'terminal') {
                if (showTerminal) {
                    handleCloseTerminal();
                } else {
                    setShowTerminal(true);
                }
                return;
            }

            if (showTerminal) return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, showTerminal]);

    const progress = ((currentIndex + 1) / slides.length) * 100;

    // Icons
    const FinderIcon = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#ECECEC" />
            <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" fill="#1C74E9" fillOpacity="0.2" />
            <path d="M25 35C25 29.4772 29.4772 25 35 25H65C70.5228 25 75 29.4772 75 35V75H25V35Z" fill="#2E84F6" />
            <path d="M25 55H75V65C75 70.5228 70.5228 75 65 75H35C29.4772 75 25 70.5228 25 65V55Z" fill="#1665D8" />
            <path d="M38 40H42" stroke="#A9D3FF" strokeWidth="4" strokeLinecap="round" />
            <path d="M58 40H62" stroke="#A9D3FF" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );

    const LaunchpadIcon = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="transparent" />
            <rect x="15" y="15" width="70" height="70" rx="10" fill="url(#lp-gradient)" />
            <defs>
                <linearGradient id="lp-gradient" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5B942" />
                    <stop offset="1" stopColor="#F57C00" />
                </linearGradient>
            </defs>
            <g fill="#FFF" fillOpacity="0.9">
                <rect x="25" y="25" width="12" height="12" rx="2" />
                <rect x="44" y="25" width="12" height="12" rx="2" />
                <rect x="63" y="25" width="12" height="12" rx="2" />
                <rect x="25" y="44" width="12" height="12" rx="2" />
                <rect x="44" y="44" width="12" height="12" rx="2" />
                <rect x="63" y="44" width="12" height="12" rx="2" />
                <rect x="25" y="63" width="12" height="12" rx="2" />
                <rect x="44" y="63" width="12" height="12" rx="2" />
                <rect x="63" y="63" width="12" height="12" rx="2" />
            </g>
        </svg>
    );

    const SafariIcon = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="22" fill="#FFF" />
            <circle cx="50" cy="50" r="45" fill="#1B88F7" />
            <path d="M50 10V90" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M10 50H90" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" strokeOpacity="0.8" />
            <path d="M58 35L35 65L42 65L65 35H58Z" fill="#EA4335" />
            <path d="M65 35L42 65" stroke="white" strokeWidth="2" />
        </svg>
    );

    const SettingsIcon = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="22" fill="#888" />
            <circle cx="50" cy="50" r="35" stroke="#333" strokeWidth="8" strokeDasharray="10 12" />
            <circle cx="50" cy="50" r="15" fill="#333" />
        </svg>
    );

    const TerminalAppIcon = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="22" fill="#333" />
            <linearGradient id="term-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#444" />
                <stop offset="1" stopColor="#222" />
            </linearGradient>
            <rect width="100" height="100" rx="22" fill="url(#term-grad)" />
            <path d="M10 10H90V90H10V10Z" stroke="white" strokeOpacity="0.1" strokeWidth="2" rx="18" />
            <path d="M30 35L45 50L30 65" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="52" y1="65" x2="75" y2="65" stroke="white" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );

    return (
        <>
            <BackgroundGraph />

            {/* Standardized Window for Terminal */}
            {(showTerminal || isClosing) && slide.type === 'terminal' && slide.codeLines && (
                <div className="terminal-overlay-container" onClick={handleCloseTerminal}>
                    <div className={`terminal-window-wrapper ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
                        <Terminal lines={slide.codeLines} onClose={handleCloseTerminal} />
                    </div>
                </div>
            )}

            <div className={`slide-container ${slide.type}`}>
                {slide.type === 'intro' ? (
                    <Intro onStart={nextSlide} />
                ) : slide.type === 'agenda' ? (
                    <Agenda />
                ) : slide.type === 'outro' ? (
                    <Outro />
                ) : (
                    <>
                        {/* Progress Bar */}
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>

                        <div className="slide-content">
                            <h1
                                className="slide-title"
                                style={slide.id === 13 ? { fontSize: '2.5rem' } : {}}
                            >
                                {slide.title}
                            </h1>

                            <div className="slide-body">
                                {slide.content.map((text, idx) => (
                                    <p key={idx} className="slide-text">{text}</p>
                                ))}
                            </div>

                            {slide.type === 'interactive' && slide.component === 'StagingDemo' && (
                                <StagingDemo />
                            )}

                            {slide.type === 'interactive' && slide.component === 'BranchingDemo' && (
                                <BranchingDemo />
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Dock for Terminal Slides */}
            {slide.type === 'terminal' && (
                <Dock
                    items={[
                        {
                            id: 'finder',
                            label: 'Finder',
                            icon: FinderIcon,
                            onClick: () => { },
                            isActive: false
                        },
                        {
                            id: 'launchpad',
                            label: 'Launchpad',
                            icon: LaunchpadIcon,
                            onClick: () => { },
                            isActive: false
                        },
                        {
                            id: 'safari',
                            label: 'Safari',
                            icon: SafariIcon,
                            onClick: () => { },
                            isActive: false
                        },
                        {
                            id: 'settings',
                            label: 'Settings',
                            icon: SettingsIcon,
                            onClick: () => { },
                            isActive: false
                        },
                        {
                            id: 'terminal-toggle',
                            label: slide.fileName || 'Terminal',
                            icon: TerminalAppIcon,
                            onClick: toggleTerminal,
                            isActive: showTerminal
                        }
                    ]}
                />
            )}

            {/* Global Navigation Controls (Fixed Position) */}
            {slide.type !== 'intro' && (
                <div className="controls">
                    <button onClick={prevSlide} disabled={currentIndex === 0}>
                        ← Previous
                    </button>
                    <div className="slide-counter">
                        {currentIndex + 1} / {slides.length}
                    </div>
                    <button onClick={nextSlide} disabled={currentIndex === slides.length - 1}>
                        Next →
                    </button>
                </div>
            )}
        </>
    );
};
