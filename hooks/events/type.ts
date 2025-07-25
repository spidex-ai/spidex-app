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
  status: string;
  totalPrize: string;
  totalTrades: number;
  totalVolumeTraded: string;
  tradeTokens: any;
  type: string;
  updatedAt: string;
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
