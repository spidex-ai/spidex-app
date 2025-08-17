'use client';
import React, { use, useState } from 'react';

import TokenChart from '../../_components/token/chart';
import Header from './_components/header';
import TokenDashboardTabs from './_components/tabs';
import SidePanel from './_components/side-panel';
import ResizableLayout from './_components/resizable-layout';
import { useTokenDetail } from '@/hooks';
import { QuoteType } from './_components/header/select-quote';
import { ReportBugIcon } from '../../_components/report-bug';

type tParams = Promise<{ address: string }>;

const TokenPage = ({ params }: { params: tParams }) => {
  const { address } = use(params);
  const { data, isLoading } = useTokenDetail(address);
  const [quote, setQuote] = useState<QuoteType>(QuoteType.USD);

  return (
    <div className="relative h-full max-h-full">
      <div className="flex flex-col gap-2 h-full max-h-full overflow-hidden">
        <Header
          data={data}
          isLoading={isLoading}
          isSearch={true}
          quote={quote}
          onQuoteChange={setQuote}
        />
        <ResizableLayout
          chartComponent={
            <TokenChart
              data={data}
              isLoadingTokenDetail={isLoading}
              quote={quote}
            />
          }
          tabsComponent={
            <TokenDashboardTabs
              address={address}
              data={data}
              isLoadingTokenDetail={isLoading}
            />
          }
          sidePanelComponent={
            <SidePanel data={data} isLoadingTokenDetail={isLoading} />
          }
        />
        <div className='flex flex-col sm:hidden gap-10 w-full overflow-x-hidden'>
          <div className='min-h-[400px]'>
            <TokenChart
              data={data}
              isLoadingTokenDetail={isLoading}
              quote={quote}
            />
          </div>
          <SidePanel data={data} isLoadingTokenDetail={isLoading} />
          <div className='h-[400px] w-full'>

            <TokenDashboardTabs
              address={address}
              data={data}
              isLoadingTokenDetail={isLoading}
            />
          </div>
        </div>
      </div>
      <ReportBugIcon />
    </div>
  );
};

export default TokenPage;
