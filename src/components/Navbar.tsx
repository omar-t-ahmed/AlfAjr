"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { logOut } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-900 bg-zinc-800 backdrop-blir-lg transition-all text-white">
            <MaxWidthWrapper>
                {/* Title */}
                <div className="flex h-14 items-center justify-between border-b border-zinc-900">
                    <Link href="/" className="flex z-40 font-bold text-white">
                        ALF<span className="text-green-600">AJR</span>
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        <>
                            {/* ternary */}
                            {user ? (
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
