'use client';

import { useSpidexCoreContext } from '@/app/_contexts';
import { GradientButton } from '@/components/ui';
import '@/components/utils/suppress-console';
import React from 'react';

interface Props {
  onComplete?: (wallet: string) => void;
}

const LogInButton: React.FC<Props> = () => {
  const { auth } = useSpidexCoreContext();

  const address = auth?.user?.walletAddress;

  return (
    <GradientButton variant="brand" onClick={() => {}} className="w-full">
      Connect {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''}
    </GradientButton>
  );
};

export default LogInButton;
