import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET — returns the portfolio view count for the logged-in user
export async function GET(req) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ views: 0 });

        const token = authHeader.split(' ')[1];
        let userId;
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.userId;
        } catch {
            return NextResponse.json({ views: 0 });
        }

        const resume = await prisma.resume.findFirst({
            where: { userId },
            select: { views: true },
        });

        return NextResponse.json({ views: resume?.views || 0 });
    } catch (error) {
        console.error('Views fetch error:', error);
        return NextResponse.json({ views: 0 });
    }
}

// POST — increments the portfolio view count (called from the portfolio page)
export async function POST(req) {
    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

        const resume = await prisma.resume.findFirst({ where: { userId } });
        if (!resume) return NextResponse.json({ views: 0 });

        const updated = await prisma.resume.update({
            where: { id: resume.id },
            data: { views: resume.views + 1 },
            select: { views: true },
        });

        return NextResponse.json({ views: updated.views });
    } catch (error) {
        console.error('Views increment error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
