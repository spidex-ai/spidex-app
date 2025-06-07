'use client';

import { useEffect, useState } from 'react';

import { useSpidexCoreContext } from '@/app/_contexts/spidex-core';
import { Achievement, PointHistory, PointInfo, Quest } from './type';

export const usePointInfo = () => {
  const { getUserPointMeInfo, getAchievements } = useSpidexCoreContext();

  const [pointInfo, setPointInfo] = useState<PointInfo>();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPointInfo();
    fetchAchievements();
  }, []);

  const fetchPointInfo = async () => {
    try {
      setLoading(true);
      const data = await getUserPointMeInfo();
      setPointInfo(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      const data = await getAchievements();
      if (data.length > 0) {
        setAchievements(data);
      } else {
        setAchievements([]);
      }
    } catch (error) {
      setError(error as string);
    } finally {
    }
  };

  return { pointInfo, loading, error, achievements };
};

export const useQuests = () => {
  const { getUserQuests } = useSpidexCoreContext();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(10);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuests();
  }, [currentPage]);

  const fetchQuests = async () => {
    try {
      setLoading(true);
      const data = await getUserQuests(currentPage + 1, perPage);
      setQuests(data.data);
      setTotalPages(Math.ceil(data.metadata.total / perPage));
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    quests,
    loading,
    error,
    fetchQuests,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export const usePointHistory = () => {
  const { getUserPointHistory } = useSpidexCoreContext();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(10);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPointHistory();
  }, [currentPage]);

  const fetchPointHistory = async () => {
    try {
      setLoading(true);
      const data = await getUserPointHistory(currentPage + 1, perPage);
      console.log('🚀 ~ fetchPointHistory ~ data:', data);
      setPointHistory(data.data);
      setTotalPages(Math.ceil(data.metadata.total / perPage));
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const refetchPointHistory = async () => {
    await fetchPointHistory();
  };

  return {
    pointHistory,
    loading,
    error,
    refetchPointHistory,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};
