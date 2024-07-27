import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-zinc-900 h-screen text-white">
      <MaxWidthWrapper className="py-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-3xl">
            Home
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
