'use client'
import React from 'react'

interface HabitStatsProps {
    title: string;
    emoji: string;
    total?: string;
    goodDeeds?: string;
    days: string;
    page: string;
    perDay: string;
    unit: string;
    color: string;
}

const HabitStats: React.FC<HabitStatsProps> = ({
    title,
    emoji,
    total,
    goodDeeds,
    days,
    page,
    perDay,
    unit,
    color,
}) => {
    return (
    <div className={`h-full stat p-4 bg-base-300 rounded-2xl gap-2 ${color} text-white`}>
        {goodDeeds ? (
            <>
            <div className="stat-value overflow-hidden flex items-end gap-2">
                <p className="text-3xl">{goodDeeds}</p>
                <p className="text-m">good deeds</p>
            </div>
            <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                <span className="value">{days}</span>
            </span>
            </>
        ) : (
            <>
            <div className="stat-value overflow-hidden flex items-end gap-2">
                <p className="text-3xl">{total}</p>
                {unit === 'Minute' ? (
                <p className="text-m">minutes total</p>
                ) : (
                <p className="text-m">{unit.toLowerCase()} total</p>
                )}
            </div>
            <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                <span className="value">{days}</span>
            </span>
            </>
        )}
        </div>
    );
};

export default HabitStats;