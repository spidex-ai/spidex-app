"use client";

import { useState } from "react";
import Image from "next/image";
import { TextGradient } from "@/components/ui/text";
import { Split } from "@/services/dexhunter/types";

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
  };
  splits: Split[];
  estimatedPoints: string;
}
export default function SwapPoint({ swapDetails, splits, estimatedPoints }: Props) {
  const [isOpenSwapDetails, setIsOpenSwapDetails] = useState(true);
  const [isOpenMarketOffers, setIsOpenMarketOffers] = useState(true);

  return (
    <div className="mt-2">
      <div className="border-border-main border rounded-lg relative">
        <div className="flex justify-between items-center gap-2 px-6 py-2 bg-bg-swap rounded-lg">
          <div className="text-xs">Swap details</div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-text-gray">{`1 ${swapDetails.inputToken} = ${swapDetails.outputAmount} ${swapDetails.outputToken}`}</div>
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
                    <div>DIRECT</div>
                  </div>
                }
              />
              <SwapDetailItem
                label="Net Price"
                value={'--'}
              />
              <SwapDetailItem
                label="Min Receive"
                value={Number(swapDetails.minReceive).toFixed(2)}
              />
              <SwapDetailItem label="Dex Fee" value={Number(swapDetails.dexFee).toFixed(2)} />
              <SwapDetailItem
                label="Dex Deposits"
                value={Number(swapDetails.dexDeposits).toFixed(2)}
              />
              <SwapDetailItem
                label="Service Fee"
                value={'1 ADA + 0.1%'}
              />
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
            <div className="text-[10px] text-text-gray">{`Minswap (Dex hunter)`}</div>
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
            <div>
                {splits.map((split, key) => (
                    <div className="text-xs gradient-border" key={key}>
                    <div className="flex items-center justify-between gap-1 p-2">
                      <div className="flex items-center gap-1">
                        <Image
                          src="/icons/logo-gray.svg"
                          alt="logo-gray"
                          width={20}
                          height={20}
                        />
                        <div>{split.dex}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>{`${split.amount_in} ${swapDetails.inputToken} = ${split.expected_output} ${swapDetails.outputToken}`}</div>
                        <div className="flex items-center">
                          <Image
                            src="/icons/fee-gray.svg"
                            alt="fee-gray"
                            width={10}
                            height={10}
                          />
                          <div className="text-xs text-text-gray">${split.fee}</div>
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
        <div className="gradient-border mt-4">
          <div className="flex justify-between items-center py-2 px-6 rounded-lg">
            <TextGradient className="text-sm">Estimated Points</TextGradient>
            <div className="flex gap-1">
              <div className="flex items-center  text-sm pt-1">{Number(estimatedPoints).toFixed(2)}</div>
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
      <div className="text-[10px] text-text-gray">{label}</div>
      <div className="text-[10px]">{value}</div>
    </div>
  );
};
