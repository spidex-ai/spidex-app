'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  GradientButton,
} from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/utils/use-mobile';
import { useRouter } from 'next/navigation';

interface WalletNotInstalledDialogProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
  walletLogo: string;
  walletLink: string;
  walletId: string;
  iosLink?: string;
  androidLink?: string;
}

const WalletNotInstalledDialog: React.FC<WalletNotInstalledDialogProps> = ({
  isOpen,
  onClose,
  walletName,
  walletLogo,
  walletLink,
  walletId,
  iosLink,
  androidLink,
}) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] !bg-bg-tab">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4 -translate-y-[1px]" />
              <span>Go back</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col items-center gap-6">
          <p className="text-white text-2xl">
            Connect to {walletName} {walletId === 'subwallet' ? null : 'Wallet'}
          </p>
          <div className="flex items-center gap-4 justify-center flex-col p-6 rounded-lg w-[302px] h-[244px] bg-bg-secondary">
            <Image src={walletLogo} alt={walletName} width={150} height={150} />
            <p className="text-white text-lg">
              {walletName} {walletId === 'subwallet' ? null : 'Wallet'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/icons/alert-fill.svg"
              alt="Alert"
              width={20}
              height={20}
            />
            <p className="text-white text-sm translate-y-[2px]">
              {isMobile
                ? "Download the mobile app to continue"
                : "Oops! Wallet extension is not installed."
              }
            </p>
          </div>

          {isMobile && (iosLink || androidLink) ? (
            <div className="w-full space-y-3 flex flex-col items-center">
              {iosLink && (
                <GradientButton
                  className="w-[302px] py-3 rounded-full"
                  onClick={() => router.push(iosLink)}
                >
                  Download for iOS
                </GradientButton>
              )}
              {androidLink && (
                <GradientButton
                  className="w-[302px] py-3 rounded-full"
                  onClick={() => router.push(androidLink)}
                >
                  Download for Android
                </GradientButton>
              )}
            </div>
          ) : (
            <div className="w-full text-center">
              <GradientButton
                className="w-[302px] py-3 rounded-full"
                onClick={() => window.open(walletLink, '_blank')}
              >
                Get Wallet
              </GradientButton>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletNotInstalledDialog;
