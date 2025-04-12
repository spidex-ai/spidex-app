'use client'

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet"
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core"
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import { useGoogleLogin, useXLogin } from '@/hooks/social/useSocialLogin'
import { cn } from '@/lib/utils'
import { initNufiDappCardanoSdk } from '@nufi/dapp-client-cardano'
import nufiCoreSdk from '@nufi/dapp-client-core'
import { useSpidexCoreContext } from '../_contexts'

// Simple Label component since shadcn doesn't export one directly
const Label = React.forwardRef<
  HTMLLabelElement, 
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
))
Label.displayName = "Label"

// Wallet methods configuration
const WALLET_METHODS = [
  {
    id: "lace",
    name: "Lace",
    icon: "/icons/nami.svg",
    description: "Connect Lace Wallet",
  },
  {
    id: "yoroi",
    name: "Yoroi",
    icon: "/icons/yoroi.svg",
    description: "Connect Yoroi Wallet",
  },
  {
    id: "vespr",
    name: "Vespr",
    icon: "/icons/vespr.svg",
    description: "Connect Vespr Wallet",
  },
  {
    id: "gerowallet",
    name: "Gero",
    icon: "/icons/gero.svg",
    description: "Connect Gero Wallet",
  },
  {
    id: "lucem",
    name: "Lucem",
    icon: "/icons/lucem.svg",
    description: "Connect Lucem Wallet",
  },
  {
    id: "begin",
    name: "Begin",
    icon: "/icons/begin.svg",
    description: "Connect Begin Wallet",
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "/icons/eternl.svg",
    description: "Connect Eternl Wallet",
  },
  {
    id: "nami",
    name: "Nami",
    icon: "/icons/nami.svg",
    description: "Connect Nami Wallet",
  },
  {
    id: "typhon",
    name: "Typhon",
    icon: "/icons/typhon.svg",
    description: "Connect Typhon Wallet",
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

const LoginButton: React.FC = () => {
  const [walletConnecting, setWalletConnecting] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const processedCodeRef = useRef<string | null>(null)
  const [openConnected, setOpenConnected] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useSearchParams()

  // Custom hooks
  const { signMessage: signMessageSpidex, auth, getNounce } = useSpidexCoreContext()
  const { signInWithGoogle } = useGoogleLogin()
  const { signInWithX } = useXLogin()

  useEffect(() => {
    if (auth?.userId) {
      router.replace('/chat')
    }
  }, [auth?.userId])
  
  nufiCoreSdk.init('https://wallet.nu.fi', {
    zIndex: 1402
  })
  
  const {
    stakeAddress,
    connect,
    signMessage,
    disconnect,
    enabledWallet
  } = useCardano({
    limitNetwork: NetworkType.MAINNET,
  })
  
  // Determine if any connection is in progress
  const anyConnectionInProgress = walletConnecting !== null || isConnecting
  
  // Derive base URL for social login redirects
  const baseUrl = useMemo(
    () => window.location.href.split("/").slice(0, 3).join("/") + "/app",
    []
  )
  
  const hideWidget = async () => {
    const widgetApi = await nufiCoreSdk.getWidgetApi()
    widgetApi.hideWidget()
  }

  const onWalletConnectSuccess = useCallback(() => {
    handleSignMessage(stakeAddress?.toString())
  }, [stakeAddress, enabledWallet])

  const onWalletConnectError = (error: Error) => {
    console.log("Wallet connection error", error)
    if (error.name === "WrongNetworkTypeError") {
      console.log("WrongNetworkTypeError")
    } else if (error.name === "WalletExtensionNotFoundError") {
      console.log("WalletExtensionNotFoundError")
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
      
      await signMessage(
        nonce,
        (signature: string, key: string | undefined) =>
          signMessageSpidex({
            address,
            signature,
            publicKey: key || "",
            role: "user",
          }),
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
    }
  }
  
  /**
   * Connect with Google
   */
  const handleConnectGoogle = () => {
    if (anyConnectionInProgress) return
    setIsConnecting(true)
    signInWithGoogle()
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
      
      if (result) {
        console.log("X login successful")
        // remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
      }
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
    nufiCoreSdk.isMetamaskInstalled().then(async (isMetamaskInstalled) => {
      if (isMetamaskInstalled) {
        initNufiDappCardanoSdk(nufiCoreSdk, 'snap')
        Object.defineProperty((window as any).cardano, 'nufisnap', {
          get: function() {
            return (window as any).cardano.nufiSnap
          },
          configurable: true
        })
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
          "p-3 rounded-md border border-solid text-white",
          isThisWalletConnecting ? "border-blue-500 bg-blue-50" : "border-gray-200",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-blue-500 hover:bg-blue-50 hover:text-black",
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
          
          {isThisWalletConnecting && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
        </div>
      </div>
    )
  }
  
  // Render social login option
  const renderSocialOption = (method: (typeof SOCIAL_METHODS)[0]) => {
    const handleClick = method.id === "google" ? handleConnectGoogle : handleConnectX
    
    const isThisConnecting = isConnecting && !walletConnecting
    const isDisabled = anyConnectionInProgress && walletConnecting !== null
    
    return (
      <div
        key={method.id}
        className={cn(
          "p-3 rounded-md border border-solid border-gray-200 text-white",
          isDisabled 
            ? "cursor-not-allowed opacity-50" 
            : "cursor-pointer hover:border-blue-500 hover:bg-blue-50 hover:text-black",
          "transition-all duration-200"
        )}
        onClick={() => !isDisabled && handleClick()}
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
          
          {isThisConnecting &&
            method.id === "xlogin" &&
            processedCodeRef.current && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
        </div>
      </div>
    )
  }
  
  // Render Metamask option
  const renderMetamaskConnect = () => {
    return (
      <div
        key="metamask"
        className={cn(
          "p-3 rounded-md border border-solid border-gray-200 text-white",
          "cursor-pointer hover:border-blue-500 hover:bg-blue-50 hover:text-black",
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
        </div>
      </div>
    )
  }

  return (
    <>
      <Button
        variant="default"
        onClick={() => setOpen(true)}
        className="w-24 h-10"
      >
        Login
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Choose a method to connect to your wallet
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 max-h-[500px] overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Cardano Wallets</h3>
              <div className="space-y-2">
              {renderMetamaskConnect()}
                {WALLET_METHODS.map(renderWalletOption)}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Social Login</h3>
              <div className="space-y-2">
                {SOCIAL_METHODS.map(renderSocialOption)}
              </div>
            </div>

          </div>
          
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginButton