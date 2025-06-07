'use client';

import React from 'react';

import { Skeleton } from '@/components/ui';

import Swap from '../../utils/swap';

import { useTokenDetail } from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { SolanaTradeArgumentsType, SolanaTradeResultBodyType } from '@/ai';

interface Props {
  toolCallId: string;
  args: SolanaTradeArgumentsType;
}

const SwapCallBody: React.FC<Props> = ({ toolCallId, args }) => {
  console.log('🚀 ~ args:', args);

  const { addToolResult } = useChat();

  const { data: inputTokenData, isLoading: inputTokenLoading } = useTokenDetail(
    args.inputMint || ''
  );
  const { data: outputTokenData, isLoading: outputTokenLoading } =
    useTokenDetail(args.outputMint || '');

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
          onSuccess={tx => {
            addToolResult<SolanaTradeResultBodyType>(toolCallId, {
              message: `Swap successful!`,
              body: {
                transaction: tx,
                inputAmount: args.inputAmount || 0,
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
