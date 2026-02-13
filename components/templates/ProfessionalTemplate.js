import React from 'react';

export default function ProfessionalTemplate({ data }) {
    return (
        <div id="resume-preview" style={{ backgroundColor: '#ffffff', color: '#1f2937', height: '100%', padding: '2rem', fontFamily: 'serif' }}>
            {/* Header - Centered */}
            <header style={{ textAlign: 'center', borderBottom: '2px solid #d1d5db', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '0.25rem' }}>
                    {data.personalInfo.fullName}
                </h1>
                {data.personalInfo.jobTitle && (
                    <p style={{ fontSize: '1.125rem', color: '#374151', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                        {data.personalInfo.jobTitle}
                    </p>
                )}
                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section style={{ marginBottom: '1.5rem', textAlign: 'center', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
                    <p style={{ color: '#374151', lineHeight: '1.625', fontStyle: 'italic' }}>{data.personalInfo.summary}</p>
                </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', borderBottom: '1px solid #111827', paddingBottom: '0.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Professional Experience
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                                        <h3>{exp.title}</h3>
                                        <span>{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div style={{ color: '#374151', fontWeight: '600', marginBottom: '0.5rem' }}>{exp.company}</div>
                                    <ul style={{ listStyleType: 'disc', listStylePosition: 'outside', marginLeft: '1rem', fontSize: '0.875rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        {exp.description.split('\n').map((line, idx) => (
                                            line.trim() && <li key={idx}>{line.replace(/^[•-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', borderBottom: '1px solid #111827', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
                            Education
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{edu.school}</h3>
                                        <div style={{ color: '#374151', fontSize: '0.875rem', fontStyle: 'italic' }}>{edu.degree}</div>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: '500' }}>{edu.startDate} – {edu.endDate}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Section - Using flex because grid might be tricky for simple printing if not supported well, but grid is standard now. Keeping grid. */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', borderBottom: '1px solid #111827', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
                                Key Projects
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {data.projects.map((proj, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                            <h3 style={{ fontWeight: 'bold', color: '#111827', fontSize: '0.875rem' }}>{proj.name}</h3>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: '1.625' }}>{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && (
                        <section>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', borderBottom: '1px solid #111827', paddingBottom: '0.25rem', marginBottom: '1rem' }}>
                                Skills
                            </h2>
                            <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.625' }}>
                                {typeof data.skills === 'string' ? data.skills : ''}
                            </p>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
