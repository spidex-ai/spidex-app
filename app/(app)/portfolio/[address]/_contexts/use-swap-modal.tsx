'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

import Swap from '@/app/_components/swap';

import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { CardanoTokenDetail } from '@/services/dexhunter/types';

interface SwapModalContextType {
  isOpen: boolean;
  openSell: (tokenAddress: string) => Promise<void>;
  openBuy: (tokenAddress: string) => Promise<void>;
  inputToken: CardanoTokenDetail | null;
  outputToken: CardanoTokenDetail | null;
  setInputToken: (token: CardanoTokenDetail) => void;
  setOutputToken: (token: CardanoTokenDetail) => void;
}

const SwapModalContextType = createContext<SwapModalContextType>({
  isOpen: false,
  openSell: async () => {},
  openBuy: async () => {},
  inputToken: null,
  outputToken: null,
  setInputToken: () => {},
  setOutputToken: () => {},
});

export const SwapModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getTokenDetailCore } = useSpidexCoreContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [inputToken, setInputToken] = useState<CardanoTokenDetail | null>(null);
  const [outputToken, setOutputToken] = useState<CardanoTokenDetail | null>(
    null
  );

  const openSell = async (tokenAddress: string) => {
    const token = await getTokenDetailCore(
      tokenAddress === 'lovelace' ? 'ADA' : tokenAddress
    );
    if (!token) return;
    setInputToken(token);
    setOutputToken(null);
    setIsOpen(true);
  };

  const openBuy = async (tokenAddress: string) => {
    const token = await getTokenDetailCore(
      tokenAddress === 'lovelace' ? 'ADA' : tokenAddress
    );
    if (!token) return;
    setInputToken(null);
    setOutputToken(token);
    setIsOpen(true);
  };

  return (
    <SwapModalContextType.Provider
      value={{
        isOpen,
        openSell,
        openBuy,
        inputToken,
        outputToken,
        setInputToken,
        setOutputToken,
      }}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-fit dark:bg-bg-secondary">
          <DialogHeader>
            <DialogTitle>Swap</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <Swap
              initialInputToken={inputToken}
              initialOutputToken={outputToken}
              inputLabel="From"
              outputLabel="To"
              onSuccess={() => setIsOpen(false)}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      {children}
    </SwapModalContextType.Provider>
  );
};

export const useSwapModal = () => useContext(SwapModalContextType);
