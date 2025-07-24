'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Button, GradientButton, Separator } from '@/components/ui';

import LogInButton from '@/app/(app)/_components/log-in-button';

import TokenInput from './token-input';

import { useDebounce, useTokenBalance } from '@/hooks';

import { cn, DEXHUNTER_SAVE_FEE, MINSWAP_SAVE_FEE } from '@/lib/utils';

import type { QuoteResponse } from '@jup-ag/api';

import {
  CardanoTokenDetail,
  EsitmateSwapPayload,
  EsitmateSwapResponse,
  SwapRequestDexHunterPayload,
  SwapRequestMinswapPayload,
} from '@/services/dexhunter/types';
import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { decodeHexAddress } from '@cardano-foundation/cardano-connect-with-wallet-core';
import SwapPoint from './swap-point';
import { toast } from 'react-hot-toast';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';
import { ProtocolType } from './select-protocol';

interface Props {
  initialInputToken: CardanoTokenDetail | null;
  initialOutputToken: CardanoTokenDetail | null;
  inputLabel: string;
  outputLabel: string;
  initialInputAmount?: string;
  swapText?: string;
  swappingText?: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  className?: string;
  priorityTokens?: string[];
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

const Swap: React.FC<Props> = ({
  initialInputToken,
  initialOutputToken,
  initialInputAmount,
  swapText,
  swappingText,
  onSuccess,
  onError,
  onCancel,
  className,
  inputLabel,
  outputLabel,
}) => {
  const {
    getSwapPoolStats,
    estimateSwap,
    buildSwapRequestDexHunter,
    buildSwapRequestMinswap,
    submitSwapRequest,
  } = useSpidexCore();
  const { enabledWallet, unusedAddresses, accountBalance } = useCardano();
  const { auth } = useSpidexCore();

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

  const { balance: inputBalance, isLoading: inputBalanceLoading } =
    useTokenBalance(inputToken?.unit || '');

  const tokenInputBalance =
    inputToken?.ticker === 'ADA' ? accountBalance : inputBalance;

  const [protocol, setProtocol] = useState<ProtocolType>(
    ProtocolType.DEXHUNTER
  );

  const isInsufficientBalance = useMemo(() => {
    const saveFee = protocol === ProtocolType.DEXHUNTER ? DEXHUNTER_SAVE_FEE : MINSWAP_SAVE_FEE;
    if (Number(debouncedInputAmount) > Number(tokenInputBalance)) return true;

    if (Number(accountBalance) < saveFee) return true;

    let totalDepositADA = Number(
      protocol === ProtocolType.DEXHUNTER
        ? estimatedPoints?.dexhunter?.totalDeposits
        : estimatedPoints?.minswap?.totalDeposits
    );

    if (inputToken?.ticker === 'ADA') {
      totalDepositADA += Number(debouncedInputAmount);
    }

    if (Number(accountBalance) < totalDepositADA + saveFee) return true;

    return false;
  }, [
    debouncedInputAmount,
    tokenInputBalance,
    accountBalance,
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
    if (!unusedAddresses?.[0].toString() || !quoteResponse) return;
    if (typeof window === 'undefined') return;
    setIsSwapping(true);
    try {
      const api = await (window as any).cardano[enabledWallet as any].enable();
      const utxos = await api?.getUtxos();

      if (!utxos || utxos.length === 0) {
        console.error('No UTxOs available to spend.');
        return;
      }

      const usedAddressesHex = await api.getUsedAddresses();
      console.log('inputToken', inputToken);
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
        onSuccess?.(submitTx);
      } else {
        onSuccess?.(submitSwap?.txHash);
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
    const swapEstPayload: EsitmateSwapPayload = {
      tokenIn: inputUnit,
      tokenOut: outputUnit,
      amountIn: amount,
      slippage: 5,
      blacklistedDexes: [],
    };
    const swapEstResponse = await estimateSwap(swapEstPayload);
    console.log('🚀 ~ swapEstResponse:', swapEstResponse);
    if (swapEstResponse) {
      setEstimatedPoints(swapEstResponse);

      return protocol === 'dexhunter'
        ? swapEstResponse?.dexhunter?.minReceive
        : swapEstResponse?.minswap?.minReceive;
    } else {
      setIsNotPool(true);
      return '0';
    }
  };

  const checkPool = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('inputToken', inputToken);
      console.log('outputToken', outputToken);
      if (
        (inputToken?.token_id === outputToken?.token_id &&
          inputToken?.token_id != null &&
          outputToken?.token_id != null) ||
        (inputToken?.ticker === outputToken?.ticker &&
          inputToken?.ticker != null &&
          outputToken?.ticker != null) ||
        (inputToken?.unit === outputToken?.unit &&
          inputToken?.unit != null &&
          outputToken?.unit != null)
      ) {
        setIsNotPool(true);
        return;
      }
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
    setIsQuoteLoading(true);
    setOutputAmount('');

    const quote = await getQuoteCardano(
      inputToken?.unit ? inputToken?.unit : inputToken?.token_id || '',
      outputToken?.unit ? outputToken?.unit : outputToken?.token_id || '',
      Number(debouncedInputAmount)
    );
    setQuoteResponse(quote);
    setOutputAmount(quote);
    setIsQuoteLoading(false);
  };

  useEffect(() => {
    console.log('inputToken', inputToken);
    console.log('outputToken', outputToken);
    if (inputToken?.ticker && outputToken?.ticker) {
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
    <div className={cn('flex flex-col gap-4 w-96 max-w-full', className)}>
      <div className="flex flex-col gap-2 items-center w-full">
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
          <LogInButton />
        )}
        {onCancel && (
          <Button variant="ghost" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
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

export default Swap;
