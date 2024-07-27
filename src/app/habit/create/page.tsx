"use client";
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

export type UserNew = {
    uid: string;
    email: string;
};

const CreateHabit = () => {
    const [worship, setWorship] = useState("");
    const [dailyQuantity, setDailyQuantity] = useState<number | string>("");
    const [unit, setUnit] = useState("");
    const [reward, setReward] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<UserNew | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    const handleWorshipChange = (value: string) => {
        setWorship(value);
        setDailyQuantity("");
        setReward(0);

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
            case "Masjid":
                setUnit("Visit");
                break;
            default:
                setUnit("");
        }
    };

    const handleDailyQuantityChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const quantity = parseFloat(e.target.value);
        setDailyQuantity(quantity);

        switch (worship) {
            case "Quran":
                setReward(quantity * 500);
                break;
            case "Salawat":
                setReward(quantity * 10);
                break;
            case "Nafl":
            case "Masjid":
            case "THIKR":
                setReward(quantity * 1);
                break;
            default:
                setReward(0);
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
            const userResponse = await axios.get(
                `/api/users?email=${newUser?.email}`
            );
            const user = userResponse.data;

            if (!user || user.error) {
                setError("User not found");
                return;
            }

            const userId = user.id;

            await axios.post("/api/habits", {
                userId,
                worship,
                dailyQuantity,
                unit,
                reward,
            });
            router.push("/");
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

    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
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
                                        <SelectItem value="Quran">
                                            Quran
                                        </SelectItem>
                                        <SelectItem value="Salawat">
                                            Salawat
                                        </SelectItem>
                                        <SelectItem value="Nafl">
                                            Nafl
                                        </SelectItem>
                                        <SelectItem value="THIKR">
                                            Thikr
                                        </SelectItem>
                                        <SelectItem value="Masjid">
                                            Masjid
                                        </SelectItem>
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
                                        min={0}
                                        max={
                                            worship === "Masjid" ? 6 : undefined
                                        }
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
                            {/* <div>
              <label>Reward: {reward}</label>
            </div> */}
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
            </MaxWidthWrapper>
        </main>
    );
};

export default CreateHabit;
