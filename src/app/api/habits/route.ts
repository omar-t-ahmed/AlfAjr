function calculateReward(worship: string, dailyQuantity: number): number {
  let reward = 1;
  console.log(worship);
  console.log(dailyQuantity);
  if (!isNaN(dailyQuantity)) {
    switch (worship) {
      case "Quran":
        reward = dailyQuantity * 500;
        break;
      case "Salawat":
        reward = dailyQuantity * 10;
        break;
      case "Nafl":
      case "Thikr":
        reward = dailyQuantity * 1;
        break;
      default:
        reward = 1;
    }
  }
  return reward;
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Ensure this path is correct
import { Unit, Worship } from '@prisma/client';

export async function GET(req: NextRequest) {
  return await getHabit(req);
}

// Removing the POST request because we no longer create habit, and instead have it by default
// export async function POST(req: NextRequest) {
//   return await createHabit(req);
// }
//you can still create a POST request just not the createHabit function

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

export async function createHabit(data: { userId: number; worship: Worship; dailyQuantity: number; unit: Unit }) {
  const { userId, worship, dailyQuantity, unit } = data;
  const reward = calculateReward(worship, dailyQuantity);

  console.log('Incoming data:', { userId, worship, dailyQuantity, unit, reward });

  try {
    const habit = await db.habit.create({
      data: { userId, worship, dailyQuantity, unit, reward },
    });
    console.log('Habit created successfully:', habit);
    return habit;
  } catch (error: any) {
    console.error('Failed to create habit:', error.message, error.stack);
    throw new Error('Failed to create habit');
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const habit = await createHabit(data);
    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.error('Failed to create habit:', error);
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 });
  }
}

async function updateHabit(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { worship, dailyQuantity, unit } = await req.json();
  const reward = calculateReward(worship, dailyQuantity);

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