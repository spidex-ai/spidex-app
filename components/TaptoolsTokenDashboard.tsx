import { useTaptools } from '@/hooks/useTaptools';
import { TokenOHLCV, TokenPrice, TopToken } from '@/services/taptools/types';
import React, { useEffect, useState, useRef } from 'react';

interface TokenDashboardProps {
  tokenUnit?: string;
  defaultTimeframe?: string;
}

const TaptoolsTokenDashboard: React.FC<TokenDashboardProps> = ({
  tokenUnit = '8fef2d34078659493ce161a6c7fba4b56afefa8535296a5743f6958741414441', // Default token unit (example)
  defaultTimeframe = '24h'
}) => {
  const { loading, error, getTokenPrices, getTokenOHLCV, getTopTokensByVolume } = useTaptools();
  const [tokenPrice, setTokenPrice] = useState<TokenPrice | null>(null);
  const [ohlcvData, setOhlcvData] = useState<TokenOHLCV[]>([]);
  const [topTokens, setTopTokens] = useState<TopToken[]>([]);
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe);
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Fetch token price
  useEffect(() => {
    const fetchTokenPrice = async () => {
      const data = await getTokenPrices([tokenUnit]);
      if (data) {
        setTokenPrice(data);
      }
    };

    fetchTokenPrice();
  }, [tokenUnit, getTokenPrices]);

  // Fetch OHLCV data
  useEffect(() => {
    const fetchOHLCVData = async () => {
      const data = await getTokenOHLCV(tokenUnit, '1d', 30);
      if (data) {
        setOhlcvData(data);
      }
    };

    fetchOHLCVData();
  }, [tokenUnit, getTokenOHLCV]);

  // Fetch top tokens by volume
  useEffect(() => {
    const fetchTopTokens = async () => {
      const data = await getTopTokensByVolume(timeframe, 1, 5);
      if (data) {
        setTopTokens(data);
      }
    };

    fetchTopTokens();
  }, [timeframe, getTopTokensByVolume]);

  // Draw price chart
  useEffect(() => {
    if (chartRef.current && ohlcvData.length > 0) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set dimensions
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        
        // Find min and max values
        const prices = ohlcvData.map(d => d.close);
        const minPrice = Math.min(...prices) * 0.95;
        const maxPrice = Math.max(...prices) * 1.05;
        const priceRange = maxPrice - minPrice;
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        
        // Y-axis
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Draw price labels (Y-axis)
        ctx.font = '10px Arial';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';
        
        const numYLabels = 5;
        for (let i = 0; i <= numYLabels; i++) {
          const y = height - padding - (i * (height - 2 * padding) / numYLabels);
          const price = minPrice + (i * priceRange / numYLabels);
          ctx.fillText(price.toFixed(2), padding - 5, y + 3);
          
          // Grid line
          ctx.beginPath();
          ctx.strokeStyle = '#eee';
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }
        
        // Draw date labels (X-axis)
        ctx.textAlign = 'center';
        const numXLabels = Math.min(5, ohlcvData.length);
        const step = Math.floor(ohlcvData.length / numXLabels);
        
        for (let i = 0; i < numXLabels; i++) {
          const index = i * step;
          const x = padding + (i * step * (width - 2 * padding) / (ohlcvData.length - 1));
          const date = new Date(ohlcvData[index].time * 1000);
          const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
          ctx.fillText(dateStr, x, height - padding + 15);
        }
        
        // Draw price line
        ctx.beginPath();
        ctx.strokeStyle = '#3b82f6'; // Blue
        ctx.lineWidth = 2;
        
        ohlcvData.forEach((dataPoint, i) => {
          const x = padding + (i * (width - 2 * padding) / (ohlcvData.length - 1));
          const y = height - padding - ((dataPoint.close - minPrice) / priceRange * (height - 2 * padding));
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // Draw points
        ohlcvData.forEach((dataPoint, i) => {
          const x = padding + (i * (width - 2 * padding) / (ohlcvData.length - 1));
          const y = height - padding - ((dataPoint.close - minPrice) / priceRange * (height - 2 * padding));
          
          ctx.beginPath();
          ctx.fillStyle = '#3b82f6';
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw title
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText('Price History (30 days)', width / 2, 15);
      }
    }
  }, [ohlcvData]);

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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Token Dashboard</h2>

      {/* Timeframe Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((tf) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Token Price Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Token Price</h3>
          {loading && !tokenPrice ? (
            <p className="text-gray-500">Loading...</p>
          ) : tokenPrice ? (
            <div>
              <p className="text-2xl font-bold text-gray-800">{tokenPrice[tokenUnit] || 'N/A'} ADA</p>
              <p className="text-sm text-gray-600">
                ${tokenPrice[tokenUnit] || 'N/A'} USD
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No price data available</p>
          )}
        </div>

        {/* Top Tokens Card */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Top Tokens by Volume ({timeframe})</h3>
          {loading && topTokens.length === 0 ? (
            <p className="text-gray-500">Loading...</p>
          ) : topTokens.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 text-gray-700">Token</th>
                    <th className="text-right py-2 px-3 text-gray-700">Price</th>
                    <th className="text-right py-2 px-3 text-gray-700">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {topTokens.map((token, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-3 text-gray-800">{token.ticker || token.unit || 'Unknown'}</td>
                      <td className="py-2 px-3 text-right text-gray-800">{token.price || 'N/A'} ADA</td>
                      <td className="py-2 px-3 text-right text-gray-800">{token.volume?.toLocaleString() || 'N/A'} ADA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No token data available</p>
          )}
        </div>
      </div>

      {/* OHLCV Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Price History (30 days)</h3>
        {loading && ohlcvData.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : ohlcvData.length > 0 ? (
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <canvas 
              ref={chartRef} 
              width={800} 
              height={300}
              className="w-full h-64"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>First: {new Date(ohlcvData[0]?.time * 1000).toLocaleDateString()}</span>
              <span>Last: {new Date(ohlcvData[ohlcvData.length - 1]?.time * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No historical data available</p>
        )}
      </div>
    </div>
  );
};

export default TaptoolsTokenDashboard;
