import { NextResponse } from 'next/server';
import { generateStaticPortfolio } from '@/lib/generateStaticPortfolio';

export async function POST(req) {
    try {
        const { githubToken, resumeData, templateId } = await req.json();

        if (!githubToken) {
            return NextResponse.json({ error: 'GitHub token is required' }, { status: 400 });
        }
        if (!resumeData || !resumeData.personalInfo) {
            return NextResponse.json({ error: 'Resume data is required' }, { status: 400 });
        }

        // 1. Verify token & get username
        const userRes = await fetch('https://api.github.com/user', {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github+json' },
        });
        if (!userRes.ok) {
            return NextResponse.json({ error: 'Invalid GitHub token. Please reconnect.' }, { status: 401 });
        }
        const githubUser = await userRes.json();
        const username = githubUser.login;
        const repoName = 'my-portfolio';

        // 2. Generate static HTML
        const htmlContent = generateStaticPortfolio(resumeData, templateId || 'classic');

        // 3. Create or verify repo exists
        let repoExists = false;
        const repoCheckRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github+json' },
        });
        if (repoCheckRes.ok) {
            repoExists = true;
        }

        if (!repoExists) {
            const createRes = await fetch('https://api.github.com/user/repos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: repoName,
                    description: `Portfolio of ${resumeData.personalInfo.fullName || username}`,
                    homepage: `https://${username}.github.io/${repoName}`,
                    private: false,
                    auto_init: true,
                }),
            });
            if (!createRes.ok) {
                const err = await createRes.json();
                return NextResponse.json({ error: `Failed to create repo: ${err.message}` }, { status: 500 });
            }
            // Wait a moment for repo initialization
            await new Promise(r => setTimeout(r, 2000));
        }

        // 4. Push index.html (create or update)
        // First check if file exists to get its SHA
        let fileSha = null;
        const fileCheckRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/index.html`, {
            headers: { 'Authorization': `Bearer ${githubToken}`, 'Accept': 'application/vnd.github+json' },
        });
        if (fileCheckRes.ok) {
            const fileData = await fileCheckRes.json();
            fileSha = fileData.sha;
        }

        const putBody = {
            message: fileSha ? 'Update portfolio' : 'Initial portfolio deployment',
            content: Buffer.from(htmlContent).toString('base64'),
        };
        if (fileSha) putBody.sha = fileSha;

        const putRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/index.html`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putBody),
        });

        if (!putRes.ok) {
            const err = await putRes.json();
            return NextResponse.json({ error: `Failed to push file: ${err.message}` }, { status: 500 });
        }

        // 5. Enable GitHub Pages (main branch, root)
        // Try to enable pages — may already be enabled
        try {
            await fetch(`https://api.github.com/repos/${username}/${repoName}/pages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: { branch: 'main', path: '/' },
                }),
            });
        } catch (e) {
            // Pages might already be enabled — that's ok
        }

        const portfolioUrl = `https://${username}.github.io/${repoName}`;
        const repoUrl = `https://github.com/${username}/${repoName}`;

        return NextResponse.json({
            success: true,
            url: portfolioUrl,
            repoUrl,
            username,
        });

    } catch (error) {
        console.error('Deploy error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
