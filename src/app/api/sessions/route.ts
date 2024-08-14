import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create a session
    const session = await prisma.session.create({
      data,
    });

    // Update the streak if the session meets the daily goal
    const habit = await prisma.habit.findUnique({ where: { id: session.habitId } });
    
    if (habit && session.quantity >= habit.dailyQuantity) {
      await prisma.habit.update({
        where: { id: session.habitId },
        data: { streak: habit.streak + 1 },
      });
    }

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const sessions = await prisma.session.findMany({
      where: { userId: Number(userId) },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
