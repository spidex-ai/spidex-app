'use client'

import { useRefReferredUsers } from '@/hooks/referral/user-ref';
import React, { useState } from 'react';

const MyReferrals: React.FC = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { referralReferredUsers, loading, error } = useRefReferredUsers({ page, perPage }); 

    console.log('referralReferredUsers:::', referralReferredUsers);

    return (
        <div className='border border-border-main rounded-lg'>
            <div className='p-8'>
                <div className='text-2xl font-bold text-white'>My Referrals</div>
            </div>

            <div>
                This is table
            </div>


        </div>
    )
}

export default MyReferrals;
