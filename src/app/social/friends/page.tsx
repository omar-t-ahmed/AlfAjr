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
    const [successMessage, setSuccessMessage] = useState<string>(""); // State for success message

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
                    onClick={() => handleRemoveFriend(friend.id)}  // Pass friend's ID here
                >
                    Remove
                </button>
            </div>
        ))
    ), [userData?.friends]);

    const handleRemoveFriend = async (friendId: number) => {
        try {
            const response = await axios.delete('/api/friendRequests', {
                data: {
                    currentUserId: userData?.id,
                    friendId: friendId,
                },
            });

            if (response.status === 200) {
                console.log(response.data.message); // Confirm successful removal
    
                // Update the friends list in the userData state
                setUserData(prevUserData => {
                    if (!prevUserData) return null;
    
                    return {
                        ...prevUserData,
                        friends: prevUserData.friends.filter(friend => friend.id !== friendId),
                    };
                });
            } else {
                console.error('Failed to remove friend:', response.data.error);
            }
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
                setSuccessMessage("");  // Clear success message if there was an error
                return;
            }
    
            // Check if senderId and receiverId are the same
            if (userData?.id === receiver.id) {
                setErrorMessage("You cannot send a friend request to yourself.");
                setSuccessMessage("");  // Clear success message if there was an error
                return;
            }
    
            await axios.post('/api/friendRequests', {
                senderId: userData?.id,
                receiverId: receiver.id,
            });
    
            setErrorMessage("");
            setSuccessMessage("Friend request sent successfully!");  // Set success message
            setUsername("");  // Clear the input field after sending the request
            console.log("Friend request sent!");
        } catch (error) {
            console.error("Failed to send friend request:", error);
            setErrorMessage("Failed to send friend request.");
            setSuccessMessage("");  // Clear success message if there was an error
        }
    };

    return (
        <main className="bg-zinc-900 min-h-screen text-white">
            <MaxWidthWrapper className="py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:space-x-8">
                    <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
                        <div className="font-bold text-4xl my-6 text-center">Add Friend</div>
                        <div className="flex space-x-2 p-4 px-12">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                            />
                            <button
                                onClick={handleSendFriendRequest}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Send
                            </button>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
                        )}
                        {successMessage && (
                            <div className="text-green-500 mt-4 text-center">{successMessage}</div>
                        )}

                        <div className="mt-8">
                            <div className="font-bold text-3xl mb-4 text-center">Pending Friend Requests</div>
                            {friendRequests.length > 0 ? (
                                friendRequests.map(request => (
                                    <div 
                                        key={request.id} 
                                        className="flex items-center justify-between mx-10 p-4 mb-4 border border-zinc-800 rounded-lg"
                                    >
                                        <div className="flex items-center">
                                            <ProfilePicture profilePictureNumber={request.sender.profilePicture} />
                                            <span className="ml-4 text-xl">{request.sender.username}</span>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleAcceptFriendRequest(request.id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleDenyFriendRequest(request.id)}
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-yellow-600 text-xl text-center">No pending friend requests.</div>
                            )}
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 flex flex-col items-center">
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
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default FriendsPage;