"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Habit {
    id: number;
    worship: string;
    dailyQuantity: number;
    unit: string;
    reward: number;
}

interface UserWithHabits {
    id: number;
    email: string;
    username: string;
    habits: Habit[];
}

const AllHabits = () => {
    const [userWithHabits, setUserWithHabits] = useState<UserWithHabits | null>(
        null
    );
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchUserWithHabits = async () => {
            if (user?.email) {
                try {
                    const userResponse = await axios.get(`/api/users`, {
                        params: {
                            email: user.email,
                        },
                    });

                    const userId = userResponse.data.id;
                    const userWithHabitsResponse = await axios.get(
                        `/api/users`,
                        {
                            params: {
                                id: userId,
                                includeHabits: true,
                            },
                        }
                    );

                    setUserWithHabits(userWithHabitsResponse.data);
                } catch (error) {
                    console.error("Failed to fetch user or habits:", error);
                }
            }
        };

        fetchUserWithHabits();
    }, [user]);

    const getColor = (worship: string) => {
        switch (worship) {
            case "Quran":
                return "bg-gradient-to-r from-emerald-700 to-teal-800";
            case "Salawat":
                return "bg-gradient-to-r from-orange-800 to-amber-500";
            case "Nafl":
                return "bg-gradient-to-r from-red-900 to-blue-900";
            case "Thikr":
                return "bg-gradient-to-r from-blue-700 to-blue-900";
            case "Masjid":
                return "bg-gradient-to-r from-red-500 to-red-700";
            default:
                return "bg-gradient-to-r from-zinc-500 to-zinc-600";
        }
    };

    const handleCardClick = (id: number) => {
        router.push(`/habit/view/${id}`);
    };

    return (
        <main className="bg-zinc-900 text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-lg my-6 text-green-500 text-center w-[500px]">
                        More Features Coming Very Soon!
                    </div>
                    <div className="font-bold text-4xl my-6 text-green-600">
                        Your <span className="lg:hidden">Daily </span>Habits
                    </div>
                    <Link
                        href="/habit/create"
                        className={buttonVariants({
                            size: "lg",
                            className:
                                "bg-green-600 mt-5 sm:flex items-center gap-1 mb-6",
                        })}
                    >
                        Create New Habit
                        <Plus className="ml-1.5 h-5 w-5" />
                    </Link>
                    {userWithHabits ? (
                        <div className="w-full px-6 sm:px-2">
                            <div className="text-3xl mb-4 text-bold mt-8">
                                <span className="hidden md:flex">
                                    Habits for {userWithHabits.username}
                                </span>
                                {userWithHabits.username === "tsheikh2001" ? (
                                    <div className="text-bold text-blue-500">
                                        Tablighi Edition
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-y-6 ">
                                {userWithHabits.habits.map((habit) => (
                                    <Card
                                        key={habit.id}
                                        className={`text-white ${getColor(
                                            habit.worship
                                        )} transform transition-transform duration-300 hover:scale-105 cursor-pointer ring-4 ring-black`}
                                        onClick={() =>
                                            handleCardClick(habit.id)
                                        }
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-xl text-center">
                                                {habit.worship}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <span className="hidden lg:inline">
                                                    Daily{" "}
                                                </span>
                                                Quantity: {habit.dailyQuantity}{" "}
                                                {habit.unit}
                                                {habit.dailyQuantity > 1
                                                    ? "s"
                                                    : ""}
                                            </div>
                                            {(habit.worship === "Quran" ||
                                                habit.worship ===
                                                    "Salawat") && (
                                                <div>
                                                    <span className="hidden lg:inline">
                                                        Daily{" "}
                                                    </span>
                                                    Reward: {habit.reward}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="h-screen">
                                <div>Loading...</div>
                                <Link
                                    href="/auth/register"
                                    className={buttonVariants({
                                        size: "lg",
                                        className:
                                            "bg-green-600 mt-5 sm:flex items-center gap-1 px-8",
                                    })}
                                >
                                    Yet to Register?
                                </Link>
                            </div>
                        </>
                    )}
                    <div className="text-slate-500 mt-12 w-[400px]">
                        <p>
                            These Rewards are calculated according to narrations
                            recorded in{" "}
                            <span className="font-semibold">
                                Tirmidhi and The Musnad of Imam Ahmad
                            </span>
                            . Estimated rewards is a fun way of estimating your
                            progress, but it is not a serious count. Allah(SWT)
                            alone can accept, reject, or multiply your deeds as
                            He wills, so make sure you have the right intentions
                            and ask Allah(SWT) for the best of His reward.
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default AllHabits;
