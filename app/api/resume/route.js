import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function getUserFromRequest(req) {
    const headersList = headers();
    // Authorization: Bearer <token> is not standard in browser fetch unless added.
    // But we are using localStorage token in client.
    // Let's expect 'Authorization' header.

    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (e) {
        return null;
    }
}

export async function POST(req) {
    try {
        const userId = await getUserFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        // Check if resume exists
        const existingResume = await prisma.resume.findFirst({
            where: { userId }
        });

        if (existingResume) {
            const updated = await prisma.resume.update({
                where: { id: existingResume.id },
                data: { content: data, updatedAt: new Date() }
            });
            return NextResponse.json(updated);
        } else {
            const created = await prisma.resume.create({
                data: {
                    userId,
                    content: data,
                    title: 'My Resume'
                }
            });
            return NextResponse.json(created);
        }

    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const userId = await getUserFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const resume = await prisma.resume.findFirst({
            where: { userId }
        });

        return NextResponse.json(resume ? { ...resume.content, updatedAt: resume.updatedAt } : null);

    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
