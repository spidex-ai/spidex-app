"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
}

const TelegramModal: React.FC<TelegramModalProps> = ({
  isOpen,
  onClose,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [botUsername, setBotUsername] = useState<string>("");
  const [telegramWidgetContainer, setTelegramWidgetContainer] = useState<HTMLDivElement | null>(null);
  const params = useSearchParams();

  // Load Telegram widget configuration when modal opens
  useEffect(() => {
    if (isOpen && !botUsername) {
      loadTelegramConfig();
    }
  }, [isOpen, botUsername]);

  // Load Telegram widget when container and bot username are ready
  useEffect(() => {
    if (botUsername && telegramWidgetContainer && isOpen) {
      loadTelegramWidget(botUsername);
    }
  }, [botUsername, telegramWidgetContainer, isOpen]);

  const loadTelegramConfig = async () => {
    try {
      setLoading(true);
      
      // Get widget configuration from API
      const response = await fetch(`${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/telegram/widget-config`, {
        headers: { accept: '*/*' }
      });

      if (!response.ok) {
        throw new Error(`Failed to get widget config: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error('Invalid widget config response');
      }

      setBotUsername(result.data.botUsername);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load Telegram widget';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadTelegramWidget = (configBotUsername: string) => {
    if (!configBotUsername || !telegramWidgetContainer) return;

    // Clear any existing content
    telegramWidgetContainer.innerHTML = '';

    // Create Telegram Login Widget script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', configBotUsername);
    script.setAttribute('data-size', 'large');

    // Build callback URL with optional referral code
    const ref = params.get("ref");
    let authUrl = `${window.location.origin}/telegram-callback`;
    if (ref) {
      authUrl += `?referralCode=${encodeURIComponent(ref)}`;
    }
    script.setAttribute('data-auth-url', authUrl);

    // Add widget to container
    telegramWidgetContainer.appendChild(script);
  };

  const handleClose = () => {
    // Clear the widget when closing
    if (telegramWidgetContainer) {
      telegramWidgetContainer.innerHTML = '';
    }
    setBotUsername("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[445px] !bg-bg-tab !border-none !p-8">
        <DialogHeader>
          <p className="self-start text-2xl">Connect Telegram</p>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <p className="text-text-gray text-sm">
            Connect your Telegram account to access exclusive features and notifications.
          </p>
          
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-3 text-white">Loading Telegram widget...</span>
            </div>
          ) : botUsername ? (
            <div className="flex flex-col gap-4">
              <div
                ref={setTelegramWidgetContainer}
                className="flex items-center justify-center p-4 rounded-lg bg-bg-secondary min-h-[60px]"
              />
              <p className="text-xs text-text-gray text-center">
                Click the button above to authenticate with Telegram
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8">
              <p className="text-red-400">Failed to load Telegram widget</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramModal;
