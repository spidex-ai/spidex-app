"use client";

import React from 'react'

import {
    Card,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';

import TransactionHash from '@/app/_components/transaction-hash';

// import TokenTransfer from './token-transfer'
;
import { usePortfolioTransaction } from '@/hooks/portfolio';
import Image from 'next/image';
interface Props {
    address: string;
}

const Transactions: React.FC<Props> = ({ address }) => {
    console.log('address: ', address);

    const { data: transactions, loading } = usePortfolioTransaction(address);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Image src="/icons/transaction-white.svg" width={17} height={15} alt="transactions" className="w-4 h-4" />
                <h2 className="text-lg font-bold">Transactions</h2>
            </div>
            <Card className="p-2">
                {
                    loading ? (
                        <Skeleton
                            className="h-96 w-full"
                        />
                    ) : (
                        transactions?.length > 0 ? (
                            <Table>
                                <TableHeader> 
                                    <TableRow>
                                        <TableHead>Tx Hash</TableHead>
                                        <TableHead className="text-center">Block Number</TableHead>
                                        <TableHead className="text-center">Block Time</TableHead>

                                    </TableRow>
                                </TableHeader>
                                <TableBody className="max-h-96 overflow-y-hidden">
                                    {
                                        transactions.map((transaction) => (
                                            <TableRow key={transaction.txIndex}>
                                                <TableCell>
                                                    <TransactionHash
                                                        hash={transaction.txHash}
                                                        hideTransactionText
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {transaction.blockHeight}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {new Date(transaction.blockTime * 1000).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="">
                                No transactions found
                            </p>
                        )
                    )
                }
            </Card>
        </div>
    )
}

export default Transactions