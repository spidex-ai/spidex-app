'use client';

import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import {
  decodeHexAddress,
  NetworkType,
} from '@cardano-foundation/cardano-connect-with-wallet-core';
import { ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  GradientButton,
} from '@/components/ui';
import {
  useGoogleLogin,
  useXLogin,
  useDiscordLogin,
  useTelegramLogin,
} from '@/hooks/social/useSocialLogin';
import TelegramModal from './telegram-modal';
import { cn } from '@/lib/utils';
import { initNufiDappCardanoSdk } from '@nufi/dapp-client-cardano';
import nufiCoreSdk from '@nufi/dapp-client-core';
import { useSpidexCoreContext } from '../_contexts';
import { useLoginModal } from '../_contexts/login-modal-context';
import toast from 'react-hot-toast';
import WalletNotInstalledDialog from './wallet-not-installed-dialog';

// Wallet methods configuration
const WALLET_METHODS = [
  {
    id: 'lace',
    name: 'Lace',
    icon: '/icons/nami.svg',
    description: 'Lace Wallet',
    link: 'https://www.lace.io/',
  },
  {
    id: 'yoroi',
    name: 'Yoroi',
    icon: '/icons/yoroi.svg',
    description: 'Yoroi Wallet',
    link: 'https://yoroi-wallet.com/',
  },
  {
    id: 'vespr',
    name: 'Vespr',
    icon: '/icons/vespr.svg',
    description: 'Vespr Wallet',
    link: 'https://vespr.xyz/',
  },
  {
    id: 'eternl',
    name: 'Eternl',
    icon: '/icons/eternl.svg',
    description: 'Eternl Wallet',
    link: 'https://eternl.io/',
  },
  {
    id: 'gerowallet',
    name: 'Gero',
    icon: '/icons/gero.svg',
    description: 'Gero Wallet',
    link: 'https://www.gerowallet.io/',
  },
  {
    id: 'subwallet',
    name: 'Sub Wallet',
    icon: '/icons/subwallet.svg',
    description: 'Sub Wallet',
    link: 'https://www.subwallet.app/download.html?lang=1',
  },
  {
    id: 'begin',
    name: 'Begin',
    icon: '/icons/begin.svg',
    description: 'Begin Wallet',
    link: 'https://begin.is/',
  },
  {
    id: 'typhon',
    name: 'Typhon',
    icon: '/icons/typhon.svg',
    description: 'Typhon Wallet',
    link: 'https://typhonwallet.io/',
  },
  {
    id: 'nufi',
    name: 'Nufi',
    icon: '/icons/nufi.svg',
    description: 'Nufi Wallet',
    link: 'https://nu.fi/',
  },
];

// Define social login methods
const SOCIAL_METHODS = [
  {
    id: 'google',
    name: 'Google',
    icon: '/icons/google.svg',
    description: 'Login With Google',
  },
  {
    id: 'xlogin',
    name: 'X',
    icon: '/icons/x-login.svg',
    description: 'Login With X',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '/icons/discord-white.svg',
    description: 'Login With Discord',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '/icons/tele-white.svg',
    description: 'Login With Telegram',
  },
];

const METAMASK_METHOD = {
  id: 'metamask',
  name: 'Metamask',
  icon: '/icons/metamask.svg',
  description: 'Metamask',
};

export const LOGIN_METHODS = [
  ...WALLET_METHODS,
  ...SOCIAL_METHODS,
  METAMASK_METHOD,
];

