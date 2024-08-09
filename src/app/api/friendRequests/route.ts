import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    const { senderId, receiverId } = await req.json();

    try {
        // Check if a friend request already exists
        const existingRequest = await db.friend.findFirst({
        where: {
            senderId: senderId,
            receiverId: receiverId,
        },
        });

        if (existingRequest) {
        return NextResponse.json({ error: 'Friend request already exists' }, { status: 400 });
        }

        const friendRequest = await db.friend.create({
        data: {
            senderId: senderId,
            receiverId: receiverId,
            status: 'PENDING',
        },
        });

        return NextResponse.json(friendRequest, { status: 201 });
    } catch (error) {
        console.error('Failed to create friend request:', error);
        return NextResponse.json({ error: 'Failed to create friend request' }, { status: 500 });
    }
}