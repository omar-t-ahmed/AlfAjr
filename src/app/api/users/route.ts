import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db'; // Ensure this path is correct

export async function GET(req: NextRequest) {
  return await findUser(req);
}

export async function POST(req: NextRequest) {
  return await createUser(req);
}

export async function PATCH(req: NextRequest) {
  return await updateUser(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteUser(req);
}

async function findUser(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const username = searchParams.get('username');
  const email = searchParams.get('email');

  try {
    if (id) {
      const user = await db.user.findUnique({
        where: { id: Number(id) },
      });
      return user ? NextResponse.json(user) : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else if (username) {
      const user = await db.user.findUnique({
        where: { username: username },
      });
      return user ? NextResponse.json(user) : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else if (email) {
      const user = await db.user.findUnique({
        where: { email: email },
      });
      return user ? NextResponse.json(user) : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else {
      const users = await db.user.findMany();
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

async function createUser(req: NextRequest) {
  const { email, totalReward = 0, friends = [] } = await req.json();

  try {
    let baseUsername = email.split('@')[0];
    let username = baseUsername;
    let count = 1;

    // Check if the generated username already exists
    while (await db.user.findUnique({ where: { username: username } })) {
      username = `${baseUsername}${count}`;
      count++;
    }

    const user = await db.user.create({
      data: { email, username, totalReward, friends },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

async function updateUser(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { email, username, totalReward, friends } = await req.json();

  try {
    const user = await db.user.update({
      where: { id: Number(id) },
      data: { email, username, totalReward, friends },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

async function deleteUser(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await db.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}