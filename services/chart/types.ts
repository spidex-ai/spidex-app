export enum CandlestickGranularity {
  ONE_MIN = 'ONE_MIN',
  FIVE_MIN = 'FIVE_MIN',
  ONE_HOUR = 'ONE_HOUR',
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
}

export enum CardanoCandlestickGranularity {
  FIVE_MIN = 'FIVE_MIN',
  ONE_HOUR = 'ONE_HOUR',
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
  THREE_MIN = 'THREE_MIN',
}
export type TokenPriceCandlestick = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export enum CandleStickInterval {
  THREE_MINUTES = '3m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  THREE_DAYS = '3d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1M',
}

export enum Granularity {
  ONE_HOUR = '1h',
  FOUR_HOUR = '4h',
  HALF_DAY = '12h',
  ONE_DAY = '24h',
  ONE_WEEK = '7d',
  ONE_MONTH = '30d',
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

export type TokenUsersOverTime = {
  mint: string;
  token_name: string;
  day: string;
  activeUserCount: number;
};

export type TokenUsersOverTimeResponse = TokenUsersOverTime[];

export type BaseResponse<T> = {
  success: boolean;
  data: T;
};
