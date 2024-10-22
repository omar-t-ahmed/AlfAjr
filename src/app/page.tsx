import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ShuffleHabits from "@/components/ShuffleHabits/ShuffleHabits";

export default function Home() {
    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="space-y-24 md:space-y-48 px-4">
                    <section className="flex flex-col md:flex-row gap-24 md:pt-24">
                        <div className="space-y-6 md:space-y-10 md:w-3/5">
                            <h1 className="font-black text-5xl">
                            The most beloved deed to Allah
                            <span className="text-green-600 font-black text-xl ml-2"> is the most regular and constant even if it were little.</span>
                            </h1>
                            <p className="text-zinc-600 text-lg text-center mr-20 !mt-5">Sahih al-Bukhari 6464</p>
                            <p className="text-base-content/90 md:text-lg">
                                Discover how much you will achieve in a year
                                with our free calculator!
                            </p>
                            <>
                                <Link
                                    href="/habit/create"
                                    className={buttonVariants({
                                        size: "lg",
                                        className:
                                            "bg-green-600 sm:flex items-center gap-1",
                                    })}
                                >
                                    {" "}
                                    Build Habit Now
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </Link>
                            </>
                        </div>
                        <ShuffleHabits />
                    </section>
                    <section className="space-y-4 md:text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold">
                            Over 80% of Habits Fail
                        </h2>
                        <p className="text-base-content/90">
                            Discover how far you can go in 2024 with AlfAjr. Set
                            clear goals. Maintain realistic standards. Achieve
                            more.
                        </p>
                    </section>
                    <section className="flex flex-col md:flex-row gap-16 pb-5">
                        <div className="space-y-6 lg:w-2/5">
                            <div>
                                <span className="text-accent uppercase tracking-wide font-bold text-sm md:text-base">
                                    Visualize your success
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
                                    Beat procrastination
                                </h2>
                            </div>
                            <p className="text-base-content/90">
                                AlfAjr suggests good habits to pick in 2024.
                                Discover how habits compound over 1 year, or 10
                                years to be motivated to start!
                            </p>
                            <Link
                                href="/habit/create"
                                className={buttonVariants({
                                    size: "sm",
                                    className:
                                        "bg-green-600 sm:flex items-center gap-1",
                                })}
                            >
                                Build my habits grid
                                <ArrowRight className="ml-1.5 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:w-3/5 mx-auto">
                            <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                                    <div className="inline text-lg mr-2">
                                        📖
                                    </div>
                                    Read Quran
                                </span>
                                <span className="stat-value overflow-hidden text-xl"></span>
                                <div>
                                    <span className="stat-desc whitespace-normal opacity-100 text-gray-200 text-sm">
                                        I'll read 2 pages every day until I
                                        finish the entire Quran.
                                    </span>
                                </div>
                            </div>
                            <div className="h-full stat p-4 pb-2 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                                    <div className="inline text-lg mr-2">
                                        📿
                                    </div>
                                    Make Thikr
                                </span>
                                <span className="stat-value overflow-hidden text-xl"></span>
                                <div>
                                    <span className="stat-desc whitespace-normal opacity-100 text-gray-200 text-sm">
                                        I'll dedicate 10 minutes every day to
                                        make thikr and remember Allah (SWT).
                                    </span>
                                </div>
                            </div>
                            <div className="h-full stat p-4 pb-2 bg-base-300 rounded-2xl gap-2 col-span-2 bg-gradient-to-r from-red-900 to-blue-500 text-white">
                                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                                    <div className="inline text-lg mr-2">
                                        🕌
                                    </div>
                                    Pray Nafl
                                </span>
                                <span className="stat-value overflow-hidden text-xl"></span>
                                <div>
                                    <span className="stat-desc whitespace-normal opacity-100 text-gray-200 text-sm">
                                        I'll pray 2 rakat of nafl in the morning
                                        and 2 rakat in the evening until I have
                                        prayed 100 nafl.
                                    </span>
                                </div>
                            </div>
                            <div className="h-full stat p-4 pb-2 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-orange-600 to-amber-300 text-white">
                                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                                    <div className="inline text-lg mr-2">
                                        💚
                                    </div>
                                    Send Salawat
                                </span>
                                <span className="stat-value overflow-hidden text-xl"></span>
                                <div>
                                    <span className="stat-desc whitespace-normal opacity-100 text-gray-200 text-sm">
                                        I'll set a goal of sending 50 Salawat
                                        every day.
                                    </span>
                                </div>
                            </div>
                            <div className="h-full stat p-4 pb-2 bg-base-300 rounded-2xl gap-2 lg:col-span-2 lg:col-start-2 bg-gradient-to-r from-rose-500 to-violet-400 text-white">
                                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                                    <div className="inline text-lg mr-2">
                                        📜
                                    </div>
                                    Recite Athkar
                                </span>

                                <div>
                                    <span className="stat-desc whitespace-normal opacity-100 text-gray-200 text-sm">
                                        I'll recite my morning and evening
                                        athkar every day.
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-full text-center text-sm md:order-first md:text-left">
                                Habits Grid example
                            </div>
                        </div>
                    </section>
                </div>
            </MaxWidthWrapper>
        </main>
    );
}
