
import { AdLink } from './types';

export const BILLS_TO_USD_RATE = 2000; // 2000 bills = $1.00 USD (más difícil)
export const MIN_CASH_OUT_BILLS = 10000; // $5.00 USD (doble de difícil)

export const INITIAL_ADS: AdLink[] = [
  { id: '1', title: 'Adsterra Basic', url: 'https://www.highrevenuenetwork.com/id1', coinReward: 3, billReward: 1, requiredCoins: 0, icon: '🔗', description: 'Nivel Inicial' },
  { id: '2', title: 'Fast Click', url: 'https://www.highrevenuenetwork.com/id2', coinReward: 6, billReward: 2, requiredCoins: 300, icon: '⚡', description: 'Nivel 2' },
  { id: '3', title: 'Eco Saver', url: 'https://www.highrevenuenetwork.com/id3', coinReward: 15, billReward: 3, requiredCoins: 1500, icon: '🌿', description: 'Nivel 3' },
  { id: '4', title: 'Bronze Ad', url: 'https://www.highrevenuenetwork.com/id4', coinReward: 35, billReward: 5, requiredCoins: 6000, icon: '🥉', description: 'Nivel 4' },
  { id: '5', title: 'Silver Tier', url: 'https://www.highrevenuenetwork.com/id5', coinReward: 80, billReward: 8, requiredCoins: 20000, icon: '🥈', description: 'Nivel 5' },
  { id: '6', title: 'Gold Partner', url: 'https://www.highrevenuenetwork.com/id6', coinReward: 200, billReward: 12, requiredCoins: 50000, icon: '🥇', description: 'Nivel 6' },
  { id: '7', title: 'Diamond Ad', url: 'https://www.highrevenuenetwork.com/id7', coinReward: 500, billReward: 18, requiredCoins: 120000, icon: '💎', description: 'Nivel 7' },
  { id: '8', title: 'Legendary Rev', url: 'https://www.highrevenuenetwork.com/id8', coinReward: 1200, billReward: 25, requiredCoins: 300000, icon: '🏆', description: 'Nivel Máximo' },
  { id: '9', title: 'Effective Gate 1', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 8, billReward: 2, requiredCoins: 800, icon: '🚪', description: 'Effective Gate Premium' },
  { id: '10', title: 'Effective Gate 2', url: 'https://www.effectivegatecpm.com/fh8vdy4spd?key=edf23a75687ae90d55de20c58e675858', coinReward: 12, billReward: 3, requiredCoins: 1200, icon: '🎯', description: 'Effective Gate Pro' },
  { id: '11', title: 'Effective Gate 3', url: 'https://www.effectivegatecpm.com/jp2a3zgc?key=3465dfe0111e3030fab202e231ae7ff6', coinReward: 18, billReward: 4, requiredCoins: 2000, icon: '⭐', description: 'Effective Gate Elite' },
  { id: '12', title: 'Effective Gate 4', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 25, billReward: 6, requiredCoins: 3500, icon: '🔥', description: 'Effective Gate Ultra' },
  { id: '13', title: 'Effective Gate 5', url: 'https://www.effectivegatecpm.com/m43yfg1g1?key=58f3dbd94e806ce50cd48dc3369eecae', coinReward: 40, billReward: 8, requiredCoins: 5500, icon: '💎', description: 'Effective Gate Diamond' },
  { id: '14', title: 'Effective Gate 6', url: 'https://www.effectivegatecpm.com/c45kwkdv?key=c686587d40336fa94012c7482bfb7502', coinReward: 60, billReward: 10, requiredCoins: 8000, icon: '👑', description: 'Effective Gate Royal' },
  { id: '15', title: 'Effective Gate 7', url: 'https://www.effectivegatecpm.com/xnyjrsmkcq?key=0dbeba5ad6ad84999d719fda1e40483a', coinReward: 90, billReward: 15, requiredCoins: 12000, icon: '🌟', description: 'Effective Gate Supreme' },
  { id: '16', title: 'Effective Gate 8', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 120, billReward: 18, requiredCoins: 18000, icon: '🚀', description: 'Effective Gate Maximum' },
  { id: '17', title: 'Effective Gate 9', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 180, billReward: 25, requiredCoins: 25000, icon: '💰', description: 'Effective Gate Legendary' }
];
