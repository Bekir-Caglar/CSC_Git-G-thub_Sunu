
import React, { useState } from 'react';

interface Commit {
    id: number;
    message: string;
    branch: 'main' | 'feature';
    parentId: number | null;
    x: number;
    y: number;
}

export const BranchingDemo: React.FC = () => {
    const [commits, setCommits] = useState<Commit[]>([
        { id: 1, message: 'Initial Commit', branch: 'main', parentId: null, x: 50, y: 100 }
    ]);
    const [activeBranch, setActiveBranch] = useState<'main' | 'feature'>('main');
    const [branchCreated, setBranchCreated] = useState(false);
    const [merged, setMerged] = useState(false);

    const addCommit = () => {
        if (merged) return;

        // Find last commit of current branch to link to
        const branchCommits = commits.filter(c => c.branch === activeBranch);
        const parent = branchCommits[branchCommits.length - 1] || commits.find(c => c.branch === 'main'); // Fallback for first feature commit

        const newId = commits.length + 1;
        let newY = activeBranch === 'main' ? 100 : 180;

        // Calculate X position based on global timeline roughly
        const newX = (parent?.x || 0) + 80;

        const newCommit: Commit = {
            id: newId,
            message: `Commit ${newId}`,
            branch: activeBranch,
            parentId: parent?.id || null,
            x: newX,
            y: newY
        };

        setCommits([...commits, newCommit]);
    };

    const createBranch = () => {
        if (branchCreated) return;
        setBranchCreated(true);
        setActiveBranch('feature');
    };

    const checkoutMain = () => setActiveBranch('main');
    const checkoutFeature = () => setActiveBranch('feature');

    const mergeBranch = () => {
        if (!branchCreated || merged) return;

        const lastFeatureCommit = commits.filter(c => c.branch === 'feature').pop();
        const lastMainCommit = commits.filter(c => c.branch === 'main').pop();

        if (!lastFeatureCommit || !lastMainCommit) return;

        const newId = commits.length + 1;
        const newX = Math.max(lastFeatureCommit.x, lastMainCommit.x) + 80;

        const mergeCommit: Commit = {
            id: newId,
            message: "Merge branch 'feature'",
            branch: 'main',
            parentId: lastFeatureCommit.id, // Simplification: visuals handles single parent line mostly
            x: newX,
            y: 100
        };

        setCommits([...commits, mergeCommit]);
        setActiveBranch('main');
        setMerged(true);
    };

    const reset = () => {
        setCommits([{ id: 1, message: 'Initial Commit', branch: 'main', parentId: null, x: 50, y: 100 }]);
        setActiveBranch('main');
        setBranchCreated(false);
        setMerged(false);
    };

    return (
        <div className="demo-container">
            <div className="demo-header">
                <p>Branch mantığını anlamak için butonları kullanın.</p>
            </div>

            <div className="svg-container">
                <svg width={Math.max(800, commits.length * 100)} height="250">
                    {/* Lines */}
                    {commits.map(commit => {
                        if (!commit.parentId) return null;
                        const parent = commits.find(c => c.id === commit.parentId);
                        if (!parent && commit.message.includes('Merge')) {
                            // Handle merge visual: line from feature to main
                            // We need to find the specific parent for merge visual logic
                            // For this simple demo, we know merge connects last feature commit to this new main commit
                            // AND last main commit to this new main commit.
                            return null;
                        }
                        if (!parent) return null;

                        return (
                            <line
                                key={`line-${commit.id}`}
                                x1={parent.x} y1={parent.y}
                                x2={commit.x} y2={commit.y}
                                stroke="#555"
                                strokeWidth="4"
                            />
                        );
                    })}

                    {/* Custom Merge Lines (Hardcoded logic for simplicity in this demo) */}
                    {commits.map(commit => {
                        if (commit.message.includes('Merge')) {
                            // Find the feature branch tip
                            const featureCommits = commits.filter(c => c.branch === 'feature');
                            const lastFeature = featureCommits[featureCommits.length - 1];

                            // Find the main branch tip before merge
                            const mainCommits = commits.filter(c => c.branch === 'main' && c.id !== commit.id);
                            const lastMain = mainCommits[mainCommits.length - 1];

                            return (
                                <g key={`merge-${commit.id}`}>
                                    {lastFeature && <line x1={lastFeature.x} y1={lastFeature.y} x2={commit.x} y2={commit.y} stroke="#555" strokeWidth="4" strokeDasharray="5,5" />}
                                    {lastMain && <line x1={lastMain.x} y1={lastMain.y} x2={commit.x} y2={commit.y} stroke="#555" strokeWidth="4" />}
                                </g>
                            )
                        }
                        return null;
                    })}

                    {/* Commit Nodes */}
                    {commits.map(commit => (
                        <g key={commit.id}>
                            <circle
                                cx={commit.x}
                                cy={commit.y}
                                r="15"
                                fill={commit.branch === 'main' ? '#f14e32' : '#3498db'}
                                stroke="#fff"
                                strokeWidth="2"
                            />
                            <text x={commit.x} y={commit.y + 30} textAnchor="middle" fill="#ccc" fontSize="12">
                                {commit.message}
                            </text>
                        </g>
                    ))}

                    {/* Labels */}
                    <text x="10" y="105" fill="#f14e32" fontWeight="bold">main</text>
                    {branchCreated && <text x="10" y="185" fill="#3498db" fontWeight="bold">feature</text>}
                </svg>
            </div>

            <div className="controls-row" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={addCommit} disabled={merged}>
                    + Commit ({activeBranch})
                </button>

                {!branchCreated && (
                    <button onClick={createBranch} style={{ borderColor: '#3498db', color: '#3498db' }}>
                        git branch feature
                    </button>
                )}

                {branchCreated && !merged && (
                    <>
                        <button onClick={checkoutMain} disabled={activeBranch === 'main'}>
                            git checkout main
                        </button>
                        <button onClick={checkoutFeature} disabled={activeBranch === 'feature'}>
                            git checkout feature
                        </button>
                        {activeBranch === 'main' && (
                            <button onClick={mergeBranch} style={{ borderColor: '#2ecc71', color: '#2ecc71' }}>
                                git merge feature
                            </button>
                        )}
                    </>
                )}

                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};
