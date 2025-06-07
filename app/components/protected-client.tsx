'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSpidexCoreContext } from '@/app/_contexts';
import { useLoginModal } from '@/app/_contexts/login-modal-context';
import { useEffect } from 'react';

interface ProtectedClientProps {
  children: ReactNode;
}

const ProtectedClient: React.FC<ProtectedClientProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useSpidexCoreContext();
  const { openModal } = useLoginModal();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/chat');
    }
  }, [isAuthenticated, openModal, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedClient;
