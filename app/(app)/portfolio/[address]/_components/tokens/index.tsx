"use client";

import React from "react";

// import Decimal from 'decimal.js';
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  Skeleton,
  GradientButton,
  GradientBorderButton,
} from "@/components/ui";

import { useSwapModal } from "../../_contexts/use-swap-modal";
// import { usePortfolio } from '@/hooks';
import { usePortfolioToken } from "@/hooks/portfolio";
import { formatNumber } from "@/lib/utils";

interface Props {
  address: string;
}

const Tokens: React.FC<Props> = ({ address }) => {


  const { data: portfolio, loading } = usePortfolioToken(address);

  const { openSell, openBuy } = useSwapModal();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/token-white.svg"
            width={12}
            height={12}
            alt="tokens"
            className="w-4 h-4"
          />
          <h2 className="text-lg font-bold">Tokens</h2>
        </div>
        {portfolio && (
          <p>
            $
            {portfolio.totalUsdPrice.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        )}
      </div>
      <Card className="p-2">
        {loading ? (
          <Skeleton className="h-96 w-full" />
        ) : portfolio ? (
          portfolio.amount.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Asset</TableHead>
                  <TableHead className="text-center">Balance</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-h-96 overflow-y-auto">
                {portfolio.amount
                  .filter(
                    (token) =>
                      Number(token.quantity) > 0 &&
                      token.logo &&
                      token.name &&
                      token.price &&
                      token.usdPrice
                  )
                  .map((token) => (
                    <TableRow key={token.unit}>
                      <TableCell>
                        <div className="font-medium flex gap-2 items-center">
                          <img
                            src={token.logo}
                            alt={token.name}
                            className="w-4 h-4 rounded-full"
                          />
                          <p>{token.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(Number(token.quantity), 2)}
                      </TableCell>
                      <TableCell className="text-center">
                        ${formatNumber(Number(token.usdPrice), 2)}
                      </TableCell>
                      <TableCell className="text-center">
                        ${formatNumber(Number(token.usdTotalPrice), 2)}
                      </TableCell>
                      <TableCell className="flex items-center gap-2 justify-end">
                        <GradientBorderButton
                          onClick={() => openSell(token.unit)}
                        >
                          Sell
                        </GradientBorderButton>
                        <GradientButton className="py-2 md:py-2" onClick={() => openBuy(token.unit)}>
                          Buy
                        </GradientButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <p>No tokens found.</p>
          )
        ) : (
          <p>There was an error fetching your portfolio.</p>
        )}
      </Card>
    </div>
  );
};

export default Tokens;
