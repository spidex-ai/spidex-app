import { ReferralInfo } from '../referral/type';

export interface PointInfo {
  point: {
    id: number;
    userId: number;
    amount: string;
  };
  referralInfo: ReferralInfo;
  achievements: any[];
  nextAchievement: NextAchievement;
  tradingVolume: number;
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  description: string;
  points: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface NextAchievement {
  id: number;
  name: string;
  icon: string;
  description: string;
  points: string;
  pointsToNextAchievement: string;
}

export interface Quest {
  id: number;
  name: string;
  createdAt: string;
  category: number;
  requirements: {
    url: string;
  };
  type: number;
  point: string;
  description: string;
  status: number;
  progress: {
    current: number;
    target: number;
  };
}

export interface PointHistory {
  id: number;
  amount: string;
  createdAt: string;
  questName: string;
}
