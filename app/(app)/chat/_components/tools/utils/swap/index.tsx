'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';
import { SwapWrapperProps } from './swap';

const SwapWrapper = dynamic(() => import('./swap'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Swap(props: SwapWrapperProps) {
  return <SwapWrapper {...props} />;
}
