import React from "react";

import ToolCard from "../tool-card";
// import { TokenBalance } from "../utils";

import type { ToolInvocation } from "ai";
import type { TransactionResultType } from "@/ai";
// import Transaction from '../utils/transaction';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetBalance: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.tokenAddress || "SOL"} Balance...`}
      result={{
        heading: (result: TransactionResultType) =>
          result.body?.walletTx
            ? `Found ${result.body.walletTx.length} transactions`
            : `No transactions found`,
        body: (result: TransactionResultType) =>
          result.body
            ? "hello"
            : //TODO : Show transaction
              // <Transaction
              //     txHash={result.body.}
              //     txIndex={result.body.balance}
              //     blockHeight={result.body.}
              //     blockTime={result.body.name}
              // />
              "No balance found",
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default GetBalance;
