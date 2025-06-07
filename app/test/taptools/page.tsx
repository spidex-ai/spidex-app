'use client';

import TaptoolsNFTDashboard from '@/components/TaptoolsNFTDashboard';
import TaptoolsTokenDashboard from '@/components/TaptoolsTokenDashboard';
import TaptoolsMarketStats from '@/components/TaptoolsMarketStats';
import TaptoolsAddressInfo from '@/components/TaptoolsAddressInfo';
import TaptoolsTokenTrades from '@/components/TaptoolsTokenTrades';
import { useState } from 'react';

const TaptoolsTestPage = () => {
  const [activeTab, setActiveTab] = useState<
    'token' | 'nft' | 'market' | 'address' | 'trades'
  >('token');

  return (
    <div className="container mx-auto p-8 bg-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Taptools API Demo
      </h1>

      {/* Tab Navigation */}
      <div className="flex flex-wrap mb-8 border-b bg-white rounded-t-lg">
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'token'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('token')}
        >
          Token Dashboard
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'nft'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('nft')}
        >
          NFT Dashboard
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'market'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('market')}
        >
          Market Stats
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'address'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('address')}
        >
          Address Explorer
        </button>
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === 'trades'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('trades')}
        >
          Token Trades
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        {activeTab === 'token' && (
          <TaptoolsTokenDashboard tokenUnit="8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441" />
        )}

        {activeTab === 'nft' && (
          <TaptoolsNFTDashboard policyId="40fa2aa67258b4ce7b5782f74831d46a84c59a0ff0c28262fab21728" />
        )}

        {activeTab === 'market' && <TaptoolsMarketStats />}

        {activeTab === 'address' && <TaptoolsAddressInfo />}

        {activeTab === 'trades' && <TaptoolsTokenTrades />}
      </div>
    </div>
  );
};

export default TaptoolsTestPage;
