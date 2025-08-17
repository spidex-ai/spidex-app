'use client';

import RefListItem, { RefListItemProps } from '../ref-list-item';
import { Skeleton } from '@/components/ui';
import { useRefHistory } from '@/hooks/referral/user-ref';
import React from 'react';
import { RefHistoryItem } from '@/hooks/referral/type';
import Pagination from '@/app/(app)/_components/pagination';
import { formatDate } from '@/app/utils/format';
const RefHistory = () => {
  const { referralHistory, loading, currentPage, setCurrentPage, totalPages } =
    useRefHistory();

  const results: RefListItemProps[] = referralHistory?.map(
    (item: RefHistoryItem, index: number) => {
      const date = new Date(item.createdAt);
      return {
        index: index,
        key: index,
        avatar: item.avatar,
        username: item.username,
        point: item.point,
        date: formatDate(date),
      };
    }
  );

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary">
      <div className="p-4 sm:p-8">
        <div className="text-base sm:text-2xl font-bold text-white">Referral History</div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-3 mb-4">
          <div className="flex items-center justify-center gap-2">User</div>
          <div className="flex items-center justify-center gap-2">
            Point Earned
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

export default RefHistory;
