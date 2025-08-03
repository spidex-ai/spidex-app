'use client';

import {
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';

import { useIsMobile } from '@/hooks';
import { useLeaderboard } from '@/hooks/leaderboard/use-leaderboard';
import { cn, formatNumber } from '@/lib/utils';
import { truncateAddress } from '@/lib/wallet';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import Table from 'rc-table';
import { TextBorderGradient, TextGradient } from '@/components/ui/text';

const Rank: React.FC = () => {
  const {
    data: leaderboardData,
    loading,
    userRank,
    orderBy,
    setOrderBy,
  } = useLeaderboard();

  const data = useMemo(() => {
    const result = leaderboardData.map((item: any) => ({
      rank: item.rank,
      username: item.user.username,
      address: item.user.address,
      avatar: item.user.avatar,
      totalPoint: item.totalPoint,
      totalReferralCount: item.totalReferralCount,
      isMyRank: false,
    }));
    result.unshift({
      rank: userRank?.rank,
      username: userRank?.user.username,
      address: userRank?.user.address,
      avatar: userRank?.user.avatar,
      totalPoint: userRank?.totalPoint,
      totalReferralCount: userRank?.totalReferralCount,
      isMyRank: true,
    });
    return result;
  }, [leaderboardData, userRank]);

  const isMobile = useIsMobile();

  const columns = [
    {
      title: (
        <div className="text-center text-[10px] md:text-sm font-medium">
          Rank
        </div>
      ),
      dataIndex: 'rank',
      key: 'rank',
      align: 'center' as any,
      width: isMobile ? 50 : 100,
      render: (rank: number, row: any) => {
        return (
          <>
            {rank === 1 && !row.isMyRank ? (
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/first.svg"
                  alt="gold-medal"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
            ) : rank === 2 && !row.isMyRank ? (
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/second.svg"
                  alt="gold-medal"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
            ) : rank === 3 && !row.isMyRank ? (
              <div className="flex items-center gap-2 justify-center">
                <img
                  src="/icons/third.svg"
                  alt="gold-medal"
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
            ) : row.isMyRank ? (
              <>
                {rank === -1 ? (
                  <div>-</div>
                ) : (
                  <div className=" flex items-center justify-center">
                    <TextBorderGradient
                      className={`px-2 md:px-3 py-1 rounded-full cursor-default ${rank && row.rank.toString().length > 1 ? 'py-1 md:py-2' : 'py-1'}`}
                    >
                      <TextGradient
                        className={cn(
                          isMobile
                            ? 'text-[10px]'
                            : rank && row.rank.toString().length > 1
                              ? 'text-[12px]'
                              : 'text-base'
                        )}
                      >
                        {rank}
                      </TextGradient>
                    </TextBorderGradient>
                  </div>
                )}
              </>
            ) : (
              <div className="text-[10px] md:text-sm text-white py-1">
                {rank}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: (
        <div className="text-left text-[10px] md:text-sm font-medium">
          Username
        </div>
      ),
      dataIndex: 'username',
      key: 'username',
      align: 'left' as any,
      useFixedHeader: true,
      render: (username: string, row: any) => {
        return (
          <div className="grid grid-cols-[24px_1fr] items-center gap-1 md:gap-2">
            {!isMobile ? (
              <img
                src={row.avatar ? row.avatar : '/icons/example-ava.svg'}
                alt={username}
                className="w-4 h-4 md:w-6 md:h-6 rounded-full justify-self-center"
              />
            ) : null}
            <div className="text-[10px] md:text-sm">{`${username} ${row.rank === userRank?.rank ? '(You)' : ''}`}</div>
          </div>
        );
      },
    },
    {
      title: (
        <div className="text-center text-[10px] md:text-sm font-medium">
          Address
        </div>
      ),
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <TruncateAddress
              address={text}
              className={cn(isMobile ? 'text-[10px]' : 'text-sm')}
            />
          </div>
        );
      },
      useFixedHeader: true,
    },

    {
      title: (
        <div className="text-center text-[10px] md:text-sm font-medium flex items-center justify-center">
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
        </div>
      ),
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      useFixedHeader: true,
      width: isMobile ? 70 : 200,
      render: (totalPoint: string) => (
        <div className="text-center text-[10px] md:text-sm">
          {formatNumber(Number(totalPoint), 2)}
        </div>
      ),
    },

    {
      title: (
        <div className="text-center text-[10px] md:text-sm font-medium flex items-center justify-center">
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
        </div>
      ),
      dataIndex: 'totalReferralCount',
      key: 'totalReferralCount',
      useFixedHeader: true,
      render: (totalReferralCount: string) => (
        <div className="text-center text-[10px] md:text-sm">
          {formatNumber(Number(totalReferralCount))}
        </div>
      ),
    },
  ];
  const changeOrderBy = (orderBy: 'point' | 'referral') => {
    setOrderBy(orderBy);
  };
  return (
    <div className="overflow-auto table-leaderboard">
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <Table
          columns={columns}
          data={data}
          className="table-leaderboard"
          sticky={true}
          rowClassName={record => {
            if (record.isMyRank) {
              return 'table-leaderboard-row-my-rank';
            }
            if (record.rank === 1 && !record.isMyRank) {
              return 'table-leaderboard-row-1';
            }
            if (record.rank === 2 && !record.isMyRank) {
              return 'table-leaderboard-row-2';
            }
            if (record.rank === 3 && !record.isMyRank) {
              return 'table-leaderboard-row-3';
            }
            return '';
          }}
        />
      )}
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
