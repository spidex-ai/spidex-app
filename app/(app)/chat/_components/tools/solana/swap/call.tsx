'use client';

import React from 'react';

import { Skeleton } from '@/components/ui';

import Swap from '../../utils/swap';

import { useTokenDetail } from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type {
  CardanoTradeArgumentsType,
  CardanoTradeResultBodyType,
} from '@/ai/cardano';
import { TradeInputSchema } from '@/ai/cardano/actions/trade/input-schema';
import { CardanoTokenDetail } from '@/services/dexhunter/types';

interface Props {
  toolCallId: string;
  args: CardanoTradeArgumentsType;
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
  const { addToolResult } = useChat();

  // Parse args to apply transformations and defaults for empty strings
  const parsedArgs = TradeInputSchema.parse(args);
  
  const { data: inputTokenData, isLoading: inputTokenLoading } = useTokenDetail(
    parsedArgs.inputMint
  );
  const { data: outputTokenData, isLoading: outputTokenLoading } =
    useTokenDetail(parsedArgs.outputMint);

  console.log('🚀 ~ original args:', args);
  console.log('🚀 ~ parsed args:', parsedArgs);
  console.log('🚀 ~ inputTokenData:', inputTokenData);
  console.log('🚀 ~ outputTokenData:', outputTokenData);

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
          initialInputAmount={parsedArgs.inputAmount?.toString()}
          swapText="Swap"
          swappingText="Swapping..."
          onSuccess={(tx, inputAmount) => {
            addToolResult<CardanoTradeResultBodyType>(toolCallId, {
              message: `Swap successful!`,
              body: {
                transaction: tx,
                inputAmount: Number(inputAmount) || parsedArgs.inputAmount || 0,
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
