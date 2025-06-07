'use client';

import React from 'react';

import { Card } from '@/components/ui';

// import Swap from '../../../utils/swap';

// import { useTokenDataByAddress } from '@/hooks';

// import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { UnstakeArgumentsType } from '@/ai';

interface Props {
  toolCallId: string;
  args: UnstakeArgumentsType;
}

const UnstakeCallBody: React.FC<Props> = ({ toolCallId, args }) => {
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
                        inputLabel="Unstake"
                        outputLabel="Receive"
                        initialInputAmount={args.amount?.toString()}
                        swapText="Unstake"
                        swappingText="Unstaking..."
                        onSuccess={(tx) => {
                            addToolResult<UnstakeResultBodyType>(toolCallId, {
                                message: `Unstake successful!`,
                                body: {
                                    tx,
                                    inputAmount: args.amount || 0,
                                    symbol: outputTokenData?.symbol || "",
                                }
                            });
                        }}
                        onError={(error) => {
                            addToolResult(toolCallId, {
                                message: `Unstake failed: ${error}`,
                            });
                        }}
                        onCancel={() => {
                            addToolResult(toolCallId, {
                                message: `Unstake cancelled`,
                            });
                        }}
                    />
                )
            } */}
    </Card>
  );
};

export default UnstakeCallBody;
