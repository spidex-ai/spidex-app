import React from 'react';

import ProtectedClient from '@/app/components/protected-client';
import SearchBar from './_components/search-bar';
import SmartMoneyTokens from './_components/smart-money';
import TrendingTokens from './_components/trending-tokens';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import ReportBug from '../_components/report-bug';

const TokenPage: React.FC = () => {
  return (
    <ProtectedClient>
      <div className='flex flex-col gap-8 mx-auto w-full h-full max-h-full px-1 relative'>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full h-full max-h-full px-2 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/token-white.svg"
              alt="token"
              width={10}
              height={10}
              className="w-6 h-6"
            />
            <TextGradient className="text-2xl font-medium leading-none">
              Token
            </TextGradient>
          </div>
          <SearchBar />
          <TrendingTokens />
          <SmartMoneyTokens />
        </div>
        <ReportBug />
      </div>
    </ProtectedClient>
  );
};

export default TokenPage;
