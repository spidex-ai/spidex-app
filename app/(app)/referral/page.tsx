import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import React from 'react';
import AgentClub from './_components/agent-club';
import MyReferrals from './_components/my-referrals';
import RefHistory from './_components/ref-history';
import ReportBug from '../_components/report-bug';
const ReferralPage: React.FC = () => {
  return (
    <ProtectedClient>
        <div className='flex flex-col gap-8 mx-auto w-full h-full max-h-full px-1 relative'>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full h-full max-h-full px-2 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/ref-white.svg"
              alt="ref-program"
              width={5}
              height={5}
              className="w-6 h-6"
            />
            <TextGradient className="text-base sm:text-2xl font-medium leading-none">
              Referral Program
            </TextGradient>
          </div>
          <AgentClub />
          <MyReferrals />
          <RefHistory />
        </div>
        <ReportBug />
      </div>
    </ProtectedClient>
  );
};

export default ReferralPage;
