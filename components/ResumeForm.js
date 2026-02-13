'use client';
import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Zap, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ title, children, isOpen, onToggle }) => (
    <div className="border border-gray-200/60 rounded-xl mb-4 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
        <button
            onClick={onToggle}
            className={`w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 transition-colors ${isOpen ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50'}`}
        >
            <span className="flex items-center gap-2">{title}</span>
            {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-5 border-t border-gray-100">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const InputGroup = ({ label, ...props }) => (
    <div className="space-y-1.5">
        {label && <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">{label}</label>}
        <input {...props} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
    </div>
);

const TextAreaGroup = ({ label, onGenerate, ...props }) => (
    <div className="space-y-1.5 col-span-2 relative group">
        <div className="flex justify-between items-center">
            {label && <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">{label}</label>}
            {onGenerate && (
                <button
                    onClick={onGenerate}
                    type="button"
                    className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Zap size={12} className="fill-current" />
                    AI Generate
                </button>
            )}
        </div>
        <textarea {...props} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm min-h-[100px] resize-y" />
    </div>
)

export default function ResumeForm({ data, onChange, onArrayChange, onAddItem, onRemoveItem }) {
    const [openSection, setOpenSection] = useState('personalInfo');
    const [isGenerating, setIsGenerating] = useState(false);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const syntheticEvent = { target: { name: 'photo', value: event.target.result } };
            onChange('personalInfo', syntheticEvent);
        };
        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        const syntheticEvent = { target: { name: 'photo', value: '' } };
        onChange('personalInfo', syntheticEvent);
    };

    const handleAIGenerate = async (type, prompt, field, index = null) => {
        if (!prompt) return alert("Please enter some text first for the AI to enhance.");
        setIsGenerating(true);
        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    type,
                    linkedin: data.personalInfo.linkedin
                }),
            });
            const result = await res.json();
            if (result.content) {
                if (index !== null) {
                    onArrayChange(type === 'experience' ? 'experience' : 'projects', index, field, result.content);
                } else {
                    const syntheticEvent = { target: { name: field, value: result.content } };
                    onChange('personalInfo', syntheticEvent);
                }
            }
        } catch (error) {
            console.error(error);
            alert("AI Generation failed");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-4 p-1">
            {/* Personal Info */}
            <Section
                title="Personal Information"
                isOpen={openSection === 'personalInfo'}
                onToggle={() => toggleSection('personalInfo')}
            >
                {/* Photo Upload */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="relative group">
                        {data.personalInfo.photo ? (
                            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
                                <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-4 ring-gray-100">
                                <Camera size={28} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Photo</label>
                        <div className="flex gap-2">
                            <label className="cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                                Upload Photo
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                            {data.personalInfo.photo && (
                                <button
                                    onClick={removePhoto}
                                    className="px-4 py-2 bg-red-50 text-red-500 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-400">JPG, PNG. Max 2MB.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup label="Full Name" type="text" name="fullName" placeholder="e.g. John Doe" value={data.personalInfo.fullName} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="Job Title" type="text" name="jobTitle" placeholder="e.g. Senior Software Engineer" value={data.personalInfo.jobTitle} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="Email" type="email" name="email" placeholder="e.g. john@example.com" value={data.personalInfo.email} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="Phone" type="text" name="phone" placeholder="e.g. +1 234 567 890" value={data.personalInfo.phone} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="Address" type="text" name="address" placeholder="City, Country" value={data.personalInfo.address} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="LinkedIn" type="text" name="linkedin" placeholder="linkedin.com/in/johndoe" value={data.personalInfo.linkedin} onChange={(e) => onChange('personalInfo', e)} />
                    <InputGroup label="Website" type="text" name="website" placeholder="yourportfolio.com" value={data.personalInfo.website} onChange={(e) => onChange('personalInfo', e)} />
                    <TextAreaGroup
                        label="Professional Summary"
                        name="summary"
                        placeholder="Briefly describe your professional background and goals..."
                        value={data.personalInfo.summary}
                        onChange={(e) => onChange('personalInfo', e)}
                        onGenerate={() => handleAIGenerate('summary', data.personalInfo.jobTitle || "Professional", 'summary')}
                    />
                </div>
            </Section>

            {/* Experience */}
            <Section
                title="Experience"
                isOpen={openSection === 'experience'}
                onToggle={() => toggleSection('experience')}
            >
                {data.experience.map((exp, index) => (
                    <div key={index} className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50/30 relative group hover:border-blue-200 transition-colors">
                        <button
                            onClick={() => onRemoveItem('experience', index)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Job Title" type="text" placeholder="e.g. Software Engineer" value={exp.title} onChange={(e) => onArrayChange('experience', index, 'title', e.target.value)} />
                            <InputGroup label="Company" type="text" placeholder="e.g. Tech Corp" value={exp.company} onChange={(e) => onArrayChange('experience', index, 'company', e.target.value)} />
                            <InputGroup label="Start Date" type="text" placeholder="MM/YYYY" value={exp.startDate} onChange={(e) => onArrayChange('experience', index, 'startDate', e.target.value)} />
                            <InputGroup label="End Date" type="text" placeholder="MM/YYYY or Present" value={exp.endDate} onChange={(e) => onArrayChange('experience', index, 'endDate', e.target.value)} />
                            <TextAreaGroup
                                label="Description"
                                placeholder="Key responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => onArrayChange('experience', index, 'description', e.target.value)}
                                onGenerate={() => handleAIGenerate('experience', exp.title || "Job Title", 'description', index)}
                            />
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => onAddItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 font-medium transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} /> Add Experience
                </button>
            </Section>

            {/* Education */}
            <Section
                title="Education"
                isOpen={openSection === 'education'}
                onToggle={() => toggleSection('education')}
            >
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50/30 relative group hover:border-blue-200 transition-colors">
                        <button
                            onClick={() => onRemoveItem('education', index)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="School" type="text" placeholder="e.g. University of Design" value={edu.school} onChange={(e) => onArrayChange('education', index, 'school', e.target.value)} />
                            <InputGroup label="Degree" type="text" placeholder="e.g. Bachelor of Arts" value={edu.degree} onChange={(e) => onArrayChange('education', index, 'degree', e.target.value)} />
                            <InputGroup label="Start Date" type="text" placeholder="YYYY" value={edu.startDate} onChange={(e) => onArrayChange('education', index, 'startDate', e.target.value)} />
                            <InputGroup label="End Date" type="text" placeholder="YYYY" value={edu.endDate} onChange={(e) => onArrayChange('education', index, 'endDate', e.target.value)} />
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => onAddItem('education', { school: '', degree: '', startDate: '', endDate: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 font-medium transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} /> Add Education
                </button>
            </Section>

            {/* Projects */}
            <Section
                title="Projects"
                isOpen={openSection === 'projects'}
                onToggle={() => toggleSection('projects')}
            >
                {data.projects.map((proj, index) => (
                    <div key={index} className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50/30 relative group hover:border-blue-200 transition-colors">
                        <button
                            onClick={() => onRemoveItem('projects', index)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Project Name" type="text" placeholder="e.g. E-commerce App" value={proj.name} onChange={(e) => onArrayChange('projects', index, 'name', e.target.value)} />
                            <InputGroup label="Technologies" type="text" placeholder="React, Node.js, etc." value={proj.technologies} onChange={(e) => onArrayChange('projects', index, 'technologies', e.target.value)} />
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Link</label>
                                <input type="text" placeholder="https://github.com/..." value={proj.link} onChange={(e) => onArrayChange('projects', index, 'link', e.target.value)} className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                            </div>
                            <TextAreaGroup label="Description" placeholder="What did you build and how?" value={proj.description} onChange={(e) => onArrayChange('projects', index, 'description', e.target.value)} />
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => onAddItem('projects', { name: '', technologies: '', link: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 font-medium transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} /> Add Project
                </button>
            </Section>

            {/* Skills */}
            <Section
                title="Skills"
                isOpen={openSection === 'skills'}
                onToggle={() => toggleSection('skills')}
            >
                <TextAreaGroup label="Skills List" placeholder="e.g. JavaScript, Python, Leadership, Communication (Comma separated)" value={data.skills} onChange={(e) => onChange('skills', e)} />
            </Section>
        </div>
    );
}
