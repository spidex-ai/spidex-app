"use client";

import { useState } from "react";

import { usePrivy } from "@privy-io/react-auth";

import { useIsTokenSaved } from "./use-is-token-saved";
import { useSavedTokens } from "./use-saved-tokens";

export const useSaveToken = (address: string) => {
    const { getAccessToken } = usePrivy();

    const { mutate: mutateSavedTokens } = useSavedTokens();

    const { mutate: mutateIsTokenSaved, isLoading, data: isTokenSaved } = useIsTokenSaved(address);

    const [isUpdating, setIsUpdating] = useState(false);

    const makeTokenRequest = async (method: "POST" | "DELETE") => {
        // Check token saved state matches intended action
        if ((method === "POST" && isTokenSaved) || 
            (method === "DELETE" && !isTokenSaved)) {
            return;
        }

        setIsUpdating(true);

        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error("Not authenticated");
            }

            const res = await fetch(`/api/saved-tokens/${address}`, {
                method,
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => res.json());

            mutateSavedTokens();
            mutateIsTokenSaved();
        } catch (error) {
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    const saveToken = () => makeTokenRequest("POST");
    const deleteToken = () => makeTokenRequest("DELETE");

    return {
        saveToken,
        deleteToken,
        isLoading,
        isUpdating,
        isTokenSaved,
    }
}