"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { decodeHexAddress, NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  GradientButton,
} from "@/components/ui";
import { useGoogleLogin, useXLogin } from "@/hooks/social/useSocialLogin";
import { cn } from "@/lib/utils";
import { initNufiDappCardanoSdk } from "@nufi/dapp-client-cardano";
import nufiCoreSdk from "@nufi/dapp-client-core";
import { useSpidexCoreContext } from "../_contexts";
import { useLoginModal } from "../_contexts/login-modal-context";
import WalletNotInstalledDialog from "./wallet-not-installed-dialog";


// Wallet methods configuration
const WALLET_METHODS = [
  {
    id: "lace",
    name: "Lace",
    icon: "/icons/nami.svg",
    description: "Lace Wallet",
    link: "https://www.lace.io/",
  },
  {
    id: "yoroi",
    name: "Yoroi",
    icon: "/icons/yoroi.svg",
    description: "Yoroi Wallet",
    link: "https://yoroi-wallet.com/",
  },
  {
    id: "vespr",
    name: "Vespr",
    icon: "/icons/vespr.svg",
    description: "Vespr Wallet",
    link: "https://vespr.xyz/",
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "/icons/eternl.svg",
    description: "Eternl Wallet",
    link: "https://eternl.io/",
  },
  {
    id: "gerowallet",
    name: "Gero",
    icon: "/icons/gero.svg",
    description: "Gero Wallet",
    link: "https://www.gerowallet.io/",
  },
  {
    id: "lucem",
    name: "Lucem",
    icon: "/icons/lucem.svg",
    description: "Lucem Wallet",
    link: "https://chromewebstore.google.com/detail/lucem-wallet/mkbnofdoodemclcbcjpgpcdccjhaledi",
  },
  {
    id: "begin",
    name: "Begin",
    icon: "/icons/begin.svg",
    description: "Begin Wallet",
    link: "https://begin.is/",
  },
  {
    id: "typhon",
    name: "Typhon",
    icon: "/icons/typhon.svg",
    description: "Typhon Wallet",
    link: "https://typhonwallet.io/",
  },
  {
    id: "nufi",
    name: "Nufi",
    icon: "/icons/nufi.svg",
    description: "Nufi Wallet",
  },
];

// Define social login methods
const SOCIAL_METHODS = [
  {
    id: "google",
    name: "Google",
    icon: "/icons/google.svg",
    description: "Login With Google",
  },
  {
    id: "xlogin",
    name: "X",
    icon: "/icons/x-login.svg",
    description: "Login With X",
  },
];

