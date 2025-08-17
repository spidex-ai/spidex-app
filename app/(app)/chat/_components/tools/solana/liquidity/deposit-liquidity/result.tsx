'use client';

import React from 'react';

import TransactionHash from '@/app/_components/transaction-hash';

import type { CardanoDepositLiquidityResultBodyType } from '@/ai/cardano';

interface Props {
  body: CardanoDepositLiquidityResultBodyType;
}

const DepositLiquidityResult: React.FC<Props> = ({ body }) => {
  return <TransactionHash hash={body.transaction} />;
};

export default DepositLiquidityResult;
