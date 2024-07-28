import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const page = () => {
    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-4xl my-6">Global Leaderboard 🌎</div>
                    <div className="text-green-600 text-2xl mt-8 font-semibold">Coming Soon...</div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default page;
