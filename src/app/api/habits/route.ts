import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db';

export async function handler(req: NextRequest) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getHabit(req);
    case 'POST':
      return await createHabit(req);
    case 'PATCH':
      return await updateHabit(req);
    case 'DELETE':
      return await deleteHabit(req);
    default:
      return NextResponse.json({ error: `Method ${method} Not Allowed` }, { status: 405 });
  }
}

async function getHabit(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const habit = await db.habit.findUnique({
        where: { id: Number(id) },
      });
      return habit ? NextResponse.json(habit) : NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    } else {
      const habits = await db.habit.findMany();
      return NextResponse.json(habits);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 });
  }
}

async function createHabit(req: NextRequest) {
  const { userId, worship, dailyQuantity, unit, reward } = await req.json();
  
  console.log('Incoming data:', { userId, worship, dailyQuantity, unit, reward });

  try {
    const habit = await db.habit.create({
      data: { userId, worship, dailyQuantity, unit, reward },
    });
    console.log('Habit created successfully:', habit);
    return NextResponse.json(habit, { status: 201 });
  } catch (error:any) {
    console.error('Failed to create habit:', error.message, error.stack);
    return NextResponse.json({ error: 'Failed to create habit', details: error.message }, { status: 500 });
  }
}

async function updateHabit(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { worship, dailyQuantity, unit, reward } = await req.json();

  try {
    const habit = await db.habit.update({
      where: { id: Number(id) },
      data: { worship, dailyQuantity, unit, reward },
    });
    return NextResponse.json(habit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}

async function deleteHabit(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    await db.habit.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Habit deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };