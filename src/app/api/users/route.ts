import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db';

export async function handler(req: NextRequest) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await findUser(req);
    case 'POST':
      return await createUser(req);
    case 'PATCH':
      return await updateUser(req);
    case 'DELETE':
      return await deleteUser(req);
    default:
      return NextResponse.json({ error: `Method ${method} Not Allowed` }, { status: 405 });
  }
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
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };