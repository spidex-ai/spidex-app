import { Skeleton } from "@/components/ui";
import { useTradeHistory } from "@/hooks/queries/token/use-trade-history";
// import { Progress } from "@/components/ui";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import React from "react";
import { TokenTradeHistory } from "@/hooks/queries/token/type";
import Image from "next/image";
interface Props {
    tokenId: string;
    ticker: string;
}

const TradeHistory: React.FC<Props> = ({ tokenId, ticker }) => {
    console.log(tokenId);
    const { data, loading } = useTradeHistory(tokenId);
    console.log("🚀 ~ data:", data)

    if(loading) {
        return <Skeleton className="h-[100px] w-full" />
    }

    return (
        <div className="relative">
            <Table> 
            <TableHeader  className="sticky top-0 bg-background z-10">
                <TableRow>
                    <TableHead className="pl-4">Date</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Total ({`${ticker}`})</TableHead>
                    <TableHead className="text-center">Total Token</TableHead>
                    <TableHead className="text-right">TXN</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto max-h-[500px]">
                {data.map((history, index) => (
                    <HistoryItem
                        key={index} 
                        history={history}
                    />
                ))}
            </TableBody>
        </Table>
        </div>
    )
}

interface HistoryItemProps {
    history: TokenTradeHistory;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ history }) => {
    const onClickTxn = () => {
        window.open(`${process.env.NEXT_PUBLIC_CARDANO_SCAN_URL}/transaction/${history.hash}`, '_blank');
    }
    return (
        <TableRow>
            <TableCell>{new Date(history.time * 1000).toLocaleString()}</TableCell>
            <TableCell className={`text-center ${history.action === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{history.action}</TableCell>
            <TableCell className="text-center">{history.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</TableCell>
            <TableCell className="text-center">{history.tokenAAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
            <TableCell className="text-center">{history.tokenBAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {history.tokenBName}</TableCell>
            <TableCell className="text-right flex justify-end cursor-pointer" onClick={onClickTxn}><Image src="/icons/txn-gray.svg" alt="txn" width={16} height={16} /></TableCell>
        </TableRow>
    )
}

export default TradeHistory;
