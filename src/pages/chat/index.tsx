import React from "react";

import { Box } from "@chakra-ui/react";
import { LogoAgentIcon, TradingAgentIcon, MarketAgentIcon, PortfolioAgentIcon, IntelligenceAgentIcon, TokenWhiteIcon } from "@/assets";
import InputChat from "@/components/ui/input-chat";
import { AgentButton,  } from "@/components/ui/button";

const Chat: React.FC = () => {
  return (
    <div>
      <Box className="h-screen w-full flex items-center justify-center">
        <Box className="w-full">
          <Box className="flex flex-col items-center justify-center">
            <Box>
              <LogoAgentIcon />
            </Box>
            <Box>How can we help you</Box>
            <Box>Orchestrate a hive mind of DeFi Agents to act on Solana</Box>
          </Box>

          <Box className="mt-4">
            <InputChat />
          </Box>
          <Box>
             <Box className="flex justify-center items-center gap-4 mt-4">
              <AgentButton onClick={() => {}} icon={<TradingAgentIcon />} text="Trading Agent" />
              <AgentButton onClick={() => {}} icon={<MarketAgentIcon />} text="Market Agent" /> 
              <AgentButton onClick={() => {}} icon={<PortfolioAgentIcon />} text="Portfolio Agent" /> 
             </Box>
             <Box className="flex justify-center items-center gap-4 mt-4">
              <AgentButton onClick={() => {}} icon={<TokenWhiteIcon />} text="Token Agent" />
              <AgentButton onClick={() => {}} icon={<IntelligenceAgentIcon />} text="Intelligence Agent" />
             </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;
