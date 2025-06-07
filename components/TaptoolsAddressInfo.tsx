import { AddressInfo, AddressUtxo } from '@/services/taptools/types';
import React, { useEffect, useState } from 'react';

interface AddressInfoProps {
  defaultAddress?: string;
}

const TaptoolsAddressInfo: React.FC<AddressInfoProps> = ({
  defaultAddress = 'addr1z9es6px68rlmwatqwg6qxwqf3szyz0n4lm0m2e5j38nu0062a6yhtrq8a4cxg2trrtzddev7v974nafzmx4xaegv2ngqky7khv',
}) => {
  const [address, setAddress] = useState<string>(defaultAddress);
  const [addressInput, setAddressInput] = useState<string>(defaultAddress);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [utxos, setUtxos] = useState<AddressUtxo[]>([]);

  // Fetch address info
  useEffect(() => {
    const fetchAddressInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/taptools/address/info?address=${address}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setAddressInfo(data);

        // Also fetch UTXOs
        const utxosResponse = await fetch(
          `/api/taptools/address/utxos?address=${address}`
        );

        if (!utxosResponse.ok) {
          throw new Error(`UTXOs API error: ${utxosResponse.status}`);
        }

        const utxosData = await utxosResponse.json();
        setUtxos(utxosData);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Address info error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchAddressInfo();
    }
  }, [address]);

  // Handle address change
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setAddress(addressInput.trim());
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Address Explorer
      </h2>

      {/* Address Input Form */}
      <form onSubmit={handleAddressSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            placeholder="Enter Cardano address"
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Address Info */}
      {addressInfo && (
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Address Information
          </h3>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-700 font-medium">Address:</span>
              <span className="text-gray-800 break-all">{address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">ADA Balance:</span>
              <span className="font-medium text-gray-800">
                {addressInfo.lovelace
                  ? (Number(addressInfo.lovelace) / 1000000).toFixed(6)
                  : 'N/A'}{' '}
                ADA
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Token Count:</span>
              <span className="font-medium text-gray-800">
                {addressInfo.assets
                  ? Object.keys(addressInfo.assets).length
                  : '0'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Token Holdings */}
      {addressInfo &&
        addressInfo.assets &&
        Object.keys(addressInfo.assets).length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Token Holdings
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 text-gray-700">Asset</th>
                    <th className="text-right py-2 px-3 text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {addressInfo.assets.map((assetInfo, index) => (
                    <tr
                      key={assetInfo.unit}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="py-2 px-3 text-gray-800 break-all">
                        {assetInfo.unit}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-800">
                        {assetInfo.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* UTXOs */}
      {utxos.length > 0 && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            UTXOs ({utxos.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-2 px-3 text-gray-700">TX Hash</th>
                  <th className="text-right py-2 px-3 text-gray-700">Index</th>
                  <th className="text-right py-2 px-3 text-gray-700">
                    Value (ADA)
                  </th>
                </tr>
              </thead>
              <tbody>
                {utxos.slice(0, 5).map((utxo, index) => (
                  <tr
                    key={`${utxo.hash}#${utxo.index}`}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="py-2 px-3 text-gray-800 break-all">{`${utxo.hash.substring(
                      0,
                      10
                    )}...`}</td>
                    <td className="py-2 px-3 text-right text-gray-800">
                      {utxo.index}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-800">
                      {utxo.lovelace
                        ? (Number(utxo.lovelace) / 1000000).toFixed(6)
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {utxos.length > 5 && (
              <p className="text-sm text-gray-500 mt-2">
                Showing 5 of {utxos.length} UTXOs
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaptoolsAddressInfo;
