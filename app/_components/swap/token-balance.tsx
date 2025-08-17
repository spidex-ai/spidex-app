'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui';

const TokenBalance = dynamic(() => import('./token-balance-wrapper'), {
  ssr: false,
  loading: () => <Skeleton className="w-16 h-4" />,
});

export default TokenBalance;
