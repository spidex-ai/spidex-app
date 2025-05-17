"use client"

import React from "react";

import { Progress, Skeleton } from "@/components/ui";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { useTopHolders } from "@/hooks/queries/token/use-top-holders";

import { TokenTopHolders } from "@/hooks/queries/token/type";
import Address from "@/app/_components/address";

interface Props {
    tokenId: string;
}

const TopHolders: React.FC<Props> = ({ tokenId }) => {

    const { data: topHolders, loading } = useTopHolders(tokenId);

    if(loading) {
        return <Skeleton className="h-[100px] w-full" />
    }
    // return <div>Nodata available</div>

    return (
        <Table> 
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16 pl-4">Address</TableHead>
                    <TableHead className="text-center w-1/3">% Ownership</TableHead>
                    <TableHead className="text-center">Token Balance</TableHead>
                    <TableHead className="text-center">Amount (ADA)</TableHead>
                 
                </TableRow>
            </TableHeader>
            <TableBody>
                {topHolders.map((topHolder, index) => (
                    <TopHolder
                        key={topHolder.address} 
                        topHolder={topHolder}
                        percentageOwned={topHolder.ownershipPercentage}
                        index={index}
                        address={topHolder.address}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

interface TopHolderProps {
    topHolder: TokenTopHolders;
    percentageOwned: number;
    index: number;
    address: string;
}

const TopHolder = ({ topHolder, percentageOwned }: TopHolderProps) => {

    return (
        <TableRow>
            <TableCell className="pl-4">
                <Address
                    address={topHolder.address}
                />
            </TableCell>
            <TableCell className="text-center flex justify-center sm:gap-1">
                <div className="w-1/4">{percentageOwned.toFixed(2)}%</div>
                <div className="w-3/4 flex justify-center items-center"><Progress value={percentageOwned} colorFill="bg-brand-1000 dark:bg-brand-1000" h="h-1" /></div>
            </TableCell>
            <TableCell className="text-center">
                {topHolder.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </TableCell>
            <TableCell className="text-center"> 
                {topHolder.totalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </TableCell>
        </TableRow>
    )
}

export default TopHolders;