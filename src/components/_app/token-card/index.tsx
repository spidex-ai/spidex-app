import { Box } from "@chakra-ui/react";
import React from "react";
import { AdaIcon, UnMarkIcon } from "@/assets";

interface TokenCardProps {
    name: string;
    symbol: string;
    price: number;
    priceChangePercentage: number;
    volume24h: string;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
    const { name, symbol, price, priceChangePercentage, volume24h } = props;
  return (
    <div>
      <Box className="max-w-lg p-4 border-[#5D717D] border-1 rounded-lg">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <Box>
              <AdaIcon />
            </Box>
            <Box>
              <Box className="text-sm font-medium">{`${name} (${symbol})`}</Box>
              <Box className="flex items-center gap-2">
                <Box className="text-xs font-normal">{`$${price}`}</Box>
                <Box className="text-xs font-normal">{`(${priceChangePercentage}%)`}</Box>
              </Box>
            </Box>
          </Box>
          <Box className="cursor-pointer">
            <UnMarkIcon />
          </Box>
        </Box>
        <Box className="mt-4">
            <Box className="text-xs font-normal">{`24h Volume: $${volume24h}`}</Box>
        </Box>
      </Box>
    </div>
  );
};

export default TokenCard;
