"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { usePointInfo } from "@/hooks/point/use-point";
import { Skeleton } from "@/components/ui/skeleton";
import { TextGradient } from "@/components/ui/text";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

const PointInformationWrapper = () => {
  const { pointInfo, loading, error } = usePointInfo();
  console.log("🚀 ~ PointInformation ~ pointInfo:", pointInfo);
  const [copied, setCopied] = useState(false);

  if (loading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentPoint =
    Number(pointInfo?.nextAchievement?.points) -
    Number(pointInfo?.nextAchievement?.pointsToNextAchievement);

  const progressValue = pointInfo?.nextAchievement?.pointsToNextAchievement
    ? (currentPoint / Number(pointInfo?.nextAchievement?.points)) * 100
    : 0;

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
            <div>
              {Number(pointInfo?.point?.amount).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
            <div>
              <Image
                src="/icons/logo-gray.svg"
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
            <div className="text-text-gray text-sm">What is SILK?</div>
            <Image
              src="/icons/warning-gray.svg"
              alt="gift"
              width={10}
              height={9}
            />
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <div>{pointInfo?.referralInfo?.referralPointEarned}</div>
            <div>
              <Image src="/icons/gift.svg" alt="gift" width={40} height={40} />
            </div>
          </div>
          <div className="mt-10"></div>
          <div className="text-white text-lg">Referrals</div>
          <div className="flex items-center justify-between gap-4 bg-bg-main rounded-lg py-1 px-2 mt-1">
            <div className="text-sm">
              <span className="text-text-gray ">Invite link:</span>{" "}
              <span className="text-white text-sm">
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
                      src="/icons/copy-gray.svg"
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
            <div>{pointInfo?.tradingVolume}</div>
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
            <div className="text-text-gray text-sm">Transactions</div>
            <Image
              src="/icons/warning-gray.svg"
              alt="gift"
              width={10}
              height={9}
            />
          </div>
        </div>

        <div className="col-span-1 bg-bg-secondary rounded-lg p-4 border border-border-main transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="text-white text-lg">OG Level</div>
          <div className="text-text-gray text-sm mt-7 mb-4">
            <Progress
              value={progressValue}
              colorFill="bg-brand-1000 dark:bg-brand-1000"
            />
          </div>
          <div className="w-full">
            <Image
              src="/icons/progress.svg"
              alt="og-level"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        <TextGradient>
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
                <div className="text-xs">$100 volume trading = 1</div>
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
