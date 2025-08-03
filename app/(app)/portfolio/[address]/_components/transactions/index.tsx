'use client';

import React from 'react';

import {
  Card,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

import { usePortfolioTransaction } from '@/hooks/portfolio';
import Image from 'next/image';
import type { PortfolioTransaction } from '@/hooks/portfolio/type';
import { formatNumber } from '@/lib/utils';
import Pagination from '@/app/(app)/_components/pagination';
import { formatDate } from '@/app/utils/format';

const Transactions: React.FC = () => {
  const {
    data: transactions,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
  } = usePortfolioTransaction();

  const onClickTxn = (hash: string) => {
    window.open(`https://cexplorer.io/tx/${hash}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/transaction-white.svg"
          width={17}
          height={15}
          alt="transactions"
          className="w-4 h-4"
        />
        <h2 className="text-lg font-bold">Transactions</h2>
      </div>
      <Card className="p-2">
        {loading ? (
          <Skeleton className="h-96 w-full" />
        ) : transactions?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[50px] sm:min-w-[100px] text-center">
                  Action
                </TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[200px] text-center">
                  Token A
                </TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[200px] text-center">
                  Amount A
                </TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[200px] text-center">
                  Token B
                </TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[200px] text-center">
                  Amount B
                </TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[200px] text-center">
                  Time
                </TableHead>
                <TableHead className="min-w-[50px] sm:min-w-[100px] text-right">
                  TXN
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="max-h-96 overflow-y-hidden">
              {transactions.map((tx: PortfolioTransaction, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">{tx.action}</TableCell>
                  <TableCell className="text-center">
                    <div className="font-medium flex gap-2 items-center justify-center">
                      <img
                        src={tx.tokenAIcon}
                        alt={tx.tokenAName}
                        className="w-4 h-4 rounded-full border dark:border-border-main"
                      />
                      <p>{tx.tokenAName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(tx.tokenAAmount, 2)}
                  </TableCell>
                  <TableCell className="flex items-center gap-2 text-center justify-center">
                    <div className="font-medium flex gap-2 items-center">
                      <img
                        src={tx.tokenBIcon}
                        alt={tx.tokenBName}
                        className="w-4 h-4 rounded-full border dark:border-border-main"
                      />
                      <p>{tx.tokenBName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(tx.tokenBAmount, 2)}
                  </TableCell>
                  <TableCell className="text-center justify-center">
                    {formatDate(new Date(tx.time * 1000))}
                  </TableCell>
                  <TableCell
                    className="text-center flex justify-end cursor-pointer"
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
        ) : (
          <p className="">No transactions found</p>
        )}
      </Card>

      <Pagination
        total={totalPages}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Transactions;
