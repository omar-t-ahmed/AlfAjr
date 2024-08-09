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

export async function DELETE(req: NextRequest) {
    const { currentUserId, friendId } = await req.json();

    if (isNaN(friendId) || isNaN(currentUserId)) {
        return NextResponse.json({ error: 'Invalid user or friend ID' }, { status: 400 });
    }

    try {
        // First, delete the friend request
        const deletedFriendRequest = await db.friend.deleteMany({
            where: {
                OR: [
                    {
                        senderId: currentUserId,
                        receiverId: friendId,
                    },
                    {
                        senderId: friendId,
                        receiverId: currentUserId,
                    },
                ],
            },
        });

        if (deletedFriendRequest.count === 0) {
            return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
        }

        // Now, update the current user's friends array by removing the friend
        const currentUser = await db.user.findUnique({
            where: { id: currentUserId },
            select: { friends: true },
        });

        if (!currentUser) {
            return NextResponse.json({ error: 'Current user not found' }, { status: 404 });
        }

        await db.user.update({
            where: { id: currentUserId },
            data: {
                friends: {
                    set: currentUser.friends.filter((id: number) => id !== friendId),
                },
            },
        });

        // Update the friend's friends array by removing the current user
        const friend = await db.user.findUnique({
            where: { id: friendId },
            select: { friends: true },
        });

        if (!friend) {
            return NextResponse.json({ error: 'Friend not found' }, { status: 404 });
        }

        await db.user.update({
            where: { id: friendId },
            data: {
                friends: {
                    set: friend.friends.filter((id: number) => id !== currentUserId),
                },
            },
        });

        return NextResponse.json({ message: 'Friend request deleted and friends list updated successfully' });
    } catch (error) {
        console.error('Failed to delete friend request and update friends:', error);
        return NextResponse.json({ error: 'Failed to delete friend request and update friends' }, { status: 500 });
    }
}