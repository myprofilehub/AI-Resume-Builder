import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export default function MinimalTemplate({ data }) {
    const { personalInfo, education, experience, skills, projects } = data;

    return (
        <div
            id="resume-preview"
            style={{
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                padding: '2rem',
                height: '100%',
                boxSizing: 'border-box'
            }}
        >
            {/* Header */}
            <header style={{ borderBottom: '1px solid #d1d5db', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: '#111827' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '1rem', lineHeight: '1.625' }}>{personalInfo.summary}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {personalInfo.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Mail size={14} />
                            {personalInfo.email}
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Phone size={14} />
                            {personalInfo.phone}
                        </div>
                    )}
                    {personalInfo.address && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} />
                            {personalInfo.address}
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Linkedin size={14} />
                            {personalInfo.linkedin}
                        </div>
                    )}
                    {personalInfo.website && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <LinkIcon size={14} />
                            {personalInfo.website}
                        </div>
                    )}
                </div>
            </header>

            {/* Experience */}
            {experience.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', marginBottom: '1rem', paddingBottom: '0.25rem', color: '#111827' }}>
                        Professional Experience
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.125rem', color: '#111827' }}>{exp.title}</h3>
                                    <span style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563' }}>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>{exp.company}</div>
                                <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-line', color: '#1f2937', lineHeight: '1.5' }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', marginBottom: '1rem', paddingBottom: '0.25rem', color: '#111827' }}>
                        Projects
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.125rem', color: '#111827' }}>{proj.name}</h3>
                                    {proj.link && <span style={{ fontSize: '0.875rem', color: '#2563eb' }}>{proj.link}</span>}
                                </div>
                                {proj.technologies && (
                                    <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563', marginBottom: '0.25rem' }}>Tech Stack: {proj.technologies}</p>
                                )}
                                <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-line', color: '#1f2937', lineHeight: '1.5' }}>{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', marginBottom: '1rem', paddingBottom: '0.25rem', color: '#111827' }}>
                        Education
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.125rem', color: '#111827' }}>{edu.school}</h3>
                                    <span style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#4b5563' }}>{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <div style={{ fontSize: '1rem', color: '#374151' }}>{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', marginBottom: '1rem', paddingBottom: '0.25rem', color: '#111827' }}>
                        Skills
                    </h2>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.625', color: '#1f2937' }}>{skills}</p>
                </section>
            )}
        </div>
    );
}
