// Developer Portfolio Template - Terminal/code-inspired, green-on-dark
import React from 'react';

export default function DevTemplate({ data, activeNav, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = '' } = data || {};
    const skillsList = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const initials = (personalInfo.fullName || 'U').split(' ').map(n => n[0]).join('').toUpperCase();

    const navItems = [
        { id: 'home', label: '~/home' },
        ...(skillsList.length > 0 ? [{ id: 'skills', label: '~/skills' }] : []),
        ...(experience.length > 0 || education.length > 0 ? [{ id: 'experience', label: '~/experience' }] : []),
        ...(projects.length > 0 ? [{ id: 'projects', label: '~/projects' }] : []),
        { id: 'contact', label: '~/contact' },
    ];

    return (
        <div style={{ minHeight: '100vh', fontFamily: "'Cascadia Code', 'Fira Code', 'Courier New', monospace", background: '#0a0a0a', color: '#e0e0e0' }}>
            {/* NAVBAR */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#111', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#4ade80' }}>{'>'} {personalInfo.fullName?.split(' ')[0]?.toLowerCase() || 'dev'}<span style={{ animation: 'blink 1s infinite', color: '#4ade80' }}>_</span></span>
                    <nav className="desktop-nav" style={{ display: 'flex', gap: 0 }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                                padding: '6px 12px', fontSize: 13, fontWeight: 400, cursor: 'pointer',
                                background: 'none', border: 'none', fontFamily: 'inherit',
                                color: activeNav === item.id ? '#4ade80' : '#666',
                            }}>{item.label}</button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', padding: 8 }}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{ background: '#111', padding: '4px 20px 12px', borderTop: '1px solid #1a1a1a' }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 0', fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeNav === item.id ? '#4ade80' : '#666', background: 'transparent' }}>{item.label}</button>
                        ))}
                    </div>
                )}
            </header>

            <main style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
                {/* HERO */}
                <section id="home" style={{ padding: '80px 0 60px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                        {personalInfo.photo ? (
                            <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: 120, height: 120, borderRadius: 8, objectFit: 'cover', border: '2px solid #4ade80', flexShrink: 0 }} />
                        ) : (
                            <div style={{ width: 120, height: 120, borderRadius: 8, background: '#111', border: '2px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#4ade80', flexShrink: 0 }}>{initials}</div>
                        )}
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>// Hello world, I am</p>
                            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{personalInfo.fullName || 'Your Name'}</h1>
                            <p style={{ color: '#4ade80', marginBottom: 16 }}>
                                <span style={{ color: '#c084fc' }}>const</span> role = <span style={{ color: '#fbbf24' }}>"{personalInfo.jobTitle || 'Developer'}"</span>;
                            </p>
                            {personalInfo.summary && <p style={{ color: '#888', lineHeight: 1.7, maxWidth: 550, marginBottom: 16 }}>{personalInfo.summary}</p>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {personalInfo.email && <a href={`mailto:${personalInfo.email}`} style={{ padding: '6px 14px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, color: '#4ade80', textDecoration: 'none', fontSize: 13 }}>📧 {personalInfo.email}</a>}
                                {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 14px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, color: '#60a5fa', textDecoration: 'none', fontSize: 13 }}>LinkedIn</a>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS */}
                {skillsList.length > 0 && (
                    <section id="skills" style={{ padding: '48px 0' }}>
                        <h2 style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
                            <span style={{ color: '#c084fc' }}>const</span> <span style={{ color: '#fff' }}>skills</span> = [
                        </h2>
                        <div style={{ paddingLeft: 24, display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                            {skillsList.map((skill, i) => (
                                <span key={i} style={{ padding: '4px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, fontSize: 13, color: '#fbbf24' }}>"{skill}"</span>
                            ))}
                        </div>
                        <p style={{ fontSize: 14, color: '#666' }}>];</p>
                    </section>
                )}

                {/* EXPERIENCE + EDUCATION */}
                {(experience.length > 0 || education.length > 0) && (
                    <section id="experience" style={{ padding: '48px 0' }}>
                        {experience.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                                    <span style={{ color: '#4ade80' }}>{'>'}</span> <span style={{ color: '#fff' }}>experience</span> --list
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
                                    {experience.map((exp, i) => (
                                        <div key={i} style={{ background: '#111', borderRadius: 8, padding: 20, borderLeft: '3px solid #4ade80' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ fontWeight: 700, color: '#fff' }}>{exp.title}</span>
                                                <span style={{ fontSize: 12, color: '#4ade80' }}>{exp.startDate} → {exp.endDate}</span>
                                            </div>
                                            <p style={{ color: '#c084fc', fontSize: 13, marginBottom: 8 }}>{exp.company}</p>
                                            {exp.description && <p style={{ color: '#888', lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: 13 }}>{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {education.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                                    <span style={{ color: '#4ade80' }}>{'>'}</span> <span style={{ color: '#fff' }}>education</span> --list
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {education.map((edu, i) => (
                                        <div key={i} style={{ background: '#111', borderRadius: 8, padding: 20, borderLeft: '3px solid #c084fc', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ fontWeight: 700, color: '#fff' }}>{edu.degree}</span>
                                                <p style={{ color: '#888', fontSize: 13 }}>{edu.school}</p>
                                            </div>
                                            <span style={{ fontSize: 12, color: '#c084fc' }}>{edu.startDate} → {edu.endDate}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </section>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <section id="projects" style={{ padding: '48px 0' }}>
                        <h2 style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                            <span style={{ color: '#4ade80' }}>{'>'}</span> <span style={{ color: '#fff' }}>ls</span> ~/projects
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                            {projects.map((proj, i) => (
                                <div key={i} style={{ background: '#111', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '8px 12px', background: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></span>
                                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }}></span>
                                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }}></span>
                                        <span style={{ marginLeft: 8, fontSize: 12, color: '#666' }}>{proj.name?.toLowerCase().replace(/\s+/g, '-')}</span>
                                    </div>
                                    <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>{proj.name}</h3>
                                        {proj.description && <p style={{ color: '#888', lineHeight: 1.6, marginBottom: 12, flex: 1, fontSize: 13 }}>{proj.description}</p>}
                                        {proj.technologies && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                                                {proj.technologies.split(',').map((tech, ti) => <span key={ti} style={{ background: '#1a1a1a', color: '#fbbf24', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{tech.trim()}</span>)}
                                            </div>
                                        )}
                                        {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none', fontSize: 13 }}>$ open {proj.link}</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                <section id="contact" style={{ padding: '48px 0 64px' }}>
                    <h2 style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                        <span style={{ color: '#4ade80' }}>{'>'}</span> <span style={{ color: '#fff' }}>contact</span> --send
                    </h2>
                    <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                            {personalInfo.email && <span style={{ color: '#4ade80', fontSize: 13 }}>📧 {personalInfo.email}</span>}
                            {personalInfo.phone && <span style={{ color: '#fbbf24', fontSize: 13 }}>📱 {personalInfo.phone}</span>}
                        </div>
                        <input type="text" placeholder="$ name: " style={{ width: '100%', background: '#111', border: '1px solid #222', borderRadius: 4, padding: '10px 12px', fontSize: 13, color: '#4ade80', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                        <input type="email" placeholder="$ email: " style={{ width: '100%', background: '#111', border: '1px solid #222', borderRadius: 4, padding: '10px 12px', fontSize: 13, color: '#4ade80', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                        <textarea rows="4" placeholder="$ message: " style={{ width: '100%', background: '#111', border: '1px solid #222', borderRadius: 4, padding: '10px 12px', fontSize: 13, color: '#4ade80', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                        <button style={{ width: '100%', background: '#4ade80', color: '#0a0a0a', fontWeight: 700, padding: '10px', borderRadius: 4, border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>$ send --message</button>
                    </div>
                </section>
            </main>

            <footer style={{ borderTop: '1px solid #1a1a1a', padding: '20px 0', textAlign: 'center' }}>
                <p style={{ color: '#333', fontSize: 12 }}>// © {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}</p>
            </footer>

            <style>{`
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
            `}</style>
        </div>
    );
}
