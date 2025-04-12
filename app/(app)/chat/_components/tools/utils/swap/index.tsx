'use client'

import React, { useEffect, useState, useCallback } from 'react'

import { ChevronDown } from 'lucide-react';

import { VersionedTransaction } from '@solana/web3.js';

// import Decimal from 'decimal.js';

import { Button, Separator } from '@/components/ui';

import LogInButton from '@/app/(app)/_components/log-in-button';

import TokenInput from './token-input';

import { useSendTransaction, useTokenBalance } from '@/hooks';

import { getSwapObj } from '@/services/jupiter';

import { SwapMode, type QuoteResponse } from '@jup-ag/api';
// import type { CardanoToken, Token } from '@/db/types';
// import { useCardanoTokenBalance } from '@/hooks/queries/cardano/use-token-balance';
import { CardanoTokenDetail, SwapPayload } from '@/services/dexhunter/types';
import { useSwapCardano } from '@/hooks/trade/use-swap-cardano';

    
    

interface Props {
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

const Swap: React.FC<Props> = ({ 
    initialInputToken, 
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

    const [inputAmount, setInputAmount] = useState<string>(initialInputAmount || "");
    const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(initialInputToken);

    const [outputAmount, setOutputAmount] = useState<string>("");
    const [outputToken, setOutputToken] = useState<CardanoTokenDetail | null>(initialOutputToken);

    const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);
    const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);

    const [isSwapping, setIsSwapping] = useState<boolean>(false);

    const { sendTransaction, wallet } = useSendTransaction();

    const { balance: inputBalance, isLoading: inputBalanceLoading } = useTokenBalance(inputToken?.unit || "", wallet || "");

    const onChangeInputOutput = () => {
        const tempInputToken = inputToken;
        const tempInputAmount = inputAmount;
        setInputToken(outputToken);
        setInputAmount(outputAmount);
        setOutputToken(tempInputToken);
        setOutputAmount(tempInputAmount);
    }

    const onSwap = async () => {
        if(!wallet || !quoteResponse) return;
        setIsSwapping(true);
        try {
            const { swapTransaction} = await getSwapObj(wallet, quoteResponse);
            const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            const txHash: any = await sendTransaction(transaction);
            onSuccess?.(txHash);
        } catch (error) {
            onError?.(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setIsSwapping(false);
        }
    }

    const getQuoteCardano = async (inputUnit: string, outputUnit: string, amount: number) => {
        console.log(inputUnit, outputUnit, amount);
        const quote: QuoteResponse = {
            inputMint: "0",
            outputMint: "0",
            inAmount: "0",
            outAmount: "0",
            otherAmountThreshold: "0",
            swapMode: SwapMode.ExactIn,
            slippageBps: 0,
            priceImpactPct: "0",
            routePlan: [],
        }
        return quote;
    }

    const { buildSwapRequest, submitSwapRequest } = useSwapCardano();

    const testSwap = useCallback(async () => {
        try {
            const api = await (window as any).cardano.lace.enable();
            const addresses = await api.getUsedAddresses();
            console.log('api:::', api);
            console.log('api:addresses:::', addresses);
            console.log("api.inputToken:::", api.inputToken);
            console.log("api.outputToken:::", api.outputToken);
            
        
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

    async function connectCardano() {
        await (window as any).cardano.lace.enable();

    }
    useEffect(() => {
        // const cardano = window?.cardano;
        console.log('windowooooooooooooooooooooo:::', (window as any)?.cardano);
        if (typeof window !== 'undefined' && (window as any)?.cardano) {
            connectCardano();
        }
        
    }, []);

    useEffect(() => {
        if (inputToken && outputToken) {
            const fetchQuoteAndUpdate = async () => {
                setIsQuoteLoading(true);
                setOutputAmount("");
                
                // TODO: Fetch quote from API
                const quote = await getQuoteCardano(inputToken?.unit || inputToken?.token_id || "", outputToken?.unit || outputToken?.token_id || "", 0);
                setQuoteResponse(quote);
                setOutputAmount("0");
                setIsQuoteLoading(false);
            }


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
                        setInputToken(token);
                    }}
                    address={wallet}
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
                        setOutputToken(token);
                    }}
                    address={wallet}
                />
            </div>
            <Separator />
            <button className='hidden' onClick={testSwap}>TestSwap</button>
            <div className="flex flex-col gap-2">
                {
                    wallet ? (
                        <Button 
                            variant="brand" 
                            className="w-full"
                            onClick={onSwap}
                            disabled={isSwapping || isQuoteLoading || !quoteResponse || !inputToken || !outputToken || !inputAmount || !outputAmount || !inputBalance || inputBalanceLoading || Number(inputAmount) > Number(inputBalance)}
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
                        </Button>
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

export default Swap;