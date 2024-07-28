import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db'; // Ensure this path is correct

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return await getHabit(req, params);
}

async function getHabit(req: NextRequest, params: { id: string }) {
  const { id } = params;

  try {
    const habit = await db.habit.findUnique({
      where: { id: Number(id) },
    });

    return habit
      ? NextResponse.json(habit)
      : NextResponse.json({ error: 'Habit not found' }, { status: 404 });
  } catch (error) {
    console.error('Failed to fetch habit:', error);
    return NextResponse.json({ error: 'Failed to fetch habit' }, { status: 500 });
  }
}