'use client';

import TokenSelect from '@/app/_components/token-select';
// import { Token } from '@/db/types/token'
import React from 'react';
import { cn } from '@/lib/utils';
import TokenBalance from './token-balance';
// import { usePrice } from '@/hooks/queries/price';
import TokenDisplay from '@/app/_components/token-display';
import { SearchTokenInfo } from '@/services/dexhunter/types';

interface Props {
  label: string;
  amount: string;
  onChange?: (amount: string) => void;
  token: SearchTokenInfo | null;
  onChangeToken?: (token: SearchTokenInfo | null) => void;
  address?: string;
}

const TokenInput: React.FC<Props> = ({
  label,
  amount,
  onChange,
  token,
  onChangeToken,
  address,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={cn(
        'flex flex-col border border-border-main rounded-md p-2 w-full transition-colors bg-neutral-100 dark:bg-bg-main gap-2',
        isFocused && 'border-brand-600'
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{label}</p>
        {token && address && (
          <TokenBalance
            address={address}
            tokenAddress={token.unit || ''}
            tokenSymbol={token.token_ascii}
            setAmount={onChange}
          />
        )}
      </div>
      <div className={cn('flex items-center w-full')}>
        <div className="w-full">
          <input
            type="number"
            value={amount}
            onChange={e => {
              const value = e.target.value;
              if (!/^\d*\.?\d*$/.test(value)) return;
              
              const parts = value.split('.');
              const integerPart = parts[0];
              const decimalPart = parts[1] || '';
              
              if (integerPart.length > 12) return;
              if (decimalPart.length > 8) return;
              
              if (Number(value) >= 0) {
                if (onChange) {
                  onChange(value);
                }
              }
            }}
            onKeyDown={e => {
              if (e.key === '-' || e.key.toLowerCase() === 'e') {
                e.preventDefault();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled={!onChange}
            placeholder="0.00"
          />
          {token && <TokenInputValue amount={amount} token={token} />}
        </div>
        {onChangeToken ? (
          <TokenSelect value={token} onChange={onChangeToken} />
        ) : (
          token && <TokenDisplay token={token} />
        )}
      </div>
    </div>
  );
};

export const TokenInputValue = ({
  amount,
  token,
}: {
  amount: string;
  token: SearchTokenInfo;
}) => {
  console.log(token, amount);
  return null;
};

export default TokenInput;
