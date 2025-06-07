"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TelegramCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all Telegram auth parameters from URL
    const id = searchParams.get("id");
    const first_name = searchParams.get("first_name");
    const last_name = searchParams.get("last_name");
    const username = searchParams.get("username");
    const photo_url = searchParams.get("photo_url");
    const auth_date = searchParams.get("auth_date");
    const hash = searchParams.get("hash");
    const referralCode = searchParams.get("referralCode");

    if (id && first_name && auth_date && hash) {
      // Store the Telegram auth data in localStorage for the main app to process
      const telegramAuthData = {
        id,
        first_name,
        last_name: last_name || "",
        username: username || "",
        photo_url: photo_url || "",
        auth_date: parseInt(auth_date),
        hash,
        referralCode: referralCode || ""
      };

      localStorage.setItem('telegramAuthSuccess', JSON.stringify(telegramAuthData));
      
      // Redirect back to the main app with success parameter
      const redirectUrl = new URL(window.location.origin);
      redirectUrl.searchParams.set('telegram-success', 'true');
      if (referralCode) {
        redirectUrl.searchParams.set('ref', referralCode);
      }
      
      window.location.href = redirectUrl.toString();
    } else {
      // Redirect back with error
      const redirectUrl = new URL(window.location.origin);
      redirectUrl.searchParams.set('telegram-error', 'Invalid authentication data');
      
      window.location.href = redirectUrl.toString();
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-main">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Processing Telegram authentication...</p>
      </div>
    </div>
  );
}
