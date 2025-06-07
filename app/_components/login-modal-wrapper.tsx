'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';

const LoginModal = dynamic(() => import('./login-modal'), {
  ssr: false,
  loading: () => <Skeleton className="w-screen h-screen" />,
});

export default function LoginModalWrapper() {
  return <LoginModal />;
}
