"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    const [missionCompleted, setMissionCompleted] = useState<number>(0);
    const router = useRouter();
    useEffect(() => {
        if (id) {
            axios
                .get(`/api/habits/${id}`)
                .then((response) => setHabit(response.data))
                .catch((error) =>
                    console.error("Failed to fetch habit:", error)
                );
        }
    }, [id]);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMissionCompleted(event.target.checked ? 1 : 0);
    };

    const handleDelete = (id: number) => {
        axios.delete(`/api/habits/${id}`)
            .then(() => {
                router.push('/habit/view/all');
            })
            .catch(error => {
                console.error('Failed to delete habit:', error);
            });
    };

    if (!habit) {
        return (
            <div className="bg-zinc-900 h-screen text-white">
                <MaxWidthWrapper className="py-16">
                    <div className="text-center text-3xl font-bold">
                        Loading...
                    </div>
                </MaxWidthWrapper>
            </div>
        );
    }

    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-16 flex flex-col items-center">
                <Card className="text-white bg-gradient-to-r from-emerald-500 to-teal-600 w-[325px] md:w-[500px] relative">
                    <CardHeader>
                        <CardTitle className="text-4xl text-center">
                            {habit.worship}
                        </CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="absolute top-2 right-6 text-2xl">
                                    ⋮
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={5}>
                                <DropdownMenuItem onClick={()=>handleDelete(habit.id)}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <span className="font-bold">Daily Quantity:</span>{" "}
                            {habit.dailyQuantity} {habit.unit}
                            {habit.dailyQuantity > 1 ? "s" : ""}
                        </div>
                        {(habit.worship === "Quran" ||
                            habit.worship === "Salawat") && (
                            <div>
                                <div>
                                    <span className="font-bold">
                                        Daily Reward:
                                    </span>{" "}
                                    {habit.reward}
                                </div>
                                <div>
                                    <span className="font-bold">
                                        Yearly Reward:
                                    </span>{" "}
                                    {(habit.reward * 365).toLocaleString()} 🗓️
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={missionCompleted === 1}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Did you do today's mission?
                    </label>
                </div>
                <div className="mt-8 font-bold text-white text-2xl">
                    Streak: {missionCompleted} 🔥
                </div>
                <div className="mt-8 text-zinc-600 text-bold text-xl">
                    Streak Functionality In Development!
                </div>
                <div className="w-screen px-8 flex flex-col items-start"></div>
            </MaxWidthWrapper>
        </main>
    );
};

export default HabitView;