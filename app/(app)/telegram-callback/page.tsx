'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TelegramCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all Telegram auth parameters from URL
    const id = searchParams.get('id');
    const first_name = searchParams.get('first_name');
    const last_name = searchParams.get('last_name');
    const username = searchParams.get('username');
    const photo_url = searchParams.get('photo_url');
    const auth_date = searchParams.get('auth_date');
    const hash = searchParams.get('hash');
    const referralCode = searchParams.get('referralCode');

    if (id && first_name && auth_date && hash) {
      // Store the Telegram auth data in localStorage for the main app to process
      const telegramAuthData = {
        id,
        first_name,
        last_name: last_name || '',
        username: username || '',
        photo_url: photo_url || '',
        auth_date: parseInt(auth_date),
        hash,
        referralCode: referralCode || '',
      };

      localStorage.setItem(
        'telegramAuthSuccess',
        JSON.stringify(telegramAuthData)
      );

      // Get the saved return URL from localStorage, fallback to origin
      let redirectUrl: URL;
      const savedReturnUrlData = localStorage.getItem('telegramAuthReturnUrl');

      if (savedReturnUrlData) {
        try {
          const returnData = JSON.parse(savedReturnUrlData);
          const savedUrl = returnData.url;
          const savedTimestamp = returnData.timestamp;

          // Check if the saved URL is not too old (max 1 hour)
          const maxAge = 60 * 60 * 1000; // 1 hour in milliseconds
          const isExpired = Date.now() - savedTimestamp > maxAge;

          if (isExpired) {
            console.warn('Saved return URL expired, falling back to origin');
            redirectUrl = new URL(window.location.origin);
          } else {
            redirectUrl = new URL(savedUrl);
            console.log('Using saved return URL for Telegram auth:', savedUrl);
          }

          // Clean up the saved URL
          localStorage.removeItem('telegramAuthReturnUrl');
        } catch (error) {
          console.warn('Invalid saved return URL data, falling back to origin:', error);
          redirectUrl = new URL(window.location.origin);
          localStorage.removeItem('telegramAuthReturnUrl');
        }
      } else {
        console.log('No saved return URL found, using origin');
        redirectUrl = new URL(window.location.origin);
      }

      // Add success parameter and referral code
      redirectUrl.searchParams.set('telegram-success', 'true');
      if (referralCode) {
        redirectUrl.searchParams.set('ref', referralCode);
      }

      window.location.href = redirectUrl.toString();
    } else {
      // Get the saved return URL for error case too
      let redirectUrl: URL;
      const savedReturnUrlData = localStorage.getItem('telegramAuthReturnUrl');

      if (savedReturnUrlData) {
        try {
          const returnData = JSON.parse(savedReturnUrlData);
          const savedUrl = returnData.url;
          const savedTimestamp = returnData.timestamp;

          // Check if the saved URL is not too old (max 1 hour)
          const maxAge = 60 * 60 * 1000; // 1 hour in milliseconds
          const isExpired = Date.now() - savedTimestamp > maxAge;

          if (isExpired) {
            console.warn('Saved return URL expired for error case, falling back to origin');
            redirectUrl = new URL(window.location.origin);
          } else {
            redirectUrl = new URL(savedUrl);
            console.log('Using saved return URL for Telegram auth error:', savedUrl);
          }

          // Clean up the saved URL
          localStorage.removeItem('telegramAuthReturnUrl');
        } catch (error) {
          console.warn('Invalid saved return URL data for error, falling back to origin:', error);
          redirectUrl = new URL(window.location.origin);
          localStorage.removeItem('telegramAuthReturnUrl');
        }
      } else {
        console.log('No saved return URL found for error, using origin');
        redirectUrl = new URL(window.location.origin);
      }

      // Add error parameter
      redirectUrl.searchParams.set(
        'telegram-error',
        'Invalid authentication data'
      );

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
