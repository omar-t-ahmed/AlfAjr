// habitService.ts
import { db } from '@/db'; // Ensure this path is correct
import { Unit, Worship } from '@prisma/client';

export function calculateReward(worship: string, dailyQuantity: number): number {
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
