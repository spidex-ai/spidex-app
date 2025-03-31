import React from "react";

import { cn } from "@/lib/utils";

import { Box } from "@chakra-ui/react";
import {
  LogoAgentIcon,
  TradingAgentIcon,
  MarketAgentIcon,
  PortfolioAgentIcon,
  IntelligenceAgentIcon,
  TokenWhiteIcon,
} from "@/assets";
import { AgentButton } from "@/components/ui/button";
import ChatInput from "../chat-input";

const EmptyChat: React.FC = () => {
  return (
    <div
      className={cn(
        // Base
        "flex flex-col items-center justify-center w-full h-full px-4"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 md:gap-8">
        <Box className="flex flex-col items-center justify-center">
          <Box>
            <LogoAgentIcon />
          </Box>
          <Box>How can we help you</Box>
          <Box>Orchestrate a hive mind of DeFi Agents to act on Solana</Box>
        </Box>
   
          <ChatInput />
      
        <Box>
          <Box className="flex justify-center items-center gap-4 mt-4">
            <AgentButton
              onClick={() => {}}
              icon={<TradingAgentIcon />}
              text="Trading Agent"
            />
            <AgentButton
              onClick={() => {}}
              icon={<MarketAgentIcon />}
              text="Market Agent"
            />
            <AgentButton
              onClick={() => {}}
              icon={<PortfolioAgentIcon />}
              text="Portfolio Agent"
            />
          </Box>
          <Box className="flex justify-center items-center gap-4 mt-4">
            <AgentButton
              onClick={() => {}}
              icon={<TokenWhiteIcon />}
              text="Token Agent"
            />
            <AgentButton
              onClick={() => {}}
              icon={<IntelligenceAgentIcon />}
              text="Intelligence Agent"
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EmptyChat;

