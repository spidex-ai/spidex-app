'use client';

import React from 'react';

import { Card } from '@/components/ui';

// import Swap from '../../../utils/swap';

// import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { CardanoStakeArgumentsType } from '@/ai/cardano';

interface Props {
  toolCallId: string;
  args: CardanoStakeArgumentsType;
}

const SwapCallBody: React.FC<Props> = ({ toolCallId, args }) => {
  console.log(args, toolCallId);

  // const { addToolResult } = useChat();

  return (
    <Card className="p-4 max-w-full">
      {/* {
                inputTokenLoading || outputTokenLoading ? (
                    <Skeleton className="h-48 w-96 max-w-full" />
                ) : (
                    <Swap
                        initialInputToken={null}
                        initialOutputToken={null}
                        inputLabel="Stake"
                        outputLabel="Receive"
                        initialInputAmount={args.amount?.toString()}
                        swapText="Stake"
                        swappingText="Staking..."
                        onSuccess={(tx) => {
                            addToolResult<StakeResultBodyType>(toolCallId, {
                                message: `Stake successful!`,
                                body: {
                                    tx,
                                    symbol: outputTokenData?.symbol || "",
                                }
                            });
                        }}
                        onError={(error) => {
                            addToolResult(toolCallId, {
                                message: `Stake failed: ${error}`,
                            });
                        }}
                        onCancel={() => {
                            addToolResult(toolCallId, {
                                message: `Stake cancelled`,
                            });
                        }}
                    />
                )
            } */}
    </Card>
  );
};

export default SwapCallBody;