const LoginModal: React.FC = () => {
  const [walletConnecting, setWalletConnecting] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletNotInstalled, setShowWalletNotInstalled] = useState(false);
  const [notInstalledWallet, setNotInstalledWallet] = useState<{
    name: string;
    logo: string;
    link: string;
    id: string;
  } | null>(null);
  const processedCodeRef = useRef<string | null>(null);
  const params = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);

  const {
    signMessage: signMessageSpidex,
    getNounce,
    isProcessingOAuth,
    setIsProcessingOAuth,
  } = useSpidexCoreContext();
  const { signInWithGoogle } = useGoogleLogin();
  const { signInWithX } = useXLogin();
  const { signInWithDiscord } = useDiscordLogin();
  const { signInWithTelegram } = useTelegramLogin();
  const { isOpen, closeModal, hideSocialLogin } = useLoginModal();

  const [isReferralModalOpen, setIsReferralModalOpen] =
    useState<boolean>(false);
  const [method, setMethod] = useState<string>('');
  const [isTelegramModalOpen, setIsTelegramModalOpen] =
    useState<boolean>(false);

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return '';
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only initialize NuFi SDK on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      nufiCoreSdk.init('https://wallet.nu.fi', {
        zIndex: 1402,
      });
    }
  }, []);

  const { connect, signMessage, disconnect } = useCardano({
    limitNetwork: NetworkType.MAINNET,
  });
  const anyConnectionInProgress = walletConnecting !== null || isConnecting;

  const onWalletConnectError = (error: Error) => {
    console.log('Wallet connection error', error);
    if (error.name === 'WrongNetworkTypeError') {
      console.log('WrongNetworkTypeError');
      toast.error('Please connect to the mainnet');
    } else if (error.name === 'WalletNotInstalledError') {
      const walletName = error.message.split(' ')[2];
      const wallet = WALLET_METHODS.find(w => w.id === walletName);
      setNotInstalledWallet({
        name: wallet?.name || '',
        logo: wallet?.icon || '',
        link: wallet?.link || '',
        id: wallet?.id || '',
      });
      setShowWalletNotInstalled(true);
    } else {
      console.log('Error', error);
      toast.error('Wallet connection error');
    }
    disconnect();
    setWalletConnecting(null);
  };

  /**
   * Connect to Cardano wallet
   */
  const handleConnectWallet = async (walletName: string) => {
    if (anyConnectionInProgress) {
      console.log('Connection already in progress');
      return;
    }
    setWalletConnecting(walletName);

    connect(
      walletName,
      () => handleSignMessage(walletName) as any,
      (error: Error) => onWalletConnectError(error)
    );
  };
  const handleCheckReferral = (method: string) => {
    console.log('handleCheckReferral called with method:', method);
    if (!isPrivacyAccepted) {
      console.log('Privacy policy not accepted');
      toast.error(
        'Please accept the Privacy Policy and Terms of Use to continue'
      );
      return;
    }
    console.log('Setting method:', method);
    setMethod(method);
    if (params.get('ref')) {
      console.log('Referral code found, opening referral modal');
      setIsReferralModalOpen(true);
    } else {
      console.log('No referral code, calling handleConnect');
      handleConnect(method);
    }
  };

  const handleConnect = (method: string) => {
    if (method === 'nufisnap') {
      handleConnectMetamask();
    } else if (method === 'google') {
      handleConnectGoogle();
    } else if (method === 'xlogin') {
      handleConnectX();
    } else if (method === 'discord') {
      handleConnectDiscord();
    } else if (method === 'telegram') {
      handleConnectTelegram();
    } else {
      handleConnectWallet(method);
    }
  };

  const handleConnectReferral = useCallback(() => {
    console.log('🚀 ~ handleConnect ~ method:', method);
    setIsReferralModalOpen(false);
    if (method === 'nufisnap') {
      handleConnectMetamask();
    } else if (method === 'google') {
      handleConnectGoogle();
    } else if (method === 'xlogin') {
      handleConnectX();
    } else if (method === 'discord') {
      handleConnectDiscord();
    } else if (method === 'telegram') {
      handleConnectTelegram();
    } else {
      handleConnectWallet(method);
    }
  }, [method]);

  /**
   * Sign message with connected wallet
   */
  const handleSignMessage = async (walletName: string) => {
    try {
      let address = null;
      let stakeAddress = null;
      const api = await (window as any).cardano[walletName as any].enable();
      await api?.getUtxos();
      const unusedAddressesHex = await api.getUnusedAddresses();
      const usedAddresses = await api.getUsedAddresses();
      const stakeAddresses = await api.getRewardAddresses();
      if (usedAddresses && usedAddresses.length > 0) {
        address = decodeHexAddress(usedAddresses[0]);
      } else if (unusedAddressesHex && unusedAddressesHex.length > 0) {
        address = decodeHexAddress(unusedAddressesHex[0]);
      }
      if (stakeAddresses && stakeAddresses.length > 0) {
        stakeAddress = decodeHexAddress(stakeAddresses[0]);
      }
      if (!address || !stakeAddress) {
        toast.error('No address found');
        return;
      }
      const nonce = await getNounce();
      if (!nonce) return;
      const ref = params.get('ref');

      await signMessage(
        nonce,
        async (signature: string, key: string | undefined) => {
          await handleSignMessageSpidex(
            address,
            stakeAddress,
            signature,
            key,
            ref,
            walletName
          );
        },
        (error: any) => {
          console.error('Sign message failed', error);
          disconnect();
          toast.error('Sign message failed');
        }
      );
    } catch (error: any) {
      console.log('Error signing message', error);
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        disconnect();
        toast.error('Sign message failed');
      }
    } finally {
      setWalletConnecting(null);
    }
  };

  const handleSignMessageSpidex = async (
    address: string,
    stakeAddress: string,
    signature: string,
    key: string | undefined,
    ref: string | null,
    walletName: string
  ) => {
    try {
      await signMessageSpidex(
        {
          address,
          signature,
          publicKey: key || '',
          role: 'user',
          referralCode: ref || '',
          stakeAddress,
        },
        walletName || ''
      );
      closeModal();
    } catch (error: any) {
      console.log('Error signing message with Spidex', error);
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Sign message failed');
      }
    }
  };

  /**
   * Connect with Google
   */
  const handleConnectGoogle = async () => {
    if (anyConnectionInProgress) return;
    try {
      setIsConnecting(true);
      const ref = params.get('ref');
      await signInWithGoogle(ref || '');
      // Close the modal when Google login is initiated
      closeModal();
    } catch (error: any) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Google login failed');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  /**
   * Connect with X (Twitter)
   */
  const handleConnectX = () => {
    if (anyConnectionInProgress) return;
    setIsConnecting(true);
    const redirectUri = getCurrentUrl();
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=THpPdER1Nm1NZ3FCbm1lbnU5OXI6MTpjaQ&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  /**
   * Handle X (Twitter) OAuth callback
   */
  const handleXCallback = async (code: string, baseRedirectUri: string) => {
    try {
      if (isConnecting) {
        return;
      }

      setIsConnecting(true);
      const ref = params.get('ref');
      const redirectUri = baseRedirectUri;
      await signInWithX(code, redirectUri, ref || '');

      closeModal();
    } catch (error: any) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('X login failed');
      }
    } finally {
      console.log('Setting isConnecting to false');
      setIsConnecting(false);
      setIsProcessingOAuth(false);
    }
  };

  /**
   * Handle Discord OAuth callback
   */
  const handleDiscordCallback = useCallback(async (
    code: string,
    baseRedirectUri: string
  ) => {
    console.log('handleDiscordCallback called with:', {
      code,
      baseRedirectUri,
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

      const ref = params.get('ref');
      const redirectUri = `${baseRedirectUri}?type=connect-discord`;
      console.log('Calling signInWithDiscord with:', {
        code,
        redirectUri,
        ref,
      });
      const result = await signInWithDiscord(code, redirectUri, ref || '');

      if (result && typeof window !== 'undefined') {
        console.log('Discord login successful', result);
      }
      // Close the modal when Discord login is successful
      closeModal();
    } catch (error: any) {
      console.error('Discord login error:', error);
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Discord login failed');
      }
    } finally {
      console.log('Setting processing flags to false');
      setIsConnecting(false);
      setIsProcessingCallback(false);
      setIsProcessingOAuth(false);
    }
  }, [isConnecting, isProcessingCallback, params, signInWithDiscord, closeModal]);

  useEffect(() => {
    const socialConnectCode = params.get('code');
    const callbackType = params.get('type');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    console.log('Login Modal useEffect - checking conditions:', {
      socialConnectCode,
      callbackType,
      currentPath,
      processedCode: processedCodeRef.current,
      isConnecting,
      isProcessingOAuth,
      isProcessingCallback
    });

    // Don't process OAuth callbacks if we're on pages with their own OAuth handlers
    const isOnAccountPage = currentPath.includes('/account');
    const isOnPointsPage = currentPath.includes('/points');
    const shouldDeferToOtherComponent = isOnAccountPage || isOnPointsPage;

    // Only process if we have a code, haven't processed it yet, not currently processing OAuth globally,
    // and we're NOT on pages that have their own OAuth handling components
    if (
      socialConnectCode &&
      socialConnectCode !== processedCodeRef.current &&
      !isConnecting &&
      !isProcessingOAuth &&
      !isProcessingCallback &&
      !shouldDeferToOtherComponent
    ) {
      console.log('Login Modal: Taking control of OAuth processing');
      processedCodeRef.current = socialConnectCode;
      setIsProcessingOAuth(true);

      // Use the type parameter to determine which callback handler to use
      // Only call Discord API if type=connect-discord, otherwise default to X
      if (callbackType === 'connect-discord') {
        console.log('Processing Discord callback from login modal');
        handleDiscordCallback(socialConnectCode, getCurrentUrl());
      } else {
        console.log('Processing X callback from login modal');
        handleXCallback(socialConnectCode, getCurrentUrl());
      }
    } else {
      console.log('Login Modal: Skipping OAuth processing - conditions not met or on page with dedicated OAuth handler');
    }
  }, [params, isConnecting, isProcessingOAuth, isProcessingCallback]);

  useEffect(() => {
    const telegramSuccess = params.get('telegram-success');
    const telegramError = params.get('telegram-error');

    if (telegramSuccess) {
      const successData = localStorage.getItem('telegramAuthSuccess');
      if (successData) {
        try {
          const result = JSON.parse(successData);
          localStorage.removeItem('telegramAuthSuccess');

          const ref = params.get('ref');
          signInWithTelegram(
            result.id,
            result.first_name,
            result.last_name,
            result.username,
            result.photo_url,
            result.auth_date,
            result.hash,
            ref || ''
          )
            .then(() => {
              closeModal();
            })
            .catch(() => {
              toast.error('Telegram login failed');
            });
        } catch (error) {
          console.error('Failed to process Telegram authentication', error);
          toast.error('Failed to process Telegram authentication');
        }
      }
    }

    if (telegramError) {
      const errorMessage = telegramError || 'Telegram authentication failed';
      toast.error(errorMessage);
    }
  }, [params, signInWithTelegram, closeModal]);

  /**
   * Connect with Discord
   */
  const handleConnectDiscord = () => {
    if (anyConnectionInProgress) return;
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



  /**
   * Connect with Telegram
   */
  const handleConnectTelegram = () => {
    console.log('handleConnectTelegram called - opening modal');
    if (anyConnectionInProgress) {
      console.log('Connection already in progress, returning');
      return;
    }

    setIsTelegramModalOpen(true);
  };

  const handleConnectMetamask = () => {
    if (typeof window === 'undefined') return;

    nufiCoreSdk.isMetamaskInstalled().then(async isMetamaskInstalled => {
      if (isMetamaskInstalled) {
        initNufiDappCardanoSdk(nufiCoreSdk, 'snap');
        if ((window as any).cardano) {
          Object.defineProperty((window as any).cardano, 'nufisnap', {
            get: function () {
              return (window as any).cardano.nufiSnap;
            },
            configurable: true,
          });
        }
        handleCheckReferral('nufisnap');
      } else {
        console.log('Metamask is not installed');
      }
    });
  };
  // Render wallet option
  const renderWalletOption = (method: (typeof WALLET_METHODS)[0]) => {
    const isThisWalletConnecting = walletConnecting === method.id;
    const isDisabled =
      (anyConnectionInProgress && !isThisWalletConnecting) ||
      !isPrivacyAccepted;

    return (
      <div
        key={method.id}
        className={cn(
          'p-2 py-1 rounded-md  text-white  bg-bg-secondary',
          isThisWalletConnecting ? 'bg-blue-50' : 'border-gray-200',
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:bg-blue-50 hover:text-black',
          'transition-all duration-200'
        )}
        onClick={() => !isDisabled && handleCheckReferral(method.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src={method.icon}
                alt={method.name}
                width={30}
                height={30}
              />
            </div>
            <div>
              <span>{method.description}</span>
            </div>
          </div>

          {isThisWalletConnecting ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-icon" />
          )}
        </div>
      </div>
    );
  };
  // Render social login option
  const renderSocialOption = (method: (typeof SOCIAL_METHODS)[0]) => {
    const isDisabled =
      (anyConnectionInProgress && walletConnecting !== null) ||
      !isPrivacyAccepted;

    return (
      <div
        key={method.id}
        className={cn(
          'p-3 rounded-lg text-white w-full border border-solid border-transparent bg-bg-secondary',
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer  hover:border-blue-50 hover:text-black',
          'transition-all duration-200'
        )}
        onClick={() => !isDisabled && handleCheckReferral(method.id)}
      >
        <div className="flex items-center justify-center">
          <div className="flex  items-center justify-center">
            <Image src={method.icon} alt={method.name} width={25} height={25} />
          </div>
        </div>
      </div>
    );
  };

  // Render Metamask option
  const renderMetamaskConnect = () => {
    const isThisWalletConnecting = walletConnecting === 'nufisnap';
    const isDisabled =
      (anyConnectionInProgress && !isThisWalletConnecting) ||
      !isPrivacyAccepted;
    return (
      <div
        key="metamask"
        className={cn(
          'p-2 py-1 rounded-md border-gray-200 text-white  bg-bg-secondary',
          isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:bg-blue-50 hover:text-black',
          'transition-all duration-200'
        )}
        onClick={() => handleConnectMetamask()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src={METAMASK_METHOD.icon}
                alt={METAMASK_METHOD.name}
                width={30}
                height={30}
              />
            </div>
            <div>
              <span>{METAMASK_METHOD.description}</span>
            </div>
          </div>
          {isThisWalletConnecting ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-icon" />
          )}
        </div>
      </div>
    );
  };

  // Only render the full component on the client
  if (!isClient) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[445px] !bg-bg-tab !border-none !p-8">
          <DialogHeader>
            <p className="self-start text-2xl">Connect Wallet</p>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="px-2 py-1 text-black font-bold rounded-lg text-xs"
                  style={{
                    background: 'linear-gradient(90deg, #BBF985,#009EFF)',
                  }}
                >
                  1
                </div>
                <span>
                  Accept the
                  <span
                    className="mx-1 relative cursor-pointer bg-gradient-to-r from-[#FFFFFF] via-[#BBF985] to-[#009EFF] text-transparent bg-clip-text after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#FFFFFF] after:via-[#BBF985] after:to-[#009EFF]"
                    onClick={() =>
                      window.open(
                        'https://spidex-ai.gitbook.io/spidex-ai-docs/privacy-policy',
                        '_blank'
                      )
                    }
                  >
                    Privacy Policy
                  </span>
                  and
                  <span
                    className="mx-1 relative cursor-pointer bg-gradient-to-r from-[#FFFFFF] via-[#BBF985] to-[#009EFF] text-transparent bg-clip-text after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#FFFFFF] after:via-[#BBF985] after:to-[#009EFF]"
                    onClick={() =>
                      window.open(
                        'https://spidex-ai.gitbook.io/spidex-ai-docs/terms-of-use',
                        '_blank'
                      )
                    }
                  >
                    Terms of Use
                  </span>
                </span>
              </div>
              <div className="flex gap-2 items-start pl-8">
                <input
                  type="checkbox"
                  name="privacy-policy"
                  id="privacy-policy"
                  className="mt-0.5"
                  checked={isPrivacyAccepted}
                  onChange={e => setIsPrivacyAccepted(e.target.checked)}
                />
                <label htmlFor="privacy-policy" className="text-sm font-light">
                  I have read and accepted the terms of the Spidex AI Privacy
                  Policy and Terms of Use
                </label>
              </div>
            </div>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 py-2">
                <div
                  className="px-2 py-1 text-black font-bold rounded-lg text-xs"
                  style={{
                    background: 'linear-gradient(90deg, #BBF985,#009EFF)',
                  }}
                >
                  2
                </div>
                <span>Choose Wallet</span>
              </div>
              <div className="space-y-2 max-h-[350px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto">
                <div className="space-y-2 flex flex-col gap-2">
                  {WALLET_METHODS.map(renderWalletOption)}
                  {renderMetamaskConnect()}
                </div>
              </div>

              {!hideSocialLogin && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-full h-[1px] bg-text-icon -translate-y-[2px]"></div>
                    <span className="text-white px-4">Or</span>
                    <div className="w-full h-[1px] bg-text-icon -translate-y-[2px]"></div>
                  </div>
                  <div className="flex justify-between items-center gap-3 pt-2">
                    {SOCIAL_METHODS.map(renderSocialOption)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WalletNotInstalledDialog
        isOpen={showWalletNotInstalled}
        onClose={() => setShowWalletNotInstalled(false)}
        walletName={notInstalledWallet?.name || ''}
        walletLogo={notInstalledWallet?.logo || ''}
        walletLink={notInstalledWallet?.link || ''}
        walletId={notInstalledWallet?.id || ''}
      />

      <Dialog
        open={isReferralModalOpen}
        onOpenChange={() => setIsReferralModalOpen(false)}
      >
        <DialogContent className="!bg-bg-modal !border-none !p-8">
          <DialogHeader>
            <p className="self-start font-medium text-2xl">Referral</p>
          </DialogHeader>

          <div>
            <div className="text-text-gray text-sm font-normal">
              Register referral code and receive a 10% boost in SILK
            </div>
            <div className="flex items-center gap-2 mt-6">
              <img src="/icons/dot-green.svg" alt="dot" />
              <div>{`Inviter's Code`}</div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-5 py-5 px-8 bg-bg-main rounded-lg">
              <div>{params.get('ref')}</div>
              <div>
                <img src="/icons/tick-green.svg" alt="copy" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-5">
              <div></div>
              <div>
                <GradientButton onClick={handleConnectReferral}>
                  Next
                </GradientButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TelegramModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onSuccess={result => {
          console.log('Telegram login successful', result);
          setIsTelegramModalOpen(false);
          closeModal();
        }}
        onError={error => {
          console.error('Telegram login error', error);
          setIsTelegramModalOpen(false);
        }}
      />
    </>
  );
};

export default LoginModal;
