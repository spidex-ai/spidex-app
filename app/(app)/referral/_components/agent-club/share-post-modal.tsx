'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  GradientButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';

interface SharePostModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refCode: string;
}
const SharePostModal = ({
  isOpen,
  onOpenChange,
  refCode,
}: SharePostModalProps) => {
  const handleShareToX = () => {
    const baseUrl = 'https://twitter.com/intent/tweet';
    const params = new URLSearchParams();

    const text = `Just got 10 SILK score on @Spidex_ag 🕸

Invite your friends & earn 10% more of what they gain!
What're you waiting for?

Claim yours 👉 ${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${refCode}

`;

    params.set('text', text);

    params.set('hashtags', 'DeFAI,Cardano,DeFi,AI,SpidexAI,SILK');
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, '_blank');

    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!bg-bg-modal">
        <div className="text-white text-2xl font-medium mt-5">
          Sharing this post
        </div>
        <div className="mt-5 text-sm flex flex-col gap-2 border border-border-main p-4 rounded-lg">
          <div>
            Just got 10 SILK score on{' '}
            <span className="text-white font-semibold">@Spidex_ag</span> 🕸
          </div>
          <div>
            {`Invite your friends & earn`}{' '}
            <span className="text-white font-semibold">10%</span>{' '}
            {`more of what they gain!`} <br /> {`What're you waiting for?`}
          </div>
          <div className="flex gap-2 items-center">
            <div className="shrink-0">Claim yours 👉 </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate">
                  {`${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${refCode}`}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {`${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${refCode}`}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div></div>
          <div>
            <GradientButton onClick={handleShareToX}>Retweet</GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePostModal;
