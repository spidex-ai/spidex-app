"use client";

import { useState } from "react";
import Image from "next/image";
import { TextGradient } from "@/components/ui/text";
import { Split } from "@/services/dexhunter/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { dexLogoMap } from "@/app/utils/logo";

interface Props {
  swapDetails: {
    inputToken: string;
    outputToken: string;
    inputAmount: string;
    outputAmount: string;

    swapRoute: string;
    netPrice: string;
    minReceive: string;
    dexFee: string;
    dexDeposits: string;
    serviceFee: string;
    batcherFee: string;
  };
  splits: Split[];
  estimatedPoints: string;
}
export default function SwapPoint({
  swapDetails,
  splits,
  estimatedPoints,
}: Props) {
  const [isOpenSwapDetails, setIsOpenSwapDetails] = useState(true);
  const [isOpenMarketOffers, setIsOpenMarketOffers] = useState(true);

  const totalDepositADA =
    swapDetails?.inputToken === "ADA"
      ? Number(swapDetails.inputAmount) +
        Number(swapDetails.dexDeposits) +
        Number(swapDetails.batcherFee) +
        Number(swapDetails.serviceFee)
      : Number(swapDetails.dexDeposits) +
        Number(swapDetails.batcherFee) +
        Number(swapDetails.serviceFee);

  return (
    <div className="mt-2">
      <div className="border-border-main border rounded-lg relative">
        <div className="flex justify-between items-center gap-2 px-6 py-2 bg-bg-swap rounded-lg">
          <div className="text-xs">Swap details</div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-text-gray">{`${swapDetails.inputAmount} ${swapDetails.inputToken} = ${swapDetails.outputAmount} ${swapDetails.outputToken}`}</div>
            {!isOpenSwapDetails ? (
              <div
                className="cursor-pointer"
                onClick={() => setIsOpenSwapDetails(!isOpenSwapDetails)}
              >
                <Image
                  src="/icons/arrow-down-white.svg"
                  alt="arrow-down-white"
                  width={10}
                  height={10}
                />
              </div>
            ) : null}
          </div>
        </div>

        {isOpenSwapDetails && (
          <div className="px-6 py-2">
            <div className="grid grid-cols-3 gap-2">
              <SwapDetailItem
                label="Swap Route"
                value={
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/swap-white.svg"
                      alt="swap-whhite"
                      width={5}
                      height={5}
                    />
                    {splits.length > 1 ? (
                      <div className="text-green-800 font-bold">
                        {splits.length} ROUTES
                      </div>
                    ) : (
                      <div>DIRECT</div>
                    )}
                  </div>
                }
              />
              <SwapDetailItem
                label="Net Price"
                value={`${swapDetails.netPrice} ${swapDetails.outputToken}`}
              />
              <SwapDetailItem
                label="Min Receive"
                value={`${swapDetails.minReceive} ${swapDetails.outputToken}`}
              />
              <div className="text-left">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <SwapDetailItem
                        label="Dex Fee"
                        value={`${swapDetails.dexFee} ADA`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      This fee will be collected by DexHunter.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="text-left">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <SwapDetailItem
                        label="Dex Deposits"
                        value={`${swapDetails.dexDeposits} ADA`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      This amount will be refunded when the swap transaction is
                      completed.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="text-left">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <SwapDetailItem
                        label="Total Deposit"
                        value={`${
                          swapDetails?.inputToken === "ADA"
                            ? `${totalDepositADA.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} ADA`
                            : `${Number(swapDetails.inputAmount).toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )} ${
                                swapDetails.inputToken
                              } + ${totalDepositADA.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })} ADA`
                        }`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      It does not include gas fee.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* <div className="text-left">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <SwapDetailItem
                        label="Service Fee"
                        value={"1 ADA + 0.1%"}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      This fee will be collected by DexHunter
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div> */}
            </div>
          </div>
        )}

        {isOpenSwapDetails ? (
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => setIsOpenSwapDetails(!isOpenSwapDetails)}
          >
            <Image
              src="/icons/close-white.svg"
              alt="close"
              width={10}
              height={10}
            />
          </div>
        ) : null}
      </div>

      <div className="border-border-main border rounded-lg relative mt-2">
        <div className="flex justify-between items-center gap-2 px-6 py-2 bg-bg-swap rounded-lg">
          <div className="text-xs">Market Offers</div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-white flex items-center gap-1">
              <Image
                src="/icons/dex-hunter.svg"
                alt="dex-hunter"
                width={10}
                height={10}
              />
              <div className="flex items-end">DexHunter</div>
            </div>
            {!isOpenMarketOffers ? (
              <div
                className="cursor-pointer"
                onClick={() => setIsOpenMarketOffers(!isOpenMarketOffers)}
              >
                <Image
                  src="/icons/arrow-down-white.svg"
                  alt="arrow-down-white"
                  width={10}
                  height={10}
                />
              </div>
            ) : null}
          </div>
        </div>

        {isOpenMarketOffers && (
          <div className=" my-2 p-2">
            <div className="flex flex-col gap-2">
              {splits.map((split, key) => (
                <div className="text-xs gradient-border-market-offer" key={key}>
                  <div className="grid grid-cols-2 p-2">
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        <img
                          src={dexLogoMap[split.dex] || "/icons/logo-gray.svg"}
                          alt="logo-gray"
                          width={20}
                          height={20}
                        />
                        <div>{split.dex}</div>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center justify-between gap-1">
                        <div>{`${split.amount_in} ${
                          swapDetails.inputToken
                        } = ${split.expected_output.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })} ${swapDetails.outputToken}`}</div>
                        <div className="flex items-center gap-1">
                          <Image
                            src="/icons/fee-gray.svg"
                            alt="fee-gray"
                            width={10}
                            height={10}
                          />
                          <div className="text-xs text-text-gray flex gap-1 items-center">
                            <div>{split.fee}</div>
                            <div>
                              <Image
                                src="/icons/ada.svg"
                                alt="ada"
                                width={10}
                                height={10}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOpenMarketOffers ? (
          <div
            className="absolute top-1 right-1 cursor-pointer"
            onClick={() => setIsOpenMarketOffers(!isOpenMarketOffers)}
          >
            <Image
              src="/icons/close-white.svg"
              alt="close"
              width={10}
              height={10}
            />
          </div>
        ) : null}
      </div>
      <div className="bg-bg-swap rounded-lg">
        <div className="gradient-border-market-offer mt-4">
          <div className="flex justify-between items-center py-2 px-4 rounded-lg">
            <TextGradient className="text-sm">Estimated Points</TextGradient>
            <div className="flex gap-1">
              <div className="flex items-center  text-sm pt-1">
                {Number(estimatedPoints).toFixed(2)}
              </div>
              <div>
                <Image
                  src="/icons/logo-gray.svg"
                  alt="arrow-up-white"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-center mt-2 text-xs mb-2">
        <div className="text-text-gray font-medium pt-1">Powered by</div>
        <Image
          src="/icons/dex-hunter.svg"
          alt="dex-hunter"
          width={15}
          height={15}
        />
        <div className="text-white text-[10px] flex items-center pt-1">
          DexHunter
        </div>
      </div>
    </div>
  );
}

const SwapDetailItem = ({
  label,
  value = "1",
}: {
  label: string;
  value: string | React.ReactNode;
}) => {
  return (
    <div>
      <div className="text-[10px] text-text-gray text-left">{label}</div>
      <div className="text-[10px] text-left">{value}</div>
    </div>
  );
};
