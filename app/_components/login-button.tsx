'use client';

import { Button } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { useLoginModal } from '../_contexts/login-modal-context';

const LoginButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const { openModal } = useLoginModal();

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

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
