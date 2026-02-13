import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { prompt, type, linkedin } = await req.json();

        // Basic validation
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

        let systemInstruction = "";
        let userPrompt = "";

        if (type === 'summary') {
            systemInstruction = "You are an expert resume writer. Generate a professional summary for a resume.";
            userPrompt = `
            Task: Write a professional resume summary for a candidate with the role/title: "${prompt}".
            LinkedIn Profile Context: ${linkedin ? `The user provided this LinkedIn URL: ${linkedin}. (Note: as an AI you cannot browse live URLs, so ignore it if you can't infer context, or assume the user wants content *suitable* for a profile found at that link based on the Job Title "${prompt}")` : "No LinkedIn profile provided."}
            
            Guidelines:
            - Write ONLY the summary text.
            - Do NOT include "Note:", "Here is a summary", or any meta-commentary.
            - Do NOT include placeholders like "[Name]".
            - Keep it concise (4-5 sentences).
            - Focus on impact and skills.
            `;
        } else if (type === 'experience') {
            systemInstruction = "You are an expert resume writer. Improve or generate bullet points for a job description.";
            userPrompt = `
            Task: Generate 3-4 professional bullet points for a job experience entry.
            Job Title/Context: "${prompt}".
            
            Guidelines:
            - Write ONLY the bullet points.
            - Do NOT include any introductory text or notes.
            - Use the STAR method.
            `;
        } else {
            userPrompt = `Generate profesional resume content for: ${prompt}. Output ONLY the content.`;
        }

        const result = await model.generateContent(systemInstruction + "\n\n" + userPrompt);
        const response = await result.response;
        const text = response.text();

        // Basic cleanup
        const cleanText = text.replace(/\*\*/g, '').trim();

        return NextResponse.json({ content: cleanText });

    } catch (error) {
        console.error('AI Generation error:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
