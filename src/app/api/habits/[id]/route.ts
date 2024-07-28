import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Ensure this path is correct

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return await getHabit(req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return await deleteHabit(req, params);
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

async function deleteHabit(req: NextRequest, params: { id: string }) {
  const { id } = params;

  try {
    await db.habit.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Failed to delete habit:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}