// Minimal Portfolio Template - Clean, white, elegant
import React from 'react';

export default function MinimalTemplate({ data, activeNav, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = '' } = data || {};
    const skillsList = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const initials = (personalInfo.fullName || 'U').split(' ').map(n => n[0]).join('').toUpperCase();

    const navItems = [
        { id: 'home', label: 'Home' },
        ...(skillsList.length > 0 ? [{ id: 'skills', label: 'Skills' }] : []),
        ...(experience.length > 0 || education.length > 0 ? [{ id: 'experience', label: 'Experience' }] : []),
        ...(projects.length > 0 ? [{ id: 'projects', label: 'Projects' }] : []),
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <div style={{ minHeight: '100vh', fontFamily: "'Georgia', 'Times New Roman', serif", background: '#fafafa', color: '#2d2d2d' }}>
            {/* NAVBAR */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#ffffff', borderBottom: '1px solid #eee' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: '#111' }}>{personalInfo.fullName?.split(' ')[0] || 'Portfolio'}</span>
                    <nav className="desktop-nav" style={{ display: 'flex', gap: 0 }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                                padding: '8px 14px', fontSize: 13, fontWeight: 400, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit',
                                color: activeNav === item.id ? '#111' : '#888', letterSpacing: 1, textTransform: 'uppercase',
                            }}>{item.label}</button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 8 }}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{ background: '#fff', padding: '8px 24px 16px', borderTop: '1px solid #eee' }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', fontSize: 14, fontWeight: 400, border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeNav === item.id ? '#111' : '#888', background: 'transparent', letterSpacing: 1, textTransform: 'uppercase', borderBottom: '1px solid #f5f5f5' }}>{item.label}</button>
                        ))}
                    </div>
                )}
            </header>

            <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                {/* HERO */}
                <section id="home" style={{ padding: '80px 0 60px', textAlign: 'center' }}>
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 32px', display: 'block', filter: 'grayscale(20%)' }} />
                    ) : (
                        <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 400, color: '#999', margin: '0 auto 32px', letterSpacing: 2 }}>{initials}</div>
                    )}
                    <h1 style={{ fontSize: 36, fontWeight: 400, marginBottom: 8, letterSpacing: 3, textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</h1>
                    {personalInfo.jobTitle && <p style={{ fontSize: 16, color: '#888', fontWeight: 400, marginBottom: 24, letterSpacing: 2 }}>{personalInfo.jobTitle}</p>}
                    {personalInfo.summary && <p style={{ fontSize: 15, color: '#666', maxWidth: 550, margin: '0 auto 32px', lineHeight: 1.9, fontStyle: 'italic' }}>{personalInfo.summary}</p>}
                    <div style={{ width: 40, height: 1, background: '#ccc', margin: '0 auto' }} />
                </section>

                {/* SKILLS */}
                {skillsList.length > 0 && (
                    <section id="skills" style={{ padding: '48px 0', borderTop: '1px solid #eee' }}>
                        <h2 style={{ fontSize: 14, fontWeight: 400, color: '#888', marginBottom: 24, textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' }}>Expertise</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
                            {skillsList.map((skill, i) => <span key={i} style={{ padding: '6px 16px', border: '1px solid #ddd', borderRadius: 2, fontSize: 13, color: '#555' }}>{skill}</span>)}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE + EDUCATION */}
                {(experience.length > 0 || education.length > 0) && (
                    <section id="experience" style={{ padding: '48px 0', borderTop: '1px solid #eee' }}>
                        {experience.length > 0 && (
                            <div style={{ marginBottom: 48 }}>
                                <h2 style={{ fontSize: 14, fontWeight: 400, color: '#888', marginBottom: 32, textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' }}>Experience</h2>
                                {experience.map((exp, i) => (
                                    <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < experience.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#2d2d2d' }}>{exp.title}</h3>
                                            <span style={{ fontSize: 13, color: '#aaa' }}>{exp.startDate} — {exp.endDate}</span>
                                        </div>
                                        <p style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>{exp.company}</p>
                                        {exp.description && <p style={{ color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: 14 }}>{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                        {education.length > 0 && (
                            <div>
                                <h2 style={{ fontSize: 14, fontWeight: 400, color: '#888', marginBottom: 32, textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' }}>Education</h2>
                                {education.map((edu, i) => (
                                    <div key={i} style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#2d2d2d' }}>{edu.degree}</h3>
                                            <p style={{ fontSize: 14, color: '#888' }}>{edu.school}</p>
                                        </div>
                                        <span style={{ fontSize: 13, color: '#aaa' }}>{edu.startDate} — {edu.endDate}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <section id="projects" style={{ padding: '48px 0', borderTop: '1px solid #eee' }}>
                        <h2 style={{ fontSize: 14, fontWeight: 400, color: '#888', marginBottom: 32, textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' }}>Selected Work</h2>
                        {projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < projects.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#2d2d2d', marginBottom: 8 }}>{proj.name}</h3>
                                {proj.description && <p style={{ color: '#666', lineHeight: 1.8, marginBottom: 12, fontSize: 14 }}>{proj.description}</p>}
                                {proj.technologies && <p style={{ color: '#aaa', fontSize: 13 }}>{proj.technologies}</p>}
                                {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2d2d2d', fontSize: 13, fontWeight: 600, textDecoration: 'underline', marginTop: 8, display: 'inline-block' }}>View Project</a>}
                            </div>
                        ))}
                    </section>
                )}

                {/* CONTACT */}
                <section id="contact" style={{ padding: '48px 0 64px', borderTop: '1px solid #eee', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 14, fontWeight: 400, color: '#888', marginBottom: 24, letterSpacing: 3, textTransform: 'uppercase' }}>Contact</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} style={{ color: '#2d2d2d', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid #ccc', paddingBottom: 2 }}>{personalInfo.email}</a>}
                        {personalInfo.phone && <span style={{ color: '#666', fontSize: 14 }}>{personalInfo.phone}</span>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2d2d2d', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid #ccc', paddingBottom: 2 }}>LinkedIn</a>}
                    </div>
                </section>
            </main>

            <footer style={{ borderTop: '1px solid #eee', padding: '24px 0', textAlign: 'center' }}>
                <p style={{ color: '#ccc', fontSize: 12, letterSpacing: 1 }}>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}</p>
            </footer>
        </div>
    );
}
