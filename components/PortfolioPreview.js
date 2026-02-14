'use client';
import React, { useState, useEffect } from 'react';
import { ClassicTemplate, DarkTemplate, MinimalTemplate, GradientTemplate, DevTemplate } from './portfolio-templates';

const TEMPLATES = [
    { id: 'classic', name: 'Classic', desc: 'Warm & Professional', color: '#ea580c', bg: '#fff7e6', Component: ClassicTemplate },
    { id: 'dark', name: 'Dark', desc: 'Sleek & Modern', color: '#38bdf8', bg: '#0f172a', Component: DarkTemplate },
    { id: 'minimal', name: 'Minimal', desc: 'Clean & Elegant', color: '#666', bg: '#fafafa', Component: MinimalTemplate },
    { id: 'gradient', name: 'Gradient', desc: 'Bold & Vibrant', color: '#7c3aed', bg: '#fdf2f8', Component: GradientTemplate },
    { id: 'developer', name: 'Developer', desc: 'Terminal Style', color: '#4ade80', bg: '#0a0a0a', Component: DevTemplate },
];

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

export default function PortfolioPreview() {
    const [data, setData] = useState(null);
    const [activeNav, setActiveNav] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [showPicker, setShowPicker] = useState(false);

    // GitHub deploy state
    const [githubToken, setGithubToken] = useState(null);
    const [deployStatus, setDeployStatus] = useState('idle'); // idle | deploying | success | error
    const [deployResult, setDeployResult] = useState(null);
    const [deployError, setDeployError] = useState('');
    const [showDeployPanel, setShowDeployPanel] = useState(false);

    // Load data
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('/api/resume', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const resumeData = await res.json();
                        if (resumeData && resumeData.personalInfo) {
                            setData(resumeData);
                            return;
                        }
                    }
                } catch (err) {
                    console.error('API fetch failed, trying localStorage:', err);
                }
            }
            const saved = localStorage.getItem('resumeData');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.personalInfo) setData(parsed);
                } catch (err) {
                    console.error('Failed to parse localStorage data:', err);
                }
            }
        };
        fetchData();

        // Load saved template preference
        const savedTemplate = localStorage.getItem('portfolioTemplate');
        if (savedTemplate && TEMPLATES.find(t => t.id === savedTemplate)) {
            setSelectedTemplate(savedTemplate);
        }

        // Track portfolio view (increment counter)
        const trackView = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                // Decode user ID from JWT (simple base64 decode of payload)
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.userId) {
                    await fetch('/api/portfolio-views', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: payload.userId }),
                    });
                }
            } catch (err) {
                // Silently fail — view tracking is non-critical
            }
        };
        trackView();

        // Load GitHub token
        const savedGhToken = localStorage.getItem('github_token');
        if (savedGhToken) setGithubToken(savedGhToken);

        // Check for OAuth callback params
        const params = new URLSearchParams(window.location.search);
        if (params.get('github_connected') === 'true') {
            const t = localStorage.getItem('github_token');
            if (t) setGithubToken(t);
            // Clean URL
            window.history.replaceState({}, '', '/portfolio');
        }
        if (params.get('github_error')) {
            setDeployError(`GitHub connection failed: ${params.get('github_error')}`);
            window.history.replaceState({}, '', '/portfolio');
        }
    }, []);

    // Track scroll for active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['contact', 'projects', 'experience', 'skills', 'about', 'home'];
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 100) {
                    setActiveNav(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleTemplateChange = (id) => {
        setSelectedTemplate(id);
        localStorage.setItem('portfolioTemplate', id);
        setShowPicker(false);
    };

    // GitHub OAuth
    const connectGitHub = () => {
        if (!GITHUB_CLIENT_ID) {
            setDeployError('GitHub OAuth is not configured. Please add NEXT_PUBLIC_GITHUB_CLIENT_ID to your .env file.');
            return;
        }
        const redirectUri = `${window.location.origin}/api/auth/github/callback`;
        const scope = 'repo';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
        window.location.href = authUrl;
    };

    const disconnectGitHub = () => {
        localStorage.removeItem('github_token');
        setGithubToken(null);
        setDeployResult(null);
        setDeployStatus('idle');
    };

    // Deploy to GitHub
    const deployToGitHub = async () => {
        if (!githubToken || !data) return;
        setDeployStatus('deploying');
        setDeployError('');
        setDeployResult(null);

        try {
            const res = await fetch('/api/deploy-github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    githubToken,
                    resumeData: data,
                    templateId: selectedTemplate,
                }),
            });
            const result = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    // Token expired — clear it
                    localStorage.removeItem('github_token');
                    setGithubToken(null);
                }
                setDeployStatus('error');
                setDeployError(result.error || 'Deployment failed');
                return;
            }

            setDeployStatus('success');
            setDeployResult(result);
        } catch (err) {
            setDeployStatus('error');
            setDeployError('Network error. Please try again.');
        }
    };

    // Empty state
    if (!data) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #fff7e6, #ffffff 50%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg width="32" height="32" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" /></svg>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#374151', marginBottom: 12 }}>No Portfolio Data Found</h2>
                <p style={{ color: '#6b7280', marginBottom: 32 }}>Head to the builder to create your portfolio.</p>
                <a href="/dashboard" style={{ padding: '12px 24px', background: '#ea580c', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Go to Builder</a>
            </div>
        </div>
    );

    const current = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];
    const TemplateComponent = current.Component;

    return (
        <div style={{ position: 'relative' }}>
            {/* ===== FAB Buttons (bottom-right) ===== */}
            <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                {/* Deploy button */}
                <button
                    onClick={() => { setShowDeployPanel(!showDeployPanel); setShowPicker(false); }}
                    style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: deployStatus === 'success' ? '#16a34a' : '#24292e',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    title="Deploy to GitHub"
                >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </button>

                {/* Template picker button */}
                <button
                    onClick={() => { setShowPicker(!showPicker); setShowDeployPanel(false); }}
                    style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'transform 0.2s',
                        transform: showPicker ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    title="Change Template"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                </button>
            </div>

            {/* ===== Deploy Panel ===== */}
            {showDeployPanel && (
                <>
                    <div onClick={() => setShowDeployPanel(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998, backdropFilter: 'blur(4px)' }} />
                    <div style={{
                        position: 'fixed', bottom: 150, right: 24, zIndex: 999,
                        background: '#fff', borderRadius: 16, padding: 24,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                        width: 360, maxHeight: '70vh', overflowY: 'auto',
                    }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg width="20" height="20" fill="#24292e" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            Deploy to GitHub
                        </h3>
                        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Publish your portfolio to GitHub Pages</p>

                        {/* Step 1: Connect GitHub */}
                        {!githubToken ? (
                            <div>
                                <p style={{ fontSize: 14, color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>
                                    Connect your GitHub account to deploy your portfolio as a live website.
                                </p>
                                <button
                                    onClick={connectGitHub}
                                    style={{
                                        width: '100%', padding: '12px 16px', background: '#24292e', color: '#fff',
                                        borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 600,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    }}
                                >
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    Connect with GitHub
                                </button>
                            </div>
                        ) : (
                            <div>
                                {/* Connected state */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f0fdf4', borderRadius: 10, marginBottom: 16, border: '1px solid #bbf7d0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} />
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>GitHub Connected</span>
                                    </div>
                                    <button onClick={disconnectGitHub} style={{ fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Disconnect</button>
                                </div>

                                {/* Template info */}
                                <div style={{ padding: '10px 14px', background: '#fafafa', borderRadius: 10, marginBottom: 16, fontSize: 13, color: '#6b7280' }}>
                                    Template: <strong style={{ color: '#1f2937' }}>{current.name}</strong>
                                </div>

                                {/* Deploy button */}
                                {deployStatus !== 'success' && (
                                    <button
                                        onClick={deployToGitHub}
                                        disabled={deployStatus === 'deploying'}
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            background: deployStatus === 'deploying' ? '#9ca3af' : 'linear-gradient(135deg, #16a34a, #15803d)',
                                            color: '#fff', borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 600,
                                            cursor: deployStatus === 'deploying' ? 'wait' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        }}
                                    >
                                        {deployStatus === 'deploying' ? (
                                            <>
                                                <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                                Deploying...
                                            </>
                                        ) : (
                                            <>🚀 Deploy to GitHub Pages</>
                                        )}
                                    </button>
                                )}

                                {/* Success */}
                                {deployStatus === 'success' && deployResult && (
                                    <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 16, border: '1px solid #bbf7d0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                            <span style={{ fontSize: 20 }}>🎉</span>
                                            <strong style={{ color: '#166534' }}>Deployed Successfully!</strong>
                                        </div>
                                        <p style={{ fontSize: 13, color: '#374151', marginBottom: 8 }}>Your portfolio is live at:</p>
                                        <a href={deployResult.url} target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'block', padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #d1d5db', color: '#2563eb', fontWeight: 600, textDecoration: 'none', fontSize: 13, wordBreak: 'break-all', marginBottom: 8 }}>
                                            {deployResult.url}
                                        </a>
                                        <p style={{ fontSize: 11, color: '#9ca3af' }}>⏱ It may take 1-2 minutes for GitHub Pages to go live</p>
                                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                            <button onClick={() => { navigator.clipboard.writeText(deployResult.url); }} style={{ flex: 1, padding: '8px', background: '#e0e7ff', color: '#4338ca', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>📋 Copy Link</button>
                                            <button onClick={() => { setDeployStatus('idle'); setDeployResult(null); }} style={{ flex: 1, padding: '8px', background: '#f3f4f6', color: '#374151', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>🔄 Re-deploy</button>
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {deployStatus === 'error' && deployError && (
                                    <div style={{ background: '#fef2f2', borderRadius: 10, padding: 12, border: '1px solid #fecaca', marginTop: 12 }}>
                                        <p style={{ fontSize: 13, color: '#dc2626' }}>❌ {deployError}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Config error */}
                        {deployError && !githubToken && (
                            <div style={{ background: '#fef2f2', borderRadius: 10, padding: 12, border: '1px solid #fecaca', marginTop: 12 }}>
                                <p style={{ fontSize: 13, color: '#dc2626' }}>❌ {deployError}</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ===== Template Picker Panel ===== */}
            {showPicker && (
                <>
                    <div onClick={() => setShowPicker(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998, backdropFilter: 'blur(4px)' }} />
                    <div style={{
                        position: 'fixed', bottom: 150, right: 24, zIndex: 999,
                        background: '#fff', borderRadius: 16, padding: 24,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                        width: 320, maxHeight: '70vh', overflowY: 'auto',
                    }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>Choose Template</h3>
                        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Select a design for your portfolio</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {TEMPLATES.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => handleTemplateChange(t.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 14,
                                        padding: '12px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                        background: selectedTemplate === t.id ? '#f0f0ff' : '#fafafa',
                                        outline: selectedTemplate === t.id ? `2px solid ${t.color}` : '2px solid transparent',
                                        transition: 'all 0.15s', textAlign: 'left', fontFamily: 'inherit', width: '100%',
                                    }}
                                >
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                                        background: t.bg, border: `2px solid ${t.color}22`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', overflow: 'hidden',
                                    }}>
                                        <div style={{ width: 16, height: 2, background: t.color, borderRadius: 2, marginBottom: 3 }} />
                                        <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, height: 3, background: t.color, borderRadius: 2, opacity: 0.3 }} />
                                        <div style={{ position: 'absolute', bottom: 12, left: 6, right: 12, height: 3, background: t.color, borderRadius: 2, opacity: 0.2 }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {t.name}
                                            {selectedTemplate === t.id && <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', background: '#e0e7ff', padding: '2px 8px', borderRadius: 9999 }}>Active</span>}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Render selected template */}
            <TemplateComponent
                data={data}
                activeNav={activeNav}
                scrollTo={scrollTo}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Shared CSS */}
            <style>{`
                .desktop-nav { display: flex; }
                .mobile-menu-btn { display: none; }
                .mobile-menu { display: block; }
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
                @media (min-width: 769px) {
                    .mobile-menu-btn { display: none !important; }
                    .mobile-menu { display: none !important; }
                }
                a:hover { opacity: 0.85; }
                button:hover { opacity: 0.9; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
