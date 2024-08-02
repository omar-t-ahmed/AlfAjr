// interfaces.ts
export interface Habit {
  id: number;
  userId: number;
  worship: Worship;
  dailyQuantity: number;
  unit: Unit;
  reward: number;
  createdAt: string;
  updatedAt: string;
}

export enum Worship {
  Quran = "Quran",
  Salawat = "Salawat",
  Nafl = "Nafl",
  Thikr = "Thikr",
}

export enum Unit {
  Verse = "Verse",
  Unit = "Unit",
  Minute = "Minute",
}
