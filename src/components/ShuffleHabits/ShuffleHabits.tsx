"use client"
import React from 'react'
import { useState } from 'react';

const habits = [
    {
        title: "Recite",
        emoji: "📖",
        goodDeeds: "900,000",
        days: "3 days, 19 hours",
        page: "1 page",
        perDay: "7 days",
        color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
        title: "Do Thikr",
        emoji: "📿",
        goodDeeds: "500,000",
        days: "2 days, 10 hours",
        page: "15 minutes",
        perDay: "5 days",
        color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
        title: "Send Salawat",
        emoji: "💚",
        goodDeeds: "500,000",
        days: "2 days, 10 hours",
        page: "100 salawat",
        perDay: "7 days",
        color: "bg-gradient-to-r from-orange-600 to-amber-300",
    },
    {
        title: "Pray Nafl",
        emoji: "🕌",
        goodDeeds: "500,000",
        days: "2 days, 10 hours",
        page: "12 nafl",
        perDay: "7 days",
        color: "bg-gradient-to-r from-red-900 to-blue-500",
    }
];

const ShuffleHabits = () => {
    const [currentHabit, setCurrentHabit] = useState(habits[0]);
    
    const shuffleHabits = () => {
        const shuffledHabit = habits[Math.floor(Math.random() * habits.length)];
            setCurrentHabit(shuffledHabit);
    };

    return (
    <div className="w-full md:w-[30rem]">
        <div className="grid grid-cols-1 gap-16">
        <div className={`relative p-4 rounded-2xl bg-gradient-to-r from-zinc-500 to-zinc-600 text-white`}>
            <div className="absolute left-0 -top-10 z-40 pl-4">
            <div className="flex flex-row items-start justify-center space-x-2">
                <p className="text-base-content text-[0.85rem] pr-1">Small acts...</p>
                <svg viewBox="0 0 302.816 302.816" xmlns="http://www.w3.org/2000/svg" className="w-[1.3rem] h-8 fill-current text-base-content pb-2">
                <path id="XMLID_6_" d="M298.423,152.996c-5.857-5.858-15.354-5.858-21.213,0l-35.137,35.136
                    c-5.871-59.78-50.15-111.403-112.001-123.706c-45.526-9.055-92.479,5.005-125.596,37.612c-5.903,5.813-5.977,15.31-0.165,21.213
                    c5.813,5.903,15.31,5.977,21.212,0.164c26.029-25.628,62.923-36.679,98.695-29.565c48.865,9.72,83.772,50.677,88.07,97.978
                    l-38.835-38.835c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l62.485,62.485
                    c2.929,2.929,6.768,4.393,10.606,4.393s7.678-1.464,10.607-4.393l62.483-62.482C304.281,168.352,304.281,158.854,298.423,152.996z"/>
                </svg>
            </div>
            </div>
            <h3 className="font-bold mb-2 text-lg">
            <span className="text-xl mr-2">{currentHabit.emoji}</span><span>{currentHabit.title}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
            <div className="bg-zinc-700 rounded-full p-1 pr-2 pl-2">
                <span className="font-semibold mr-0.5">{currentHabit.page}</span>
                <span className="opacity-80">/ day</span>
            </div>

            <div className="bg-zinc-700 rounded-full p-1 pr-2 pl-2">
                <span className="font-semibold mr-0.5">{currentHabit.perDay}</span>
                <span className="opacity-80">/ week</span>
            </div>
            </div>
        </div>
        <div className="relative scale-[1.05]">
            <div className="absolute right-0 -top-10 z-40 pr-12">
            <div className="flex flex-row items-start justify-center space-x-2">
                <svg viewBox="0 0 302.816 302.816" xmlns="http://www.w3.org/2000/svg" className="w-[1.3rem] h-8 fill-current text-base-content pb-2 -scale-x-100">
                    <path d="M298.423,152.996c-5.857-5.858-15.354-5.858-21.213,0l-35.137,35.136
                        c-5.871-59.78-50.15-111.403-112.001-123.706c-45.526-9.055-92.479,5.005-125.596,37.612c-5.903,5.813-5.977,15.31-0.165,21.213
                        c5.813,5.903,15.31,5.977,21.212,0.164c26.029-25.628,62.923-36.679,98.695-29.565c48.865,9.72,83.772,50.677,88.07,97.978
                        l-38.835-38.835c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l62.485,62.485
                        c2.929,2.929,6.768,4.393,10.606,4.393s7.678-1.464,10.607-4.393l62.483-62.482C304.281,168.352,304.281,158.854,298.423,152.996z"/>
                </svg>
                <p className="text-base-content text-sm">Gain HUGE rewards in a year!</p>
            </div>
            </div>
            <div className={`h-full stat p-4 bg-base-300 rounded-2xl gap-2 ${currentHabit.color} text-white`}>
            <div className="stat-value overflow-hidden flex items-end gap-2"><p className="text-3xl">{currentHabit.goodDeeds}</p> <p className="text-m">good deeds</p></div>
            <span className="stat-desc whitespace-normal opacity-100 text-gray-200">I'll read for <span className="value">{currentHabit.days}</span></span>
            </div>
        </div>
        </div>
        <div className="text-center mt-2">
        <button onClick={shuffleHabits} className="btn btn-ghost gap-3 fill-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-spin" viewBox="0 0 448 512">
            {/* SVG path here */}
            </svg>
            Shuffle habits
        </button>
        </div>
    </div>
    );
}

export default ShuffleHabits;