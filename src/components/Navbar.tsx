"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { logOut } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";
import Image from "next/image";
import logo from "../../public/alfajr-logo.png";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-900 bg-zinc-800 backdrop-blur-lg transition-all text-white">
            <MaxWidthWrapper>
                {/* Title */}
                <div className="flex h-14 items-center justify-between border-b border-zinc-900">
                    <div className="flex justify-center items-center">
                        <Image
                            src={logo}
                            className="hidden sm:block h-5 w-5"
                            alt="Logo"
                        />
                        {/* hidden by default sm md lg xl*/}
                        <Link
                            href="/"
                            className="flex z-40 pl-2 pt-0.5 text-xl font-bold text-white"
                        >
                            ALF<span className="text-green-600">AJR</span>
                        </Link>
                    </div>
                    <div className="h-full flex items-center space-x-4">
                        <>
                            {/* ternary */}
                            {user ? (
                                <>
                                    <button
                                        onClick={logOut}
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        {" "}
                                        Sign out
                                    </button>
                                    <Link
                                        href="/social/friends"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                            className:
                                                " hidden sm:flex items-center ",
                                        })}
                                    >
                                        {" "}
                                        Friends
                                    </Link>
                                    <Link
                                        href="/social/leaderboard"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        {" "}
                                        Leaderboard
                                    </Link>
                                    <Link
                                        href="/habit/create"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                            className:
                                                "hidden sm:flex items-center ",
                                        })}
                                    >
                                        {" "}
                                        Create Habit
                                    </Link>
                                    <Link
                                        href="/habit/view/all"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                            className:
                                                "flex sm:hidden items-center ",
                                        })}
                                    >
                                        {" "}
                                        Habits
                                    </Link>
                                    <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                                    <Link
                                        href="/habit/view/all"
                                        className={buttonVariants({
                                            size: "sm",
                                            className:
                                                " hidden md:flex items-center gap-1 ",
                                        })}
                                    >
                                        {" "}
                                        View Your Habits
                                        <ArrowRight className="ml-1.5 h-5 w-5" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/register"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        {" "}
                                        Register
                                    </Link>
                                    <Link
                                        href="/auth/login"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        {" "}
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