const METAMASK_METHOD = {
  id: "metamask",
  name: "Metamask",
  icon: "/icons/metamask.svg",
  description: "Metamask",
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
  } | null>(null);
  const processedCodeRef = useRef<string | null>(null);
  const params = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  // Custom hooks
  const { signMessage: signMessageSpidex, getNounce } = useSpidexCoreContext();
  const { signInWithGoogle } = useGoogleLogin();
  const { signInWithX } = useXLogin();
  const { isOpen, closeModal, hideSocialLogin } = useLoginModal();

  const [isReferralModalOpen, setIsReferralModalOpen] =
    useState<boolean>(false);
  const [method, setMethod] = useState<string>("");

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (auth?.userId) {
  //     router.replace('/chat')
  //   }
  // }, [auth?.userId])

  // Only initialize NuFi SDK on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      nufiCoreSdk.init("https://wallet.nu.fi", {
        zIndex: 1402,
      });
    }
  }, []);

  const { unusedAddresses, connect, signMessage, disconnect, enabledWallet } =
    useCardano({
      limitNetwork: NetworkType.MAINNET,
    });
    console.log(enabledWallet, "enabledWallet");
  // Determine if any connection is in progress
  const anyConnectionInProgress = walletConnecting !== null || isConnecting;

  // Derive base URL for social login redirects - only on client
  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href.split("/").slice(0, 3).join("/");
    }
    return "";
  }, [isClient]);

  const onWalletConnectError = (error: Error) => {
    console.log("Wallet connection error", error);
    if (error.name === "WrongNetworkTypeError") {
      console.log("WrongNetworkTypeError");
    } else if (error.name === "WalletNotInstalledError") {
      console.log("WalletNotInstalledError");
      const walletName = error.message.split(" ")[2];
      const wallet = WALLET_METHODS.find((w) => w.id === walletName);
      setNotInstalledWallet({
        name: wallet?.name || "",
        logo: wallet?.icon || "",
        link: wallet?.link || "",
      });
      setShowWalletNotInstalled(true);
    } else {
      console.log("Error", error);
    }
    disconnect();
    setWalletConnecting(null);
  };

  /**
   * Connect to Cardano wallet
   */
  const handleConnectWallet = async (walletName: string) => {
    if (anyConnectionInProgress) {
      console.log("Connection already in progress");
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
    console.log
    if (params.get("ref")) {
      setIsReferralModalOpen(true);
      setMethod(method);
    } else {
      handleConnectWallet(method);
    }
  }

  const handleConnect = useCallback(() => {
    console.log("🚀 ~ handleConnect ~ method:", method);
    setIsReferralModalOpen(false);
    if (method === "nufi") {
      handleConnectMetamask();
    } else if (method === "google") {
      handleConnectGoogle();
    } else if (method === "xlogin") {
      handleConnectX();
    } else {
      handleConnectWallet(method);
    }
  }, [method])

  /**
   * Sign message with connected wallet
   */
  const handleSignMessage = async (walletName: string) => {
    try {
      if (!enabledWallet) {
        console.log("No wallet connected");
        return;
      }
      let address = null;
      const api = await (window as any).cardano[walletName as any].enable();
      await api?.getUtxos();
      const unusedAddressesHex = await api.getUnusedAddresses();
      if (!unusedAddressesHex || unusedAddressesHex.length === 0) {
        console.log("No unused addresses found");
        const usedAddresses = await api.getUsedAddresses();
        if (usedAddresses && usedAddresses.length > 0) {
          address = decodeHexAddress(usedAddresses[0]);
        }
      } else {
        address = decodeHexAddress(unusedAddressesHex[0]);
      }
      console.log("🚀 ~ handleSignMessage ~ address:", address);
      if (!address) {
        return;
      }
      const nonce = await getNounce();
      if (!nonce) return;
      const ref = params.get("ref");
      console.log("🚀 ~ handleSignMessage ~ ref:", ref);

      await signMessage(
        nonce,
        async (signature: string, key: string | undefined) => {
          await signMessageSpidex(
            {
              address,
              signature,
              publicKey: key || "",
              role: "user",
              referralCode: ref || "",
            },
            enabledWallet || ""
          );
          closeModal();
        },
        (error: any) => {
          disconnect();
          console.log("Sign message failed1", error);
        }
      );
    } catch (error: any) {
      disconnect();
      console.log("Sign message failed2", error);
    } finally {
      setWalletConnecting(null);
    }
  };

  /**
   * Connect with Google
   */
  const handleConnectGoogle = async () => {
    if (anyConnectionInProgress) return;
    try {
      setIsConnecting(true);
      const ref = params.get("ref");
      await signInWithGoogle(ref || "");
      // Close the modal when Google login is initiated
      closeModal();
    } catch (error: any) {
      console.log("Google login error", error);
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
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MFkxSjU3TjVWUGpMLVhYV08tblU6MTpjaQ&redirect_uri=${baseUrl}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  /**
   * Handle X (Twitter) OAuth callback
   */
  const handleXCallback = async (code: string, redirectUri: string) => {
    try {
      if (isConnecting) return;

      setIsConnecting(true);
      const ref = params.get("ref");
      const result = await signInWithX(code, redirectUri, ref || "");

      if (result && typeof window !== "undefined") {
        console.log("X login successful");
        // remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
      // Close the modal when X login is initiated
      closeModal();
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

  const handleConnectMetamask = () => {
    if (typeof window === "undefined") return;

    nufiCoreSdk.isMetamaskInstalled().then(async (isMetamaskInstalled) => {
      if (isMetamaskInstalled) {
        initNufiDappCardanoSdk(nufiCoreSdk, "snap");
        if ((window as any).cardano) {
          Object.defineProperty((window as any).cardano, "nufisnap", {
            get: function () {
              return (window as any).cardano.nufiSnap;
            },
            configurable: true,
          });
        }
        handleCheckReferral("nufisnap");
      } else {
        console.log("Metamask is not installed");
      }
    });
  };

  // Render wallet option
  const renderWalletOption = (method: (typeof WALLET_METHODS)[0]) => {
    const isThisWalletConnecting = walletConnecting === method.id;
    const isDisabled = anyConnectionInProgress && !isThisWalletConnecting;

    return (
      <div
        key={method.id}
        className={cn(
          "p-2 rounded-md  text-white",
          isThisWalletConnecting ? "bg-blue-50" : "border-gray-200",
          isDisabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-blue-50 hover:text-black",
          "transition-all duration-200"
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
    // const handleClick =
    //   method.id === "google" ? handleConnectGoogle : handleConnectX;
    const isDisabled = anyConnectionInProgress && walletConnecting !== null;

    return (
      <div
        key={method.id}
        className={cn(
          "p-3 rounded-lg text-white w-full border border-solid border-transparent bg-bg-secondary",
          isDisabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer  hover:border-blue-50 hover:text-black",
          "transition-all duration-200"
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
    const isThisWalletConnecting = walletConnecting === "nufisnap";
    return (
      <div
        key="metamask"
        className={cn(
          "p-2 rounded-md border-gray-200 text-white",
          "cursor-pointer hover:bg-blue-50 hover:text-black",
          "transition-all duration-200"
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
        <DialogContent className="sm:max-w-[425px] !bg-bg-tab !border-none !p-8">
          <DialogHeader>
            <p className="self-start text-2xl">Connect Wallet</p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2 max-h-[350px] sm:max-h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto">
              <div className="space-y-2">
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
        </DialogContent>
      </Dialog>

      <WalletNotInstalledDialog
        isOpen={showWalletNotInstalled}
        onClose={() => setShowWalletNotInstalled(false)}
        walletName={notInstalledWallet?.name || ""}
        walletLogo={notInstalledWallet?.logo || ""}
        walletLink={notInstalledWallet?.link || ""}
      />

      <Dialog open={isReferralModalOpen} onOpenChange={() => setIsReferralModalOpen(false)}>
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
              <div>{params.get("ref")}</div>
              <div>
                <img src="/icons/tick-green.svg" alt="copy" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-5">
              <div></div>
              <div>
                <GradientButton onClick={handleConnect}>Next</GradientButton>
              </div>
            </div>
          </div>
        </DialogContent>
    
      </Dialog>
    </>
  );
};

export default LoginModal;
