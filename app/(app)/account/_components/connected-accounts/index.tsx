"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { TextGradient } from "@/components/ui/text";
import Image from "next/image";
import { UserSpidex } from "@/hooks/core/useSpidexCore";
import { useGoogleLogin, useXLogin } from "@/hooks/social/useSocialLogin";
import ConnectedAccountWrapper from "./connected-account-wrapper";

interface Props {
  user: UserSpidex;
}

const ConnectedAccounts: React.FC<Props> = ({ user }) => {
  const { signInWithGoogle } = useGoogleLogin();
  const { signInWithX } = useXLogin();
  const params = useSearchParams();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const processedCodeRef = useRef<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Derive base URL for social login redirects - only on client
  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href.split("/").slice(0, 3).join("/") + "/account";
    }
    return "";
  }, [isClient]);

  // Handle X login
  const handleConnectX = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MFkxSjU3TjVWUGpMLVhYV08tblU6MTpjaQ&redirect_uri=${baseUrl}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  // Handle X (Twitter) OAuth callback
  const handleXCallback = async (code: string, redirectUri: string) => {
    try {
      if (isConnecting) return;
      
      setIsConnecting(true);
      const result = await signInWithX(code, redirectUri);
      
      if (result && typeof window !== "undefined") {
        console.log("X login successful");
        // remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        // Refresh the page to show updated user info
        router.refresh();
      }
    } catch (error: any) {
      console.log("X login error", error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Handle X login callback via URL params
  useEffect(() => {
    const socialConnectCode = params.get("code");
    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode;
      handleXCallback(socialConnectCode, baseUrl);
    }
  }, [params, baseUrl]);

  return (
    <div className="flex flex-col gap-4 mt-8">
      <TextGradient className="text-2xl font-bold">
        Connected Accounts
      </TextGradient>
      <div className="border boder-1 border-gray-800 p-8 mt-4 rounded-2xl">
        <div className="flex flex-col gap-4">
          <ConnectedAccountWrapper
            icon={
              <Image
                src="/icons/x-white.svg"
                alt="twitter"
                width={28}
                height={28}
              />
            }
            name="Twitter"
            value={user.xUsername ?? undefined}
            isConnected={!!user.xUsername}
            onConnect={handleConnectX}
            isSeparator={true}
          />
          <ConnectedAccountWrapper
            icon={
              <Image
                src="/icons/google-white.svg"
                alt="google"
                width={28}
                height={28}
                className="h-full"
              />
            }
            name="Google"
            value={user.email ?? undefined}
            isConnected={!!user.email}
            onConnect={() => {
              signInWithGoogle();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
