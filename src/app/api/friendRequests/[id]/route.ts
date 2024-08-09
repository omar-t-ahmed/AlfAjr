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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const friendRequestId = Number(params.id);
  const { status } = await req.json();

  if (status !== 'ACCEPTED' && status !== 'REJECTED') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const updatedFriendRequest = await db.friend.update({
      where: { id: friendRequestId },
      data: { status: status },
      include: { sender: true, receiver: true },
    });

    if (status === 'ACCEPTED') {
      // Add each other to friends array
      await db.user.update({
        where: { id: updatedFriendRequest.senderId },
        data: {
          friends: {
            push: updatedFriendRequest.receiverId,
          },
        },
      });

      await db.user.update({
        where: { id: updatedFriendRequest.receiverId },
        data: {
          friends: {
            push: updatedFriendRequest.senderId,
          },
        },
      });
    }

    return NextResponse.json(updatedFriendRequest);
  } catch (error) {
    console.error('Failed to update friend request:', error);
    return NextResponse.json({ error: 'Failed to update friend request' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const friendRequestId = Number(params.id);

  try {
    // Fetch the friend request details
    const friendRequest = await db.friend.findUnique({
      where: { id: friendRequestId },
      include: { sender: true, receiver: true },
    });

    if (!friendRequest) {
      return NextResponse.json({ error: 'Friendship not found' }, { status: 404 });
    }

    // Update the sender's friends array by removing the receiver
    await db.user.update({
      where: { id: friendRequest.senderId },
      data: {
        friends: {
          set: friendRequest.sender.friends.filter((friendId: number) => friendId !== friendRequest.receiverId),
        },
      },
    });

    // Update the receiver's friends array by removing the sender
    await db.user.update({
      where: { id: friendRequest.receiverId },
      data: {
        friends: {
          set: friendRequest.receiver.friends.filter((friendId: number) => friendId !== friendRequest.senderId),
        },
      },
    });

    // Finally, delete the friend request record
    await db.friend.delete({
      where: { id: friendRequestId },
    });

    return NextResponse.json({ message: 'Friendship deleted successfully' });
  } catch (error) {
    console.error('Failed to delete friendship:', error);
    return NextResponse.json({ error: 'Failed to delete friendship' }, { status: 500 });
  }
}