import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round(value: number, decimals: number) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push([]);
    acc[acc.length - 1].push(array[i]);
    return acc;
  }, [] as T[][]);
}

export const formatNumber = (num: number, decimalPlaces?: number): string => {
  if (num === undefined) return '0'; 
  if (num === null) return '0';
  if (num === 0) return '0';
  if (num < 0.00001) return `~0.00001`;
  const options: Intl.NumberFormatOptions = {
    maximumFractionDigits: decimalPlaces ?? 2,
  };

  return num.toLocaleString('en-US', options);
};

export const DEXHUNTER_SAVE_FEE = 10;