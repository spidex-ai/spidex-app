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
import { useSpidexCoreContext } from "@/app/_contexts";

interface ReminderModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  platform: Platform
}
const ReminderModal = ({ isOpen, onOpenChange, platform }: ReminderModalProps) => {
  const { signInWithX } = useXLogin();
  const { signInWithDiscord } = useDiscordLogin();
  const { signInWithTelegram } = useTelegramLogin();
  const { isProcessingOAuth, setIsProcessingOAuth } = useSpidexCoreContext();
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);
  const params = useSearchParams()
  const processedCodeRef = useRef<string | null>(null)


  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin + window.location.pathname;
    }
    return "";
  };
  const handleConnectX = () => {
    if (isConnecting || isProcessingCallback) {
      console.log('X connection already in progress, returning');
      return;
    }

    setIsConnecting(true)
    const redirectUri = getCurrentUrl();
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=THpPdER1Nm1NZ3FCbm1lbnU5OXI6MTpjaQ&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`
    window.location.href = xAuthUrl
  }
  const handleXCallback = async (code: string, baseRedirectUri: string) => {
    console.log('handleXCallback called with:', {
      code,
      baseRedirectUri,
      isConnecting,
      isProcessingCallback
    });

    try {
      // Multiple guards to prevent double execution
      if (isConnecting || isProcessingCallback) {
        console.log('Already processing X callback, returning early');
        return;
      }

      console.log('Setting processing flags to true for X callback');
      setIsConnecting(true);
      setIsProcessingCallback(true);

      const ref = params.get("ref");
      const redirectUri = baseRedirectUri;
      await signInWithX(code, redirectUri, ref || "");

      // Clean up URL by removing OAuth query parameters
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        url.searchParams.delete('type');
        url.searchParams.delete('state');
        window.history.replaceState({}, '', url.toString());
        console.log('Cleaned up X OAuth parameters from URL');
      }

      onOpenChange(false)
    } catch (error: any) {
      console.error('X login error:', error);
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("X login failed");
      }
    } finally {
      console.log('Setting processing flags to false for X callback');
      setIsConnecting(false);
      setIsProcessingCallback(false);
      setIsProcessingOAuth(false);
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
    onOpenChange(false)
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
    console.log('handleDiscordCallback called with:', {
      code,
      baseRedirectUri,
      isConnecting,
      isProcessingCallback
    });

    try {
      // Multiple guards to prevent double execution
      if (isConnecting || isProcessingCallback) {
        console.log('Already processing callback, returning early');
        return;
      }

      console.log('Setting processing flags to true');
      setIsConnecting(true);
      setIsProcessingCallback(true);

      const ref = params.get("ref");
      const redirectUri = `${baseRedirectUri}?type=connect-discord`;
      console.log('Calling signInWithDiscord with:', { code, redirectUri, ref });
      const result = await signInWithDiscord(code, redirectUri, ref || "");

      if (result && typeof window !== "undefined") {
        console.log("Discord login successful", result);

        // Clean up URL by removing OAuth query parameters
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        url.searchParams.delete('type');
        url.searchParams.delete('state');
        window.history.replaceState({}, '', url.toString());
        console.log('Cleaned up Discord OAuth parameters from URL');
      }
      // Close the modal when Discord login is successful
      onOpenChange(false)
    } catch (error: any) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Discord login failed");
      }
    } finally {
      console.log('Setting processing flags to false');
      setIsConnecting(false);
      setIsProcessingCallback(false);
      setIsProcessingOAuth(false);
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

  
    // Only process if not already processed and not currently processing OAuth globally
    if (
      socialConnectCode &&
      socialConnectCode !== processedCodeRef.current &&
      !isConnecting &&
      !isProcessingOAuth &&
      !isProcessingCallback
    ) {
      console.log('Reminder Modal: Taking control of OAuth processing (priority on points page)');
      processedCodeRef.current = socialConnectCode;
      setIsProcessingOAuth(true);

      // Use the type parameter to determine which callback handler to use
      // Only call Discord API if type=connect-discord, otherwise default to X
      if (callbackType === "connect-discord") {
        console.log('Type is connect-discord, calling Discord API');
        handleDiscordCallback(socialConnectCode, getCurrentUrl());
      } else {
        console.log('Type is not connect-discord, calling X API');
        handleXCallback(socialConnectCode, getCurrentUrl());
      }
    } else {
      console.log('Reminder Modal: Skipping OAuth processing - conditions not met');
    }
  }, [params, isConnecting, isProcessingOAuth, isProcessingCallback])

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
            // Clean up URL by removing Telegram query parameters
            if (typeof window !== 'undefined') {
              const url = new URL(window.location.href);
              url.searchParams.delete('telegram-success');
              url.searchParams.delete('telegram-error');
              url.searchParams.delete('ref');
              window.history.replaceState({}, '', url.toString());
              console.log('Cleaned up Telegram OAuth parameters from URL');
            }
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

      // Clean up URL by removing Telegram error parameters
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('telegram-success');
        url.searchParams.delete('telegram-error');
        url.searchParams.delete('ref');
        window.history.replaceState({}, '', url.toString());
        console.log('Cleaned up Telegram error parameters from URL');
      }
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
