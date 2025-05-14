'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  GradientButton,
} from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { useXLogin } from "@/hooks/social/useSocialLogin";

interface ReminderModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
const ReminderModal = ({ isOpen, onOpenChange }: ReminderModalProps) => {
    const { signInWithX } = useXLogin()
  const [isClient, setIsClient] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const params = useSearchParams()
  const processedCodeRef = useRef<string | null>(null)


  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href.split("/").slice(0, 3).join("/");
    }
    return "";
  }, [isClient]);
  const handleConnectX = () => {

    setIsConnecting(true)
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MFkxSjU3TjVWUGpMLVhYV08tblU6MTpjaQ&redirect_uri=${baseUrl}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`
    window.location.href = xAuthUrl
  }
  const handleXCallback = async (code: string, redirectUri: string) => {
    try {
      if (isConnecting) return

      setIsConnecting(true)
      const ref = params.get("ref")
      const result = await signInWithX(code, redirectUri, ref || '')

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
      onOpenChange(false)
    } catch (error: any) {
      console.log("X login error", error)
    } finally {
      setIsConnecting(false)
    }
  }
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const socialConnectCode = params.get("code")
    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode
      handleXCallback(socialConnectCode, baseUrl)
    }
  }, [params, baseUrl])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
