"use client";

import RefListItem, { RefListItemProps } from "../ref-list-item";
import { Skeleton } from "@/components/ui";
import { useRefHistory } from "@/hooks/referral/user-ref";
import React, { useState } from "react";
import { RefHistoryItem } from "@/hooks/referral/type";

const RefHistory = () => {
  const [page] = useState(1);
  const [perPage] = useState(10);

  const { referralHistory, loading } = useRefHistory({ page, perPage });

  const results: RefListItemProps[] = referralHistory?.map(
    (item: RefHistoryItem, index: number) => {
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
        point: item.point,
        date: `${hours}:${minutes} ${day}-${month}-${year}`,
      };
    }
  );

  return (
    <div className="border border-border-main rounded-lg bg-bg-secondary">
      <div className="p-8">
        <div className="text-2xl font-bold text-white">Referral History</div>
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
              results.map((item) => (
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
    </div>
  );
};

export default RefHistory;
