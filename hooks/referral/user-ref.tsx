'use client';

import { useSpidexCore } from '../core/useSpidexCore';

import { useEffect, useState } from 'react';
import { MyRefItem, ReferralInfo, RefHistoryItem } from './type';

export const useRefInfo = () => {
  const { getUserRefMeInfo } = useSpidexCore();

  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRefInfo();
  }, []);

  const fetchRefInfo = async () => {
    try {
      setLoading(true);
      const data = await getUserRefMeInfo();
      setReferralInfo(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { referralInfo, loading, error };
};

export const useRefHistory = () => {
  const { getUserRefHistory } = useSpidexCore();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(5);
  const [referralHistory, setReferralHistory] = useState<RefHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRefHistory();
  }, [currentPage]);

  const fetchRefHistory = async () => {
    try {
      setLoading(true);
      const data = await getUserRefHistory(currentPage + 1, perPage);
      setReferralHistory(data.data);
      setTotalPages(Math.ceil(data.metadata.total / perPage));
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    referralHistory,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export const useRefReferredUsers = () => {
  const { getUserRefMeReferredUsers } = useSpidexCore();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(5);

  const [myRefUsers, setMyRefUsers] = useState<MyRefItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRefReferredUsers();
  }, [currentPage]);

  const fetchRefReferredUsers = async () => {
    try {
      setLoading(true);
      const data = await getUserRefMeReferredUsers(currentPage + 1, perPage);
      setMyRefUsers(data.data);
      setTotalPages(Math.ceil(data.metadata.total / perPage));
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    myRefUsers,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};
