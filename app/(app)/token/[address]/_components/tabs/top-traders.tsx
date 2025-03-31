"use client";

import React from "react";

import Image from "next/image";

import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";

import WalletAddress from "@/app/_components/wallet-address";
import BuySell from "@/app/(app)/_components/buy-sell";

import { useTopTraders } from "@/hooks";

import { knownAddresses } from "@/lib/known-addresses";

interface Props {
    address: string;
}

const TopTokenTraders: React.FC<Props> = ({ address }) => {
    
    const { data: topTraders, isLoading } = useTopTraders(address);

    if(isLoading) {
        return <Skeleton className="h-full w-full" />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16 pl-4">Rank</TableHead>
                    <TableHead>Trader</TableHead>
                    <TableHead>Trades</TableHead>
                    <TableHead>Volume</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topTraders.map((trader, index) => (
                    <TableRow key={trader.owner}>
                        <TableCell className="pl-4">{index + 1}</TableCell>
                        <TableCell className="w-48">
                            {knownAddresses[trader.owner] ? (
                                <div className="flex flex-row items-center gap-2">
                                    <Image
                                        src={knownAddresses[trader.owner].logo}
                                        alt={knownAddresses[trader.owner].name}
                                        width={16}
                                        height={16}
                                    />
                                    <span className="font-medium">
                                        {knownAddresses[trader.owner].name}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center h-full">
                                    <WalletAddress 
                                        address={trader.owner} 
                                        className="font-medium"
                                    />
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="">
                            <BuySell
                                buy={trader.tradeBuy}
                                sell={trader.tradeSell}
                                buyLabel="Buy"
                                sellLabel="Sell"
                            />
                        </TableCell>
                        <TableCell>
                            <BuySell
                                buy={trader.volumeBuy}
                                sell={trader.volumeSell}
                                buyLabel="Buy"
                                sellLabel="Sell"
                                prefix="$"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TopTokenTraders;