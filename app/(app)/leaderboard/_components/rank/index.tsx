'use client';

import Pagination from '@/app/(app)/_components/pagination';
import { Skeleton } from '@/components/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLeaderboard } from '@/hooks/leaderboard/use-leaderboard';
import { formatNumber } from '@/lib/utils';
import { truncateAddress } from '@/lib/wallet';
import React from 'react';

const Rank: React.FC = () => {
  const { data, loading, error, currentPage, setCurrentPage, totalPages } =
    useLeaderboard();
  console.log('🚀 ~ data:', data);
  return (
    <div>
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader className="border border-neutral-200 dark:border-[#5D717D] text-white">
            <TableHead className="text-center text-white">Rank</TableHead>
            <TableHead className="text-center text-white">Address</TableHead>
            <TableHead className="text-center text-white">
              Total Silk Points
            </TableHead>
            <TableHead className="text-center text-white">
              Total Referral
            </TableHead>
          </TableHeader>

          <TableBody className="border border-neutral-200 dark:border-[#5D717D]">
            {data.map(item => (
              <TableRow
                key={item.rank}
                style={
                  item.rank === 1
                    ? {
                        borderLeft: '3px solid #FBDF73',
                        background:
                          'linear-gradient(90deg, rgba(251, 223, 115, 0.3) 0%, rgba(251, 223, 115, 0) 100%)',
                      }
                    : item.rank === 2
                      ? {
                          borderLeft: '3px solid #73D2FB',
                          background:
                            'linear-gradient(90deg, rgba(115, 210, 251, 0.3) 0%, rgba(115, 210, 251, 0) 100%)',
                        }
                      : item.rank === 3
                        ? {
                            borderLeft: '3px solid #FB8C73',
                            background:
                              'linear-gradient(90deg, rgba(251, 140, 115, 0.3) 0%, rgba(251, 140, 115, 0) 100%)',
                          }
                        : undefined
                }
                className="border-b border-neutral-200 dark:border-[#5D717D]"
              >
                <TableCell className="flex items-center justify-center border-r border-neutral-200 dark:border-[#5D717D]">
                  {item?.rank === 1 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/first.svg"
                        alt="gold-medal"
                        className="w-6 h-6"
                      />
                    </div>
                  ) : item?.rank === 2 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/second.svg"
                        alt="gold-medal"
                        className="w-6 h-6"
                      />
                    </div>
                  ) : item?.rank === 3 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/third.svg"
                        alt="gold-medal"
                        className="w-6 h-6"
                      />
                    </div>
                  ) : (
                    <div className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
                      {item?.rank}
                    </div>
                  )}
                </TableCell>
                <TableCell className="border-r border-neutral-200 dark:border-[#5D717D]">
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-2">
                      <img
                        src={item.user.avatar ?? '/icons/agent-club.svg'}
                        alt={item.user.username}
                        className="w-6 h-6 rounded-full justify-self-center"
                      />
                      <div>
                        {item.user.address
                          ? truncateAddress(item.user.address)
                          : item.user.username}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center border-r border-neutral-200 dark:border-[#5D717D]">
                  {formatNumber(Number(item.totalPoint))}
                </TableCell>
                <TableCell className="text-center ">
                  {formatNumber(Number(item.totalReferralCount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="mt-6">
        <Pagination
          total={totalPages}
          current={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Rank;
