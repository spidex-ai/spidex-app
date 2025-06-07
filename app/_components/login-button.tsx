'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useSpidexCoreContext } from '../_contexts';
import { useLoginModal } from '../_contexts/login-modal-context';

const LoginButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { auth } = useSpidexCoreContext();
  const { openModal } = useLoginModal();

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (auth?.userId) {
      router.replace('/chat');
    }
  }, [auth?.userId]);

  // Only render the full component on the client
  if (!isClient) {
    return (
      <Button variant="default" className="w-24 h-10">
        Login
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      onClick={() => openModal(false)}
      className="w-24 h-10"
    >
      Login
    </Button>
  );
};

export default LoginButton;
