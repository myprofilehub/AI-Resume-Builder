// Gradient Portfolio Template - Bold gradients, vibrant colors
import React from 'react';

export default function GradientTemplate({ data, activeNav, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
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
        <div style={{ minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#fdf2f8', color: '#1e1b4b' }}>
            {/* NAVBAR */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <span style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>✦ {personalInfo.fullName?.split(' ')[0] || 'Portfolio'}</span>
                    <nav className="desktop-nav" style={{ display: 'flex', gap: 2 }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                                padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                background: activeNav === item.id ? 'rgba(255,255,255,0.2)' : 'none', border: 'none', fontFamily: 'inherit', color: '#fff',
                            }}>{item.label}</button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', padding: '8px 24px 16px' }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 10, fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: '#fff', background: activeNav === item.id ? 'rgba(255,255,255,0.15)' : 'transparent' }}>{item.label}</button>
                        ))}
                    </div>
                )}
            </header>

            <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
                {/* HERO */}
                <section id="home" style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -40, left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -20, right: '10%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(219,39,119,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                    {personalInfo.photo ? (
                        <div style={{ width: 150, height: 150, borderRadius: 24, overflow: 'hidden', margin: '0 auto 28px', boxShadow: '0 12px 40px rgba(124,58,237,0.25)' }}>
                            <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <div style={{ width: 150, height: 150, borderRadius: 24, background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700, color: '#fff', margin: '0 auto 28px', boxShadow: '0 12px 40px rgba(124,58,237,0.25)' }}>{initials}</div>
                    )}
                    <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 8, background: 'linear-gradient(135deg, #7c3aed, #db2777, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{personalInfo.fullName || 'Your Name'}</h1>
                    {personalInfo.jobTitle && <p style={{ fontSize: 20, color: '#7c3aed', fontWeight: 600, marginBottom: 16 }}>{personalInfo.jobTitle}</p>}
                    {personalInfo.summary && <p style={{ fontSize: 16, color: '#64748b', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.8 }}>{personalInfo.summary}</p>}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', borderRadius: 24, textDecoration: 'none', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 15px rgba(124,58,237,0.3)' }}>Email Me</a>}
                        {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 24px', background: '#fff', color: '#7c3aed', borderRadius: 24, textDecoration: 'none', fontSize: 14, fontWeight: 600, border: '2px solid #7c3aed' }}>LinkedIn</a>}
                    </div>
                </section>

                {/* SKILLS */}
                {skillsList.length > 0 && (
                    <section id="skills" style={{ padding: '48px 0' }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
                            {skillsList.map((skill, i) => (
                                <span key={i} style={{ padding: '8px 20px', background: '#fff', borderRadius: 20, fontSize: 14, fontWeight: 600, color: '#7c3aed', boxShadow: '0 2px 10px rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.1)' }}>{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE + EDUCATION */}
                {(experience.length > 0 || education.length > 0) && (
                    <section id="experience" style={{ padding: '48px 0' }}>
                        {experience.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Experience</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
                                    {experience.map((exp, i) => (
                                        <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 20px rgba(124,58,237,0.08)', borderLeft: '4px solid #7c3aed' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e1b4b' }}>{exp.title}</h3>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: '#db2777' }}>{exp.startDate} — {exp.endDate}</span>
                                            </div>
                                            <p style={{ color: '#7c3aed', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>{exp.company}</p>
                                            {exp.description && <p style={{ color: '#64748b', lineHeight: 1.7, whiteSpace: 'pre-line', fontSize: 14 }}>{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {education.length > 0 && (
                            <>
                                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Education</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {education.map((edu, i) => (
                                        <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(219,39,119,0.06)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e1b4b' }}>{edu.degree}</h3>
                                                <p style={{ color: '#7c3aed', fontWeight: 600, fontSize: 14 }}>{edu.school}</p>
                                            </div>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: '#db2777' }}>{edu.startDate} — {edu.endDate}</span>
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
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Projects</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                            {projects.map((proj, i) => (
                                <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 20px rgba(124,58,237,0.06)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'default' }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e1b4b', marginBottom: 8 }}>{proj.name}</h3>
                                    {proj.description && <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 16, flex: 1, fontSize: 14 }}>{proj.description}</p>}
                                    {proj.technologies && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                            {proj.technologies.split(',').map((tech, ti) => <span key={ti} style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(219,39,119,0.08))', color: '#7c3aed', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{tech.trim()}</span>)}
                                        </div>
                                    )}
                                    {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: '#db2777', textDecoration: 'none', fontWeight: 600, fontSize: 14, marginTop: 'auto' }}>View Project →</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                <section id="contact" style={{ padding: '48px 0 64px' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, #7c3aed, #db2777)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Let's Connect</h2>
                    <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input type="text" placeholder="Your Name" style={{ width: '100%', background: '#fff', border: '2px solid #e9d5ff', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#1e1b4b', outline: 'none', boxSizing: 'border-box' }} />
                        <input type="email" placeholder="Your Email" style={{ width: '100%', background: '#fff', border: '2px solid #e9d5ff', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#1e1b4b', outline: 'none', boxSizing: 'border-box' }} />
                        <textarea rows="4" placeholder="Your Message" style={{ width: '100%', background: '#fff', border: '2px solid #e9d5ff', borderRadius: 14, padding: '12px 16px', fontSize: 14, color: '#1e1b4b', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                        <button style={{ width: '100%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', fontWeight: 700, padding: '14px', borderRadius: 14, border: 'none', fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>Send Message ✨</button>
                    </div>
                </section>
            </main>

            <footer style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', padding: '24px 0', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}. Crafted with ❤️</p>
            </footer>
        </div>
    );
}
