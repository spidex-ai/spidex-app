"use client";
import React, { useState } from "react";
import Image from "next/image";

import { usePointInfo } from "@/hooks/point/use-point";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGradient } from "@/components/ui/text";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

const PointInformationWrapper = () => {
  const { pointInfo, loading, error, achievements } = usePointInfo();
  const [copied, setCopied] = useState(false);

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

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <div className="text-white text-[28px] font-medium">
              {Number(pointInfo?.point?.amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
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
            <div className="text-text-gray text-xs cursor-pointer" onClick={() => {
              window.open("https://spidex-ai.gitbook.io/spidex-ai-docs/silk-score-system/silk-score-system", "_blank");
            }}>What is SILK?</div>
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <div className="text-white text-[28px] font-medium">
              {Number(pointInfo?.referralInfo?.referralUserCount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
            <div>
              <Image src="/icons/gift.svg" alt="gift" width={40} height={40} />
            </div>
          </div>
          <div className="mt-10"></div>
          <div className="text-white text-lg">Referrals</div>
          <div className="flex items-center justify-between gap-4 bg-bg-main rounded-lg py-1 px-2 mt-1">
            <div className="text-sm">
              <span className="text-text-gray text-xs">Invite link:</span>{" "}
              <span className="text-white text-xs">
                {" "}
                {pointInfo?.referralInfo?.referralCode
                  ? `${pointInfo?.referralInfo?.referralCode.slice(
                      0,
                      6
                    )}...${pointInfo?.referralInfo?.referralCode.slice(-4)}`
                  : ""}
              </span>
            </div>
            <div onClick={handleCopy} className="cursor-pointer">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Image
                      src={`/icons/${copied ? "tick-blue.svg" : "copy-gray.svg"}`}
                      alt="copy"
                      width={15}
                      height={15}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied" : "Copy to clipboard"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex justify-between">
            <div className="text-white text-[28px] font-medium">
              {Number(pointInfo?.tradingVolume).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
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
            <div className="text-text-gray text-xs cursor-pointer" onClick={() => {
              window.open("https://cardanoscan.io", "_blank");
            }}>Transactions</div>
       
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="text-white text-[28px] font-medium">OG Level</div>
          {/* <div className="text-text-gray text-sm mt-7 mb-4">
            <Progress
              value={progressValue}
              colorFill="bg-brand-1000 dark:bg-brand-1000"
            />
          </div> */}
          <div className="grid grid-cols-3 gap-2 mt-12">
            <div className="col-span-1">
              { 
                level >= 1 ? (
                  <Image src="/icons/first-level.svg" alt="og-level" width={50} height={50} />
                ) : (
                  <Image src="/icons/first-level-blur.svg" alt="og-level" width={50} height={50} />
                )
              }
            </div>
            <div className="col-span-1">
              {
                level >= 2 ? (
                  <Image src="/icons/second-level.svg" alt="og-level" width={50} height={50} />
                ) : (
                  <Image src="/icons/second-level-blur.svg" alt="og-level" width={50} height={50} />
                )
              }
            </div>
            <div className="col-span-1">
              {
                level >= 3 ? (
                  <Image src="/icons/third-level.svg" alt="og-level" width={50} height={50} />
                ) : (
                  <Image src="/icons/third-level-blur.svg" alt="og-level" width={50} height={50} />
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        <TextGradient className="italic text-lg">
          Keep trading on Spidex AI to earn more SILK.
        </TextGradient>
        <div>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                {" "}
                <Image
                  src="/icons/warning-blink.svg"
                  alt="warning-blink"
                  width={12}
                  height={12}
                />
              </TooltipTrigger>
              <TooltipContent side="right" align="center" arrowPadding={1}>
                {" "}
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
