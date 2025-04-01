// // spidex-app/app/(app)/api/tokens/search/route.ts
import { NextResponse } from "next/server";
// import { searchForTokens } from "@/services/search";

export const GET = async () => {
    // const q = req.nextUrl.searchParams.get("q");
    // if (!q || q.trim() === "") {
    //     return Response.json({ error: "Query parameter 'q' must be a non-empty string." }, { status: 400 });
    // }
    return NextResponse.json({ message: "Tokens GET and added to database" });
}