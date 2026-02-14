export const useATSScore = (resumeData) => {

    const calculateScore = (jobDescription = "") => {
        let score = 0;
        let checks = [];

        // Check if resume has any meaningful content
        const hasName = !!resumeData.personalInfo?.fullName?.trim();
        const hasEmail = resumeData.personalInfo?.email?.includes("@");
        const hasSummary = resumeData.personalInfo?.summary?.length > 20;
        const hasExperience = resumeData.experience?.length > 0;
        const hasEducation = resumeData.education?.length > 0;
        const hasSkills = typeof resumeData.skills === 'string'
            ? resumeData.skills?.trim().length > 10
            : resumeData.skills?.length > 0;
        const hasProjects = resumeData.projects?.length > 0;

        // If the resume is essentially empty, return 0
        const filledSections = [hasName, hasEmail, hasSummary, hasExperience, hasEducation, hasSkills, hasProjects].filter(Boolean).length;
        if (filledSections === 0) {
            return { score: 0, checks: [{ passed: false, message: "Resume is empty. Start filling in your details." }] };
        }

        // 1. Contact Info (15 pts)
        if (hasName && hasEmail) {
            score += 15;
            checks.push({ passed: true, message: "Contact information is complete." });
        } else {
            checks.push({ passed: false, message: "Add your name and email address." });
        }

        // 2. Summary (15 pts)
        if (hasSummary) {
            score += 15;
            checks.push({ passed: true, message: "Professional summary included." });
        } else {
            checks.push({ passed: false, message: "Add a professional summary (at least 20 characters)." });
        }

        // 3. Essential Sections (20 pts)
        if (hasExperience && hasEducation && hasSkills) {
            score += 20;
            checks.push({ passed: true, message: "All essential sections present." });
        } else {
            const missing = [];
            if (!hasExperience) missing.push('Experience');
            if (!hasEducation) missing.push('Education');
            if (!hasSkills) missing.push('Skills');
            checks.push({ passed: false, message: `Missing: ${missing.join(', ')}` });
        }

        // 4. Content Depth (15 pts)
        const totalText = JSON.stringify(resumeData).replace(/[{}\[\]",:\\]/g, ' ');
        const wordCount = totalText.split(/\s+/).filter(w => w.length > 1).length;
        if (wordCount > 100) {
            score += 15;
            checks.push({ passed: true, message: `Good content depth (${wordCount} words).` });
        } else {
            checks.push({ passed: false, message: `Add more detail (${wordCount} words, aim for 100+).` });
        }

        // 5. Action Verbs (15 pts)
        const powerfulVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'designed', 'optimized', 'increased', 'built', 'launched', 'improved', 'delivered', 'achieved'];
        const experienceText = (resumeData.experience || []).map(e => e.description || '').join(" ").toLowerCase();
        const matchedVerbs = powerfulVerbs.filter(verb => experienceText.includes(verb));

        if (matchedVerbs.length >= 2) {
            score += 15;
            checks.push({ passed: true, message: "Uses strong action verbs." });
        } else if (matchedVerbs.length === 1) {
            score += 8;
            checks.push({ passed: false, message: "Use more action verbs: Managed, Led, Developed, Built." });
        } else {
            checks.push({ passed: false, message: "Add action verbs to experience descriptions." });
        }

        // 6. Keyword Match OR Projects bonus (20 pts)
        if (jobDescription) {
            const jdWords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length > 4);
            const resumeText = JSON.stringify(resumeData).toLowerCase();
            const matches = jdWords.filter(w => resumeText.includes(w));
            const distinctMatches = [...new Set(matches)].length;

            if (distinctMatches > 5) {
                score += 20;
                checks.push({ passed: true, message: `Matched ${distinctMatches} keywords from job description.` });
            } else if (distinctMatches > 2) {
                score += 10;
                checks.push({ passed: false, message: `Only ${distinctMatches} keyword matches. Add more relevant terms.` });
            } else {
                checks.push({ passed: false, message: "Low keyword match with job description." });
            }
        } else {
            // No JD provided — award points for having projects and extra completeness
            if (hasProjects) {
                score += 12;
                checks.push({ passed: true, message: "Projects section adds value." });
            }
            if (resumeData.personalInfo?.phone && resumeData.personalInfo?.linkedin) {
                score += 8;
                checks.push({ passed: true, message: "Phone and LinkedIn included." });
            } else {
                checks.push({ passed: false, message: "Add phone number and LinkedIn for better reach." });
            }
        }

        return { score: Math.min(score, 100), checks };
    };

    return { calculateScore };
};
