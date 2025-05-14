"use client";

import React from "react";

import {
  Card,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { usePortfolioTransaction } from "@/hooks/portfolio";
import Image from "next/image";
import type { PortfolioTransaction } from "@/hooks/portfolio/type";

interface Props {
  address: string;
}

const Transactions: React.FC<Props> = ({ address }) => {
  console.log("address: ", address);

  const { data: transactions, loading } = usePortfolioTransaction(address);

  const onClickTxn = (hash: string) => {
    window.open(`https://cexplorer.io/tx/${hash}`, "_blank");
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
              {transactions.map((tx: PortfolioTransaction, idx: number) => (
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
                  <TableCell>{tx.tokenAAmount}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="font-medium flex gap-2 items-center">
                      <img
                        src={tx.tokenAIcon}
                        alt={tx.tokenAName}
                        className="w-4 h-4 rounded-full"
                      />
                      <p>{tx.tokenBName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{tx.tokenBAmount}</TableCell>
                  <TableCell>
                    {new Date(tx.time * 1000).toLocaleString()}
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
        ) : (
          <p className="">No transactions found</p>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
