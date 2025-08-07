import React, { useEffect } from 'react';

import LoginButton from '@/app/(app)/_components/log-in-button';

import ToolCard from '../tool-card';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import type { ToolInvocation } from 'ai';
import type { CardanoGetWalletAddressResultType } from '@/ai';
import { useSpidexCore } from '@/hooks/core/useSpidexCore';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetWalletAddress: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Wallet Address...`}
      result={{
        heading: (result: CardanoGetWalletAddressResultType) =>
          result.body ? `Fetched Wallet Address` : 'No wallet address found',
        body: (result: CardanoGetWalletAddressResultType) =>
          result.body ? `${result.body.address}` : 'No wallet address found',
      }}
      call={{
        heading: 'Connect Wallet',
        body: (toolCallId: string) => (
          <GetWalletAddressAction toolCallId={toolCallId} />
        ),
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

const GetWalletAddressAction = ({ toolCallId }: { toolCallId: string }) => {
  const { auth } = useSpidexCore();

  const { addToolResult, isLoading } = useChat();

  useEffect(() => {
    if (auth?.user?.walletAddress && !isLoading) {
      addToolResult(toolCallId, {
        message: 'Wallet connected',
        body: {
          address: auth?.user?.walletAddress,
        },
      });
    }
  }, [auth?.user?.walletAddress, isLoading]);

  const onComplete = (wallet: string) => {
    addToolResult(toolCallId, {
      message: 'Wallet connected',
      body: {
        address: wallet,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <LoginButton onComplete={onComplete} />
    </div>
  );
};

export default GetWalletAddress;
