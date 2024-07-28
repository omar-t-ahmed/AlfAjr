"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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

    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-4xl my-6 text-green-600">
                        Your Habits
                    </div>
                    {userWithHabits ? (
                        <div>
                            <div className="text-2xl mb-4">
                                Habits for {userWithHabits.username}
                            </div>
                            <ul>
                                {userWithHabits.habits.map((habit) => (
                                    <li key={habit.id} className="mb-2">
                                        <div>Worship: {habit.worship}</div>
                                        <div>
                                            Daily Quantity:{" "}
                                            {habit.dailyQuantity} {habit.unit}
                                            {habit.dailyQuantity > 1 ? "s" : ""}
                                        </div>
                                        {(habit.worship === "Quran" ||
                                            habit.worship === "Salawat") && (
                                            <div>Reward: {habit.reward}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <>
                            <div>Loading...</div>
                            <Link
                                href="/auth/register"
                                className={buttonVariants({
                                    size: "sm",
                                    className:
                                        "bg-green-600 mt-5 sm:flex items-center gap-1",
                                })}
                            >
                                {" "}
                                Register First!
                            </Link>
                        </>
                    )}
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default AllHabits;
