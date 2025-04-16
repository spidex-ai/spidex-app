"use client";

import React, { useEffect, useState, useCallback } from "react";

import { ChevronDown } from "lucide-react";

// import Decimal from 'decimal.js';

import { Button, GradientButton, Separator } from "@/components/ui";

import LogInButton from "@/app/(app)/_components/log-in-button";

import TokenInput from "./token-input";

import { useTokenBalance } from "@/hooks";

import { type QuoteResponse } from "@jup-ag/api";

import {
  CardanoTokenDetail,
  EsitmateSwapPayload,
  EsitmateSwapResponse,
  SwapPayload,
} from "@/services/dexhunter/types";

import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import SwapPoint from "@/app/_components/swap/swap-point";
import Image from "next/image";

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
  console.log(
    "initialInputTokeninitialInputTokeninitialInputTokeninitialInputTokeninitialInputToken:::",
    initialInputToken
  );
  const {
    getSwapPoolStats,
    estimateSwap,
    buildSwapRequest,
    submitSwapRequest,
  } = useSpidexCoreContext();
  const { enabledWallet, unusedAddresses, accountBalance } = useCardano();
  console.log("🚀 ~ accountBalance:", accountBalance);

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
  console.log("🚀 ~ unusedAddresses:", unusedAddresses);

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
        slippage: 1,
        amountIn: Number(inputAmount),
        txOptimization: false,
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
    } catch (error) {
      console.log("errorswap:::", error);
      onError?.(error instanceof Error ? error.message : "Unknown error");
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
      console.log(inputUnit, outputUnit, amount);
      const swapEstPayload: EsitmateSwapPayload = {
        tokenIn: inputUnit,
        tokenOut: outputUnit,
        amountIn: amount,
        slippage: 1,
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
      console.log("error:::", error);
    }
  };

  const testSwap = useCallback(async () => {
    try {
      const api = await (window as any).cardano.lace.enable();
      // const addresses = await api.getUsedAddresses();

      const payload: SwapPayload = {
        buyerAddress:
          "addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da",
        tokenIn: "",
        tokenOut:
          "279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b",
        amountIn: 1,
        slippage: 1,
        txOptimization: false,
        blacklistedDexes: [],
      };
      console.log("payload:::", payload);
      const buildSwap = await buildSwapRequest(payload);
      console.log("buildSwap:::", buildSwap);
      const signatures = await api?.signTx(buildSwap?.cbor, true);
      console.log("signedSwap:::", signatures);
      const submitSwap = await submitSwapRequest({
        txCbor: buildSwap.cbor,
        signatures: signatures,
      });

      console.log("submitSwap:::", submitSwap);

      const submitTx = await api?.submitTx(submitSwap?.cbor);
      console.log("submitTx:::", submitTx);
    } catch (error) {
      console.error("error:::", error);
    }
  }, [inputToken, outputToken, inputAmount]);

  const checkPool = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const poolStats = await getSwapPoolStats(
        inputToken?.token_id || "",
        outputToken?.token_id || ""
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
      console.log("errorrrrr:::", error);
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
            console.log("api:token:::", token);
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
            console.log("api:token:::", token);
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
      <button className="hidden" onClick={testSwap}>
        TestSwap
      </button>
      <div className="flex flex-col gap-2">
        {unusedAddresses?.[0]?.toString() ? (
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
          <LogInButton />
        )}
        {estimatedPoints?.estimated_point && (
          <SwapPoint
            swapDetails={{
              inputToken: inputToken?.ticker || "",
              outputToken: outputToken?.ticker || "",
              inputAmount: inputAmount || "",
              outputAmount: estimatedPoints?.splits?.[0]?.amount_in
                ? String(
                    estimatedPoints?.splits?.[0]?.expected_output ||
                      0 / estimatedPoints?.splits?.[0]?.amount_in ||
                      0
                  )
                : "",
              swapRoute: "",
              netPrice: String(estimatedPoints?.net_price),
              minReceive: String(estimatedPoints?.total_output),
              dexFee: String(estimatedPoints?.dexhunter_fee),
              dexDeposits: String(estimatedPoints?.deposits),
              serviceFee: String(estimatedPoints?.partner_fee),
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
