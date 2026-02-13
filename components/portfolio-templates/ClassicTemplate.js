// Classic Portfolio Template - Warm orange/slate theme (default, matching reference)
import React from 'react';

export default function ClassicTemplate({ data, activeNav, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
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

    const navLinkStyle = (id) => ({
        padding: '8px 12px', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer',
        background: 'none', border: 'none', transition: 'color 0.2s', fontFamily: 'inherit',
        color: activeNav === id ? '#ea580c' : '#d1d5db',
    });

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: 'linear-gradient(to bottom, #fff7e6, #ffffff 50%)', backgroundAttachment: 'fixed' }}>
            {/* NAVBAR */}
            <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <nav style={{ display: 'flex', alignItems: 'baseline', gap: 4 }} className="desktop-nav">
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={navLinkStyle(item.id)}>{item.label}</button>
                        ))}
                    </nav>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 8 }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{ background: '#1e293b', padding: '8px 12px 12px' }}>
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 6, fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: activeNav === item.id ? '#ea580c' : '#d1d5db', background: activeNav === item.id ? '#0f172a' : 'transparent' }}>{item.label}</button>
                        ))}
                    </div>
                )}
            </header>

            <main style={{ maxWidth: 1024, margin: '0 auto', padding: '0 16px' }}>
                {/* HERO */}
                <section id="home" style={{ padding: '48px 0 32px' }}>
                    <div style={{ padding: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32, justifyContent: 'center' }}>
                        {personalInfo.photo ? (
                            <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', border: '4px solid #e5e7eb', flexShrink: 0 }} />
                        ) : (
                            <div style={{ width: 160, height: 160, borderRadius: '50%', background: '#f3f4f6', border: '4px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700, color: '#9ca3af', flexShrink: 0 }}>{initials}</div>
                        )}
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <h1 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>Hello, I'm <span style={{ color: '#ea580c' }}>{personalInfo.fullName || 'Your Name'}</span></h1>
                            <p style={{ color: '#4b5563', marginBottom: 12 }}>{personalInfo.jobTitle || 'Your Job Title'}{personalInfo.address ? ` | ${personalInfo.address}` : ''}</p>
                            {personalInfo.summary && <p style={{ color: '#374151', marginBottom: 16, maxWidth: 560, lineHeight: 1.7 }}>{personalInfo.summary}</p>}
                            {skillsList.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                    {skillsList.slice(0, 6).map((skill, i) => <span key={i} style={{ background: '#ffedd5', color: '#9a3412', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 9999 }}>{skill}</span>)}
                                </div>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                {personalInfo.linkedin && <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#2563eb', color: '#fff', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>LinkedIn</a>}
                                {personalInfo.website && <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#16a34a', color: '#fff', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>Website</a>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" style={{ padding: '32px 0' }}>
                    <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 24, textAlign: 'center' }}>About Me</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32, padding: '0 32px' }}>
                        {personalInfo.photo ? (
                            <img src={personalInfo.photo} alt={personalInfo.fullName} style={{ width: 192, height: 192, borderRadius: '50%', objectFit: 'cover', border: '4px solid #e5e7eb', flexShrink: 0 }} />
                        ) : (
                            <div style={{ width: 192, height: 192, borderRadius: '50%', background: '#f3f4f6', border: '4px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 700, color: '#9ca3af', flexShrink: 0 }}>{initials}</div>
                        )}
                        <div style={{ flex: 1, minWidth: 280, color: '#374151', lineHeight: 1.8 }}>
                            {personalInfo.summary && <p style={{ marginBottom: 16 }}>{personalInfo.summary}</p>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
                                {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#4b5563' }}>📧 {personalInfo.email}</span>}
                                {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#4b5563' }}>📱 {personalInfo.phone}</span>}
                                {personalInfo.address && <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#4b5563' }}>📍 {personalInfo.address}</span>}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS */}
                {skillsList.length > 0 && (
                    <section id="skills" style={{ padding: '32px 0' }}>
                        <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>Skills</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                            {chunkArray(skillsList, Math.ceil(skillsList.length / Math.min(3, Math.ceil(skillsList.length / 3)))).map((group, gi) => (
                                <div key={gi} style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {group.map((skill, si) => (
                                            <li key={si} style={{ display: 'flex', alignItems: 'center', color: '#374151', marginBottom: 8 }}>
                                                <span style={{ color: '#22c55e', marginRight: 8 }}>✔</span> {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* EXPERIENCE + EDUCATION */}
                {(experience.length > 0 || education.length > 0) && (
                    <section id="experience" style={{ padding: '32px 0' }}>
                        {education.length > 0 && (
                            <div style={{ marginBottom: 48 }}>
                                <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>Education</h2>
                                <div style={{ position: 'relative', paddingLeft: 32 }}>
                                    {education.map((edu, index) => (
                                        <div key={index} style={{ position: 'relative', paddingBottom: 32, paddingLeft: 24 }}>
                                            {index < education.length - 1 && <div style={{ position: 'absolute', left: -1, top: 12, bottom: 0, width: 2, background: '#cbd5e1' }} />}
                                            <div style={{ position: 'absolute', left: -8, top: 6, width: 16, height: 16, borderRadius: '50%', background: '#f97316', border: '4px solid #f8fafc', boxSizing: 'content-box' }} />
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <div style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>{edu.degree}</div>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{edu.startDate} — {edu.endDate}</span>
                                            </div>
                                            <div style={{ fontSize: 16, fontWeight: 600, color: '#4b5563' }}>{edu.school}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {experience.length > 0 && (
                            <div>
                                <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 32, textAlign: 'center', borderTop: education.length > 0 ? '1px solid #e5e7eb' : 'none', paddingTop: education.length > 0 ? 48 : 0 }}>Work Experience</h2>
                                <div style={{ position: 'relative', paddingLeft: 32 }}>
                                    {experience.map((exp, index) => (
                                        <div key={index} style={{ position: 'relative', paddingBottom: 32, paddingLeft: 24 }}>
                                            {index < experience.length - 1 && <div style={{ position: 'absolute', left: -1, top: 12, bottom: 0, width: 2, background: '#cbd5e1' }} />}
                                            <div style={{ position: 'absolute', left: -8, top: 6, width: 16, height: 16, borderRadius: '50%', background: '#f97316', border: '4px solid #f8fafc', boxSizing: 'content-box' }} />
                                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <div style={{ fontSize: 20, fontWeight: 700, color: '#1f2937' }}>{exp.title}</div>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: '#2563eb', background: '#dbeafe', padding: '2px 10px', borderRadius: 9999 }}>{exp.startDate} — {exp.endDate}</span>
                                            </div>
                                            <div style={{ fontSize: 16, fontWeight: 600, color: '#4b5563', marginBottom: 12 }}>{exp.company}</div>
                                            {exp.description && <p style={{ color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <section id="projects" style={{ padding: '32px 0' }}>
                        <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>My Projects</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                            {projects.map((proj, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', padding: 24 }}>
                                    <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ea580c', marginBottom: 12 }}>{proj.name}</h3>
                                    {proj.description && <p style={{ color: '#374151', marginBottom: 24, flex: 1, lineHeight: 1.7 }}>{proj.description}</p>}
                                    {proj.technologies && (
                                        <div style={{ marginBottom: 24 }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {proj.technologies.split(',').map((tech, i) => <span key={i} style={{ background: '#ffedd5', color: '#9a3412', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 9999 }}>{tech.trim()}</span>)}
                                            </div>
                                        </div>
                                    )}
                                    {proj.link && (
                                        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
                                            <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4b5563', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>View Project →</a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CONTACT */}
                <section id="contact" style={{ padding: '32px 0 48px' }}>
                    <h2 style={{ fontSize: 30, fontWeight: 700, color: '#1f2937', marginBottom: 32, textAlign: 'center' }}>Get In Touch</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>Contact Information</h3>
                            <p style={{ color: '#374151', marginBottom: 24 }}>Feel free to reach out for inquiries or collaboration.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#374151' }}>📧 <a href={`mailto:${personalInfo.email}`} style={{ color: '#374151', textDecoration: 'none' }}>{personalInfo.email}</a></div>}
                                {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#374151' }}>📱 {personalInfo.phone}</div>}
                                {personalInfo.address && <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#374151' }}>📍 {personalInfo.address}</div>}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <input type="text" placeholder="Name" style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                            <input type="email" placeholder="Email" style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                            <textarea rows="4" placeholder="Message" style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                            <button style={{ width: '100%', background: '#ea580c', color: '#fff', fontWeight: 700, padding: '10px 16px', borderRadius: 6, border: 'none', fontSize: 14, cursor: 'pointer' }}>Send Message</button>
                        </div>
                    </div>
                </section>
            </main>

            <footer style={{ background: '#1f2937', color: '#e5e7eb', padding: '24px 0', textAlign: 'center' }}>
                <p>© {new Date().getFullYear()} {personalInfo.fullName || 'Your Name'}</p>
            </footer>
        </div>
    );
}

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
}
