'use client'
import {
  Dialog,
  DialogContent,
  GradientButton,
} from "@/components/ui";
import { useDiscordLogin, useTelegramLogin, useXLogin } from "@/hooks/social/useSocialLogin";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Platform } from "./reminder-modal-wrapper";
import toast from "react-hot-toast";
import TelegramModal from "@/app/_components/telegram-modal";

interface ReminderModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  platform: Platform
}
const ReminderModal = ({ isOpen, onOpenChange, platform }: ReminderModalProps) => {
  const { signInWithX } = useXLogin();
  const { signInWithDiscord } = useDiscordLogin();
  const { signInWithTelegram } = useTelegramLogin();
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const params = useSearchParams()
  const processedCodeRef = useRef<string | null>(null)


  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin + window.location.pathname;
    }
    return "";
  };
  const handleConnectX = () => {
    setIsConnecting(true)
    const redirectUri = getCurrentUrl();
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=THpPdER1Nm1NZ3FCbm1lbnU5OXI6MTpjaQ&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`
    window.location.href = xAuthUrl
  }
  const handleXCallback = async (code: string, baseRedirectUri: string) => {
    try {
      if (isConnecting) {
        return;
      }

      setIsConnecting(true);
      const ref = params.get("ref");
      const redirectUri = baseRedirectUri;
      await signInWithX(code, redirectUri, ref || "");

      onOpenChange(false)
    } catch (error: any) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("X login failed");
      }
    } finally {
      console.log('Setting isConnecting to false');
      setIsConnecting(false);
    }
  };
  const handleConnectUser = () => {
    if (platform === 'X') {
      handleConnectX()
    } else if (platform === 'Telegram') {
      handleConnectTelegram()
    } else if (platform === 'Discord') {
      handleConnectDiscord()
    }
  }

  const handleConnectDiscord = () => {
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

  const handleDiscordCallback = async (code: string, baseRedirectUri: string) => {
    console.log('handleDiscordCallback called with:', { code, baseRedirectUri, isConnecting });
    try {
      if (isConnecting) {
        console.log('Already connecting, returning early');
        return;
      }

      console.log('Setting isConnecting to true');
      setIsConnecting(true);
      const ref = params.get("ref");
      const redirectUri = `${baseRedirectUri}?type=connect-discord`;
      console.log('Calling signInWithDiscord with:', { code, redirectUri, ref });
      const result = await signInWithDiscord(code, redirectUri, ref || "");

      if (result && typeof window !== "undefined") {
        console.log("Discord login successful", result);
      }
          // Close the modal when X login is initiated
      onOpenChange(false)
    } catch (error: any) {
      console.error('Discord login error:', error);
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Discord login failed");
      }
    } finally {
      console.log('Setting isConnecting to false');
      setIsConnecting(false);
    }
  };

  const handleConnectTelegram = () => {
    if (isConnecting) {
      console.log('Connection already in progress, returning');
      return;
    }

    setIsTelegramModalOpen(true);
  };


  useEffect(() => {
    const socialConnectCode = params.get("code");
    const callbackType = params.get("type");

    // Only process if not already processed in mount
    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode;

      // Use the type parameter to determine which callback handler to use
      // Only call Discord API if type=connect-discord, otherwise default to X
      if (callbackType === "connect-discord") {
        console.log('Type is connect-discord, calling Discord API');
        handleDiscordCallback(socialConnectCode, getCurrentUrl());
      } else {
        console.log('Type is not connect-discord, calling X API');
        handleXCallback(socialConnectCode, getCurrentUrl());
      }

    }
  }, [params])

  useEffect(() => {
    const telegramSuccess = params.get("telegram-success");
    const telegramError = params.get("telegram-error");

    if (telegramSuccess) {
      const successData = localStorage.getItem('telegramAuthSuccess');
      if (successData) {
        try {
          const result = JSON.parse(successData);
          localStorage.removeItem('telegramAuthSuccess');

          const ref = params.get("ref");
          signInWithTelegram(
            result.id,
            result.first_name,
            result.last_name,
            result.username,
            result.photo_url,
            result.auth_date,
            result.hash,
            ref || ""
          ).then(() => {
            onOpenChange(false);
          }).catch(() => {
            toast.error("Telegram login failed");
          });
        } catch (error) {
          console.error("Failed to process Telegram authentication", error);
          toast.error("Failed to process Telegram authentication");
        }
      }
    }

    if (telegramError) {
      const errorMessage = telegramError || 'Telegram authentication failed';
      toast.error(errorMessage);
    }
  }, [params, signInWithTelegram, onOpenChange]);


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!bg-bg-modal">
        <div className="text-white text-2xl font-medium mt-5">Reminder</div>
        <div className="text-white text-sm">
          To participate in this quest, please link your {platform}
        </div>
        <div className="flex justify-end mt-5">
          <GradientButton onClick={handleConnectUser} isLoading={isConnecting}>Go now</GradientButton>
        </div>
      </DialogContent>
    </Dialog>


    <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onSuccess={(result) => {
          console.log("Telegram login successful", result);
          setIsTelegramModalOpen(false);
          onOpenChange(false);
        }}
        onError={(error) => {
          console.error("Telegram login error", error);
          setIsTelegramModalOpen(false);
        }}
      />
    </>
  );
};

export default ReminderModal;
