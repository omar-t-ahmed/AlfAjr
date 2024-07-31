import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // Ensure this path is correct

export async function GET(req: NextRequest) {
    return await getSupport(req);
}

export async function POST(req: NextRequest) {
    return await createSupport(req);
}

async function getSupport(req: NextRequest) {
    try {
        const supports = await db.support.findMany();
        return NextResponse.json(supports);
    } catch (error) {
        console.error("Failed to retrieve support requests:", error);
        return NextResponse.json(
            { error: "Failed to retrieve support requests" },
            { status: 500 }
        );
    }
}

async function createSupport(req: NextRequest) {
    const { email, supportType, description, status, createdAt } =
        await req.json();

    try {
        const newSupport = await db.support.create({
            data: {
                email,
                supportType,
                description,
                status,
                createdAt,
            },
        });
        return NextResponse.json(newSupport, { status: 201 });
    } catch (error) {
        console.error("Failed to save support request:", error);
        return NextResponse.json(
            { error: "Failed to save support request" },
            { status: 500 }
        );
    }
}
