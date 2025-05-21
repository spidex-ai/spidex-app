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
  const { data, loading } = useTradeHistory(tokenId);

  if (loading) {
    return <Skeleton className="h-[100px] w-full" />;
  }

  return (
    <div className="relative h-[calc(100vh-700px)]">
      <div className="overflow-auto h-full">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="bg-bg-tab">
              <TableHead className="pl-4">Date</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">
                Total ({`${ticker}`})
              </TableHead>
              <TableHead className="text-center">Total Token</TableHead>
              <TableHead className="text-right">TXN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data.map((history, index) => (
              <HistoryItem key={index} history={history} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

interface HistoryItemProps {
  history: TokenTradeHistory;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ history }) => {
  const onClickTxn = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_CARDANO_SCAN_URL}/transaction/${history.hash}`,
      "_blank"
    );
  };
  const price =
    history.price < 0.0001
      ? "~0.0001"
      : `$${history.price.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })}`;
  const totalToken =
    history.tokenAAmount < 0.0001
      ? "~0.0001"
      : history.tokenAAmount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
  const totalTokenB =
    history.tokenBAmount < 0.0001
      ? "~0.0001"
      : history.tokenBAmount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        });
  return (
    <TableRow>
      <TableCell>{new Date(history.time * 1000).toLocaleString()}</TableCell>
      <TableCell
        className={`text-center ${
          history.action === "buy" ? "text-green-500" : "text-red-500"
        }`}
      >
        {history.action}
      </TableCell>
      <TableCell className="text-center">{price}</TableCell>
      <TableCell className="text-center">{totalToken}</TableCell>
      <TableCell className="text-center">{totalTokenB}</TableCell>
      <TableCell
        className="text-right flex justify-end cursor-pointer"
        onClick={onClickTxn}
      >
        <Image src="/icons/txn-gray.svg" alt="txn" width={16} height={16} />
      </TableCell>
    </TableRow>
  );
};

export default TradeHistory;
