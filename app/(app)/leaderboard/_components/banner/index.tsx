'use client';

import { GradientBorderButton, GradientButton } from '@/components/ui';
import { TextGradient } from '@/components/ui/text';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <div>
      <div className="relative">
        <img src={`/icons/rank-banner.svg`} className="w-full" />
        <div className="absolute top-1/3 left-[100px] ">
          <TextGradient className="text-3xl font-meidum">
            Referral Race
          </TextGradient>
          <div className="text-white">
            Flex Your Rank. Invite, Win, Repeat!
          </div>
        </div>
        <div className="absolute top-1/3 right-[100px]">
            <div className='flex gap-2'>
              <div>
                <GradientBorderButton className='!bg-black'>Rewards: 500 $ADA</GradientBorderButton>
              </div>
              <div> 
                <GradientButton className='font-medium px-4 md:px-6 py-1 md:py-2 rounded-3xl' onClick={() => {
                  window.open('https://spidex-ai.gitbook.io/spidex-ai-docs/referral-race', '_blank');
                }}>Join now</GradientButton>
              </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default Banner;
