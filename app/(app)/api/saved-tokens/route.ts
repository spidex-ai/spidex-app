import { NextRequest, NextResponse } from "next/server";

import { findSavedTokensByUserId } from "@/db/services";

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

    const token = authHeader.split(" ")[1];
    console.log("🚀 ~ GET ~ tokensavedToken:", token);

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verify the token with Privy
    if (!user.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userData = await user.json();
    // Get the user's chats

    // Get the user's saved tokens
    const savedTokens = await findSavedTokensByUserId(userData.data.id);

    return NextResponse.json(savedTokens);
  } catch (error) {
    console.error("Error in /api/saved-tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
