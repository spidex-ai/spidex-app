'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ChevronDown } from 'lucide-react';

// import Decimal from 'decimal.js';

import { Button, GradientButton, Separator } from '@/components/ui';

import TokenInput from './token-input';

import { useDebounce, useTokenBalance } from '@/hooks';

import { type QuoteResponse } from '@jup-ag/api';

import {
  CardanoTokenDetail,
  EsitmateSwapPayload,
  EsitmateSwapResponse,
  SwapRequestDexHunterPayload,
  SwapRequestMinswapPayload,
} from '@/services/dexhunter/types';

import AuthButton from '@/app/(app)/_components/sidebar/auth-button';
import SwapPoint from '@/app/_components/swap/swap-point';
import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { decodeHexAddress } from '@cardano-foundation/cardano-connect-with-wallet-core';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import { useSelector } from 'react-redux';
import { selectAuthData, selectWalletName } from '@/store/selectors/authSelectors';
import { DEXHUNTER_SAVE_FEE, MINSWAP_SAVE_FEE } from '@/lib/utils';
import { ProtocolType } from '@/app/_components/swap/select-protocol';
import { useAppSelector } from '@/store/hooks';

export interface SwapWrapperProps {
  initialInputToken: CardanoTokenDetail | null;
  initialOutputToken: CardanoTokenDetail | null;
  inputLabel: string;
  outputLabel: string;
  initialInputAmount?: string;
  swapText?: string;
  swappingText?: string;
  onSuccess?: (txHash: string, inputAmount: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

export const adaTokenDetail: CardanoTokenDetail = {
  token_id: 'ADA',
  token_ascii: 'ADA',
  ticker: 'ADA',
  is_verified: true,
  token_policy: 'lovelace',
  token_decimals: 6,
  supply: 45000000000,
  creation_date: '',
  price: 1,
  logo: 'https://api.spidex.ag/public/icons/tokens/ada.svg',
};

const SwapWrapper: React.FC<SwapWrapperProps> = ({
  initialInputToken = adaTokenDetail,
  initialOutputToken,
  inputLabel,
  outputLabel,
  initialInputAmount,
  swapText,
  swappingText,
  onSuccess,
  onError,
  onCancel,
}) => {
  const {
    getSwapPoolStats,
    estimateSwap,
    submitSwapRequest,
    buildSwapRequestDexHunter,
    buildSwapRequestMinswap,
  } = useSpidexCore();
  const { enabledWallet, unusedAddresses } = useCardano();
  const walletName = useAppSelector(selectWalletName);
  const auth = useSelector(selectAuthData);

  const [inputAmount, setInputAmount] = useState<string>(
    initialInputAmount || ''
  );
  const debouncedInputAmount = useDebounce(inputAmount, 500);
  const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(
    initialInputToken || adaTokenDetail
  );

  const [outputAmount, setOutputAmount] = useState<string>('');
  const [outputToken, setOutputToken] = useState<CardanoTokenDetail | null>(
    initialOutputToken || adaTokenDetail
  );

  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(
    null
  );

  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  const [isNotPool, setIsNotPool] = useState<boolean>(false);

  const [estimatedPoints, setEstimatedPoints] =
    useState<EsitmateSwapResponse>();

  const [protocol, setProtocol] = useState<ProtocolType>(
    ProtocolType.MINSWAP
  );

  const { balance: inputBalance, isLoading: inputBalanceLoading } =
    useTokenBalance(inputToken?.unit || 'ADA');
  console.log('🚀 ~ SwapWrapper ~ balance:', inputBalance);

  const tokenInputBalance = inputBalance;

  const isInsufficientBalance = useMemo(() => {
    const saveFee = protocol === ProtocolType.DEXHUNTER ? DEXHUNTER_SAVE_FEE : MINSWAP_SAVE_FEE;
    console.log("🚀 ~ SwapWrapper ~ saveFee:", saveFee)
    if (Number(debouncedInputAmount) > Number(tokenInputBalance)) return true;
    console.log("🚀 ~ SwapWrapper ~ Number(debouncedInputAmount) > Number(tokenInputBalance):", Number(debouncedInputAmount) > Number(tokenInputBalance))

    if (Number(tokenInputBalance) < saveFee) return true;

    let totalDepositADA = Number(
      protocol === ProtocolType.DEXHUNTER
        ? estimatedPoints?.dexhunter?.totalDeposits
        : estimatedPoints?.minswap?.totalDeposits
    );

    if (inputToken?.ticker === 'ADA') {
      totalDepositADA += Number(debouncedInputAmount);
    }

    if (Number(tokenInputBalance) < totalDepositADA + saveFee) return true;

    return false;
  }, [
    debouncedInputAmount,
    tokenInputBalance,
    tokenInputBalance,
    inputToken,
    estimatedPoints,
    protocol,
  ]);

  const onChangeInputOutput = () => {
    const tempInputToken = inputToken;
    const tempInputAmount = debouncedInputAmount;
    setInputToken(outputToken);
    setInputAmount(outputAmount);
    setOutputToken(tempInputToken);
    setOutputAmount(tempInputAmount);
  };

  const onSwap = async () => {
    try {
      const api = await (window as any).cardano[(walletName || enabledWallet) as any].enable();
      if (!unusedAddresses?.[0].toString() || !quoteResponse) return;
      if (typeof window === 'undefined') return;
      setIsSwapping(true);
      const utxos = await api?.getUtxos();

      if (!utxos || utxos.length === 0) {
        console.error('No UTxOs available to spend.');
        return;
      }

      const usedAddressesHex = await api.getUsedAddresses();
      console.log('usedAddressesHex', usedAddressesHex);
      const addresses = [];
      for (const address of usedAddressesHex) {
        const unusedAddresses = decodeHexAddress(address);
        addresses.push(unusedAddresses);
      }
      const payload: SwapRequestDexHunterPayload = {
        addresses: addresses,
        tokenIn: inputToken?.unit
          ? inputToken?.unit
          : inputToken?.token_id || ' ',
        tokenOut: outputToken?.unit
          ? outputToken?.unit
          : outputToken?.token_id || ' ',
        slippage: 5,
        amountIn: Number(debouncedInputAmount),
        txOptimization: true,
        blacklistedDexes: [],
      };

      const payloadMinswap: SwapRequestMinswapPayload = {
        sender: addresses[0],
        min_amount_out: outputAmount,
        estimate: {
          amount: debouncedInputAmount,
          token_in: inputToken?.unit
            ? inputToken?.unit
            : inputToken?.token_id || ' ',
          token_out: outputToken?.unit
            ? outputToken?.unit
            : outputToken?.token_id || ' ',
          slippage: 0.01,
        },
      };

      let buildSwap;

      if (protocol === ProtocolType.DEXHUNTER) {
        buildSwap = await buildSwapRequestDexHunter(payload);
      } else {
        buildSwap = await buildSwapRequestMinswap(payloadMinswap);
      }

      const signatures = await api?.signTx(buildSwap?.cbor, true);
      const submitSwap = await submitSwapRequest({
        txCbor: buildSwap.cbor,
        signatures: signatures,
      });

      if (protocol === ProtocolType.DEXHUNTER) {
        const submitTx = await api?.submitTx(submitSwap?.cbor);
        onSuccess?.(submitTx, inputAmount);
      } else {
        onSuccess?.(submitSwap?.txHash, inputAmount);
      }
      toast.success('You have swapped successfully!');
      setInputAmount('');
      setOutputAmount('');
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Unknown error');
      toast.error('You have swapped failed! Please try again later!');
    } finally {
      setIsSwapping(false);
    }
  };

  const getQuoteCardano = async (
    inputUnit: string,
    outputUnit: string,
    amount: number
  ) => {
    try {
      const swapEstPayload: EsitmateSwapPayload = {
        tokenIn: inputUnit,
        tokenOut: outputUnit,
        amountIn: amount,
        slippage: 5,
        blacklistedDexes: [],
      };
      const swapEstResponse = await estimateSwap(swapEstPayload);
      if (swapEstResponse) {
        setEstimatedPoints(swapEstResponse);
        return protocol === ProtocolType.DEXHUNTER
          ? swapEstResponse?.dexhunter?.minReceive
          : swapEstResponse?.minswap?.minReceive;
      } else {
        setIsNotPool(true);
        return '0';
      }
    } catch (error) {
      console.error('error:::', error);
    }
  };

  const checkPool = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const poolStats = await getSwapPoolStats(
        inputToken?.unit ? inputToken?.unit : inputToken?.token_id || '',
        outputToken?.unit ? outputToken?.unit : outputToken?.token_id || ''
      );

      if (poolStats) {
        setIsNotPool(false);
      } else {
        setIsNotPool(true);
      }
    } catch (error) {
      console.error('error:::', error);
      setIsNotPool(true);
    }
  }, [inputToken, outputToken]);

  const fetchQuoteAndUpdate = async () => {
    try {
      setIsQuoteLoading(true);
      setOutputAmount('');

      const quote = await getQuoteCardano(
        inputToken?.unit || inputToken?.token_id || '',
        outputToken?.unit || outputToken?.token_id || '',
        Number(debouncedInputAmount)
      );
      setQuoteResponse(quote);
      setOutputAmount(quote);
      setIsQuoteLoading(false);
    } catch (error) {
      console.error('error:::', error);
    }
  };

  useEffect(() => {
    if (inputToken && outputToken) {
      checkPool();
    }
  }, [inputToken, outputToken]);

  useEffect(() => {
    if (inputToken || outputToken) {
      if (debouncedInputAmount && Number(debouncedInputAmount) > 0) {
        fetchQuoteAndUpdate();
      } else {
        setQuoteResponse(null);
        setOutputAmount('');
      }
    }
  }, [inputToken, outputToken, debouncedInputAmount]);

  return (
    <div className="flex flex-col gap-4 w-[26rem] max-w-full relative">
      <div className="absolute top-0 right-0 cursor-pointer" onClick={onCancel}>
        <Image
          src="/icons/close-blink.svg"
          alt="swap-bg"
          width={15}
          height={15}
        />
      </div>
      <div
        className={`flex flex-col gap-2 items-center w-full ${
          onCancel ? 'mt-6' : ''
        }`}
      >
        <TokenInput
          label={inputLabel}
          amount={inputAmount}
          onChange={value => {
            setIsNotPool(false);
            setInputAmount(value);
          }}
          token={inputToken}
          onChangeToken={token => {
            setIsNotPool(false);
            setInputToken(token);
          }}
          address={auth?.user?.stakeAddress || ''}
        />
        <Button
          variant="ghost"
          size="icon"
          className="group h-fit w-fit p-1"
          onClick={onChangeInputOutput}
        >
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </Button>
        <TokenInput
          label={outputLabel}
          amount={outputAmount}
          token={outputToken}
          onChangeToken={token => {
            setIsNotPool(false);
            setOutputToken(token);
          }}
          address={auth?.user?.stakeAddress || ''}
        />
      </div>
      <div className="text-sm text-red-500">
        {isNotPool ? 'No pool found' : null}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {auth?.user?.stakeAddress ? (
          <GradientButton
            variant="brand"
            className="w-full"
            onClick={onSwap}
            disabled={
              isNotPool ||
              isSwapping ||
              isQuoteLoading ||
              !quoteResponse ||
              !inputToken ||
              !outputToken ||
              !debouncedInputAmount ||
              !outputAmount ||
              !tokenInputBalance ||
              inputBalanceLoading ||
              isInsufficientBalance
            }
          >
            {isQuoteLoading
              ? 'Loading...'
              : isInsufficientBalance
                ? 'Insufficient balance'
                : isSwapping
                  ? swappingText || 'Swapping...'
                  : swapText || 'Swap'}
          </GradientButton>
        ) : (
          <AuthButton />
        )}
        {estimatedPoints?.estimatedPoint && debouncedInputAmount && (
          <SwapPoint
            swapDetails={{
              inputToken: inputToken?.ticker || '',
              outputToken: outputToken?.ticker || '',
              inputAmount: debouncedInputAmount || '',
              swapRoute: '',
              netPrice: Number(
                protocol === ProtocolType.DEXHUNTER
                  ? estimatedPoints?.dexhunter?.netPrice
                  : estimatedPoints?.minswap?.netPrice
              ),
              minReceive: Number(
                protocol === ProtocolType.DEXHUNTER
                  ? estimatedPoints?.dexhunter?.minReceive
                  : estimatedPoints?.minswap?.minReceive
              ),
              dexFee: Number(
                protocol === ProtocolType.DEXHUNTER
                  ? estimatedPoints?.dexhunter?.dexFee
                  : estimatedPoints?.minswap?.dexFee
              ),
              dexDeposits: Number(
                protocol === ProtocolType.DEXHUNTER
                  ? estimatedPoints?.dexhunter?.dexDeposits
                  : estimatedPoints?.minswap?.dexDeposits
              ),
              totalDeposits: Number(
                protocol === ProtocolType.DEXHUNTER
                  ? estimatedPoints?.dexhunter?.totalDeposits
                  : estimatedPoints?.minswap?.totalDeposits
              ),
            }}
            paths={
              protocol === ProtocolType.DEXHUNTER
                ? estimatedPoints?.dexhunter?.paths
                : estimatedPoints?.minswap?.paths
            }
            estimatedPoints={String(estimatedPoints?.estimatedPoint || '1')}
            protocol={protocol}
            onProtocolChange={setProtocol}
          />
        )}
      </div>
    </div>
  );
};

export default SwapWrapper;
