'use client'

import { Skeleton } from '@/components/ui';
import { useRefHistory } from '@/hooks/referral/user-ref';
import React, { useState } from 'react'

const RefHistory = () => {

    const [page] = useState(1);
    const [perPage] = useState(10);


    const { referralHistory, loading } = useRefHistory({ page, perPage }); 
    console.log("🚀 ~ RefHistory ~ referralHistory:", referralHistory)


  return (
    <div className='border border-border-main rounded-lg'>
    <div className='p-8'>
        <div className='text-2xl font-bold text-white'>My Referrals</div>
    </div>

    <div className="mb-4">
        <div className="grid grid-cols-3 mb-4">
            <div className='flex items-center justify-center gap-2'>User</div>
            <div className='flex items-center justify-center gap-2'>Point Earned</div>
            <div className='flex items-center justify-center gap-2'>Date & Time</div>
        </div>
        {
            loading ? (
                <Skeleton className="h-[100px] w-full" />   
            ) : (
                <div>
                    {/* {
                        results?.length > 0 ? (
                            results.map((item) => (
                                <div key={item.key}><RefListItem {...item} /></div>
                            ))
                        ) : (
                            <div className='flex items-center justify-center h-[100px] w-full'>No data</div>
                        )
                    } */}
                </div>
            )
        }
    </div>


</div>
  )
}

export default RefHistory