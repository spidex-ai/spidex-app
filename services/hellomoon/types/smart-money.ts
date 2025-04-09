export enum Granularity {
  ONE_HOUR = "1h",
  FOUR_HOUR = "4h",
  HALF_DAY = "12h",
  ONE_DAY = "24h",
  ONE_WEEK = "7d",
  ONE_MONTH = "30d"
}

export type SmartMoneyTokenInflow = {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  totalHolders: number | null;
  programCount1d: number | null;
  latest_price: number | null;
  granularity: Granularity;
  priceChange: number | null;
  smartMoneyNetInflow: number | null;
  socialNetInflow: number | null;
  activeUsers: number | null;
  newUsers: number | null;
  buyers: number;
  sellers: number;
  volume: number | null;
  volumeChange: number;
};

export type SmartMoneyInflowsResponse = SmartMoneyTokenInflow[];