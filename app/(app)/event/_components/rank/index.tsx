'use client';

import {
  Skeleton,
} from '@/components/ui';
import { AvatarUser } from '@/components/ui/image-fallback';

import { useIsMobile } from '@/hooks';

import { cn, formatNumber } from '@/lib/utils';

import React from 'react';

import Table from 'rc-table';
import { TextBorderGradient, TextGradient } from '@/components/ui/text';
import { useEventLeaderboard } from '@/hooks/events/use-event';
import { EventLeaderboardItem } from '@/hooks/events/type';
import { TruncateAddress } from '@/app/(app)/leaderboard/_components/rank';

interface RankProps {
  id: number;
}

const Rank: React.FC<RankProps> = ({ id }) => {
  const {
    loading,
    data: leaderboardData,
    myRank: myRankData,
  } = useEventLeaderboard(id);
  const isMobile = useIsMobile();
  const data = leaderboardData.map((item: EventLeaderboardItem) => ({
    rank: Number(item.rank),
    username: item.username,
    address: item.walletAddress,
    totalVolume: item.totalVolume,
    prizeInfo: item.prizeInfo,
    isMyRank: false,
  }));

  data.unshift({
    rank: myRankData?.rank ? Number(myRankData?.rank) : -1,
    username: myRankData?.username || '',
    address: myRankData?.walletAddress || '',
    totalVolume: myRankData?.totalVolume || '',
    prizeInfo: myRankData?.prizeInfo || null,
    isMyRank: true,
  });

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
              <AvatarUser
                src={row.avatar ? row.avatar : 'error'}
                alt={username}
                className="w-4 h-4 md:w-6 md:h-6 rounded-full justify-self-center"
              />
            ) : null}
            <div className="text-[10px] md:text-sm">{`${username || '-'} ${row.rank === myRankData?.rank ? '(You)' : ''}`}</div>
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
          <div className="flex gap-1 cursor-pointer">
            <div>Total Volume</div>
          </div>
        </div>
      ),
      dataIndex: 'totalVolume',
      key: 'totalVolume',
      useFixedHeader: true,
      width: isMobile ? 70 : 130,
      render: (totalPoint: string) => (
        <div className="text-center text-[10px] md:text-sm">
          ${formatNumber(Number(totalPoint), 2)}
        </div>
      ),
    },

    {
      title: (
        <div className="text-center text-[10px] md:text-sm font-medium flex items-center justify-center">
          <div className="flex justify-center gap-1 cursor-pointer">
            <div>Prize</div>
          </div>
        </div>
      ),
      dataIndex: 'prizeInfo',
      key: 'prizeInfo',
      useFixedHeader: true,
      render: (prizeInfo: any) => (
        <div className="text-center text-[10px] md:text-sm">
          {prizeInfo?.tokenAmount
            ? `${formatNumber(Number(prizeInfo?.tokenAmount))} ${prizeInfo?.token?.ticker ? prizeInfo?.token?.ticker : prizeInfo?.token?.name ? prizeInfo?.token?.name : ''}`
            : '-'}
        </div>
      ),
    },
  ];

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

export default Rank;
