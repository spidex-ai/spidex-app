'use client';

import React from 'react';

import { Card } from '@/components/ui';
// import Address from "@/app/_components/address";

interface Props {
  txHash: string;
  txIndex: number;
  blockHeight: number;
  blockTime: number;
}

interface ListTransactionProps {
  data: Props[];
}

export const ListTransaction: React.FC<ListTransactionProps> = (
  props: ListTransactionProps
) => {
  console.log("🚀 ~ props:", props)
  return (
    <div>
      <div className="grid grid-cols-5">
        <div className="col-span-3 flex items-center justify-center">
          Tx Hash
        </div>
        <div className="col-span-1 flex items-center justify-center">
          Block Number
        </div>
        <div className="col-span-1 flex items-center justify-center">
          Block Time
        </div>
      </div>
      {props.data.map((prop, index) => (
        <div key={index}>
          <Transaction {...prop} />
        </div>
      ))}
    </div>
  );
};
const Transaction: React.FC<Props> = ({ txHash, blockHeight, blockTime }) => {
  const cardanoScanUrl = process.env.NEXT_PUBLIC_CARDANO_SCAN_URL;
  const onClick = () => {
    console.log('cardanoScanUrl:::', cardanoScanUrl);

    window.open(`${cardanoScanUrl}/transaction/${txHash}`, '_blank');
  };
  return (
    <Card
      className="grid grid-cols-5 items-center gap-2 p-2 my-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="col-span-3 text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-center">
        {txHash}
      </div>
      <div className="col-span-1 text-md font-bold flex items-center justify-center">
        {blockHeight}
      </div>

      <div className="col-span-1 text-md font-bold flex items-center justify-center">
        {new Date(blockTime * 1000).toLocaleString()}
      </div>
    </Card>
  );
};

export default Transaction;
