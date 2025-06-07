'use client';

import { useRefReferredUsers } from '@/hooks/referral/user-ref';
import React from 'react';
import RefListItem, { RefListItemProps } from '../ref-list-item';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/app/(app)/_components/pagination';
const MyReferrals: React.FC = () => {
  const { myRefUsers, loading, currentPage, setCurrentPage, totalPages } =
    useRefReferredUsers();

  const results: RefListItemProps[] = myRefUsers?.map((item, index) => {
    const date = new Date(item.createdAt);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return {
      index: index,
      key: index,
      avatar: item.avatar,
      username: item.username,
      point: item.totalReferralPointEarned,
      date: `${hours}:${minutes} ${day}-${month}-${year}`,
    };
  });

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary">
      <div className="p-8">
        <div className="text-2xl font-bold text-white">My Referrals</div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 mb-4">
          <div className="flex items-center justify-center gap-2">User</div>
          <div className="flex items-center justify-center gap-2">
            SILK Earned
          </div>
          <div className="flex items-center justify-center gap-2">
            Date & Time
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-[100px] w-full" />
        ) : (
          <div>
            {results?.length > 0 ? (
              results.map(item => (
                <div key={item.key}>
                  <RefListItem {...item} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[100px] w-full text-text-gray">
                No data.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 mb-4">
        <Pagination
          total={totalPages}
          current={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MyReferrals;
