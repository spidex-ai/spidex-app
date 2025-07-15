'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TextGradient } from '@/components/ui/text';
import { IPath } from '@/services/dexhunter/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { dexLogoMap } from '@/app/utils/logo';
import { dexNameMap } from '@/app/utils/dexes';
import { formatNumber } from '@/lib/utils';
import { ProtocolType } from './select-protocol';
import SelectProtocol from './select-protocol';

interface Props {
  swapDetails: {
    inputToken: string;
    outputToken: string;
    inputAmount: string;
    outputAmount?: string;

    swapRoute: string;
    netPrice: number;
    minReceive: number;
    dexFee: number;
    dexDeposits: number;
    totalDeposits: number;
  };
  paths: IPath[];
  estimatedPoints: string;
  protocol: ProtocolType;
  onProtocolChange: (protocol: ProtocolType) => void;
}
export default function SwapPoint({
  swapDetails,
  paths,
  estimatedPoints,
  protocol,
  onProtocolChange,
}: Props) {
  const [isOpenSwapDetails, setIsOpenSwapDetails] = useState(true);
  const [isOpenMarketOffers, setIsOpenMarketOffers] = useState(true);

  const {
    inputToken,
    outputToken,
    inputAmount,
    netPrice,
    minReceive,
    dexFee,
    dexDeposits,
    totalDeposits,
  } = swapDetails;

  const totalDepositADA =
    inputToken === 'ADA'
      ? Number(inputAmount) + Number(totalDeposits)
      : Number(totalDeposits);
  const receiveAmount = minReceive.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  const netPriceAmount = netPrice.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  const dexFeeAmount = dexFee.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  const dexDepositsAmount = dexDeposits.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div className="mt-2">
      <div className="border-border-main border rounded-lg relative">
        <div className="flex justify-between items-center gap-2 px-6 py-2 bg-bg-swap rounded-lg">
          <div className="flex items-center gap-2">
            <div className="text-xs">Swap details</div>
            <div className="text-xs min-w-[50%]">
              <TextGradient>( Spidex AI Fee = 0 )</TextGradient>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-text-gray">{`${formatNumber(parseFloat(inputAmount))} ${inputToken} = ${receiveAmount} ${outputToken}`}</div>
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
                label={
                  <div className="flex items-center gap-1">
                    <div>Swap Route</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            The trade is only routed multi-dex when output is{' '}
                            <br />
                            better than the extra dex fees.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/swap-white.svg"
                      alt="swap-whhite"
                      width={5}
                      height={5}
                    />
                    {paths.length > 1 ? (
                      <div className="text-green-800 font-bold">
                        {paths.length} ROUTES
                      </div>
                    ) : (
                      <div>DIRECT</div>
                    )}
                  </div>
                }
              />
              <SwapDetailItem
                label={
                  <div className="flex items-center gap-1">
                    <div>Net Price</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            The net price is the average price you get for your{' '}
                            <br />
                            tokens after the fees.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={`${netPriceAmount} ${outputToken}`}
              />
              <SwapDetailItem
                label={
                  <div className="flex items-center gap-1">
                    <div>Min Receive</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            The minimum amount of tokens you should receive{' '}
                            <br />
                            after the swap completes
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={`${receiveAmount} ${outputToken}`}
              />
              <SwapDetailItem
                label={
                  <div className="flex items-center gap-1">
                    <div>Dex Fee</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            Dex fees are the fees paid to the DexHunter for the
                            swap. <br /> This does not include pool fee 0.3-1%
                            on average <br /> which is paid to the liquidity
                            providers.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={`${dexFeeAmount} ${outputToken}`}
              />

              <SwapDetailItem
                label={
                  <div className="flex items-center gap-1">
                    <div>Dex Deposits</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            Returned ADA on successful swap.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={`${dexDepositsAmount} ${outputToken}`}
              />

              <SwapDetailItem
                label={
                  <div className="flex items-center gap-1">
                    <div>Total Deposits</div>
                    <div>
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <img
                              src="/icons/warning-gray.svg"
                              alt="warning-gray"
                              width={10}
                              height={10}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            It does not include gas fee.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                }
                value={`${
                  swapDetails?.inputToken === 'ADA'
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
              {/* <Image
                src="/icons/dex-hunter.svg"
                alt="dex-hunter"
                width={10}
                height={10}
              />
              <div className="flex items-end">DexHunter</div> */}
              <SelectProtocol
                protocol={protocol}
                onProtocolChange={onProtocolChange}
              />
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
              {paths.map((path, key) => (
                <div className="text-xs gradient-border-market-offer" key={key}>
                  <div className="grid grid-cols-2 p-2">
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        <img
                          src={
                            dexLogoMap[path.protocol] || '/icons/unknown.svg'
                          }
                          alt="logo-gray"
                          width={20}
                          height={20}
                        />
                        <div>{dexNameMap[path.protocol] || path.protocol}</div>
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center justify-between gap-1">
                      <div>{`${path.amountIn} ${inputToken} = ${formatNumber(Number(path.minReceive))} ${outputToken}`}</div>
                      <div className="flex items-center gap-1">
                        <Image
                          src="/icons/fee-gray.svg"
                          alt="fee-gray"
                          width={10}
                          height={10}
                        />
                        <div className="text-xs text-text-gray flex gap-1 items-center">
                          <div>{`A${path.batcherFee}`}</div>
                          <div>
                            <TooltipProvider>
                              <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                  <Image
                                    src="/icons/warning-blink.svg"
                                    alt="ada"
                                    width={10}
                                    height={10}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="flex flex-col gap-1 min-w-60">
                                    <div className="flex gap-1 justify-between items-center">
                                      <div>Minimum receive</div>
                                      <div className="font-semibold">{`${formatNumber(Number(path.amountOut))}A`}</div>
                                    </div>

                                    <div className="flex gap-1 justify-between items-center">
                                      <div>Price impact</div>
                                      <div className="font-semibold">{`${formatNumber(Number(path.priceImpact))}A`}</div>
                                    </div>

                                    <div className="flex gap-1 justify-between items-center">
                                      <div>Batcher fee</div>
                                      <div className="text-text-tooltip font-semibold">{`${formatNumber(Number(path.batcherFee))}A`}</div>
                                    </div>

                                    <div className="flex gap-1 justify-between items-center">
                                      <div>Refundable deposit</div>
                                      <div className=" font-semibold">{`${formatNumber(Number(path.refundableDeposits))}A`}</div>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
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
        {protocol === ProtocolType.DEXHUNTER ? (
          <>
            <Image
              src="/icons/dex-hunter.svg"
              alt="dex-hunter"
              width={15}
              height={15}
            />
            <div className="text-white text-[10px] flex items-center pt-1">
              DexHunter
            </div>
          </>
        ) : (
          <>
            <Image
              src="/icons/minswap.svg"
              alt="minswap"
              width={15}
              height={15}
            />
            <div className="text-white text-[10px] flex items-center pt-1">
              Minswap Aggregator
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const SwapDetailItem = ({
  label,
  value = '1',
}: {
  label: string | React.ReactNode;
  value: string | React.ReactNode;
}) => {
  return (
    <div>
      <div className="text-[10px] text-text-gray text-left">{label}</div>
      <div className="text-[10px] text-left">{value}</div>
    </div>
  );
};
