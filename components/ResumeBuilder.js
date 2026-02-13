'use client';

import React, { useState, useEffect } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { Download, LayoutTemplate } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '@/context/AuthContext';
import { useATSScore } from '@/hooks/useATSScore';
import AnalyticsDashboard from './AnalyticsDashboard';
import TemplateSelector from './TemplateSelector';

const initialData = {
    personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
        linkedin: '',
        website: '',
        photo: '',
    },
    education: [],
    experience: [],
    skills: '',
    projects: [],
};

export default function ResumeBuilder() {
    const { user } = useAuth();
    const [resumeData, setResumeData] = useState(initialData);
    const [templateId, setTemplateId] = useState('modern');
    const { calculateScore } = useATSScore(resumeData);
    const [atsScore, setAtsScore] = useState(0);

    // Calculate score whenever data changes
    useEffect(() => {
        const result = calculateScore();
        setAtsScore(result.score || 75); // Mock score for now if undefined
    }, [resumeData, calculateScore]);

    // Load data from API on mount
    useEffect(() => {
        const fetchResume = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/resume', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data) {
                            if (data.content) setResumeData(data.content);
                            if (data.templateId) setTemplateId(data.templateId);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch", error);
                }
            } else {
                // Load from local storage for guests
                const saved = localStorage.getItem('resumeData');
                if (saved) setResumeData(JSON.parse(saved));
            }
        };
        fetchResume();
    }, [user]);

    // Save to local storage on change (for guest persistence)
    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);


    const handleInputChange = (section, e) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            if (section === 'skills') {
                return { ...prev, skills: value };
            }
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            };
        });
    };

    const handleArrayChange = (section, index, field, value) => {
        setResumeData(prev => {
            const newArray = [...prev[section]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [section]: newArray };
        });
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const saveData = async () => {
        if (!user) return alert("Please login to save to cloud.");
        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ content: resumeData, templateId }) // Send templateId
            });
            if (res.ok) alert('Saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        }
    };

    const downloadPDF = async () => {
        const element = document.getElementById('resume-preview');
        if (!element) {
            alert('Resume preview not found');
            return;
        }

        try {
            // === IFRAME ISOLATION STRATEGY ===
            // Tailwind v4 uses modern CSS color functions (lab, oklch) in global styles
            // applied via universal selectors (*, ::before, ::after).
            // html2canvas cannot parse these. Even cloning + stripping classes doesn't work
            // because the browser still computes styles from the parent document's stylesheets.
            // Solution: Render the clone inside an IFRAME with ZERO stylesheets.

            // 1. Create a hidden iframe
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.top = '-10000px';
            iframe.style.left = '-10000px';
            iframe.style.width = '900px';
            iframe.style.height = '1200px';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            // 2. Wait for the iframe to load
            await new Promise(resolve => {
                iframe.onload = resolve;
                // Some browsers fire onload immediately for about:blank
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                    resolve();
                }
            });

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            // 3. Clone the resume element
            const clone = element.cloneNode(true);
            clone.removeAttribute('id'); // Avoid duplicate IDs

            // 4. Write clean HTML into the iframe — NO Tailwind, NO external stylesheets
            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        /* Reset — safe colors only, no lab/oklch */
                        *, *::before, *::after {
                            box-sizing: border-box;
                            margin: 0;
                            padding: 0;
                            border-width: 0;
                            border-style: solid;
                            border-color: #e5e7eb;
                        }
                        body {
                            background: #ffffff;
                            color: #1f2937;
                            font-family: Arial, sans-serif;
                            -webkit-font-smoothing: antialiased;
                        }
                        /* SVG icon defaults */
                        svg { display: inline-block; vertical-align: middle; }
                    </style>
                </head>
                <body></body>
                </html>
            `);
            iframeDoc.close();

            // 5. Append clone into the iframe body
            iframeDoc.body.appendChild(clone);

            // 6. Use html2canvas on the clone INSIDE the iframe
            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                windowWidth: 900,
                windowHeight: 1200,
            });
            const imgData = canvas.toDataURL('image/png');

            // 7. Remove the iframe
            document.body.removeChild(iframe);

            // 8. Generate PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save('resume.pdf');
        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-12">

            {/* Analytics Overview */}
            <AnalyticsDashboard atsScore={atsScore} views={user ? 124 : 0} />

            {/* Action Bar */}
            <header className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-sm sticky top-4 z-40 bg-white/80">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Editor
                    </h1>
                    <TemplateSelector currentTemplate={templateId} onSelect={setTemplateId} />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={saveData}
                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        Save
                    </button>
                    <a
                        href="/portfolio"
                        target="_blank"
                        className="px-5 py-2.5 bg-purple-50 text-purple-700 font-medium rounded-xl hover:bg-purple-100 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <LayoutTemplate size={18} />
                        Portfolio
                    </a>
                    <button
                        onClick={downloadPDF}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                    >
                        <Download size={18} />
                        PDF
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex flex-col lg:flex-row gap-8 items-start relative">

                {/* Editor Panel - Flow Naturally */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <ResumeForm
                            data={resumeData}
                            onChange={handleInputChange}
                            onArrayChange={handleArrayChange}
                            onAddItem={addItem}
                            onRemoveItem={removeItem}
                        />
                    </div>
                </div>

                {/* Preview Panel - Sticky */}
                <div className="w-full lg:w-1/2 sticky top-24">
                    <div className="bg-gray-100/50 rounded-2xl border border-gray-200/50 flex items-center justify-center p-8 relative min-h-[800px]">
                        <div className="absolute inset-0 pattern-grid-lg opacity-5"></div>
                        <div className="scale-[0.85] origin-top transform transition-transform duration-300">
                            <div className="shadow-2xl">
                                <ResumePreview data={resumeData} templateId={templateId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
