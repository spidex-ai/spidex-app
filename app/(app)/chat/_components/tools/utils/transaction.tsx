'use client';

import React from 'react';

import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PortfolioTransaction } from '@/hooks/portfolio/type';
import { formatNumber } from '@/lib/utils';
import { formatDate } from '@/app/utils/format';
import Image from 'next/image';
// import Address from "@/app/_components/address";

interface Props {
  txHash: string;
  txIndex: number;
  blockHeight: number;
  blockTime: number;
}

interface ListTransactionProps {
  data: any[];
}

export const ListTransaction: React.FC<ListTransactionProps> = (
  props: ListTransactionProps
) => {
  console.log("🚀 ~ props:", props)

  const onClickTxn = (hash: string) => {
    window.open(`https://cexplorer.io/tx/${hash}`, '_blank');
  };

  return (
    <div className="">
      <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Token A</TableHead>
                <TableHead>Amount A</TableHead>
                <TableHead>Token B</TableHead>
                <TableHead>Amount B</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">TXN</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="max-h-96 overflow-y-hidden">
              {props.data.map((tx: PortfolioTransaction, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{tx.action}</TableCell>
                  <TableCell>
                    <div className="font-medium flex gap-2 items-center">
                      <img
                        src={tx.tokenAIcon}
                        alt={tx.tokenAName}
                        className="w-4 h-4 rounded-full"
                      />
                      <p>{tx.tokenAName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(tx.tokenAAmount, 2)}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="font-medium flex gap-2 items-center">
                      <img
                        src={tx.tokenBIcon}
                        alt={tx.tokenBName}
                        className="w-4 h-4 rounded-full"
                      />
                      <p>{tx.tokenBName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(tx.tokenBAmount, 2)}</TableCell>
                  <TableCell>
                    {formatDate(new Date(tx.time * 1000))}
                  </TableCell>
                  <TableCell
                    className="text-right flex justify-end cursor-pointer"
                    onClick={() => onClickTxn(tx.hash)}
                  >
                    <Image
                      src="/icons/txn-gray.svg"
                      alt="txn"
                      width={16}
                      height={16}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

      </Table>
      {/* {props.data.map((prop, index) => (
        <div key={index}>
          <Transaction {...prop} />
        </div>
      ))} */}
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
