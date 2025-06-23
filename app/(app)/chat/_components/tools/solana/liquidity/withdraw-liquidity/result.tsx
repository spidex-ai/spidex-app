'use client';

import React from 'react';

import TransactionHash from '@/app/_components/transaction-hash';

import type { CardanoWithdrawLiquidityResultBodyType } from '@/ai/cardano';

interface Props {
  body: CardanoWithdrawLiquidityResultBodyType;
}

const WithdrawLiquidityResult: React.FC<Props> = ({ body }) => {
  return <TransactionHash hash={body.transaction} />;
};

export default WithdrawLiquidityResult;
