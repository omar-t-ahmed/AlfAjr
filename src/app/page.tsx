import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-zinc-900 h-screen text-white">
      <MaxWidthWrapper className="py-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-3xl mb-6">
            Home
          </div>
          <>
          <Link
                  href="/create/habit"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1 bg-green-600",
                  })}
                >
                  {" "}
                  Bismillah Create Habit Now
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
          </>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
