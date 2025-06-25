'use client';

import { Button, Skeleton } from '@/components/ui';
import { useTokenBalance } from '@/hooks';
import { formatNumber } from '@/lib/utils';
import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { Wallet } from 'lucide-react';
import React from 'react';

interface Props {
  address: string;
  tokenAddress: string;
  tokenSymbol: string;
  setAmount?: (amount: string) => void;
  digits?: number;
}

const TokenBalanceWrapper: React.FC<Props> = ({
  tokenAddress,
  tokenSymbol,
  setAmount,
  digits = 2,
}) => {
  const { accountBalance } = useCardano();

  const { balance, isLoading } = useTokenBalance(tokenAddress);

  const tokenBalance = tokenSymbol === 'ADA' ? accountBalance : balance;

  if (isLoading) return <Skeleton className="w-16 h-4" />;

  return (
    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
      <Wallet className="w-3 h-3" />
      <p className="text-xs">
        {formatNumber(Number(tokenBalance), digits)} {tokenSymbol}
      </p>
      {setAmount && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-[10px] px-1 py-0.5 h-fit w-fit"
            onClick={() => setAmount((Number(tokenBalance) / 2).toString())}
          >
            Half
          </Button>
          <Button
            variant="outline"
            className="text-[10px] px-1 py-0.5 h-fit w-fit"
            onClick={() => setAmount(tokenBalance.toString())}
          >
            Max
          </Button>
        </div>
      )}
    </div>
  );
};

export default TokenBalanceWrapper;
