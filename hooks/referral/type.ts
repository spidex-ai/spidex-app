export interface ReferralInfo {
  referralCode: string;
  referralPointEarned: number;
  referralUserCount: number;
}

export interface MyRefItem {
  id: number;
  avatar: string | null;
  createdAt: string;
  totalReferralPointEarned: string;
  username: string;
}

export interface RefHistoryItem {
  id: number;
  avatar: string | null;
  createdAt: string;
  point: string;
  username: string;
}
