"use client"
import React from 'react'
import { useState } from 'react';

const habits = [
    {
        title: "Recite",
        emoji: "📖",
        goodDeeds: "3,200,150",
        days: "Finish the Qur'an in under a year!",
        page: "18 ayat",
        perDay: "7 days",
        color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
        title: "Do Thikr",
        emoji: "📿",
        total: "3900",
        time: "or 65 hours of dhikr!",
        page: "15 minutes",
        perDay: "5 days",
        thikr: "thikr",
        color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
        title: "Send Salawat",
        emoji: "💚",
        goodDeeds: "365,000",
        days: "365,000 sins removed",
        page: "100 salawat",
        perDay: "7 days",
        color: "bg-gradient-to-r from-orange-600 to-amber-300",
    },
    {
        title: "Pray Nafl",
        emoji: "🕌",
        total: "730",
        time: "or 12 hours of Nafl!",
        page: "2 nafl",
        perDay: "7 days",
        nafl: "nafl",
        color: "bg-gradient-to-r from-red-900 to-blue-500",
    }
];

const ShuffleHabits = () => {
    const [currentHabit, setCurrentHabit] = useState(habits[0])
    
    const shuffleHabits = () => {
        const remainingHabits = habits.filter(habit => habit.title !== currentHabit.title)
        const shuffledHabit = remainingHabits[Math.floor(Math.random() * remainingHabits.length)]

        setCurrentHabit(shuffledHabit)
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
                        {currentHabit.goodDeeds ? (
                            <>
                                <div className="stat-value overflow-hidden flex items-end gap-2">
                                    <p className="text-3xl">{currentHabit.goodDeeds}</p>
                                    <p className="text-m">good deeds</p>
                                </div>
                                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                                    <span className="value">{currentHabit.days}</span>
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="stat-value overflow-hidden flex items-end gap-2">
                                    <p className="text-3xl">{currentHabit.total}</p>
                                    {currentHabit.thikr ? (
                                    <p className="text-m">minutes total</p>
                                    ) : (
                                        <p className="text-m">rakat total</p>
                                    )}
                                </div>
                                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                                    <span className="value">{currentHabit.time}</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-center mt-3 flex items-center justify-around">
            <button onClick={shuffleHabits} className="btn btn-ghost mt-2 p-2 gap-3 bg-gradient-to-r from-slate-700 to-slate-800  rounded-lg flex items-center justify-around hover:!bg-gray-500">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                width="20px"
                height="20px"
                viewBox="0 0 460.303 460.303"
                xmlSpace="preserve"
                className="mr-2"
                >
                <g>
                    <g>
                    <path d="M175.008,244.596c-10.181,15.488-20.962,30.534-33.825,44.067c-30.305,31.879-69.853,40.344-112.522,38.176 c-38.309-1.95-38.121,57.473,0,59.412c80.166,4.072,136.831-30.564,181.944-89.529c-7.429-9.684-14.294-19.438-20.576-28.838 C184.859,260.16,179.857,252.264,175.008,244.596z"/>
                    <path d="M252.401,197.317c4.118,6.475,8.186,12.842,12.289,19.083c7.521-10.384,15.544-20.408,24.572-29.729 c22.79-23.524,48.754-33.19,77.262-35.925c-1.809,2.179-3.565,4.398-5.388,6.566c-10.415,12.377-12.172,29.833,0,42.01 c10.709,10.712,31.574,12.403,42.01,0c16.071-19.093,31.423-38.791,47.494-57.884c10.466-10.519,14.473-28.013,1.519-42.046 l-53.466-57.927c-26.035-28.203-67.943,13.909-42.011,42.01l6.941,7.519c-29.162,2.087-57.243,9.506-83.172,26.359 c-19.372,12.594-35.662,28.779-50.195,46.512c2.919,4.093,5.834,8.252,8.703,12.594 C243.546,183.401,248.045,190.478,252.401,197.317z"/>
                    <path d="M403.151,260.978c-5.032-5.972-12.477-8.678-20.048-8.678c-8.135,0-16.417,3.133-21.962,8.678 c-12.172,12.182-10.415,29.635,0,42.01c1.823,2.169,3.58,4.393,5.388,6.571c-28.508-2.731-54.477-12.405-77.262-35.927 c-12.964-13.381-23.901-28.178-34.17-43.478c-9.952-14.825-19.266-30.128-29.147-45.095c-1.889-2.859-3.829-5.604-5.758-8.371 c-44.32-63.579-99.747-102.961-178.907-102.961c-4.138,0-8.348,0.109-12.619,0.322c-37.501,1.906-38.288,59.455-1.823,59.455 c0.6,0,1.204-0.018,1.823-0.048c4.118-0.208,8.196-0.317,12.248-0.317c37.958,0,72.889,9.693,100.27,38.501 c16.834,17.715,30.118,38.006,43.127,58.514c6.17,9.725,12.284,19.489,18.687,29.066c5.504,8.236,11.212,16.417,17.179,24.395 c17.012,22.729,36.308,43.757,60.271,59.336c25.929,16.854,54.01,24.272,83.172,26.354l-6.941,7.521 c-19.891,21.552,0.117,51.339,22.272,51.339c6.733,0,13.67-2.758,19.738-9.328l53.471-57.925 c12.954-14.035,8.947-31.529-1.519-42.046C434.574,299.763,419.224,280.076,403.151,260.978z"/>
                    </g>
                </g>
                </svg>
                Shuffle Habits
            </button>
            </div>
        </div>
    );
}

export default ShuffleHabits;