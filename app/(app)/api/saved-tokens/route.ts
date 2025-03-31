import { NextRequest, NextResponse } from "next/server";

import { PrivyClient } from "@privy-io/server-auth";

import { findSavedTokensByUserId } from "@/db/services";

const privy = new PrivyClient(
    process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
    process.env.PRIVY_APP_SECRET!
);

export const GET = async (req: NextRequest) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid authorization header" },
                { status: 401 }
            );
        }

        // Extract the token
        const token = authHeader.split(" ")[1];
        
        // Verify the token with Privy
        const { userId } = await privy.verifyAuthToken(token);
        if (!userId) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        // Get the user's saved tokens
        const savedTokens = await findSavedTokensByUserId(userId);
        
        return NextResponse.json(savedTokens);
    } catch (error) {
        console.error("Error in /api/saved-tokens:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}