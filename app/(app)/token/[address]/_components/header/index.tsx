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
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
interface Props {
  data: CardanoTokenDetail | null;
  isLoading: boolean;
  isSearch?: boolean;
  quote: QuoteType;
  onQuoteChange: (quote: QuoteType) => void;
}

const slideImages = [
  {
    url: '/icons/snek-banner.svg',
    link: 'https://www.snek.com/',
  },
  {
    url: '/icons/farmroll-banner.svg',
    link: 'https://farmroll.io/',
  },
  {
    url: '/icons/minswap-banner.svg',
    link: 'https://minswap.org/',
  },
  {
    url: '/icons/strike-banner.svg',
    link: 'https://www.strikefinance.org/',
  },
  {
    url: '/icons/bodega-banner.svg',
    link: 'https://www.bodegamarket.xyz/',
  },
  {
    url: '/icons/moneta-banner.svg',
    link: 'https://moneta.global/',
  },
  {
    url: '/icons/dexhunter-banner.svg',
    link: 'https://app.dexhunter.io/',
  },
  {
    url: '/icons/taptool-banner.svg',
    link: 'https://www.taptools.io/',
  },
];

const arrowClass =
  'absolute top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full';
// text-xl text-white px-2 py-2
const slideProperties = {
  duration: 3000,
  autoplay: true,
  transitionDuration: 500,
  arrows: true,
  infinite: true,
  easing: 'ease',
  prevArrow: <button className={`${arrowClass} left-4`}>◀</button>,
  nextArrow: <button className={`${arrowClass} right-4`}>▶</button>,
};

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
      <div className="col-span-full sm:col-span-6 flex items-center">
        <div className="flex items-center gap-2 mt-1 w-full">
          {data?.logo && (
            <img
              src={getLogoUrl(data.logo)}
              alt={data?.unit ? data.unit : data?.token_ascii}
              className="w-6 h-6 rounded-full hidden sm:block"
            />
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* <h1 className="text-lg font-bold">({`${data?.ticker}/USD`})</h1> */}
              <SelectQuote
                quote={quote}
                token={
                  data?.ticker ? data?.ticker : data?.name ? data?.name : ''
                }
                onQuoteChange={onQuoteChange}
              />
              <div className='hidden sm:block'>
                <Address address={data?.unit ?? ''} />
              </div>
            </div>
          </div>
          <div className='hidden sm:block'>
            <SaveToken address={data?.unit ?? ''} />
          </div>
          <div className="flex-1">
            {isSearch && <SearchBar isTitle={false} />}
          </div>
        </div>
      </div>
      {isSearch && (
        <div className="col-span-full sm:col-span-4 relative group hidden sm:block">
          <Slide {...slideProperties}>
            {slideImages.map((image, index) => (
              <div
                key={index}
                className="each-slide cursor-pointer rounded-xl"
                onClick={() => window.open(image.link, '_blank')}
              >
                <img
                  src={image.url}
                  alt={`${index + 1}`}
                  className="w-full rounded-xl"
                />
              </div>
            ))}
          </Slide>
        </div>
      )}
    </div>
  );
};

export default Header;
