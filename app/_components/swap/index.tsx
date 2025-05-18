"use client";

import React, { useCallback, useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button, GradientButton, Separator } from "@/components/ui";

import LogInButton from "@/app/(app)/_components/log-in-button";

import TokenInput from "./token-input";

import { useTokenBalance } from "@/hooks";

import { cn } from "@/lib/utils";

import type { QuoteResponse } from "@jup-ag/api";

import {
  CardanoTokenDetail,
  EsitmateSwapPayload,
  EsitmateSwapResponse,
  SwapPayload,
} from "@/services/dexhunter/types";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import {decodeHexAddress} from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useSpidexCoreContext } from "@/app/_contexts";
import SwapPoint from "./swap-point";

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
    buildSwapRequest,
    submitSwapRequest,
  } = useSpidexCoreContext();
  const { enabledWallet, unusedAddresses, accountBalance } = useCardano();

  const [inputAmount, setInputAmount] = useState<string>(
    initialInputAmount || ""
  );
  const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(
    initialInputToken || adaTokenDetail
  );
  const [outputAmount, setOutputAmount] = useState<string>("");
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
    useTokenBalance(
      unusedAddresses?.[0]?.toString() || "",
      inputToken?.token_id || ""
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
      const utxos = await api?.getUtxos();

      if (!utxos || utxos.length === 0) {
        console.error("No UTxOs available to spend.");
        return;
      }
      const unusedAddressesHex = await api.getUnusedAddresses();
      const unusedAddresses = decodeHexAddress(unusedAddressesHex[0]);
      const payload: SwapPayload = {
        buyerAddress: unusedAddresses,
        tokenIn: inputToken?.unit ? inputToken?.unit : inputToken?.token_id || " ",
        tokenOut: outputToken?.unit ? outputToken?.unit : outputToken?.token_id || " ",
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
    } catch (error) {
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
      console.log("🚀 ~ swapEstResponse:", swapEstResponse)

      return swapEstResponse?.total_output;
    } else {
      setIsNotPool(true);
      return "0";
    }
  };

  const checkPool = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const poolStats = await getSwapPoolStats(
        inputToken?.unit ? inputToken?.unit : inputToken?.token_id || "",
        outputToken?.unit ? outputToken?.unit : outputToken?.token_id || ""
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
    setIsQuoteLoading(true);
    setOutputAmount("");

    const quote = await getQuoteCardano(
      inputToken?.unit ? inputToken?.unit : inputToken?.token_id || "",
      outputToken?.unit ? outputToken?.unit : outputToken?.token_id || "",
      Number(inputAmount)
    );
    setQuoteResponse(quote);
    setOutputAmount(quote);
    setIsQuoteLoading(false);
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
    <div className={cn("flex flex-col gap-4 w-96 max-w-full", className)}>
      <div className="flex flex-col gap-2 items-center w-full">
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
          address={unusedAddresses?.[0]?.toString()}
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
          address={unusedAddresses?.[0]?.toString()}
        />
      </div>
      <div className="text-sm text-red-500">
        {isNotPool ? "No pool found" : null}
      </div>
      <Separator />
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
        {onCancel && (
          <Button variant="ghost" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
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
              netPrice: String(estimatedPoints?.net_price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),
              minReceive: String(estimatedPoints?.total_output.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),
              dexFee: String(estimatedPoints?.partner_fee.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),
              dexDeposits: String(estimatedPoints?.deposits.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),
              serviceFee: String(estimatedPoints?.partner_fee.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),

              batcherFee: String(estimatedPoints?.batcher_fee.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })),
            }}
            splits={estimatedPoints?.splits || []}
            estimatedPoints={String(estimatedPoints?.estimated_point || "1")}
          />
        )}
      </div>
    </div>
  );
};

export default Swap;
