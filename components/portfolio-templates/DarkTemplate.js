// Dark Portfolio Template - Dark theme with blue/cyan accents
import React from 'react';

export default function DarkTemplate({ data, activeNav, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = '' } = data || {};
    const skillsList = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const initials = (personalInfo.fullName || 'U').split(' ').map(n => n[0]).join('').toUpperCase();

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        ...(skillsList.length > 0 ? [{ id: 'skills', label: 'Skills' }] : []),
        ...(experience.length > 0 || education.length > 0 ? [{ id: 'experience', label: 'Experience' }] : []),
        ...(projects.length > 0 ? [{ id: 'projects', label: 'Projects' }] : []),
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", background: '#0f172a', color: '#e2e8f0' }}>
            {/* NAVBAR */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(56,189,248,0.1)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <span style={{ fontWeight: 700, fontSize: 18, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {personalInfo.fullName?.split(' ')[0] || 'Portfolio'}
                    </span>
                    <nav className="desktop-nav" style={{ display: 'flex', gap: 4 }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                                background: activeNav === item.id ? 'rgba(56,189,248,0.1)' : 'none', border: 'none', fontFamily: 'inherit',
                                color: activeNav === item.id ? '#38bdf8' : '#94a3b8',
                            }}>{item.label}</button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 8 }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{ background: '#0f172a', padding: '8px 16px 16px', borderTop: '1px solid rgba(56,189,248,0.1)' }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeNav === item.id ? '#38bdf8' : '#94a3b8', background: 'transparent' }}>{item.label}</button>
                        ))}
                    </div>
                )}
            </header>

            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
                {/* HERO */}
                <section id="home" style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', border: '3px solid #38bdf8', margin: '0 auto 24px', display: 'block' }} />
                    ) : (
                        <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', border: '3px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 700, color: '#38bdf8', margin: '0 auto 24px' }}>{initials}</div>
                    )}
                    <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 8, color: '#f1f5f9' }}>{personalInfo.fullName || 'Your Name'}</h1>
                    {personalInfo.jobTitle && <p style={{ fontSize: 20, color: '#38bdf8', fontWeight: 500, marginBottom: 16 }}>{personalInfo.jobTitle}</p>}
                    {personalInfo.summary && <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.7 }}>{personalInfo.summary}</p>}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} style={{ padding: '10px 20px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 8, color: '#38bdf8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>{personalInfo.email}</a>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: '#38bdf8', borderRadius: 8, color: '#0f172a', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>LinkedIn</a>}
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" style={{ padding: '48px 0' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>About Me</h2>
                    <div style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 16, padding: 32, border: '1px solid rgba(56,189,248,0.1)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
                            {personalInfo.photo ? (
                                <img src={personalInfo.photo} alt="" style={{ width: 160, height: 160, borderRadius: 16, objectFit: 'cover', flexShrink: 0 }} />
                            ) : (
                                <div style={{ width: 160, height: 160, borderRadius: 16, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700, color: '#38bdf8', flexShrink: 0 }}>{initials}</div>
                            )}
                            <div style={{ flex: 1, minWidth: 280 }}>
                                {personalInfo.summary && <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>{personalInfo.summary}</p>}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                    {personalInfo.phone && <span style={{ color: '#64748b', fontSize: 14 }}>📱 {personalInfo.phone}</span>}
                                    {personalInfo.address && <span style={{ color: '#64748b', fontSize: 14 }}>📍 {personalInfo.address}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS */}
                {skillsList.length > 0 && (
                    <section id="skills" style={{ padding: '48px 0' }}>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>Skills & Technologies</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                            {skillsList.map((skill, i) => (
                                <span key={i} style={{ padding: '10px 20px', background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: 10, color: '#cbd5e1', fontSize: 14, fontWeight: 500 }}>{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE + EDUCATION */}
                {(experience.length > 0 || education.length > 0) && (
                    <section id="experience" style={{ padding: '48px 0' }}>
                        {experience.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>Experience</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
                                    {experience.map((exp, i) => (
                                        <div key={i} style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 16, padding: 24, border: '1px solid rgba(56,189,248,0.08)', borderLeft: '3px solid #38bdf8' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>{exp.title}</h3>
                                                <span style={{ fontSize: 13, color: '#38bdf8', fontWeight: 500 }}>{exp.startDate} — {exp.endDate}</span>
                                            </div>
                                            <p style={{ color: '#64748b', fontWeight: 600, marginBottom: 8 }}>{exp.company}</p>
                                            {exp.description && <p style={{ color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {education.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>Education</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {education.map((edu, i) => (
                                        <div key={i} style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 16, padding: 24, border: '1px solid rgba(129,140,248,0.08)', borderLeft: '3px solid #818cf8', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>{edu.degree}</h3>
                                                <p style={{ color: '#64748b', fontWeight: 600 }}>{edu.school}</p>
                                            </div>
                                            <span style={{ fontSize: 13, color: '#818cf8', fontWeight: 500 }}>{edu.startDate} — {edu.endDate}</span>
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
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>Projects</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                            {projects.map((proj, i) => (
                                <div key={i} style={{ background: 'rgba(30,41,59,0.5)', borderRadius: 16, padding: 24, border: '1px solid rgba(56,189,248,0.08)', display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#38bdf8', marginBottom: 8 }}>{proj.name}</h3>
                                    {proj.description && <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{proj.description}</p>}
                                    {proj.technologies && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                            {proj.technologies.split(',').map((tech, ti) => <span key={ti} style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{tech.trim()}</span>)}
                                        </div>
                                    )}
                                    {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600, fontSize: 14, marginTop: 'auto' }}>View Project →</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                <section id="contact" style={{ padding: '48px 0 64px' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 32, textAlign: 'center' }}>Get In Touch</h2>
                    <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input type="text" placeholder="Name" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                        <input type="email" placeholder="Email" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                        <textarea rows="4" placeholder="Message" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#e2e8f0', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                        <button style={{ width: '100%', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', color: '#0f172a', fontWeight: 700, padding: '12px', borderRadius: 10, border: 'none', fontSize: 14, cursor: 'pointer' }}>Send Message</button>
                    </div>
                </section>
            </main>

            <footer style={{ borderTop: '1px solid rgba(56,189,248,0.1)', padding: '24px 0', textAlign: 'center' }}>
                <p style={{ color: '#475569', fontSize: 14 }}>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}. All rights reserved.</p>
            </footer>
        </div>
    );
}
