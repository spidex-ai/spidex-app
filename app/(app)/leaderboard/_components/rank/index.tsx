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
import { useIsMobile } from '@/hooks';
import { useLeaderboard } from '@/hooks/leaderboard/use-leaderboard';
import { formatNumber } from '@/lib/utils';
import { truncateAddress } from '@/lib/wallet';
import React from 'react';

const Rank: React.FC = () => {
  const { data, loading, currentPage, setCurrentPage, totalPages, userRank } =
    useLeaderboard();
  console.log('🚀 ~ userRank:', userRank);
  console.log('🚀 ~ data:', data);
  const isMobile = useIsMobile();
  return (
    <div>
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <Table className="rounded-lg">
          <TableHeader className="border border-neutral-200 dark:border-border-main text-white [&_tr:first-child]:rounded-t-lg overflow-hidden">
            <TableHead className="text-center text-white">Rank</TableHead>
            <TableHead className="text-center text-white">Username</TableHead>
            <TableHead className="text-center text-white">Address</TableHead>
            <TableHead className="text-center text-white">
              Total Silk Points
            </TableHead>
            <TableHead className="text-center text-white">
              Total Referral
            </TableHead>
          </TableHeader>

          <TableBody className="border border-neutral-200 dark:border-border-main [&_tr:last-child]:rounded-b-lg overflow-hidden">
            {userRank && (
              <TableRow className="bg-[#14271d] border-b border-neutral-100 dark:border-neutral-700">
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium relative bg-[#1A1A1A]">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, #BBF985 0%, #009EFF 100%)',
                          margin: '-0.5px',
                          zIndex: 0,
                        }}
                      />
                      <div className="absolute inset-[0.5px] rounded-full bg-[#1A1A1A] z-[1]" />
                      <span
                        className="relative z-[2] font-semibold"
                        style={{
                          background:
                            'linear-gradient(203.26deg, #009EFF 15.03%, #BBF985 94.22%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {userRank?.rank}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="border-r border-neutral-200 dark:border-border-main p-4">
                  <div className="">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-2">
                      <img
                        src={userRank?.user.avatar ?? '/icons/example-ava.svg'}
                        alt={userRank?.user.username}
                        className="w-6 h-6 rounded-full justify-self-center"
                      />
                      <div>{userRank?.user.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-4">
                  {userRank?.user.address
                    ? truncateAddress(userRank?.user.address, isMobile ? 4 : 10)
                    : '-'}
                </TableCell>
                <TableCell className="text-center border-r border-neutral-200 dark:border-border-main p-4">
                  {formatNumber(Number(userRank?.totalPoint))}
                </TableCell>
                <TableCell className="text-center p-4">
                  {formatNumber(Number(userRank?.totalReferralCount))}
                </TableCell>
              </TableRow>
            )}
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
                <TableCell className="flex items-center justify-center border-r border-neutral-200 dark:border-border-main p-4">
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
                    <div className=" text-white py-1">{item?.rank}</div>
                  )}
                </TableCell>

                <TableCell className="border-r border-neutral-200 dark:border-border-main p-4">
                  <div className="flex items-center justify-start">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-2">
                      <img
                        src={item.user.avatar ?? '/icons/example-ava.svg'}
                        alt={item.user.username}
                        className="w-6 h-6 rounded-full justify-self-center"
                      />
                      <div>{item.user.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-4">
                  {item.user.address
                    ? truncateAddress(item.user.address, isMobile ? 4 : 10)
                    : '-'}
                </TableCell>
                <TableCell className="text-center border-r border-neutral-200 dark:border-border-main p-4">
                  {formatNumber(Number(item.totalPoint))}
                </TableCell>
                <TableCell className="text-center p-4">
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
