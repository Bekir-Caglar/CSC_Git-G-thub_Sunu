
import React, { useEffect, useState, useRef } from 'react';

interface TerminalProps {
    lines: string[];
    onClose?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ lines, onClose }) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    // Reset when lines change (new slide)
    useEffect(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCharIndex(0);
    }, [lines]);

    useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const currentLine = lines[currentLineIndex];

        // If line is empty string (spacer), just move to next line immediately
        if (currentLine === "") {
            setDisplayedLines(prev => [...prev, ""]);
            setCurrentLineIndex(prev => prev + 1);
            setCharIndex(0);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayedLines(prev => {
                const newLines = [...prev];
                if (newLines[currentLineIndex] === undefined) {
                    newLines[currentLineIndex] = "";
                }
                newLines[currentLineIndex] = currentLine.slice(0, charIndex + 1);
                return newLines;
            });

            if (charIndex < currentLine.length - 1) {
                setCharIndex(prev => prev + 1);
            } else {
                // Line finished
                setCurrentLineIndex(prev => prev + 1);
                setCharIndex(0);
            }
        }, 15); // Typing speed

        return () => clearTimeout(timeout);
    }, [currentLineIndex, charIndex, lines]);

    // Scroll to bottom
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [displayedLines]);

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <span className="dot red" onClick={onClose}></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="title">bash — 80x24</span>
            </div>
            <div className="terminal-body font-mono text-sm sm:text-base">
                {displayedLines.map((line, idx) => (
                    <div key={idx} className="terminal-line">
                        <span className="prompt">{line.startsWith('#') ? '' : '$ '}</span>
                        <span className={line.startsWith('#') ? 'comment' : 'command'}>{line}</span>
                    </div>
                ))}
                {currentLineIndex < lines.length && (
                    <div className="terminal-line">
                        <span className="prompt">$ </span>
                        <span className="cursor-block">_</span>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
