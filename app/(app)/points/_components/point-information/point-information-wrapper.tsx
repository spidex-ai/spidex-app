'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

import { usePointInfo } from '@/hooks/point/use-point';
import { Skeleton } from '@/components/ui/skeleton';
import { TextGradient } from '@/components/ui/text';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { formatSILK } from '@/app/utils/format';
import { useRouter } from 'next/navigation';
import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { formatNumber } from '@/lib/utils';

interface Props {
  pointInfoHook: ReturnType<typeof usePointInfo>;
}

const PointInformationWrapper = ({ pointInfoHook }: Props) => {
  const { pointInfo, loading, error, achievements } = pointInfoHook;
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { stakeAddress } = useCardano();
  const router = useRouter();

  const totalCards = 4;
  const cardWidth = 265; // w-[265px] = 265px
  const gap = 16; // gap-4 = 16px

  if (loading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let level = 0;
  if (achievements.length > 0 && pointInfo?.nextAchievement) {
    let achive = null;
    let index = 0;
    for (let i = 0; i < achievements.length; i++) {
      if (achievements[i].id === pointInfo?.nextAchievement?.id) {
        achive = achievements[i];
        index = i;
        break;
      }
    }
    if (achive) {
      const currentPoint = Number(pointInfo?.point?.amount);
      const currentLevelPoint = Number(achive?.points);
      if (currentPoint < currentLevelPoint) {
        level = index;
      }

      if (currentPoint >= currentLevelPoint) {
        level = index + 1;
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SPIDEX_APP_URL}/chat?ref=${pointInfo?.referralInfo?.referralCode}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClickTx = () => {
    if (stakeAddress) {
      router.push(`/portfolio/${stakeAddress}`);
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      // Calculate the container width and card positioning
      const containerWidth = scrollRef.current.clientWidth;
      const paddingLeft = (containerWidth - cardWidth) / 2;
      const scrollPosition = index * (cardWidth + gap) - paddingLeft + 16; // 16px is the initial px-4 padding
      
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.clientWidth;
      const paddingLeft = (containerWidth - cardWidth) / 2;
      const adjustedScrollLeft = scrollLeft + paddingLeft - 16; // 16px is the initial px-4 padding
      const newIndex = Math.round(adjustedScrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(Math.max(newIndex, 0), totalCards - 1));
    }
  };

  const nextCard = () => {
    const newIndex = Math.min(currentIndex + 1, totalCards - 1);
    scrollToCard(newIndex);
  };

  const prevCard = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToCard(newIndex);
  };

  return (
    <div>
      {/* Desktop layout - 4 columns for sm and up */}
      <div className="hidden sm:grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <div className="text-white text-[28px] font-medium">
              {formatSILK(pointInfo?.point?.amount || 0)}
            </div>
            <div>
              <Image
                src="/icons/logo-border.svg"
                alt="gift"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="mt-10"></div>
          <div className="text-white text-lg">SILK Vault</div>
          <div className="flex items-center gap-1 mt-2">
            <Image
              src="/icons/docs-gray.svg"
              alt="gift"
              width={10}
              height={9}
            />
            <div
              className="text-text-gray text-xs cursor-pointer"
              onClick={() => {
                window.open(
                  'https://spidex-ai.gitbook.io/spidex-ai-docs/silk-score-system/silk-score-system',
                  '_blank'
                );
              }}
            >
              What is SILK?
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <div className="text-white text-[28px] font-medium">
              {formatNumber(Number(pointInfo?.referralInfo?.referralUserCount))}
            </div>
            <div>
              <Image src="/icons/gift.svg" alt="gift" width={40} height={40} />
            </div>
          </div>
          <div className="mt-10"></div>
          <div className="text-white text-lg">Referrals</div>
          <div className="flex items-center justify-between gap-4 bg-bg-main rounded-lg py-1 px-2 mt-1">
            <div className="text-sm">
              <span className="text-text-gray text-xs">Invite link:</span>{' '}
              <span className="text-white text-xs">
                {' '}
                {pointInfo?.referralInfo?.referralCode
                  ? `${pointInfo?.referralInfo?.referralCode.slice(
                    0,
                    6
                  )}...${pointInfo?.referralInfo?.referralCode.slice(-4)}`
                  : ''}
              </span>
            </div>
            <div onClick={handleCopy} className="cursor-pointer">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Image
                      src={`/icons/${copied ? 'tick-blue.svg' : 'copy-gray.svg'
                        }`}
                      alt="copy"
                      width={15}
                      height={15}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? 'Copied' : 'Copy to clipboard'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex justify-between">
            <div className="text-white text-[28px] font-medium">
              {`$${formatNumber(Number(pointInfo?.tradingVolume), 2)}`}
            </div>
            <div>
              <Image
                src="/icons/volume-color.svg"
                alt="volume-color"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="mt-10"></div>
          <div className="text-white text-lg">Trading volume</div>
          <div className="flex items-center gap-1 mt-2">
            <Image
              src="/icons/docs-gray.svg"
              alt="gift"
              width={10}
              height={9}
            />
            <div
              className="text-text-gray text-xs cursor-pointer"
              onClick={handleClickTx}
            >
              Transactions
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="text-white text-[28px] font-medium">OG Level</div>
          <div className="grid grid-cols-3 gap-2 mt-12">
            <div className="col-span-1">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    {level >= 1 ? (
                      <Image
                        src="/icons/first-level.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/icons/first-level-blur.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>OG Scout: 1,000 SILK Points</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-1">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    {level >= 2 ? (
                      <Image
                        src="/icons/second-level.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/icons/second-level-blur.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>OG Operative: 5,000 SILK Points</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-1">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    {level >= 3 ? (
                      <Image
                        src="/icons/third-level.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/icons/third-level-blur.svg"
                        alt="og-level"
                        width={50}
                        height={50}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>OG Elite: 10,000 SILK Points</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile carousel layout */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-4 pb-4" style={{ 
            width: 'max-content',
            paddingLeft: 'calc(50vw - 132.5px)', 
            paddingRight: 'calc(50vw - 132.5px)' 
          }}>
            <div className="w-[265px] bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]" style={{ scrollSnapAlign: 'start' }}>
              <div className="flex items-center justify-between">
                <div className="text-white text-[28px] font-medium">
                  {formatSILK(pointInfo?.point?.amount || 0)}
                </div>
                <div>
                  <Image
                    src="/icons/logo-border.svg"
                    alt="gift"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className="mt-10"></div>
              <div className="text-white sm:text-lg">SILK Vault</div>
              <div className="flex items-center gap-1 mt-2">
                <Image
                  src="/icons/docs-gray.svg"
                  alt="gift"
                  width={10}
                  height={9}
                />
                <div
                  className="text-text-gray text-xs cursor-pointer"
                  onClick={() => {
                    window.open(
                      'https://spidex-ai.gitbook.io/spidex-ai-docs/silk-score-system/silk-score-system',
                      '_blank'
                    );
                  }}
                >
                  What is SILK?
                </div>
              </div>
            </div>

            <div className="w-[265px] bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]" style={{ scrollSnapAlign: 'start' }}>
              <div className="flex items-center justify-between">
                <div className="text-white text-[28px] font-medium">
                  {formatNumber(Number(pointInfo?.referralInfo?.referralUserCount))}
                </div>
                <div>
                  <Image src="/icons/gift.svg" alt="gift" width={40} height={40} />
                </div>
              </div>
              <div className="mt-10"></div>
              <div className="text-white text-lg">Referrals</div>
              <div className="flex items-center justify-between gap-4 bg-bg-main rounded-lg py-1 px-2 mt-1">
                <div className="text-sm">
                  <span className="text-text-gray text-xs">Invite link:</span>{' '}
                  <span className="text-white text-xs">
                    {' '}
                    {pointInfo?.referralInfo?.referralCode
                      ? `${pointInfo?.referralInfo?.referralCode.slice(
                        0,
                        6
                      )}...${pointInfo?.referralInfo?.referralCode.slice(-4)}`
                      : ''}
                  </span>
                </div>
                <div onClick={handleCopy} className="cursor-pointer">
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Image
                          src={`/icons/${copied ? 'tick-blue.svg' : 'copy-gray.svg'
                            }`}
                          alt="copy"
                          width={15}
                          height={15}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? 'Copied' : 'Copy to clipboard'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className="w-[265px] bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]" style={{ scrollSnapAlign: 'start' }}>
              <div className="flex justify-between">
                <div className="text-white text-[28px] font-medium">
                  {`$${formatNumber(Number(pointInfo?.tradingVolume), 2)}`}
                </div>
                <div>
                  <Image
                    src="/icons/volume-color.svg"
                    alt="volume-color"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div className="mt-10"></div>
              <div className="text-white text-lg">Trading volume</div>
              <div className="flex items-center gap-1 mt-2">
                <Image
                  src="/icons/docs-gray.svg"
                  alt="gift"
                  width={10}
                  height={9}
                />
                <div
                  className="text-text-gray text-xs cursor-pointer"
                  onClick={handleClickTx}
                >
                  Transactions
                </div>
              </div>
            </div>

            <div className="w-[265px] bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]" style={{ scrollSnapAlign: 'start' }}>
              <div className="text-white text-[28px] font-medium">OG Level</div>
              <div className="grid grid-cols-3 gap-2 mt-12">
                <div className="col-span-1">
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        {level >= 1 ? (
                          <Image
                            src="/icons/first-level.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <Image
                            src="/icons/first-level-blur.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>OG Scout: 1,000 SILK Points</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="col-span-1">
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        {level >= 2 ? (
                          <Image
                            src="/icons/second-level.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <Image
                            src="/icons/second-level-blur.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>OG Operative: 5,000 SILK Points</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="col-span-1">
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        {level >= 3 ? (
                          <Image
                            src="/icons/third-level.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        ) : (
                          <Image
                            src="/icons/third-level-blur.svg"
                            alt="og-level"
                            width={50}
                            height={50}
                          />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>OG Elite: 10,000 SILK Points</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all ${currentIndex === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-bg-secondary text-white hover:bg-gray-600'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2 mx-4">
            {Array.from({ length: totalCards }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-cyan-400 w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === totalCards - 1}
            className={`p-2 rounded-full transition-all ${currentIndex === totalCards - 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-bg-secondary text-white hover:bg-gray-600'
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        <TextGradient className="italic text-sm sm:text-lg">
          Keep trading on Spidex AI to earn more SILK.
        </TextGradient>
        <div>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                {' '}
                <Image
                  src="/icons/warning-blink.svg"
                  alt="warning-blink"
                  width={12}
                  height={12}
                />
              </TooltipTrigger>
              <TooltipContent side="right" align="center" arrowPadding={1}>
                {' '}
                <div className="text-xs">$100 volume trading = 1 SILK</div>
                <TooltipArrow className="TooltipArrow" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default PointInformationWrapper;
