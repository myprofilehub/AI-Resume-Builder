'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, Palette, Github, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [githubConnected, setGithubConnected] = useState(false);
    const [portfolioUrl, setPortfolioUrl] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        // Check GitHub connection
        const ghToken = localStorage.getItem('github_token');
        if (ghToken) {
            setGithubConnected(true);
            // Try to get username for URL display
            fetch('https://api.github.com/user', {
                headers: { 'Authorization': `Bearer ${ghToken}`, 'Accept': 'application/vnd.github+json' },
            })
                .then(r => r.json())
                .then(data => {
                    if (data.login) setPortfolioUrl(`https://${data.login}.github.io/my-portfolio`);
                })
                .catch(() => { });
        }
    }, [user, loading, router]);

    const disconnectGitHub = () => {
        localStorage.removeItem('github_token');
        setGithubConnected(false);
        setPortfolioUrl('');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    }
    if (!user) return null;

    return (
        <main style={{ padding: '32px 40px', maxWidth: 800 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>Settings</h1>
            <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 32 }}>Manage your account and integrations</p>

            {/* Account Section */}
            <section style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <User size={20} color="#6366f1" />
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1f2937' }}>Account</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 4 }}>Email</label>
                        <div style={{ padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 14, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Mail size={16} color="#9ca3af" />
                            {user?.email || 'Not available'}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', display: 'block', marginBottom: 4 }}>Account ID</label>
                        <div style={{ padding: '10px 14px', background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 14, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Shield size={16} color="#9ca3af" />
                            {user?.id || 'N/A'}
                        </div>
                    </div>
                </div>
            </section>

            {/* GitHub Integration */}
            <section style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Github size={20} color="#24292e" />
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1f2937' }}>GitHub Integration</h2>
                </div>

                {githubConnected ? (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>Connected</span>
                            </div>
                            <button onClick={disconnectGitHub} style={{ fontSize: 13, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Disconnect</button>
                        </div>
                        {portfolioUrl && (
                            <div style={{ padding: '12px 16px', background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                                <label style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: 6 }}>Portfolio URL</label>
                                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {portfolioUrl} <ExternalLink size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>
                            Connect your GitHub account to deploy your portfolio to GitHub Pages and get a shareable link.
                        </p>
                        <button
                            onClick={() => router.push('/portfolio')}
                            style={{
                                padding: '10px 20px', background: '#24292e', color: '#fff',
                                borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 600,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                            }}
                        >
                            <Github size={18} />
                            Connect via Portfolio Page
                        </button>
                    </div>
                )}
            </section>

            {/* Portfolio Template */}
            <section style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Palette size={20} color="#7c3aed" />
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1f2937' }}>Portfolio Template</h2>
                </div>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
                    You can change your portfolio template from the portfolio preview page.
                </p>
                <button
                    onClick={() => window.open('/portfolio', '_blank')}
                    style={{
                        padding: '10px 20px', background: '#6366f1', color: '#fff',
                        borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                    }}
                >
                    <Palette size={18} />
                    Open Portfolio
                </button>
            </section>
        </main>
    );
}
