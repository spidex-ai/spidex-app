'use client';

import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { AvatarUser } from '@/components/ui/image-fallback';
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
import { cn, formatNumber } from '@/lib/utils';
import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';
import React, { useState } from 'react';

const Rank: React.FC = () => {
  const { data, loading, userRank, orderBy, setOrderBy } = useLeaderboard();
  const changeOrderBy = (orderBy: 'point' | 'referral') => {
    setOrderBy(orderBy);
  };
  return (
    <div className="overflow-auto">
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <Table className="rounded-lg">
          <TableHeader className="sticky top-0 z-10 bg-background border border-neutral-200 dark:border-border-main text-white [&_tr:first-child]:rounded-t-lg overflow-hidden">
            <TableRow className="bg-black border-b border-neutral-200 dark:border-border-main hover:!bg-black">
              <TableHead className="text-center text-[10px] md:text-base text-white border-r border-neutral-200 dark:border-border-main">
                Rank
              </TableHead>
              <TableHead className="text-left text-[10px] md:text-base text-white border-r border-neutral-200 dark:border-border-main px-1 md:px-4">
                Username
              </TableHead>
              <TableHead className="text-center text-[10px] md:text-base text-white border-r border-neutral-200 dark:border-border-main">
                Address
              </TableHead>
              <TableHead className="text-center text-[10px] md:text-base flex justify-center items-center text-white border-r border-neutral-200 dark:border-border-main">
                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() => changeOrderBy('point')}
                >
                  <div>Total Silk Points</div>

                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div className="table-sort-icon">
                          {orderBy === 'point' ? (
                            <img
                              src="/icons/icon-sort-desc.svg"
                              alt="sort"
                              className="w-3"
                            />
                          ) : (
                            <>
                              <img
                                src="/icons/icon-sort-desc.svg"
                                alt="sort"
                                className="w-3"
                              />
                              <img
                                src="/icons/icon-sort-desc.svg"
                                alt="sort"
                                className="w-3"
                              />
                            </>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Ranking by Total SILK Points
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead className="text-center text-[10px] md:text-base text-white">
                <div
                  className="flex justify-center gap-1 cursor-pointer"
                  onClick={() => changeOrderBy('referral')}
                >
                  <div>Total Referral</div>

                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div className="table-sort-icon">
                          {orderBy === 'referral' ? (
                            <img
                              src="/icons/icon-sort-desc.svg"
                              alt="sort"
                              className="w-3"
                            />
                          ) : (
                            <>
                              <img
                                src="/icons/icon-sort-desc.svg"
                                alt="sort"
                                className="w-3"
                              />
                              <img
                                src="/icons/icon-sort-desc.svg"
                                alt="sort"
                                className="w-3"
                              />
                            </>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Ranking by Total Referral
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border border-neutral-200 dark:border-border-main [&_tr:last-child]:rounded-b-lg overflow-hidden">
            {userRank && (
              <TableRow className="bg-[#14271d] border-b border-neutral-100 dark:border-neutral-700">
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-2 md:p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-medium relative bg-[#1A1A1A]">
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

                <TableCell className="border-r border-neutral-200 dark:border-border-main p-1 md:p-4">
                  <div className="">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-1 md:gap-2">
                      <AvatarUser
                        src={
                          userRank?.user.avatar
                            ? userRank?.user.avatar
                            : 'error'
                        }
                        alt={userRank?.user.username}
                        className="w-4 h-4 md:w-6 md:h-6 rounded-full justify-self-center"
                      />
                      <div className="text-[10px] md:text-base">{`${userRank?.user.username} (You)`}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-2 md:p-4">
                  <div className="flex justify-center">
                    <TruncateAddress
                      address={userRank?.user.address}
                      className="text-[10px] md:text-base"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center text-[10px] md:text-base border-r border-neutral-200 dark:border-border-main p-2 md:p-4">
                  {formatNumber(Number(userRank?.totalPoint))}
                </TableCell>
                <TableCell className="text-center text-[10px] md:text-base p-2 md:p-4">
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
                <TableCell className="flex items-center justify-center border-r border-neutral-200 dark:border-border-main p-2 md:p-4">
                  {item?.rank === 1 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/first.svg"
                        alt="gold-medal"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />
                    </div>
                  ) : item?.rank === 2 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/second.svg"
                        alt="gold-medal"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />
                    </div>
                  ) : item?.rank === 3 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="/icons/third.svg"
                        alt="gold-medal"
                        className="w-4 h-4 md:w-6 md:h-6"
                      />
                    </div>
                  ) : (
                    <div className="text-[10px] md:text-base text-white py-1">
                      {item?.rank}
                    </div>
                  )}
                </TableCell>

                <TableCell className="border-r border-neutral-200 dark:border-border-main p-1 md:p-4">
                  <div className="flex items-center justify-start">
                    <div className="grid grid-cols-[24px_1fr] items-center gap-1 md:gap-2">
                      <AvatarUser
                        src={item.user.avatar ? item.user.avatar : 'error'}
                        alt={item.user.username}
                        className="w-4 h-4 md:w-6 md:h-6 rounded-full justify-self-center"
                      />
                      <div className="text-[10px] md:text-base">{`${item.user.username} ${item.user.id === userRank?.user.id ? '(You)' : ''}`}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-left border-r border-neutral-200 dark:border-border-main p-1 md:p-4">
                  <div className="flex justify-center">
                    <TruncateAddress
                      address={item.user.address}
                      className="text-[10px] md:text-base"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center text-[10px] md:text-base border-r border-neutral-200 dark:border-border-main p-2 md:p-4">
                  {formatNumber(Number(item.totalPoint))}
                </TableCell>
                <TableCell className="text-center text-[10px] md:text-base p-2 md:p-4">
                  {formatNumber(Number(item.totalReferralCount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* <div className="mt-6">
        <Pagination
          total={totalPages}
          current={currentPage}
          onPageChange={setCurrentPage}
        />
      </div> */}
    </div>
  );
};

interface Props {
  address: string;
  className?: string;
}

export const TruncateAddress = ({ address, className }: Props) => {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p
            className={cn(
              'text-sm cursor-pointer hover:bg-neutral-200 flex gap-1 md:gap-2 items-center dark:hover:bg-neutral-700 rounded-md w-full sm:w-fit px-1 flex-wrap sm:flex-nowrap',
              copied ? 'text-green-600' : 'text-muted-foreground',
              className
            )}
            onClick={handleCopy}
          >
            {address ? truncateAddress(address, isMobile ? 4 : 10) : '-'}
            {address ? (
              <Image
                src={`/icons/${copied ? 'tick-blue.svg' : 'copy-gray.svg'}`}
                alt="copy"
                width={isMobile ? 10 : 15}
                height={isMobile ? 10 : 15}
              />
            ) : null}
          </p>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Rank;
