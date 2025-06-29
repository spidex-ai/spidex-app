export interface LeaderboardItem {
  rank: number;
  totalPoint: string;
  totalReferralCount: number;
  user: User
}

interface User {
  id: number;
  username: string;
  avatar: string | null;
  address: string;
  email: string | null;
  fullName: string;
}
