export const useATSScore = (resumeData) => {

    const calculateScore = (jobDescription = "") => {
        let score = 0;
        let checks = [];

        // 1. Content Length Check
        const totalWords = JSON.stringify(resumeData).split(" ").length;
        if (totalWords > 400 && totalWords < 1200) {
            score += 20;
            checks.push({ passed: true, message: "Optimal word count (400-1200 items)." });
        } else {
            checks.push({ passed: false, message: "Word count should be between 400 and 1200." });
        }

        // 2. Section Check
        const hasSummary = resumeData.personalInfo.summary?.length > 20;
        const hasExperience = resumeData.experience.length > 0;
        const hasEducation = resumeData.education.length > 0;
        const hasSkills = resumeData.skills?.length > 10;

        if (hasSummary && hasExperience && hasEducation && hasSkills) {
            score += 30;
            checks.push({ passed: true, message: "All essential sections present." });
        } else {
            checks.push({ passed: false, message: "Missing one or more essential sections (Summary, Experience, Education, Skills)." });
        }

        // 3. Email Check
        if (resumeData.personalInfo.email && resumeData.personalInfo.email.includes("@")) {
            score += 10;
            checks.push({ passed: true, message: "Professional email included." });
        } else {
            checks.push({ passed: false, message: "Missing valid email." });
        }

        // 4. Action Verbs Check (Simple heuristic)
        const powerfulVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'designed', 'optimized', 'increased'];
        const experienceText = resumeData.experience.map(e => e.description).join(" ").toLowerCase();
        const hasPowerVerbs = powerfulVerbs.some(verb => experienceText.includes(verb));

        if (hasPowerVerbs) {
            score += 20;
            checks.push({ passed: true, message: "Uses strong action verbs." });
        } else {
            checks.push({ passed: false, message: "Weak action verbs. Try: Managed, Led, Developed." });
        }

        // 5. Keyword Match (if JD provided)
        if (jobDescription) {
            // Very simple match
            const jdWords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length > 4);
            const resumeText = JSON.stringify(resumeData).toLowerCase();
            const matches = jdWords.filter(w => resumeText.includes(w));
            const distinctMatches = [...new Set(matches)].length;

            if (distinctMatches > 5) { // Arbitrary threshold
                score += 20;
                checks.push({ passed: true, message: `Matched ${distinctMatches} keywords from JD.` });
            } else {
                checks.push({ passed: false, message: "Low keyword match with Job Description." });
            }
        } else {
            // Give free points if no JD, or separate scoring logic
            score += 20;
            checks.push({ passed: true, message: "Ready for keyword optimization (Paste JD)." });
        }

        return { score, checks };
    };

    return { calculateScore };
};
