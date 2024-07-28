"use client";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

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
            <div
                className={`stat p-6 bg-base-300 rounded-2xl gap-2 ${color} text-white`}
            >
                {(title === "Quran" || title === "Salawat") && goodDeeds ? (
                    <>
                        <div className="stat-value overflow-hidden flex items-end gap-2">
                            <p className="text-3xl">{goodDeeds?.toString()}</p>
                            {goodDeeds == 1 ? (
                                <p className="text-m">good deed a day</p>
                            ) : (
                                <p className="text-m">good deeds a day</p>
                            )}
                        </div>
                        <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                            <span className="value">{`Do this for 365 days and it will be ${(
                                goodDeeds * 365
                            ).toString()} good deeds`}</span>
                        </span>
                    </>
                ) : (
                    <>
                        {title === "THIKR" && goodDeeds ? (
                            <>
                                <div className="stat-value overflow-hidden flex items-end gap-2">
                                    <p className="text-3xl">{goodDeeds}</p>
                                    {goodDeeds == 1 ? (
                                        <p className="text-m">minute a day</p>
                                    ) : (
                                        <p className="text-m">minutes a day</p>
                                    )}
                                </div>
                                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                                    <span className="value">{`Do this for 1 year and it will be ${(
                                        goodDeeds * 365
                                    ).toString()} minutes total`}</span>
                                </span>
                            </>
                        ) : (
                            <>
                                {goodDeeds && (
                                    <>
                                        <div className="stat-value overflow-hidden flex items-end gap-2">
                                            <p className="text-3xl">
                                                {goodDeeds}
                                            </p>
                                            {goodDeeds == 1 ? (
                                                <p className="text-m">
                                                    rakat a day
                                                </p>
                                            ) : (
                                                <p className="text-m">
                                                    rakats a day
                                                </p>
                                            )}
                                        </div>
                                        <span className="stat-desc whitespace-normal opacity-100 text-gray-200">
                                            <span className="value">{`Do this for 1 year and it will be ${(
                                                goodDeeds * 365
                                            ).toString()} rakat total`}</span>
                                        </span>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </MaxWidthWrapper>
    );
};

export default HabitStats;
