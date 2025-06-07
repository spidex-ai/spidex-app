'use client'
import {
  Dialog,
  DialogContent,
  GradientButton,
} from "@/components/ui";
import { useXLogin } from "@/hooks/social/useSocialLogin";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ReminderModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const ReminderModal = ({ isOpen, onOpenChange }: ReminderModalProps) => {
    const { signInWithX } = useXLogin()
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
  const handleXCallback = async (code: string) => {
    try {
      if (isConnecting) return

      setIsConnecting(true)
      const ref = params.get("ref")
      const redirectUri = getCurrentUrl();
      const result = await signInWithX(code, redirectUri, ref || '')

      if (result && typeof window !== 'undefined') {
        console.log("X login successful")
      }
      // Close the modal when X login is initiated
      onOpenChange(false)
    } catch (error: any) {
      console.log("X login error", error)
    } finally {
      setIsConnecting(false)
    }
  }

  useEffect(() => {
    const socialConnectCode = params.get("code")
    const callbackType = params.get("type");

    if (socialConnectCode && socialConnectCode !== processedCodeRef.current && callbackType === "connect-x") {
      processedCodeRef.current = socialConnectCode
      handleXCallback(socialConnectCode)
    }
  }, [params])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!bg-bg-modal">
        <div className="text-white text-2xl font-medium mt-5">Reminder</div>
        <div className="text-white text-sm">
          To participate in this quest, please link your X
        </div>
        <div className="flex justify-end mt-5">
          <GradientButton onClick={handleConnectX} isLoading={isConnecting}>Go now</GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderModal;
