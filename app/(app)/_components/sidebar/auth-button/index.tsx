'use client';

import { Skeleton } from '@/components/ui';
import dynamic from 'next/dynamic';

const AuthButtonWrapper = dynamic(() => import('./auth-button-wrapper'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default AuthButtonWrapper;
