import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id); // Convert the string 'id' to a number

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    // Fetch the user to get the friends array
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        friends: true, // Only select the friends array
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If the user has no friends, return an empty array
    if (!user.friends.length) {
      return NextResponse.json([]);
    }

    // Fetch details of all friends using their IDs
    const friends = await db.user.findMany({
      where: {
        id: { in: user.friends },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return NextResponse.json(friends);
  } catch (error) {
    console.error('Failed to fetch friends:', error);
    return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
  }
}