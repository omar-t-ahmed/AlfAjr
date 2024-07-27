import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db'; // Ensure this path is correct

export async function GET(req: NextRequest) {
  return await getHabit(req);
}

export async function POST(req: NextRequest) {
  return await createHabit(req);
}

export async function PATCH(req: NextRequest) {
  return await updateHabit(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteHabit(req);
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
    console.error('Failed to fetch habits:', error);
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
    console.error('Failed to update habit:', error);
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
    console.error('Failed to delete habit:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}