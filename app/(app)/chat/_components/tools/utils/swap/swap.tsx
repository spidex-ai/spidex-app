"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ChevronDown } from "lucide-react";

// import Decimal from 'decimal.js';

import { Button, GradientButton, Separator } from "@/components/ui";


import TokenInput from "./token-input";

import { useTokenBalance } from "@/hooks";

import { type QuoteResponse } from "@jup-ag/api";

import {
  CardanoTokenDetail,
  EsitmateSwapPayload,
  EsitmateSwapResponse,
  SwapPayload,
} from "@/services/dexhunter/types";

import AuthButton from "@/app/(app)/_components/sidebar/auth-button";
import SwapPoint from "@/app/_components/swap/swap-point";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import Image from "next/image";
import toast from "react-hot-toast";

export interface SwapWrapperProps {
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
}

export const adaTokenDetail: CardanoTokenDetail = {
  token_id: "ADA",
  token_ascii: "ADA",
  ticker: "ADA",
  is_verified: true,
  token_policy: "ADA",
  token_decimals: 6,
  supply: 0,
  creation_date: "",
  price: 0,
  logo: "",
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
    buildSwapRequest,
    submitSwapRequest,
    auth
  } = useSpidexCoreContext();
  const { enabledWallet, unusedAddresses, accountBalance } = useCardano();
  const isConnectedWallet = useMemo(() => {


    return unusedAddresses?.[0]?.toString() == auth?.user?.walletAddress
  }, [unusedAddresses, auth?.user?.walletAddress])
  const [inputAmount, setInputAmount] = useState<string>(
    initialInputAmount || ""
  );
  const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(
    initialInputToken || adaTokenDetail
  );

  const [outputAmount, setOutputAmount] = useState<string>("");
  const [outputToken, setOutputToken] = useState<CardanoTokenDetail | null>(
    initialOutputToken
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
    useTokenBalance(
      unusedAddresses?.[0]?.toString() || "",
      inputToken?.unit || ""
    );

  const tokenInputBalance =
    inputToken?.ticker === "ADA" ? accountBalance : inputBalance;

  const onChangeInputOutput = () => {
    const tempInputToken = inputToken;
    const tempInputAmount = inputAmount;
    setInputToken(outputToken);
    setInputAmount(outputAmount);
    setOutputToken(tempInputToken);
    setOutputAmount(tempInputAmount);
  };

  const onSwap = async () => {
    if (!unusedAddresses?.[0].toString() || !quoteResponse) return;
    if (typeof window === "undefined") return;
    setIsSwapping(true);
    try {
      const api = await (window as any).cardano[enabledWallet as any].enable();
      const payload: SwapPayload = {
        buyerAddress: unusedAddresses?.[0].toString() || "",
        tokenIn: inputToken?.token_id || " ",
        tokenOut: outputToken?.token_id || " ",
        slippage: 5,
        amountIn: Number(inputAmount),
        txOptimization: true,
        blacklistedDexes: [],
      };

      const buildSwap = await buildSwapRequest(payload);
      const signatures = await api?.signTx(buildSwap?.cbor, true);
      const submitSwap = await submitSwapRequest({
        txCbor: buildSwap.cbor,
        signatures: signatures,
      });

      const submitTx = await api?.submitTx(submitSwap?.cbor);
      onSuccess?.(submitTx);
      toast.success('You have swapped successfully!')
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Unknown error");
      toast.error('You have swapped failed! Please try again later!')
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
        return swapEstResponse?.total_output;
      } else {
        setIsNotPool(true);
        return "0";
      }
 
    } catch (error) {
      console.error("error:::", error);
    }
  };

  const checkPool = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const poolStats = await getSwapPoolStats(
        inputToken?.token_id || inputToken?.unit || "",
        outputToken?.token_id || outputToken?.unit || ""
      );
    
      if (poolStats) {
        setIsNotPool(false);
      } else {
        setIsNotPool(true);
      }
    } catch (error) {
      console.error("error:::", error);
      setIsNotPool(true);
    }
  }, [inputToken, outputToken]);

  const fetchQuoteAndUpdate = async () => {
    try {
        setIsQuoteLoading(true);
        setOutputAmount("");
    
        const quote = await getQuoteCardano(
          inputToken?.unit || inputToken?.token_id || "",
          outputToken?.unit || outputToken?.token_id || "",
          Number(inputAmount)
        );
        setQuoteResponse(quote);
        setOutputAmount(quote);
        setIsQuoteLoading(false);
      
      
    } catch (error) {
      console.error("error:::", error);
    }
  };

  useEffect(() => {
    if (inputToken && outputToken) {
      checkPool();
    }
  }, [inputToken, outputToken]);

  useEffect(() => {
    if (inputToken || outputToken) {
      if (inputAmount && Number(inputAmount) > 0) {
        fetchQuoteAndUpdate();
      } else {
        setQuoteResponse(null);
        setOutputAmount("");
      }
    }
  }, [inputToken, outputToken, inputAmount]);

  return (
    <div className="flex flex-col gap-4 w-96 max-w-full relative">
        <div className="absolute top-0 right-0 cursor-pointer" onClick={onCancel}>
            <Image src="/icons/close-blink.svg" alt="swap-bg" width={15} height={15} />
        </div>
      <div className={`flex flex-col gap-2 items-center w-full ${onCancel ? "mt-6" : ""}`}>
        <TokenInput
          label={inputLabel}
          amount={inputAmount}
          onChange={(value) => {
            setIsNotPool(false);
            setInputAmount(value);
          }}
          token={inputToken}
          onChangeToken={(token) => {

            setIsNotPool(false);
            setInputToken(token);
          }}
          address={unusedAddresses?.[0]?.toString() || ""}
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
          onChangeToken={(token) => {
            setIsNotPool(false);
            setOutputToken(token);
          }}
          address={unusedAddresses?.[0]?.toString() || ""}
        />
      </div>
      <div className="text-sm text-red-500">
        {isNotPool ? "No pool found" : null}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {isConnectedWallet ? (
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
              !inputAmount ||
              !outputAmount ||
              !tokenInputBalance ||
              inputBalanceLoading ||
              Number(inputAmount) > Number(tokenInputBalance)
            }
          >
            {isQuoteLoading
              ? "Loading..."
              : Number(inputAmount) > Number(tokenInputBalance)
              ? "Insufficient balance"
              : isSwapping
              ? swappingText || "Swapping..."
              : swapText || "Swap"}
          </GradientButton>
        ) : (
          <AuthButton />
        )}
        {estimatedPoints?.estimated_point && (
          <SwapPoint
            swapDetails={{
              inputToken: inputToken?.ticker || "",
              outputToken: outputToken?.ticker || "",
              inputAmount: inputAmount || "",
              outputAmount: estimatedPoints?.splits?.[0]?.amount_in
                ? String(
                    (estimatedPoints?.splits?.[0]?.expected_output ||
                      0 / estimatedPoints?.splits?.[0]?.amount_in ||
                      0).toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })
                  )
                : "",
              swapRoute: "",
              netPrice: estimatedPoints?.net_price,
              minReceive: estimatedPoints?.total_output,
              dexFee: estimatedPoints?.partner_fee,
              dexDeposits: estimatedPoints?.deposits,
              serviceFee: estimatedPoints?.partner_fee,
              batcherFee: estimatedPoints?.batcher_fee,
            }}
            splits={estimatedPoints?.splits || []}
            estimatedPoints={String(estimatedPoints?.estimated_point || "1")}
          />
        )}
      </div>
    </div>
  );
};

export default SwapWrapper;
