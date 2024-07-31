"use client";
import React, { useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
    const [email, setEmail] = useState("");
    const [comments, setComments] = useState("");
    const [supportType, setSupportType] = useState("Comments");
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/support", {
                email,
                supportType,
                description: comments,
                status: "Open", // Initial status
                createdAt: new Date(),
            });
            toast.success("Submission successful!");
            setEmail("");
            setComments("");
        } catch (error) {
            setError(
                "Submission did not go through. Try again later! Or Email hasanhuda037@gmail.com"
            );
            toast.error("Submission failed. Please try again later.");
        }
    };

    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-3xl">Support</div>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md flex flex-col items-center"
                    >
                        <div className="mb-4 w-full">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label
                                htmlFor="supportType"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Type
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md flex justify-between items-center"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                >
                                    {supportType}
                                    <FaChevronDown
                                        className={`ml-2 transition-transform ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onSelect={() =>
                                            setSupportType("Comments")
                                        }
                                    >
                                        Comments
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onSelect={() =>
                                            setSupportType("Suggestions")
                                        }
                                    >
                                        Suggestions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onSelect={() => setSupportType("Bug")}
                                    >
                                        Bug
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="mb-4 w-full">
                            <label
                                htmlFor="comments"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Comments
                            </label>
                            <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                        <div className="text-center mt-2 text-red-500 font-semibold">
                            {error && <p>{error}</p>}
                        </div>
                    </form>
                </div>
            </MaxWidthWrapper>
            <ToastContainer />
        </main>
    );
};

export default Support;
