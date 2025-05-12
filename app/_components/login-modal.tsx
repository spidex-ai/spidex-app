'use client'

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet"
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core"
import { ChevronRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui'
import { useGoogleLogin, useXLogin } from '@/hooks/social/useSocialLogin'
import { cn } from '@/lib/utils'
import { initNufiDappCardanoSdk } from '@nufi/dapp-client-cardano'
import nufiCoreSdk from '@nufi/dapp-client-core'
import { useSpidexCoreContext } from '../_contexts'
import { useLoginModal } from '../_contexts/login-modal-context'
import WalletNotInstalledDialog from './wallet-not-installed-dialog'

// Wallet methods configuration
const WALLET_METHODS = [
  {
    id: "lace",
    name: "Lace",
    icon: "/icons/nami.svg",
    description: "Connect Lace Wallet",
    link: "https://www.lace.io/"
  },
  {
    id: "yoroi",
    name: "Yoroi",
    icon: "/icons/yoroi.svg",
    description: "Connect Yoroi Wallet",
    link: "https://yoroi-wallet.com/"
  },
  {
    id: "subwallet",
    name: "Subwallet",
    icon: "/icons/subwallet.svg",
    description: "Connect Subwallet Wallet",
    link: "https://www.subwallet.app/"
  },
  {
    id: "vespr",
    name: "Vespr",
    icon: "/icons/vespr.svg",
    description: "Connect Vespr Wallet",
    link: "https://vespr.xyz/"
  },
  {
    id: "gerowallet",
    name: "Gero",
    icon: "/icons/gero.svg",
    description: "Connect Gero Wallet",
    link: "https://www.gerowallet.io/"
  },
  {
    id: "lucem",
    name: "Lucem",
    icon: "/icons/lucem.svg",
    description: "Connect Lucem Wallet",
    link: "https://chromewebstore.google.com/detail/lucem-wallet/mkbnofdoodemclcbcjpgpcdccjhaledi"
  },
  {
    id: "begin",
    name: "Begin",
    icon: "/icons/begin.svg",
    description: "Connect Begin Wallet",
    link: "https://begin.is/"
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "/icons/eternl.svg",
    description: "Connect Eternl Wallet",
    link: "https://eternl.io/"
  },
  {
    id: "typhon",
    name: "Typhon",
    icon: "/icons/typhon.svg",
    description: "Connect Typhon Wallet",
    link: "https://typhonwallet.io/"
  },
  {
    id: "nufi",
    name: "Nufi",
    icon: "/icons/nufi.svg",
    description: "Connect Nufi Wallet",
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

const LoginModal: React.FC = () => {
  const [walletConnecting, setWalletConnecting] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletNotInstalled, setShowWalletNotInstalled] = useState(false)
  const [notInstalledWallet, setNotInstalledWallet] = useState<{ name: string, logo: string, link: string } | null>(null)
  const processedCodeRef = useRef<string | null>(null)
  const params = useSearchParams()
  const [isClient, setIsClient] = useState(false)

  // Custom hooks
  const { signMessage: signMessageSpidex, getNounce } = useSpidexCoreContext()
  const { signInWithGoogle } = useGoogleLogin()
  const { signInWithX } = useXLogin()
  const { isOpen, closeModal, hideSocialLogin } = useLoginModal()

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true)
  }, [])

  // useEffect(() => {
  //   if (auth?.userId) {
  //     router.replace('/chat')
  //   }
  // }, [auth?.userId])

  // Only initialize NuFi SDK on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      nufiCoreSdk.init('https://wallet.nu.fi', {
        zIndex: 1402
      })
    }
  }, [])

  const {
    unusedAddresses,
    connect,
    signMessage,
    disconnect,
    enabledWallet,
  } = useCardano({
    limitNetwork: NetworkType.MAINNET,
  })
  // Determine if any connection is in progress
  const anyConnectionInProgress = walletConnecting !== null || isConnecting

  // Derive base URL for social login redirects - only on client
  const baseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href.split("/").slice(0, 3).join("/")
    }
    return ''
  }, [isClient])

  const onWalletConnectSuccess = useCallback(() => {
    handleSignMessage(unusedAddresses?.[0]?.toString())
  }, [unusedAddresses, enabledWallet])

  const onWalletConnectError = (error: Error) => {
    console.log("Wallet connection error", error)
    if (error.name === "WrongNetworkTypeError") {
      console.log("WrongNetworkTypeError")
    } else if (error.name === "WalletNotInstalledError") {
      // console.log(error.message)
      // The wallet typhon is not installed.
      const walletName = error.message.split(' ')[2]
      const wallet = WALLET_METHODS.find(w => w.id === walletName)
      setNotInstalledWallet({ name: wallet?.name || '', logo: wallet?.icon || '', link: wallet?.link || '' })
      setShowWalletNotInstalled(true)
    } else {
      console.log("Error", error)
    }
    setWalletConnecting(null)
  }

  /**
   * Connect to Cardano wallet
   */
  const handleConnectWallet = async (walletName: string) => {
    if (anyConnectionInProgress) {
      console.log("Connection already in progress")
      return
    }

    setWalletConnecting(walletName)

    connect(
      walletName,
      () => onWalletConnectSuccess(),
      (error: Error) => onWalletConnectError(error)
    )
  }

  /**
   * Sign message with connected wallet
   */
  const handleSignMessage = async (address?: string) => {
    try {
      if (!address) {
        return
      }
      const nonce = await getNounce()
      if (!nonce) return

      const ref = params.get("ref")

      await signMessage(
        nonce,
        async (signature: string, key: string | undefined) => {
          await signMessageSpidex({
            address,
            signature,
            publicKey: key || "",
            role: "user",
            referralCode: ref || ""
          }, enabledWallet || "")
          closeModal()
        },
        (error: any) => {
          disconnect()
          console.log("Sign message failed", error)
        }
      )
    } catch (error: any) {
      disconnect()
      console.log("Sign message failed", error)
    } finally {
      console.log("Sign message complete")
      setWalletConnecting(null)
      // Close the modal when sign message is complete
    }
  }

  /**
   * Connect with Google
   */
  const handleConnectGoogle = async () => {
    if (anyConnectionInProgress) return
    try {
      setIsConnecting(true)
      await signInWithGoogle()
      // Close the modal when Google login is initiated
      closeModal()
    } catch (error: any) {
      console.log("Google login error", error)
    } finally {
      setIsConnecting(false)
    }
  }

  /**
   * Connect with X (Twitter)
   */
  const handleConnectX = () => {
    if (anyConnectionInProgress) return
    setIsConnecting(true)
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MFkxSjU3TjVWUGpMLVhYV08tblU6MTpjaQ&redirect_uri=${baseUrl}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`
    window.location.href = xAuthUrl
  }

  /**
   * Handle X (Twitter) OAuth callback
   */
  const handleXCallback = async (code: string, redirectUri: string) => {
    try {
      if (isConnecting) return

      setIsConnecting(true)
      const result = await signInWithX(code, redirectUri)

      if (result && typeof window !== 'undefined') {
        console.log("X login successful")
        // remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
      }
      // Close the modal when X login is initiated
      closeModal()
    } catch (error: any) {
      console.log("X login error", error)
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle X login callback via URL params
  useEffect(() => {
    const socialConnectCode = params.get("code")
    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode
      handleXCallback(socialConnectCode, baseUrl)
    }
  }, [params, baseUrl])

  const handleConnectMetamask = () => {
    if (typeof window === 'undefined') return

    nufiCoreSdk.isMetamaskInstalled().then(async (isMetamaskInstalled) => {
      if (isMetamaskInstalled) {
        initNufiDappCardanoSdk(nufiCoreSdk, 'snap')
        if ((window as any).cardano) {
          Object.defineProperty((window as any).cardano, 'nufisnap', {
            get: function () {
              return (window as any).cardano.nufiSnap
            },
            configurable: true
          })
        }
        handleConnectWallet('nufisnap')
      } else {
        console.log("Metamask is not installed")
      }
    })
  }

  // Render wallet option
  const renderWalletOption = (method: (typeof WALLET_METHODS)[0]) => {
    const isThisWalletConnecting = walletConnecting === method.id
    const isDisabled = anyConnectionInProgress && !isThisWalletConnecting

    return (
      <div
        key={method.id}
        className={cn(
          "p-3 rounded-md  text-white",
          isThisWalletConnecting ? "bg-blue-50" : "border-gray-200",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-blue-50 hover:text-black",
          "transition-all duration-200"
        )}
        onClick={() => !isDisabled && handleConnectWallet(method.id)}
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

          {isThisWalletConnecting ? <Loader2 className="h-4 w-4 animate-spin text-blue-500" /> : <ChevronRight className="h-4 w-4 text-icon" />}
        </div>
      </div>
    )
  }

  // Render social login option
  const renderSocialOption = (method: (typeof SOCIAL_METHODS)[0]) => {
    const handleClick = method.id === "google" ? handleConnectGoogle : handleConnectX
    const isDisabled = anyConnectionInProgress && walletConnecting !== null

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
        onClick={() => !isDisabled && handleClick()}
      >
        <div className="flex items-center justify-center">
          <div className="flex py-1 items-center justify-center">
            <Image
              src={method.icon}
              alt={method.name}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    )
  }

  // Render Metamask option
  const renderMetamaskConnect = () => {
    const isThisWalletConnecting = walletConnecting === 'nufisnap'
    return (
      <div
        key="metamask"
        className={cn(
          "p-3 rounded-md border-gray-200 text-white",
          "cursor-pointer hover:bg-blue-50 hover:text-black",
          "transition-all duration-200"
        )}
        onClick={() => handleConnectMetamask()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/icons/metamask.svg"
                alt="Metamask"
                width={30}
                height={30}
              />
            </div>
            <div>
              <span>Connect with Metamask</span>
            </div>
          </div>
          {isThisWalletConnecting ? <Loader2 className="h-4 w-4 animate-spin text-blue-500" /> : <ChevronRight className="h-4 w-4 text-icon" />}
        </div>
      </div>
    )
  }

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
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              <div className="space-y-2">
                {renderMetamaskConnect()}
                {WALLET_METHODS.map(renderWalletOption)}
              </div>
            </div>

            {!hideSocialLogin && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-full h-[1px] bg-text-icon -translate-y-[2px]"></div>
                  <span className="text-white px-4">Or</span>
                  <div className="w-full h-[1px] bg-text-icon -translate-y-[2px]"></div>
                </div>
                <div className="flex justify-between items-center gap-3">
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
        walletName={notInstalledWallet?.name || ''}
        walletLogo={notInstalledWallet?.logo || ''}
        walletLink={notInstalledWallet?.link || ''}
      />
    </>
  )
}

export default LoginModal 