'use client';

import React, { useState } from 'react';

import {
  ApiV3PoolInfoStandardItem,
  Percent,
} from '@raydium-io/raydium-sdk-v2';


import { Button, Separator } from '@/components/ui';

import LogInButton from '@/app/(app)/_components/log-in-button';

import TokenInput from '../../../../utils/swap/token-input';

import {
  useSendTransaction,
  useTokenBalance,
  useTokenDataByAddress,
} from '@/hooks';

import { useChat } from '@/app/(app)/chat/_contexts/chat';

import { raydiumApiClient } from '@/services/raydium';

interface Props {
  pool: ApiV3PoolInfoStandardItem;
  toolCallId: string;
}

const StandardPool: React.FC<Props> = ({ pool, toolCallId }) => {
  const { addToolResult } = useChat();

  const [amountA, setAmountA] = useState<string>('');
  const [amountB, setAmountB] = useState<string>('');
  const [amountsLoading, setAmountsLoading] = useState<boolean>(false);


  const [otherAmountMin, setOtherAmountMin] = useState<string>('');
  const [isDepositing] = useState<boolean>(false);

  const [slippage] = useState<Percent>(new Percent(100, 1000));

  const { wallet } = useSendTransaction();

  const { data: mintA } = useTokenDataByAddress(pool.mintA.address);
  const { data: mintB } = useTokenDataByAddress(pool.mintB.address);
  console.log('🚀 ~ StandardPool ~ mintA:', mintA);
  console.log('🚀 ~ StandardPool ~ mintB:', mintB);

  const { balance: balanceA, isLoading: isBalanceALoading } = useTokenBalance(
    pool.mintA.address,
  );
  const { balance: balanceB, isLoading: isBalanceBLoading } = useTokenBalance(
    pool.mintB.address,
  );

  const handleAmountAChange = async (amount: string) => {
    setAmountA(amount);
    setAmountsLoading(true);
    const raydium = await raydiumApiClient;
    const { maxAnotherAmount, minAnotherAmount } =
      raydium.liquidity.computePairAmount({
        poolInfo: pool,
        amount: amount,
        slippage,
        baseIn: true,
      });
    setAmountB(maxAnotherAmount.toExact());
    setOtherAmountMin(minAnotherAmount.toExact());

    setAmountsLoading(false);
  };

  const handleAmountBChange = async (amount: string) => {
    setAmountB(amount);
    setAmountsLoading(true);
    const raydium = await raydiumApiClient;
    const { maxAnotherAmount, minAnotherAmount } =
      raydium.liquidity.computePairAmount({
        poolInfo: pool,
        amount: amount,
        slippage,
        baseIn: false,
      });
    setAmountA(maxAnotherAmount.toExact());
    setOtherAmountMin(minAnotherAmount.toExact());

    setAmountsLoading(false);
  };

  const onSubmit = async () => {};

  const onCancel = () => {
    addToolResult(toolCallId, {
      message: 'Deposit liquidity cancelled',
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">
          {pool.mintA.symbol}/{pool.mintB.symbol}
        </p>
        <div className="flex flex-col items-center">
          <p className="text-xs opacity-50">7d APR</p>
          <p className="text-sm">{pool.week.apr}%</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <TokenInput
            token={null}
            label={'Token A'}
            amount={amountA}
            onChange={handleAmountAChange}
            address={wallet ?? ''}
          />
          <TokenInput
            token={null}
            label={'Token B'}
            amount={amountB}
            onChange={handleAmountBChange}
            address={wallet ?? ''}
          />
        </div>
      </div>
      <Separator />
      {wallet ? (
        <div className="flex flex-col gap-2">
          <Button
            variant="brand"
            className="w-full"
            disabled={
              !amountA ||
              !amountB ||
              !otherAmountMin ||
              isDepositing ||
              !balanceA ||
              !balanceB ||
              isBalanceALoading ||
              isBalanceBLoading ||
              Number(amountA) > Number(balanceA) ||
              Number(amountB) > Number(balanceB) ||
              amountsLoading
            }
            onClick={onSubmit}
          >
            {isBalanceALoading || isBalanceBLoading || amountsLoading
              ? 'Loading...'
              : Number(amountA) > Number(balanceA) ||
                  Number(amountB) > Number(balanceB)
                ? 'Insufficient balance'
                : isDepositing
                  ? 'Depositing...'
                  : 'Deposit'}
          </Button>
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <LogInButton />
      )}
    </div>
  );
};

export default StandardPool;
