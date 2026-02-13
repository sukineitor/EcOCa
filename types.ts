
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  locale: string;
  loginTime: string;
  lastActivity: string;
  sessionId: string;
  ipHash: string;
  userAgentHash: string;
}

export interface AdLink {
  id: string;
  title: string;
  url: string;
  coinReward: number;
  billReward: number;
  requiredCoins: number;
  icon: string;
  description: string;
}

export interface UserStats {
  coins: number;
  bills: number;
  totalEarnedUSD: number;
  unlockedCount: number;
}

export type Tab = 'earn' | 'wallet' | 'profile';
