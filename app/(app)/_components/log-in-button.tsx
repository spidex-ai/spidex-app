'use client';

import { useLoginModal } from '@/app/_contexts';
import { GradientButton } from '@/components/ui';
import '@/components/utils/suppress-console';
import { selectAuthData } from '@/store/selectors/authSelectors';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  onComplete?: (wallet: string) => void;
}

const LogInButton: React.FC<Props> = () => {
  const auth = useSelector(selectAuthData);
  const { openModal } = useLoginModal();

  const address = auth?.user?.walletAddress;

  return (
    <GradientButton variant="brand" onClick={() => { openModal(true) }} className="w-full">
      Connect {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''}
    </GradientButton>
  );
};

export default LogInButton;
