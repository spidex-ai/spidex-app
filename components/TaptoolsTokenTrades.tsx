import React, { useState, useEffect } from 'react';
import { useTaptools } from '@/hooks/useTaptools';
import { TokenTrade } from '@/services/taptools/types';

interface TokenTradesProps {
  defaultUnit?: string;
  defaultTimeframe?: string;
}

const TaptoolsTokenTrades: React.FC<TokenTradesProps> = ({
  defaultUnit = '8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441',
  defaultTimeframe = '24h'
}) => {
  const [unit, setUnit] = useState<string>(defaultUnit);
  const [unitInput, setUnitInput] = useState<string>(defaultUnit);
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trades, setTrades] = useState<TokenTrade[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch token trades
  useEffect(() => {
    const fetchTokenTrades = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/taptools/token/market/trades?unit=${unit}&timeframe=${timeframe}&page=${page}&perPage=${perPage}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setTrades(data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Token trades error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (unit) {
      fetchTokenTrades();
    }
  }, [unit, timeframe, page, perPage]);

  // Handle unit change
  const handleUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unitInput.trim()) {
      setUnit(unitInput.trim());
      setPage(1); // Reset to first page
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    setPage(1); // Reset to first page
  };

  // Handle pagination
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Token Trades</h2>

      {/* Token Input Form */}
      <form onSubmit={handleUnitSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={unitInput}
            onChange={(e) => setUnitInput(e.target.value)}
            placeholder="Enter token unit (policy ID + hex name)"
            className="flex-grow px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Timeframe Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['24h', '7d', '30d', 'all'].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded ${timeframe === tf
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Trades Table */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Trades</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : trades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-2 px-3 text-gray-700">Time</th>
                  <th className="text-left py-2 px-3 text-gray-700">Type</th>
                  <th className="text-right py-2 px-3 text-gray-700">Price</th>
                  <th className="text-right py-2 px-3 text-gray-700">Amount</th>
                  <th className="text-right py-2 px-3 text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-3 text-gray-800">
                      {new Date(trade.time * 1000).toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-gray-800">
                      <span className={trade.action === 'buy' ? 'text-green-600' : 'text-red-600'}>
                        {trade.action.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-gray-800">{trade.price} ADA</td>
                    <td className="py-2 px-3 text-right text-gray-800">{trade.tokenAAmount.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-gray-800">{(trade.price * trade.tokenAAmount).toLocaleString()} ADA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No trades found</p>
        )}
      </div>

      {/* Pagination */}
      {trades.length > 0 && (
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaptoolsTokenTrades;
