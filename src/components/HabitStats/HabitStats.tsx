import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';

interface HabitStatsProps {
    title: string;
    emoji: string;
    total?: string;
    goodDeeds?: number;
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
    page,
    perDay,
    unit,
    color,
}) => {
    return (
        <MaxWidthWrapper>
            <div className={`h-full stat p-4 bg-base-300 rounded-2xl gap-2 ${color} text-white`}>
                {(title === 'Quran' || title === 'Salawat') && goodDeeds ? (
                    <>
                        <div className="stat-value overflow-hidden flex items-end gap-2">
                            <p className="text-3xl">{goodDeeds?.toString()}</p>
                            <p className="text-m">good deeds</p>
                        </div>
                        <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                            <span className="value">{`Do this for 365 days and it will be ${(goodDeeds * 365).toString()} good deeds`}</span>
                        </span>
                    </>
                ) : (
                    <>
                    {title === 'Thikr' ? 
                    <>
                        <div className="stat-value overflow-hidden flex items-end gap-2">
                                <p className="text-3xl">{goodDeeds}</p>
                                <p className="text-m">minutes total</p>
                        </div>
                                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                            <span className="value">{`Do this for 365 days and it will be ${(1* 365).toString()}`}</span>
                        </span>
                    </>
                    :
                    <>
                        <div className="stat-value overflow-hidden flex items-end gap-2">
                                <p className="text-3xl">{goodDeeds}</p>
                                    {unit === 'Minute' ? (
                                        <p className="text-m">minutes total</p>
                                        ) : (
                                        <p className="text-m">{unit.toLowerCase()} total</p>
                                )}
                                </div>
                                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                            <span className="value">{`Do this for 1 year and it will be ${(1* 365).toString()} good deeds`}</span>
                        </span>
                    </>
                    }
                    </>
                )}
            </div>
        </MaxWidthWrapper>
    );
};

export default HabitStats;