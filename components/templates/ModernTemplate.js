import React from 'react';

export default function ModernTemplate({ data }) {
    return (
        <div id="resume-preview" style={{ backgroundColor: '#ffffff', color: '#1f2937', height: '100%', padding: '2rem', fontFamily: 'sans-serif' }}>
            {/* Header */}
            <header style={{ borderBottom: '4px solid #2563eb', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.025em', color: '#111827', marginBottom: '0.5rem' }}>
                    {data.personalInfo.fullName}
                </h1>
                {data.personalInfo.jobTitle && (
                    <p style={{ fontSize: '1.25rem', color: '#2563eb', fontWeight: '600', marginBottom: '0.75rem' }}>
                        {data.personalInfo.jobTitle}
                    </p>
                )}
                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section style={{ marginBottom: '1.5rem' }}>
                    <p style={{ color: '#374151', lineHeight: '1.625', fontSize: '0.875rem' }}>{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                        Experience
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{exp.title}</h3>
                                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div style={{ color: '#2563eb', fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{exp.company}</div>
                                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.625', whiteSpace: 'pre-line' }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                        Education
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{edu.school}</h3>
                                    <span style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>{edu.startDate} – {edu.endDate}</span>
                                </div>
                                <div style={{ color: '#374151', fontSize: '0.875rem' }}>{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                        Projects
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {data.projects.map((proj, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{proj.name}</h3>
                                    {proj.link && <a href={proj.link} target="_blank" style={{ fontSize: '0.75rem', color: '#3b82f6' }}>{proj.link}</a>}
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', fontWeight: '500' }}>{proj.technologies}</p>
                                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.625' }}>{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && (
                <section>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                        Skills
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {typeof data.skills === 'string' && data.skills.split(',').map((skill, i) => (
                            <span key={i} style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
