export interface EventItem {
  createdAt: string;
  description: string;
  endDate: string;
  icon: string;
  id: number;
  name: string;
  participantCount: number;
  rankPrizes: any;
  startDate: string;
  distributionDate: string;
  status: string;
  totalPrize: string;
  totalTrades: number;
  totalVolumeTraded: string;
  tradeToken: TradeToken;
  type: string;
  updatedAt: string;
  url: string;
  banner: string | null;
}

export interface EventDetail extends EventItem {
  top3Prizes: {
    firstPlace: PrizePlace,
    secondPlace: PrizePlace,
    thirdPlace: PrizePlace,
  }

}

export interface PrizePlace {
  "unit": string,
  "logo": string,
  "name": string,
  "ticker": string,
  "tokenAmount": string,
  "point": string
}

export interface TradeToken {
  decimals: number;
  logo: string;
  name: string;
  ticker: string;
  unit: string;
}

export interface EventLeaderboard {
  eventId: number;
  totalParticipants: number;
  lastUpdated: string;
  leaderboard: EventLeaderboardItem[];
}

export interface EventLeaderboardItem {
  userId: number;
  rank: string;
  totalVolume: string;
  tradeCount: number;
  username: string;
  walletAddress: string;
  avatarUrl: string;
  prizeInfo: {
    points: string;
    token: PrizeToken;
    tokenAmount: string;
  } | null;
}

export interface PrizeToken {
  decimals: number;
  logo: string;
  name: string;
  ticker: string; 
  unit: string;
}

export interface EventMyRank {
  eventId: number;
  totalVolume: string;
  tradeCount: number;
  rank: string | null;
  isParticipating: boolean;
  joinedAt: string;
  prizeInfo: {
    points: string;
    token: PrizeToken;
    tokenAmount: string;
  } | null;

  username: string;
  walletAddress: string;
  avatarUrl: string;
}


export enum EventStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
}
