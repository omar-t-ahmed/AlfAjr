'use client';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/useAuth";
import HabitStats from "@/components/HabitStats/HabitStats";

export type UserNew = {
    uid: string;
    email: string;
};

const CreateHabit = () => {
    const [worship, setWorship] = useState("");
    const [dailyQuantity, setDailyQuantity] = useState<number | string>("");
    const [unit, setUnit] = useState("");
    const [reward, setReward] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<UserNew | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    const handleWorshipChange = (value: string) => {
        setWorship(value);
        setDailyQuantity("");
        setReward(1);

        switch (value) {
            case "Quran":
                setUnit("Verse");
                break;
            case "Salawat":
            case "Nafl":
                setUnit("Unit");
                break;
            case "THIKR":
                setUnit("Minute");
                break;
            default:
                setUnit("");
        }
    };

    const handleDailyQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const quantity = value === '' ? '' : parseFloat(value);
        setDailyQuantity(quantity);

        if (typeof quantity === 'number' && !isNaN(quantity)) {
            switch (worship) {
                case "Quran":
                    setReward(quantity * 500);
                    break;
                case "Salawat":
                    setReward(quantity * 10);
                    break;
                case "Nafl":
                case "THIKR":
                    setReward(quantity * 1);
                    break;
                default:
                    setReward(1);
            }
        } else {
            setReward(1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("You must login to save the Habit!");
            return;
        }

        try {
            // Fetch the user details to get the user ID
            const userResponse = await axios.get(`/api/users?email=${newUser?.email}`);
            const fetchedUser = userResponse.data;
            if (!fetchedUser || fetchedUser.error) {
                setError("User not found");
                return;
            }

            const userId = fetchedUser.id;

            await axios.post("/api/habits", {
                userId,
                worship,
                dailyQuantity,
                unit,
                reward,
            });
            router.push("/habit/viewAll");
        } catch (error) {
            setError("Failed to create habit");
            console.error("Failed to create habit", error);
        }
    };

    useEffect(() => {
        if (user) {
            setNewUser({
                uid: user.uid,
                email: user.email ?? "",
            });
        }
    }, [user]);

    const getColor = (worship: string) => {
        switch (worship) {
            case "Quran":
                return "bg-gradient-to-r from-emerald-500 to-teal-600";
            case "Salawat":
                return "bg-gradient-to-r from-orange-600 to-amber-300";
            case "Nafl":
                return "bg-gradient-to-r from-red-900 to-blue-500";
            case "THIKR":
                return "bg-gradient-to-r from-blue-500 to-blue-600";
            case "Masjid":
                return "bg-gradient-to-r from-red-500 to-red-700";
            default:
                return "bg-gradient-to-r from-zinc-500 to-zinc-600";
        }
    };

    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex align-middle justify-around">
                    <div className="flex flex-col items-center">
                    <div className="font-bold text-lg my-6 text-green-500 text-center w-[500px]">
                        More Features Coming Very Soon!
                    </div>
                        <div className="font-bold text-3xl my-8">Create Habit</div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1 mx-auto">
                                <Select onValueChange={handleWorshipChange}>
                                    <SelectTrigger className="w-64 mb-1 py-1 px-2 rounded-md ring-1 ring-zinc-800 bg-zinc-900">
                                        <SelectValue placeholder="Select Worship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Worship</SelectLabel>
                                            <SelectItem value="Quran">Quran</SelectItem>
                                            <SelectItem value="Salawat">Salawat</SelectItem>
                                            <SelectItem value="Nafl">Nafl</SelectItem>
                                            <SelectItem value="THIKR">Thikr</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {worship && (
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            id="dailyQuantity"
                                            value={dailyQuantity}
                                            onChange={handleDailyQuantityChange}
                                            placeholder={`Daily Quantity (${unit})`}
                                            min={1}
                                            step="1"
                                            className="w-64 mb-1 py-1 px-2 rounded-md ring-1 ring-zinc-800 bg-zinc-900"
                                            disabled={!worship}
                                        />
                                        <span className="ml-2">
                                            {unit}
                                            {dailyQuantity !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="mt-6 bg-green-700 hover:bg-green-600/90 rounded-md w-48 text-white py-1.5 font-medium text-sm px-4"
                                    >
                                        Create Habit
                                    </button>
                                </div>
                                {error && (
                                    <div className="text-center mt-2 text-red-500 font-semibold">
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div>
                        {dailyQuantity && (
                            <HabitStats
                                title={worship}
                                emoji="📖"
                                total={(parseFloat(dailyQuantity as string) * 365).toString()}
                                goodDeeds={reward}
                                page={`${dailyQuantity} ${unit}`}
                                perDay="7 days"
                                unit={unit}
                                color={getColor(worship)}
                            />
                        )}
                    </div>
                </div>
                <div className="text-slate-600 mt-12 w-[500px]">
                                <p>
                                    These Rewards are calculated according to
                                    narrations recorded in{" "}
                                    <span className="font-semibold">
                                        Tirmidhi and The Musnad of Imam Ahmad
                                    </span>
                                    . Estimated rewards is a fun way of
                                    estimating your progress, but it is not a
                                    serious count. Allah(SWT) alone can accept,
                                    reject, or multiply your deeds as He wills,
                                    so make sure you have the right intentions
                                    and ask Allah(SWT) for the best of His
                                    reward.
                                </p>
                            </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default CreateHabit;