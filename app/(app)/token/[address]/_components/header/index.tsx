'use client';

import React from 'react';

import { Skeleton } from '@/components/ui';

import Address from '@/app/_components/address';

import SaveToken from '@/app/(app)/_components/save-token';
import { getLogoUrl } from '@/app/utils/logo';
import { CardanoTokenDetail } from '@/services/dexhunter/types';
import SearchBar from '../../../_components/search-bar';
import { QuoteType } from './select-quote';
import SelectQuote from './select-quote';
interface Props {
  data: CardanoTokenDetail | null;
  isLoading: boolean;
  isSearch?: boolean;
  quote: QuoteType;
  onQuoteChange: (quote: QuoteType) => void;
}

const Header: React.FC<Props> = ({
  data,
  isLoading,
  isSearch = false,
  quote,
  onQuoteChange,
}) => {
  if (isLoading) {
    return <Skeleton className="h-6 w-full" />;
  }

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-6 flex items-center">
        <div className="flex items-center gap-2 mt-1 w-full">
          {data?.logo && (
            <img
              src={getLogoUrl(data.logo)}
              alt={data?.unit ? data.unit : data?.token_ascii}
              className="w-6 h-6 rounded-full"
            />
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* <h1 className="text-lg font-bold">({`${data?.ticker}/USD`})</h1> */}
              <SelectQuote
                quote={quote}
                token={data?.ticker ?? ''}
                onQuoteChange={onQuoteChange}
              />
              <Address address={data?.unit ?? ''} />
            </div>
          </div>
          <SaveToken address={data?.unit ?? ''} />
          <div className="flex-1">
            {isSearch && <SearchBar isTitle={false} />}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div
          className="cursor-pointer flex justify-end w-full"
          onClick={() => {
            window.open('https://farmroll.io', '_blank');
          }}
        >
          <img src="/icons/banner-chat-ads.svg" alt="info" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
