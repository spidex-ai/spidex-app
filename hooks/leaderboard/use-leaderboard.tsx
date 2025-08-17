'use client';

import { useEffect, useState } from 'react';
import { useSpidexCore } from '../core/useSpidexCore';
import { LeaderboardItem } from './type';

export const useLeaderboard = () => {
  const { getRankLeaderboard, getUserRankLeaderboard } = useSpidexCore();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(10);
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<LeaderboardItem>();
  const [orderBy, setOrderBy] = useState<'point' | 'referral'>('point');

  useEffect(() => {
    fetchLeaderboard();
  }, [currentPage, orderBy]);

  useEffect(() => {
    fetchUserRankLeaderboard();
  }, [orderBy]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getRankLeaderboard(currentPage + 1, perPage, orderBy);
      setData(data.data);
      setTotalPages(Math.ceil(data.metadata.total / perPage));
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRankLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getUserRankLeaderboard(orderBy);
      console.log('🚀 ~ fetchUserRankLeaderboard ~ data:', data);
      setUserRank(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    userRank,
    orderBy,
    setOrderBy,
  };
};
