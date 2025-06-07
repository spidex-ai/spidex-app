"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { TextGradient } from "@/components/ui/text";
import { UserSpidex } from "@/hooks/core/useSpidexCore";
import { useDiscordLogin, useGoogleLogin, useXLogin } from "@/hooks/social/useSocialLogin";
import Image from "next/image";
import toast from "react-hot-toast";
import ConnectedAccountWrapper from "./connected-account-wrapper";

interface Props {
  user: UserSpidex;
}

const ConnectedAccounts: React.FC<Props> = ({ user }) => {
  const { signInWithGoogle } = useGoogleLogin();
  const { signInWithX } = useXLogin();
  const { signInWithDiscord } = useDiscordLogin();
  const params = useSearchParams();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const processedCodeRef = useRef<string | null>(null);

  
  // Get current URL dynamically
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin + window.location.pathname;
    }
    return "";
  };

  const handleConnectGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Google login failed");
      }
    } finally {
    }
  };
  // Handle X login
  const handleConnectX = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    const redirectUri = getCurrentUrl();
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=THpPdER1Nm1NZ3FCbm1lbnU5OXI6MTpjaQ&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  // Handle X (Twitter) OAuth callback
  const handleXCallback = async (code: string) => {
    try {
      if (isConnecting) return;

      setIsConnecting(true);
      const redirectUri = getCurrentUrl();
      const result = await signInWithX(code, redirectUri);

      if (result && typeof window !== "undefined") {
        console.log("X login successful");
        // Refresh the page to show updated user info
        router.refresh();
      }
    } catch (error: any) {
      console.log("X login error", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle Discord login
  const handleConnectDiscord = () => {
    if (isConnecting) return;
    setIsConnecting(true);

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    if (!clientId) {
      toast.error("Discord client ID not configured");
      setIsConnecting(false);
      return;
    }

    const redirectUri = `${getCurrentUrl()}?type=connect-discord`;
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds`;
    window.location.href = discordAuthUrl;
  };

  // Handle Discord OAuth callback
  const handleDiscordCallback = async (code: string) => {
    try {
      if (isConnecting) return;

      setIsConnecting(true);
      const redirectUri = `${getCurrentUrl()}?type=connect-discord`;
      const result = await signInWithDiscord(code, redirectUri);

      if (result && typeof window !== "undefined") {
        console.log("Discord login successful");
        // Refresh the page to show updated user info
        router.refresh();
      }
    } catch (error: any) {
      console.log("Discord login error", error);
      toast.error("Discord connection failed");
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle Telegram login
  const handleConnectTelegram = async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);

      // Get widget configuration from API
      const response = await fetch(`${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/telegram/widget-config`, {
        headers: { accept: '*/*' }
      });

      if (!response.ok) {
        throw new Error(`Failed to get widget config: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error('Invalid widget config response');
      }

      // For connected accounts, we'll redirect to a Telegram auth page
      // or show a modal with the widget
      toast.success("Telegram connection initiated. Please complete authentication.");

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect Telegram';
      toast.error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Handle social login callbacks via URL params
  useEffect(() => {
    const socialConnectCode = params.get("code");
    const callbackType = params.get("type");

    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode;

      // Only call Discord API if type=connect-discord, otherwise default to X
      if (callbackType === "connect-discord") {
        handleDiscordCallback(socialConnectCode);
      } else {
        handleXCallback(socialConnectCode);
      }
    }
  }, [params]);

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
            onConnect={handleConnectGoogle}
          />
          <ConnectedAccountWrapper
            icon={
              <Image
                src="/icons/discord-white.svg"
                alt="discord"
                width={28}
                height={28}
              />
            }
            name="Discord"
            value={user.discordUsername ?? undefined}
            isConnected={!!user.discordUsername}
            onConnect={handleConnectDiscord}
          />
          <ConnectedAccountWrapper
            icon={
              <Image
                src="/icons/tele-white.svg"
                alt="telegram"
                width={28}
                height={28}
              />
            }
            name="Telegram"
            value={user.telegramUsername ?? undefined}
            isConnected={!!user.telegramUsername}
            onConnect={handleConnectTelegram}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
