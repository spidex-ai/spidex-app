import React, { useState, useEffect } from 'react';
import { useTaptools } from '@/hooks/useTaptools';

interface NFTDashboardProps {
  policyId?: string;
  defaultTimeframe?: string;
}

const TaptoolsNFTDashboard: React.FC<NFTDashboardProps> = ({
  policyId = '40fa2aa67258b4ce7b5782f74831d46a84c59a0ff0c28262fab21728', // Default policy ID (Clay Nation)
  defaultTimeframe = '24h'
}) => {
  const { loading, error, getNFTCollectionStats } = useTaptools();
  const [collectionStats, setCollectionStats] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe);

  // Fetch NFT collection stats
  useEffect(() => {
    const fetchCollectionStats = async () => {
      const data = await getNFTCollectionStats(policyId);
      if (data) {
        setCollectionStats(data);
      }
    };

    fetchCollectionStats();
  }, [policyId, getNFTCollectionStats]);

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">NFT Collection Dashboard</h2>
      
      {/* Timeframe Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded ${
                timeframe === tf
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      {/* NFT Collection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Floor Price Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Floor Price</h3>
          {loading && !collectionStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : collectionStats ? (
            <p className="text-2xl font-bold text-gray-800">{collectionStats.price || 'N/A'} ADA</p>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
        
        {/* Volume Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Volume</h3>
          {loading && !collectionStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : collectionStats ? (
            <p className="text-2xl font-bold text-gray-800">{collectionStats.volume?.toLocaleString() || 'N/A'} ADA</p>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
        
        {/* Listings Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Listings</h3>
          {loading && !collectionStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : collectionStats ? (
            <p className="text-2xl font-bold text-gray-800">{collectionStats.listings?.toLocaleString() || 'N/A'}</p>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supply & Owners */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Collection Info</h3>
          {loading && !collectionStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : collectionStats ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Supply:</span>
                <span className="font-medium text-gray-800">{collectionStats.supply?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Owners:</span>
                <span className="font-medium text-gray-800">{collectionStats.owners?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Ownership %:</span>
                <span className="font-medium text-gray-800">
                  {collectionStats.supply && collectionStats.owners
                    ? ((collectionStats.owners / collectionStats.supply) * 100).toFixed(2) + '%'
                    : 'N/A'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
        
        {/* Market Activity */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Market Activity</h3>
          {loading && !collectionStats ? (
            <p className="text-gray-500">Loading...</p>
          ) : collectionStats ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Sales:</span>
                <span className="font-medium text-gray-800">{collectionStats.sales?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Top Offer:</span>
                <span className="font-medium text-gray-800">{collectionStats.topOffer?.toLocaleString() || 'N/A'} ADA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Avg. Price:</span>
                <span className="font-medium text-gray-800">
                  {collectionStats.volume && collectionStats.sales
                    ? (collectionStats.volume / collectionStats.sales).toFixed(2) + ' ADA'
                    : 'N/A'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaptoolsNFTDashboard;
