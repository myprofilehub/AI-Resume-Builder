import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

export default function ResumePreview({ data, templateId = 'modern' }) {

    // Render the selected template
    if (templateId === 'modern') return <ModernTemplate data={data} />;
    if (templateId === 'professional') return <ProfessionalTemplate data={data} />;

    // Default/Fallback to Minimal
    return <MinimalTemplate data={data} />;
}
