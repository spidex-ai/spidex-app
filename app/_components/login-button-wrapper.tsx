'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui';

const LoginButton = dynamic(() => import('./login-button'), {
  ssr: false,
  loading: () => (
    <Button variant="default" className="w-24 h-10">
      Login
    </Button>
  ),
});

export default function LoginButtonWrapper() {
  return <LoginButton />;
}
