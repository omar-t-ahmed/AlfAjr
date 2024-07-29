import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DeveloperCard from "@/components/DeveloperCard";
import React from "react";
import { developers } from "@/lib/data";

const Developers = () => {
  return (
    <main className="bg-zinc-900 text-white">
      <MaxWidthWrapper className="py-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-4xl my-8">Developers</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-[128px] mt-16">
            {developers.map((developer) => (
              <DeveloperCard key={developer.name} {...developer} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Developers;