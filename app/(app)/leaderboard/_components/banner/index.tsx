'use client';

import {
  GradientBorderButton,
  GradientBorderButtonMobile,
  GradientButton,
} from '@/components/ui';
import { TextGradient } from '@/components/ui/text';
import { useIsMobile } from '@/hooks/utils';
import Image from 'next/image';
import React from 'react';

const Banner: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile ? (
        <div className="relative">
          <img src={`/icons/rank-banner.svg`} className="w-full" />
          <div className="absolute top-[8px] left-[10px] ">
            <TextGradient className="text-[10px] font-meidum">
              Referral Race
            </TextGradient>
            <div className="text-white text-[10px]">
              Flex Your Rank. Invite, <br /> Win, Repeat!
            </div>
          </div>

          <div className="absolute top-[2px] right-[15px]">
            <div className="flex flex-col gap-1">
              <div>
                <GradientBorderButtonMobile className="!bg-black text-[10px]">
                  Rewards: 500 $ADA
                </GradientBorderButtonMobile>
              </div>
              <div className="relative">
                <div>
                  <GradientButton
                    className="font-medium px-2 md:px-6 py-1 md:py-2 rounded-3xl text-[10px]"
                    onClick={() => {
                      window.open(
                        'https://spidex-ai.gitbook.io/spidex-ai-docs/referral-race',
                        '_blank'
                      );
                    }}
                  >
                    Join now
                  </GradientButton>
                </div>
                <div className="absolute bottom-[-5px] left-[20px]">
                  <Image
                    src="/icons/arrow-cursor.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
            <div className="flex gap-2">
              <div>
                <GradientBorderButton className="!bg-black">
                  Rewards: 500 $ADA
                </GradientBorderButton>
              </div>
              <div className="relative">
                <div>
                  <GradientButton
                    className="font-medium px-4 md:px-6 py-1 md:py-2 rounded-3xl"
                    onClick={() => {
                      window.open(
                        'https://spidex-ai.gitbook.io/spidex-ai-docs/referral-race',
                        '_blank'
                      );
                    }}
                  >
                    Join now
                  </GradientButton>
                </div>
                <div className="absolute bottom-[-10px] right-[-10px]">
                  <Image
                    src="/icons/arrow-cursor.svg"
                    alt="arrow-right"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
