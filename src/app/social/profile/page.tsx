'use client';
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import placeholder from '../../../../public/placeholder.jpg'
import pfp1 from "../../../../public/female-pfp-1.jpg";
import pfp2 from "../../../../public/female-pfp-2.jpg";
import pfp3 from "../../../../public/female-pfp-3.jpg";
import pfp4 from "../../../../public/male-pfp-1.jpg";
import pfp5 from "../../../../public/male-pfp-2.jpg";
import pfp6 from "../../../../public/male-pfp-3.jpg";

interface UserProfile {
    id: number;
    email: string;
    username: string;
    profilePicture: number;
}

const Profile = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [newUsername, setNewUsername] = useState("");
    const [selectedPicture, setSelectedPicture] = useState(0);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.email) {
                try {
                    const response = await axios.get(`/api/users`, {
                        params: {
                            email: user.email,
                        },
                    });
                    setUserProfile(response.data);
                    setNewUsername(response.data.username);
                    setSelectedPicture(response.data.profilePicture);
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const profilePictures = [placeholder, pfp1, pfp2, pfp3, pfp4, pfp5, pfp6];

    const handleUpdateProfile = async () => {
        if (userProfile) {
            const id = userProfile.id
            try {
                await axios.patch(`/api/users?id=${id}`, {
                    username: newUsername,
                    profilePicture: selectedPicture,
                });
                toast.success("Succesfully updated profile!");
            } catch (error) {
                console.error("Failed to update profile:", error);
            }
        }
    };

    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center bg-zinc-900 my-10">
                    {/* <div className="font-bold text-4xl mb-6 text-green-600">
                        Your Profile
                    </div> */}
                        <Card className="w-full px-6 sm:px-2 bg-zinc-800 !border-none">
                            <CardHeader>
                                <CardTitle className="text-xl text-center text-white">
                                    Profile Picture
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center">
                                    <div className="mb-4">
                                        <Image
                                            src={profilePictures[selectedPicture]}
                                            alt="Profile Picture"
                                            className="rounded-full"
                                            width={128}
                                            height={128}
                                        />
                                    </div>
                                    <div className="flex flex-wrap justify-center mb-4">
                                        {profilePictures.slice(1).map((pic, index) => (
                                            <Image
                                                key={index}
                                                src={pic}
                                                alt={`Profile Option ${index + 1}`}
                                                className="rounded-full cursor-pointer mx-2"
                                                width={64}
                                                height={64}
                                                onClick={() => setSelectedPicture(index + 1)}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-center mb-4">
                                        <label htmlFor="username" className="mb-2 text-white">Username:</label>
                                        <input
                                            id="username"
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="text-white bg-zinc-700 p-2 rounded text-center"
                                            placeholder="New Username"
                                        />
                                    </div>
                                    <button
                                        onClick={handleUpdateProfile}
                                        className={buttonVariants({
                                            size: "lg",
                                            className: "bg-green-600 mt-5 sm:flex items-center gap-1 mb-6",
                                        })}
                                    >
                                        Update Profile
                                    </button>
                                    <ToastContainer />
                                </div>
                            </CardContent>
                        </Card>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default Profile;