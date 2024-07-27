"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { signUp, googleSignUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            if (password === confirmPassword) {
                try {
                    // Check if user exists
                    const response = await axios.get(
                        `/api/users?email=${email}`
                    );
                    const user = response.data;
                    if (user.error) {
                        // User does not exist, proceed with sign-up
                        await signUp(email, password);
                        // Create new user in the database
                        await axios.post("/api/users", {
                            email,
                            totalReward: 0,
                            friends: [],
                        });
                        router.push("/");
                    } else {
                        setError("Email already in use");
                    }
                } catch (error:any) {
                    // If error occurs in fetching user, create the user
                    if (error.response && error.response.status === 404) {
                        await signUp(email, password);
                        await axios.post("/api/users", {
                            email,
                            totalReward: 0,
                            friends: [],
                        });
                        router.push("/");
                    } else {
                        throw error;
                    }
                }
            } else {
                setError("Passwords don't match");
            }
        } catch (error) {
            setError("Failed to sign up");
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const user = await googleSignUp();
            try {
                // Check if the user exists in the database
                const response = await axios.get(
                    `/api/users?email=${user.email}`
                );
                const dbUser = response.data;
                if (dbUser.error) {
                    // User does not exist, create the user
                    await axios.post("/api/users", {
                        email: user.email,
                        totalReward: 0,
                        friends: [],
                    });
                } else {
                    router.push("/")
                }
            } catch (error: any) {
                // If error occurs in fetching user, create the user
                if (error.response && error.response.status === 404) {
                    await axios.post("/api/users", {
                        email: user.email,
                        totalReward: 0,
                        friends: [],
                    });
                } else {
                    throw error;
                }
            }

            router.push("/");
        } catch (error) {
            setError("Failed to sign in");
        }
    };

    return (
        <main className="bg-zinc-900 h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-4xl mb-6">Register</div>
                    <div className="flex flex-col gap-1 mx-auto ">
                        <input
                            placeholder="Email"
                            className="w-64 mb-0.5 py-1 px-2 rounded-md ring-1 ring-zinc-800 bg-zinc-900"
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            className="w-64 mb-1 py-1 px-2 rounded-md ring-1 ring-zinc-800 bg-zinc-900"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            type="password"
                        />
                        <input
                            placeholder="Confirm Password"
                            className="w-64 mb-1 py-1 px-2 rounded-md ring-1 ring-zinc-800 bg-zinc-900"
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            type="password"
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={handleSignUp}
                                className="mt-2 bg-green-700 hover:bg-green-600/90 rounded-md w-48 text-white py-1.5 font-medium rounded-lg text-sm px-"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleGoogleSignUp}
                                className="-mt-3 text-white w-48  bg-green-600 hover:bg-green-500/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-between mb-2"
                            >
                                <svg
                                    className="mr-2 -ml-1 w-4 h-4"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="google"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                    ></path>
                                </svg>
                                Sign Up with Google
                            </button>
                        </div>
                        <div className="text-center mt-2 text-red-500 font-semibold">
                            {error && <p>{error}</p>}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default Register;
