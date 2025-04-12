import { NextResponse } from "next/server";

import { addSavedToken, deleteSavedToken, getSavedToken } from "@/db/services";

import tokenCardanoService from "@/services/token-cardano";



export const GET = async (
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) => {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Extract the token
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

    const { address } = await params;
    // Verify the token with Privy
    if (!user.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userData = await user.json();

    // Get the user's saved tokens
    const savedToken = await getSavedToken(address, userData.data.id);

    return NextResponse.json(savedToken);
  } catch (error) {
    console.error("Error in GET /api/saved-tokens/[address]:", error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) => {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

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

    const { address } = await params;

    const tokenData = await tokenCardanoService.tokenInfo(address);
    console.log("🚀 ~ tokenData:", tokenData);

    if (!tokenData) {
      return NextResponse.json(null, { status: 404 });
    }

    // Get the user's saved tokens
    const savedToken = await addSavedToken({
      id: address,
      userId: userData.data.id,
      name: tokenData.name.value,
      symbol: tokenData.ticker.value,
    });

    return NextResponse.json(savedToken);
  } catch (error) {
    console.error("Error in POST /api/saved-tokens/[address]:", error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) => {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Extract the token
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

    const { address } = await params;

    // Get the user's saved tokens
    const savedToken = await deleteSavedToken(address, userData.data.id);

    return NextResponse.json(savedToken);
  } catch (error) {
    console.error("Error in DELETE /api/saved-tokens/[address]:", error);
    return NextResponse.json(null, { status: 500 });
  }
};
