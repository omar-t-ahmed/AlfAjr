import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // Ensure this path is correct

export async function GET(req: NextRequest) {
    return await getSupport(req);
}

export async function PATCH(req: NextRequest) {
    return await updateSupport(req);
}

export async function DELETE(req: NextRequest) {
    return await deleteSupport(req);
}

async function getSupport(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        if (id) {
            const support = await db.support.findUnique({
                where: { id: Number(id) },
            });
            return support
                ? NextResponse.json(support)
                : NextResponse.json(
                      { error: "Support request not found" },
                      { status: 404 }
                  );
        } else {
            const supports = await db.support.findMany();
            return NextResponse.json(supports);
        }
    } catch (error) {
        console.error("Failed to fetch support requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch support requests" },
            { status: 500 }
        );
    }
}

async function updateSupport(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { email, supportType, description, status } = await req.json();

    try {
        const support = await db.support.update({
            where: { id: Number(id) },
            data: { email, supportType, description, status },
        });
        return NextResponse.json(support);
    } catch (error) {
        console.error("Failed to update support request:", error);
        return NextResponse.json(
            { error: "Failed to update support request" },
            { status: 500 }
        );
    }
}

async function deleteSupport(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        await db.support.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "Support request deleted" });
    } catch (error) {
        console.error("Failed to delete support request:", error);
        return NextResponse.json(
            { error: "Failed to delete support request" },
            { status: 500 }
        );
    }
}
