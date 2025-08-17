import React, { useState, useEffect } from 'react';
import { useTaptools } from '@/hooks/useTaptools';
import { NFTMarketStats } from '@/services/taptools/types';

interface MarketStatsProps {
  defaultQuote?: string;
}

const TaptoolsMarketStats: React.FC<MarketStatsProps> = ({
  defaultQuote = 'ADA',
}) => {
  const { loading, error, getMarketStats } = useTaptools();
  const [marketStats, setMarketStats] = useState<NFTMarketStats | null>(null);
  const [quote, setQuote] = useState<string>(defaultQuote);

  // Fetch market stats
  useEffect(() => {
    const fetchMarketStats = async () => {
      const data = await getMarketStats(quote);
      if (data) {
        setMarketStats(data);
      }
    };

    fetchMarketStats();
  }, [quote, getMarketStats]);

  // Handle quote change
  const handleQuoteChange = (newQuote: string) => {
    setQuote(newQuote);
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Market Statistics
      </h2>

      {/* Quote Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['ADA', 'USD'].map(currencyQuote => (
            <button
              key={currencyQuote}
              onClick={() => handleQuoteChange(currencyQuote)}
              className={`px-4 py-2 rounded ${
                quote === currencyQuote
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {currencyQuote}
            </button>
          ))}
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Volume Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Total DEX Volume (24h)
          </h3>
          {loading && !marketStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : marketStats ? (
            <p className="text-2xl font-bold text-gray-800">
              {marketStats.dexVolume?.toLocaleString() || 'N/A'} {quote}
            </p>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        {/* Active Addresses Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Active Addresses (24h)
          </h3>
          {loading && !marketStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : marketStats ? (
            <p className="text-2xl font-bold text-gray-800">
              {marketStats.activeAddresses?.toLocaleString() || 'N/A'}
            </p>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Market Overview
        </h3>
        <p className="text-gray-700 mb-2">
          The Cardano DEX ecosystem has processed{' '}
          {marketStats?.dexVolume?.toLocaleString() || 'N/A'} {quote} in trading
          volume over the past 24 hours with{' '}
          {marketStats?.activeAddresses?.toLocaleString() || 'N/A'} active
          addresses.
        </p>
        <p className="text-gray-700">
          This represents the on-chain activity captured by the Taptools API for
          decentralized exchanges on the Cardano blockchain.
        </p>
      </div>
    </div>
  );
};

export default TaptoolsMarketStats;
