import TokenCard from "@/components/_app/token-card";
import ConnectWallet from "@/components/Layout/ConnectWallet";
import { Avatar } from "@/components/ui/avatar";
import { GradientButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const ComponentBase: React.FC = () => {
  return (
    <div>
      <div className="mt-4">
        <Avatar>Daniel</Avatar>
      </div>
      <div className="mt-4">
        <Checkbox>Test</Checkbox>
      </div>
      <div className="mt-4 flex gap-3">
        <ConnectWallet />
        <GradientButton>Test</GradientButton>
      </div>
      <div className="mt-4">
        <TokenCard 
          name="Cardano" 
          symbol="ADA" 
          price={0.2345} 
          priceChangePercentage={25.78} 
          volume24h="123,456"
        />
      </div>
    </div>
  );
};

export default ComponentBase;
