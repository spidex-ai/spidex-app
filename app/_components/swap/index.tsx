"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

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
import { decodeHexAddress } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useSpidexCoreContext } from "@/app/_contexts";
import SwapPoint from "./swap-point";
import { toast } from "react-hot-toast";

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
  token_policy: "lovelace",
  token_decimals: 6,
  supply: 45000000000,
  creation_date: "",
  price: 1,
  logo: "https://core.spidex.ag/public/icons/tokens/ada.svg",
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
  const { enabledWallet, unusedAddresses, accountBalance, stakeAddress } = useCardano();

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
      stakeAddress || "",
      inputToken?.unit || ""
    );

  const tokenInputBalance =
    inputToken?.ticker === "ADA" ? accountBalance : inputBalance;

  const isInsufficientBalance = useMemo(() => {
    if (Number(inputAmount) > Number(tokenInputBalance)) return true;
    if (Number(accountBalance) < 5) return true;
    if (inputToken?.ticker === "ADA") {
      const totalDepositADA = Number(inputAmount) +
      Number(estimatedPoints?.deposits) +
      Number(estimatedPoints?.batcher_fee) +
      Number(estimatedPoints?.partner_fee)

      if (Number(accountBalance) < totalDepositADA) return true;
    };
    return false;
  }, [inputAmount, tokenInputBalance, accountBalance, inputToken, estimatedPoints]);

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

      const usedAddressesHex = await api.getUsedAddresses();
      console.log("usedAddressesHex", usedAddressesHex);
      const addresses = [];
      for (const address of usedAddressesHex) {
        const unusedAddresses = decodeHexAddress(address);
        addresses.push(unusedAddresses);
      }

      const payload: SwapPayload = {
        addresses: addresses,
        tokenIn: inputToken?.unit
          ? inputToken?.unit
          : inputToken?.token_id || " ",
        tokenOut: outputToken?.unit
          ? outputToken?.unit
          : outputToken?.token_id || " ",
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
      toast.success("You have swapped successfully!");
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

      return swapEstResponse?.total_output;
    } else {
      setIsNotPool(true);
      return "0";
    }
  };

  const checkPool = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (inputToken?.token_id === outputToken?.token_id || inputToken?.ticker === outputToken?.ticker || inputToken?.unit === outputToken?.unit) {
        setIsNotPool(true);
        return;
      }
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
    console.log("inputToken", inputToken);
    console.log("outputToken", outputToken);
    if (inputToken?.ticker && outputToken?.ticker) {
      console.log("checkPool");
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
            setIsNotPool(false);
            setInputToken(token);
          }}
          address={stakeAddress || ""}
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
          address={stakeAddress || ""}
        />
      </div>
      <div className="text-sm text-red-500">
        {isNotPool ? "No pool found" : null}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {stakeAddress ? (
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
              isInsufficientBalance
            }
          >
            {isQuoteLoading
              ? "Loading..."
              : isInsufficientBalance
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
                    (
                      estimatedPoints?.splits?.[0]?.expected_output ||
                      0 / estimatedPoints?.splits?.[0]?.amount_in ||
                      0
                    ).toLocaleString(undefined, {
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

export default Swap;
