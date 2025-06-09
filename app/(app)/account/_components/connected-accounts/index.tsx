'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { TextGradient } from '@/components/ui/text';
import { UserSpidex } from '@/hooks/core/useSpidexCore';
import {
  useDiscordLogin,
  useGoogleLogin,
  useXLogin,
} from '@/hooks/social/useSocialLogin';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ConnectedAccountWrapper from './connected-account-wrapper';
import TelegramModal from '@/app/_components/telegram-modal';
import { useSpidexCoreContext } from '@/app/_contexts';

interface Props {
  user: UserSpidex;
}

const ConnectedAccounts: React.FC<Props> = ({ user }) => {
  const { signInWithGoogle } = useGoogleLogin();
  const { signInWithX } = useXLogin();
  const { signInWithDiscord } = useDiscordLogin();
  const { isProcessingOAuth, setIsProcessingOAuth } = useSpidexCoreContext();
  const params = useSearchParams();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);
  const processedCodeRef = useRef<string | null>(null);

  // Get current URL dynamically
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return '';
  };

  const handleConnectGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Google login failed');
      }
    } finally {
    }
  };
  // Handle X login
  const handleConnectX = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    const redirectUri = getCurrentUrl();
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=THpPdER1Nm1NZ3FCbm1lbnU5OXI6MTpjaQ&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  // Handle X (Twitter) OAuth callback
  const handleXCallback = async (code: string) => {
    try {
      if (isConnecting) return;

      setIsConnecting(true);
      const redirectUri = getCurrentUrl();
      const result = await signInWithX(code, redirectUri);

      if (result && typeof window !== 'undefined') {
        // Refresh the page to show updated user info
        router.refresh();
      }
    } catch (error: any) {
      console.log('X login error', error);
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('X connection failed');
      }
    } finally {
      setIsConnecting(false);
      setIsProcessingOAuth(false);
    }
  };

  // Handle Discord login
  const handleConnectDiscord = () => {
    if (isConnecting) return;
    setIsConnecting(true);

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    if (!clientId) {
      toast.error('Discord client ID not configured');
      setIsConnecting(false);
      return;
    }

    const redirectUri = `${getCurrentUrl()}?type=connect-discord`;
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=identify%20email%20guilds`;
    window.location.href = discordAuthUrl;
  };

  // Handle Discord OAuth callback
  const handleDiscordCallback = async (code: string) => {
    console.log('handleDiscordCallback called with:', {
      code,
      isConnecting,
      isProcessingCallback,
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

      const redirectUri = `${getCurrentUrl()}?type=connect-discord`;
      const result = await signInWithDiscord(code, redirectUri);

      if (result && typeof window !== 'undefined') {
        console.log('Discord login successful');
        // Refresh the page to show updated user info
        router.refresh();
      }
    } catch (error: any) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Discord connection failed');
      }
    } finally {
      console.log('Setting processing flags to false');
      setIsConnecting(false);
      setIsProcessingCallback(false);
      setIsProcessingOAuth(false);
    }
  };

  // Handle Telegram login
  const handleConnectTelegram = () => {
    if (isConnecting) return;
    setIsTelegramModalOpen(true);
  };

  // Handle social login callbacks via URL params
  useEffect(() => {
    const socialConnectCode = params.get('code');
    const callbackType = params.get('type');

    console.log('Connected Accounts useEffect - checking conditions:', {
      socialConnectCode,
      callbackType,
      processedCode: processedCodeRef.current,
      isConnecting,
      isProcessingOAuth,
      isProcessingCallback
    });

    // Only process if we have a code, haven't processed it yet, and not currently processing OAuth globally
    if (
      socialConnectCode &&
      socialConnectCode !== processedCodeRef.current &&
      !isConnecting &&
      !isProcessingOAuth &&
      !isProcessingCallback
    ) {
      console.log('Connected Accounts: Taking control of OAuth processing (priority on account page)');
      processedCodeRef.current = socialConnectCode;
      setIsProcessingOAuth(true);

      // Only call Discord API if type=connect-discord, otherwise default to X
      if (callbackType === 'connect-discord') {
        console.log('Processing Discord callback in connected accounts');
        handleDiscordCallback(socialConnectCode);
      } else {
        console.log('Processing X callback in connected accounts');
        handleXCallback(socialConnectCode);
      }
    } else {
      console.log('Connected Accounts: Skipping OAuth processing - conditions not met');
    }
  }, [params, isConnecting, isProcessingOAuth, isProcessingCallback]);

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
            isSeparator={true}
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
            isSeparator={true}
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

      <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onSuccess={result => {
          console.log('Telegram connection successful', result);
          setIsTelegramModalOpen(false);
          router.refresh();
        }}
        onError={error => {
          console.error('Telegram connection error', error);
          setIsTelegramModalOpen(false);
        }}
      />
    </div>
  );
};

export default ConnectedAccounts;
