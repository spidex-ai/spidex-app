import React from 'react'
import AgentClub from './_components/agent-club';
import MyReferrals from './_components/my-referrals';
const ReferralPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full h-full max-h-full overflow-y-auto px-1">
            <h1 className='text-2xl font-bold'>Referral Program</h1>
            <AgentClub />
            <MyReferrals />
        </div>
    )
}

export default ReferralPage;
