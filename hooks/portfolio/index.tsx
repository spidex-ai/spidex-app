import { useEffect } from 'react';
import { useState } from 'react';
import { PortfolioToken, PortfolioTransaction } from './type';
import { useSpidexCore } from '../core/useSpidexCore';

export const usePortfolioToken = () => {
  const { getPortfolioToken } = useSpidexCore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioToken | null>(null);

  useEffect(() => {
    fetchPortfolioToken();
  }, []);

  const fetchPortfolioToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPortfolioToken();
      setData(data);
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
  };
};

export const usePortfolioTransaction = () => {
  const { getPortfolioTransaction } = useSpidexCore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioTransaction[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 30;

  useEffect(() => {
    fetchPortfolioTransaction();
  }, [currentPage]);

  const fetchPortfolioTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPortfolioTransaction(
        currentPage + 1,
        pageSize
      );
      console.log('🚀 ~ fetchPortfolioTransaction ~ data:', data);
      setData(data.data);
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
    totalPages,
    currentPage,
    setCurrentPage,
  };
};
