'use client';

import React, { useState, useEffect, useMemo } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfilePicture from "@/components/ProfilePicture";
import axios from "axios";
import { useAuth } from "@/lib/useAuth";

interface Friend {
    id: number;
    username: string;
    profilePicture: number;
}

interface FriendRequest {
    id: number;
    sender: Friend;
    status: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    profilePicture: number;
    friends: Friend[];
}

const FriendsPage: React.FC = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");  // State for the input field
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users', {
                    params: {
                        email: user?.email,
                        includeFriends: 'true',
                        includeFriendRequests: 'true', // Fetch friend requests too
                    },
                });

                setUserData(response.data);
                const pendingRequests = response.data.receivedFriendRequests?.filter(
                    (request: FriendRequest) => request.status === "PENDING"
                ) || [];
                setFriendRequests(pendingRequests);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user?.email]);

    const friendsList = useMemo(() => (
        userData?.friends?.map(friend => (
            <div key={friend.id} className="flex items-center justify-between p-2 mb-2 border border-zinc-800 rounded">
                <div className="flex items-center">
                    <ProfilePicture profilePictureNumber={friend.profilePicture} />
                    <span className="ml-4 text-xl">{friend.username}</span>
                </div>
                <button
                    className="bg-red-500 text-white text-sm px-2 py-2 rounded"
                    onClick={() => handleRemoveFriend(friend.id)}  // Use friend.id here
                >
                    Remove
                </button>
            </div>
        ))
    ), [userData?.friends]);

    const handleRemoveFriend = async (friendId: number) => {
        try {
            const response = await axios.delete(`/api/friends/${friendId}`);
    
            // Update the friends list in the userData state
            setUserData(prevUserData => {
                if (!prevUserData) return null;
    
                return {
                    ...prevUserData,
                    friends: prevUserData.friends.filter(friend => friend.id !== friendId),
                };
            });
        } catch (error) {
            console.error('Failed to remove friend:', error);
        }
    };

    const handleAcceptFriendRequest = async (requestId: number) => {
        try {
            const response = await axios.patch(`/api/friendRequests/${requestId}`, {
                status: 'ACCEPTED',
            });

            console.log('Friend request accepted:', response.data);

            setFriendRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));

            setUserData(prevUserData => {
                if (!prevUserData) return null;

                return {
                    ...prevUserData,
                    friends: [...prevUserData.friends, response.data.sender],
                };
            });
        } catch (error) {
            console.error('Failed to accept friend request:', error);
        }
    };

    const handleDenyFriendRequest = async (requestId: number) => {
        try {
            const response = await axios.patch(`/api/friendRequests/${requestId}`, {
                status: 'REJECTED',
            });
            console.log('Friend request denied:', response.data);
            setFriendRequests(friendRequests.filter(req => req.id !== requestId));
        } catch (error) {
            console.error('Failed to deny friend request:', error);
        }
    };

    const handleSendFriendRequest = async () => {
        try {
            const response = await axios.get('/api/users', {
                params: {
                    username: username.trim(),
                },
            });

            const receiver = response.data;

            if (!receiver) {
                setErrorMessage("User not found.");
                return;
            }

            await axios.post('/api/friendRequests', {
                senderId: userData?.id,
                receiverId: receiver.id,
            });

            setErrorMessage("");
            setUsername("");  // Clear the input field after sending the request
            console.log("Friend request sent!");
        } catch (error) {
            console.error("Failed to send friend request:", error);
            setErrorMessage("Failed to send friend request.");
        }
    };

    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col items-center">

                    <div className="mt-8">
                        <div className="font-bold text-3xl mb-4 text-center">Add Friend</div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="p-2 rounded bg-gray-700 text-white"
                        />
                        <button
                            onClick={handleSendFriendRequest}
                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Send Friend Request
                        </button>
                        {errorMessage && (
                            <div className="text-red-500 mt-4">{errorMessage}</div>
                        )}
                    </div>

                    <div className="font-bold text-4xl my-6">Your Friends 😎</div>
                    {loading ? (
                        <div className="text-green-600 text-2xl mt-8 font-semibold">
                            Loading friends...
                        </div>
                    ) : (
                        <>
                            {userData && userData.friends && userData.friends.length > 0 ? (
                                <div className="w-full max-w-md">
                                    <div className="max-h-64 overflow-y-auto p-4 rounded-lg">
                                        {friendsList}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-green-600 text-2xl mt-8 font-semibold">
                                    No friends found.
                                </div>
                            )}

                            <div className="mt-8">
                                <div className="font-bold text-3xl mb-4">Pending Friend Requests</div>
                                {friendRequests.length > 0 ? (
                                    friendRequests.map(request => (
                                        <div key={request.id} className="flex items-center mb-4">
                                            <ProfilePicture profilePictureNumber={request.sender.profilePicture} />
                                            <span className="ml-4 text-xl">{request.sender.username}</span>
                                            <button
                                                className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleAcceptFriendRequest(request.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleDenyFriendRequest(request.id)}
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-yellow-600 text-xl text-center">No pending friend requests.</div>
                                )}
                            </div>

                            {/* Add Friend Request Section */}
                        </>
                    )}
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default FriendsPage;