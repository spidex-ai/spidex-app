'use client';

import { useLoginModal, useSpidexCoreContext } from '@/app/_contexts';
import { GradientButton } from '@/components/ui';
import '@/components/utils/suppress-console';
import React from 'react';

interface Props {
  onComplete?: (wallet: string) => void;
}

const LogInButton: React.FC<Props> = () => {
  const { auth } = useSpidexCoreContext();
  const { openModal } = useLoginModal();

  const address = auth?.user?.walletAddress;

  return (
    <GradientButton variant="brand" onClick={() => {openModal(true)}} className="w-full">
      Connect {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''}
    </GradientButton>
  );
};

export default LogInButton;
