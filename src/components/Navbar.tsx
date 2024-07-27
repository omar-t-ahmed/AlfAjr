"use client";
import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

const logOut = () => {};

const Navbar = () => {
    const [userEmail, setUserEmail] = useState<string | null>("");
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-900 bg-zinc-800 backdrop-blir-lg transition-all text-white">
            <MaxWidthWrapper>
                {/* Title */}
                <div className="flex h-14 items-center justify-between border-b border-zinc-900">
                    <Link
                        href="/"
                        className="flex z-40 font-semibold text-white"
                    >
                        Watch<span className="text-cyan-600">Wise</span>
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        <>
                            {userEmail ? (
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
                                <Link
                                    href="/signin"
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    {" "}
                                    Sign In
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
