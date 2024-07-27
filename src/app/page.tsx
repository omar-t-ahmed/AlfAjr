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
            <div className="space-y-6 md:space-y-10">
              <h1 className="font-black text-5xl">
                Discover the power of small acts
              </h1>
              <p className="text-base-content/90 md:text-lg">
                Discover how much you will achieve in a year with our free calculator!
              </p>
              <>
                <Link
                    href="/habit/create"
                    className={buttonVariants({
                      size: "sm",
                      className: "bg-green-600 sm:flex items-center gap-1",
                    })}
                  >
                    {" "}
                    Bismillah Create Habit Now
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
              </>
            </div>
            <ShuffleHabits/>
          </section>
          <section className="space-y-4 md:text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">Over 80% of Habits Fail</h2>
            <p className="text-base-content/90">Discover how far you can go in 2024 with AlfAjr. Set clear goals. Maintain realistic standards. Achieve more.</p>
          </section>
          <section className="flex flex-col md:flex-row gap-16 pb-5">
            <div className="space-y-6 lg:w-2/5">
              <div>
                <span className="text-accent uppercase tracking-wide font-bold text-sm md:text-base">Visualize your success</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Beat procrastination</h2>
              </div>
              <p className="text-base-content/90">AlfAjr suggests good habits to pick in 2024. Discover how habits compound over 1 year, or 10 years to be motivated to start!</p>
              <Link
                href="/app"
                className={buttonVariants({
                  size: "sm",
                  className: "bg-green-600 sm:flex items-center gap-1",
                })}
              >
                Build my habits grid
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:w-3/5">
              <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                  <div className="inline text-lg mr-2">📚</div>Read
                </span>
                <span className="stat-value overflow-hidden">18 <span className="unit">books</span></span>
                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">I'll read for <span className="value">3 days, 19 hours</span></span>
              </div>
              <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                  <div className="inline text-lg mr-2">💦</div>Workout
                </span>
                <span className="stat-value overflow-hidden">62.4k <span className="unit">calories</span></span>
                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">Or <span className="value">116</span> Big Macs 🍔 I'll workout for <span className="value">4 days, 8 hours</span></span>
              </div>
              <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 col-span-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                  <div className="inline text-lg mr-2">🇬🇧</div>Learn Language
                </span>
                <span className="stat-value overflow-hidden">2.81k <span className="unit">new words</span></span>
                <span className="stat-desc whitespace-normal opacity-100 text-gray-200"><span className="value">94%</span> of what's needed to carry everyday conversations</span>
              </div>
              <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                  <div className="inline text-lg mr-2">👟</div>Walk
                </span>
                <span className="stat-value overflow-hidden">364k <span className="unit">steps</span></span>
                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">Or <span className="value">277</span> km. That's <span className="value">838</span> Eiffel Tower 🗼</span>
              </div>
              <div className="h-full stat p-4 bg-base-300 rounded-2xl gap-2 lg:col-span-2 lg:col-start-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                <span className="stat-title font-semibold uppercase whitespace-normal leading-3 text-sm opacity-100 text-gray-100">
                  <div className="inline text-lg mr-2">🎸</div>Learn Instrument
                </span>
                <span className="stat-value overflow-hidden">2 days <span className="unit">(52 hours)</span></span>
                <span className="stat-desc whitespace-normal opacity-100 text-gray-200">Or <span className="value">108</span>% of the time Mozart took to write Linz symphony</span>
              </div>
              <div className="col-span-full text-center text-sm md:order-first md:text-left">Habits Grid example for 2024</div>
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}