'use client';

import React from 'react';

import { Skeleton } from '@/components/ui';

import Swap from '../../utils/swap';

import { useTokenDetail } from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { SolanaTradeArgumentsType, SolanaTradeResultBodyType } from '@/ai';
import { CardanoTokenDetail } from '@/services/dexhunter/types';

interface Props {
  toolCallId: string;
  args: SolanaTradeArgumentsType;
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

const SwapCallBody: React.FC<Props> = ({ toolCallId, args }) => {
  console.log('🚀 ~ args:', args);

  const { addToolResult } = useChat();

  const { data: inputTokenData, isLoading: inputTokenLoading } = useTokenDetail(
    args.inputMint || 'ADA'
  );
  const { data: outputTokenData, isLoading: outputTokenLoading } =
    useTokenDetail(args.outputMint || 'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d');

  return (
    <div className="p-2 bg-bg-secondary border border-border-main rounded-md">
      {inputTokenLoading || outputTokenLoading ? (
        <Skeleton className="h-48 w-96" />
      ) : (
        <Swap
          initialInputToken={inputTokenData}
          initialOutputToken={outputTokenData}
          inputLabel="Sell"
          outputLabel="Buy"
          initialInputAmount={args.inputAmount?.toString()}
          swapText="Swap"
          swappingText="Swapping..."
          onSuccess={(tx, inputAmount) => {
            console.log("🚀 ~ tx:", tx)
            console.log("🚀 ~ inputAmount:", inputAmount)
            addToolResult<SolanaTradeResultBodyType>(toolCallId, {
              message: `Swap successful!`,
              body: {
                transaction: tx,
                inputAmount: Number(inputAmount) || args.inputAmount || 0,
                inputToken: inputTokenData?.unit || '',
                outputToken: outputTokenData?.unit || '',
              },
            });
          }}
          onError={error => {
            addToolResult(toolCallId, {
              message: `Swap failed: ${error}`,
            });
          }}
          onCancel={() => {
            addToolResult(toolCallId, {
              message: `Swap cancelled`,
            });
          }}
        />
      )}
    </div>
  );
};

export default SwapCallBody;
