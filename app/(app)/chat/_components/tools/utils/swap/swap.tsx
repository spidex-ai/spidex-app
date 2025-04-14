'use client'

import React, { useEffect, useState, useCallback } from 'react'

import { ChevronDown } from 'lucide-react';

// import Decimal from 'decimal.js';

import { Button, GradientButton, Separator } from '@/components/ui';

import LogInButton from '@/app/(app)/_components/log-in-button';

import TokenInput from './token-input';

import { useTokenBalance } from '@/hooks';

import { type QuoteResponse } from '@jup-ag/api';

import { CardanoTokenDetail, EsitmateSwapPayload, SwapPayload } from '@/services/dexhunter/types';

import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';


export interface SwapWrapperProps {
    initialInputToken: CardanoTokenDetail | null,    
    initialOutputToken: CardanoTokenDetail   | null,
    inputLabel: string,
    outputLabel: string,
    initialInputAmount?: string,
    swapText?: string,
    swappingText?: string,
    onSuccess?: (txHash: string) => void,
    onError?: (error: string) => void,
    onCancel?: () => void,
}

export const adaTokenDetail: CardanoTokenDetail = {
    token_id: " ",
    token_ascii: "ADA",
    ticker: "ADA",
    is_verified: true,
    token_policy: "ADA",
    token_decimals: 6,
    supply: 0,
    creation_date: "",
    price: 0,
    logo: "",
}

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
    onCancel 
}) => {
    console.log('initialInputTokeninitialInputTokeninitialInputTokeninitialInputTokeninitialInputToken:::', initialInputToken);
    const { getSwapPoolStats, estimateSwap, buildSwapRequest, submitSwapRequest } = useSpidexCoreContext();
    const {enabledWallet, unusedAddresses} = useCardano();

    const [inputAmount, setInputAmount] = useState<string>(initialInputAmount || "");
    const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(initialInputToken || adaTokenDetail);

    const [outputAmount, setOutputAmount] = useState<string>("");
    const [outputToken, setOutputToken] = useState<CardanoTokenDetail | null>(initialOutputToken);

    const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);
    const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);

    const [isSwapping, setIsSwapping] = useState<boolean>(false);

    const [isNotPool, setIsNotPool] = useState<boolean>(false);

    const { balance: inputBalance, isLoading: inputBalanceLoading } = useTokenBalance(unusedAddresses?.[0]?.toString() || "", inputToken?.unit || "");
    console.log("🚀 ~ unusedAddresses:", unusedAddresses)

    const onChangeInputOutput = () => {
        const tempInputToken = inputToken;
        const tempInputAmount = inputAmount;
        setInputToken(outputToken);
        setInputAmount(outputAmount);
        setOutputToken(tempInputToken);
        setOutputAmount(tempInputAmount);
    }

    const onSwap = async () => {
        if(!unusedAddresses?.[0].toString() || !quoteResponse) return;
        if (typeof window === 'undefined') return;
        setIsSwapping(true);
        try {
            const api = await (window as any).cardano[enabledWallet as any].enable();
            const payload: SwapPayload = {
                buyer_address: unusedAddresses?.[0].toString() || "",
                token_in: inputToken?.token_id || " ",
                token_out: outputToken?.token_id || " ",
                slippage: 1,
                amount_in: Number(inputAmount),
                tx_optimization: false,
                blacklisted_dexes: [],
            }

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
    }

    const getQuoteCardano = async (inputUnit: string, outputUnit: string, amount: number) => {
        console.log(inputUnit, outputUnit, amount);
        const swapEstPayload: EsitmateSwapPayload = {
            tokenIn: inputUnit,
            tokenOut: outputUnit,
            amountIn: amount,
            slippage: 1,
            blacklistedDexes: [],
        }
        const swapEstResponse = await estimateSwap(swapEstPayload);
        return swapEstResponse?.total_output;
    }

    const testSwap = useCallback(async () => {
        try {
            const api = await (window as any).cardano.lace.enable();
            // const addresses = await api.getUsedAddresses();

            const payload: SwapPayload = {
                buyer_address: 'addr1q9gykktajrgrmj5am8vwlhp65a72emlwn2s3e5cadkhe3vrfkfxs6yajls3ft0yn42uqlcnrq6qcn3l0lunkxy6aplgspxm6da', 
                token_in: '',
                token_out: "279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b",
                amount_in: 1,
                slippage: 1,
                tx_optimization: false,
                blacklisted_dexes: [],
            }
            console.log('payload:::', payload);
            const buildSwap = await buildSwapRequest(payload);
            console.log('buildSwap:::', buildSwap);
            const signatures = await api?.signTx(buildSwap?.cbor, true); 
            console.log('signedSwap:::', signatures);
            const submitSwap = await submitSwapRequest({
                txCbor: buildSwap.cbor,
                signatures: signatures,
            });

            console.log('submitSwap:::', submitSwap);

            const submitTx = await api?.submitTx(submitSwap?.cbor);
            console.log('submitTx:::', submitTx);
        } catch (error) {
            console.error('error:::', error);
        }
    }, [inputToken, outputToken, inputAmount]);

    const checkPool = useCallback(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const poolStats = await getSwapPoolStats(inputToken?.token_id || "", outputToken?.token_id || "");
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
        setOutputAmount("");
    
        const quote = await getQuoteCardano(inputToken?.unit || inputToken?.token_id || "", outputToken?.unit || outputToken?.token_id || "", Number(inputAmount));
        setQuoteResponse(quote);
        setOutputAmount(quote);
        setIsQuoteLoading(false);
    }

    useEffect(() => {
        if (inputToken || outputToken) {
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
        <div className="flex flex-col gap-4 w-96 max-w-full">
            <div className="flex flex-col gap-2 items-center w-full">
                <TokenInput
                    label={inputLabel}
                    amount={inputAmount}
                    onChange={setInputAmount}
                    token={inputToken}
                    onChangeToken={(token) => {
                        console.log('api:token:::', token);
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
                        console.log('api:token:::', token);
                        setIsNotPool(false);
                        setOutputToken(token);
                    }}
                    address={unusedAddresses?.[0]?.toString() || ""}
                />
            </div>
            <div className='text-sm text-red-500'>{isNotPool ? "No pool found" : null}</div>
            <Separator />
            <button className='hidden' onClick={testSwap}>TestSwap</button>
            <div className="flex flex-col gap-2">
                {
                    unusedAddresses?.[0]?.toString() ? (
                        <GradientButton 
                            variant="brand" 
                            className="w-full"
                            onClick={onSwap}
                            disabled={isNotPool || isSwapping || isQuoteLoading || !quoteResponse || !inputToken || !outputToken || !inputAmount || !outputAmount || !inputBalance || inputBalanceLoading || Number(inputAmount) > Number(inputBalance)}
                        >
                            {
                                isQuoteLoading 
                                    ? "Loading..." 
                                    : Number(inputAmount) > Number(inputBalance)
                                        ? "Insufficient balance"
                                        : isSwapping
                                            ? swappingText || "Swapping..."
                                            : swapText || "Swap"
                            }
                        </GradientButton>
                    ) : (
                        <LogInButton />
                    )
                }
                {
                    onCancel && (
                        <Button variant="ghost" className="w-full" onClick={onCancel}>Cancel</Button>
                    )
                }
            </div>
        </div>
    )
}

export default SwapWrapper;