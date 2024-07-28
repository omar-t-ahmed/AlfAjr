import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const AllHabis = () => {
    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-4xl mb-6">All Habits</div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default AllHabis;
