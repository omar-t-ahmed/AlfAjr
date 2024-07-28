"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface Habit {
  id: number;
  worship: string;
  dailyQuantity: number;
  unit: string;
  reward: number;
}

const HabitView = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/habits/${id}`)
        .then(response => setHabit(response.data))
        .catch(error => console.error('Failed to fetch habit:', error));
    }
  }, [id]);

  if (!habit) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-zinc-900 h-screen text-white">
      <MaxWidthWrapper className="py-16">
        <Card className="text-white bg-gradient-to-r from-emerald-500 to-teal-600">
          <CardHeader>
            <CardTitle className="text-4xl text-center">{habit.worship}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Daily Quantity: {habit.dailyQuantity} {habit.unit}{habit.dailyQuantity > 1 ? "s" : ""}</div>
            {(habit.worship === "Quran" || habit.worship === "Salawat") && (
              <div>Daily Reward: {habit.reward}</div>
            )}
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </main>
  );
};

export default HabitView;