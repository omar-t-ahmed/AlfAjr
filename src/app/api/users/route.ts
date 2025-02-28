import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // Ensure this path is correct
import { Unit, Worship } from "@prisma/client";
import { createHabit } from "../habits/habitService";

export async function GET(req: NextRequest) {
    return await findUser(req);
}

export async function POST(req: NextRequest) {
    return await createUser(req);
}

export async function PATCH(req: NextRequest) {
    return await updateUser(req);
}

export async function DELETE(req: NextRequest) {
    return await deleteUser(req);
}

async function findUser(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const username = searchParams.get("username");
    const email = searchParams.get("email");
    const includeHabits = searchParams.get("includeHabits") === "true";
    const includeFriends = searchParams.get("includeFriends") === "true";
    const includeFriendRequests = searchParams.get("includeFriendRequests") === "true";

    try {
        let user;

        const userQuery = {
            select: {
                id: true,
                username: true,
                email: true,
                profilePicture: true,
                friends: true, // Assuming this is an array of user IDs
                habits: includeHabits ? true : undefined,
                receivedFriendRequests: includeFriendRequests
                    ? {
                        select: {
                            id: true,
                            status: true,
                            sender: {
                                select: {
                                    id: true,
                                    username: true,
                                    profilePicture: true,
                                },
                            },
                        },
                    }
                    : undefined,
            },
        };

        if (id) {
            user = await db.user.findUnique({
                where: { id: Number(id) },
                ...userQuery,
            });
        } else if (username) {
            user = await db.user.findUnique({
                where: { username: username },
                ...userQuery,
            });
        } else if (email) {
            user = await db.user.findUnique({
                where: { email: email },
                ...userQuery,
            });
        }

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // If friends are included, fetch the detailed friend information
        if (includeFriends && user.friends && user.friends.length > 0) {
            const friends = await db.user.findMany({
                where: {
                    id: { in: user.friends },
                },
                select: {
                    id: true,
                    username: true,
                    profilePicture: true,
                },
            });

            user = { ...user, friends };
        } else {
            // Set friends to an empty array if not included
            user.friends = [];
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}


async function createUser(req: NextRequest) {
    const { email, totalReward = 0, friends = [] } = await req.json();

    try {
        let baseUsername = email.split("@")[0];
        let username = baseUsername;
        let count = 1;

        // Check if the generated username already exists
        while (await db.user.findUnique({ where: { username: username } })) {
            username = `${baseUsername}${count}`;
            count++;
        }

        const user = await db.user.create({
            data: { email, username, totalReward, friends },
        });

        // Create default habits
        const defaultHabits = [
            {
                userId: user.id,
                worship: Worship.Quran,
                dailyQuantity: 1,
                unit: Unit.Verse,
            },
            {
                userId: user.id,
                worship: Worship.Salawat,
                dailyQuantity: 1,
                unit: Unit.Unit,
            },
            {
                userId: user.id,
                worship: Worship.Nafl,
                dailyQuantity: 1,
                unit: Unit.Unit,
            },
            {
                userId: user.id,
                worship: Worship.Thikr,
                dailyQuantity: 1,
                unit: Unit.Minute,
            },
        ];

        for (const habit of defaultHabits) {
            await createHabit(habit);
        }

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Failed to create user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}

async function updateUser(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { email, username, totalReward, friends, profilePicture } =
        await req.json();

    try {
        const user = await db.user.update({
            where: { id: Number(id) },
            data: { email, username, totalReward, friends, profilePicture },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to update user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}

async function deleteUser(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        await db.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "User deleted" });
    } catch (error) {
        console.error("Failed to delete user:", error);
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
        );
    }
}
