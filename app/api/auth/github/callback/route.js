import { NextResponse } from 'next/server';

// GitHub OAuth callback — exchanges the code for an access token
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.redirect(new URL('/portfolio?github_error=no_code', req.url));
        }

        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return NextResponse.redirect(new URL('/portfolio?github_error=not_configured', req.url));
        }

        // Exchange code for access token
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });

        const tokenData = await tokenRes.json();

        if (tokenData.error || !tokenData.access_token) {
            console.error('GitHub OAuth error:', tokenData);
            return NextResponse.redirect(new URL('/portfolio?github_error=token_failed', req.url));
        }

        // Redirect back to portfolio with the token as a hash param (not in URL query for safety)
        // We use a temporary page that stores the token in localStorage then redirects
        const html = `<!DOCTYPE html><html><head><title>Connecting GitHub...</title></head><body>
        <script>
            localStorage.setItem('github_token', '${tokenData.access_token}');
            window.location.href = '/portfolio?github_connected=true';
        </script>
        <p>Connecting your GitHub account...</p></body></html>`;

        return new NextResponse(html, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error) {
        console.error('GitHub callback error:', error);
        return NextResponse.redirect(new URL('/portfolio?github_error=server_error', req.url));
    }
}
