import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import React from 'react';
import AgentClub from './_components/agent-club';
import MyReferrals from './_components/my-referrals';
import RefHistory from './_components/ref-history';
const ReferralPage: React.FC = () => {
    return (
        <ProtectedClient>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full h-full max-h-full overflow-y-auto px-1">
                <div className="flex items-center gap-2">
                    <Image src="/icons/ref-white.svg" alt="ref-program" width={5} height={5} className='w-4 h-4' />
                    <TextGradient className="text-2xl font-bold leading-none">Referral Program</TextGradient>
                </div>
                <AgentClub />
                <MyReferrals />
                <RefHistory />
            </div>
        </ProtectedClient>
    )
}

export default ReferralPage;
