'use client'

import { useRefReferredUsers } from '@/hooks/referral/user-ref';
import React, { useState } from 'react';
import RefListItem, { RefListItemProps } from '../ref-list-item';
import { Skeleton } from '@/components/ui/skeleton';
const MyReferrals: React.FC = () => {

    const [page] = useState(1);
    const [perPage] = useState(10);

    const { myRefUsers, loading } = useRefReferredUsers({ page, perPage }); 

    console.log('myRefUsers:::', myRefUsers);

    const results: RefListItemProps[] = myRefUsers?.map((item, index) => {
        return {
            index: index,
            key: index,
            avatar: item.avatar,
            username: item.username,
            point: item.totalReferralPointEarned,
            date: item.createdAt
        }
    })

    return (
        <div className='border border-border-main rounded-lg bg-bg-secondary'>
            <div className='p-8'>
                <div className='text-2xl font-bold text-white'>My Referrals</div>
            </div>

            <div className="mb-4">
                <div className="grid grid-cols-3 mb-4">
                    <div className='flex items-center justify-center gap-2'>User</div>
                    <div className='flex items-center justify-center gap-2'>SILK Earned</div>
                    <div className='flex items-center justify-center gap-2'>Date & Time</div>
                </div>
                {
                    loading ? (
                        <Skeleton className="h-[100px] w-full" />   
                    ) : (
                        <div>
                            {
                                results?.length > 0 ? (
                                    results.map((item) => (
                                        <div key={item.key}><RefListItem {...item} /></div>
                                    ))
                                ) : (
                                    <div className='flex items-center justify-center h-[100px] w-full text-text-gray'>No data.</div>
                                )
                            }
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default MyReferrals;
