'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { SearchTokenInfo } from '@/services/dexhunter/types';
import { getLogoUrl } from '../utils/logo';

interface Props {
  token: SearchTokenInfo;
}

const TokenDisplay: React.FC<Props> = ({ token }) => {
  return (
    <div className="w-fit shrink-0 flex items-center bg-neutral-200 dark:bg-neutral-700 rounded-md px-2 py-1 gap-2 cursor-pointer transition-colors duration-200">
      {token.logo && (
        <img
          src={getLogoUrl(token.logo)}
          alt={token.token_ascii}
          className="w-6 h-6 rounded-full"
        />
      )}
      <p className={cn('text-xs font-bold', 'opacity-100')}>
        {token.token_ascii} ({token.ticker})
      </p>
    </div>
  );
};

export default TokenDisplay;
