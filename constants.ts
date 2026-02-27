import { AdLink } from './types';

export const BILLS_TO_USD_RATE = 2000; // 2000 bills = $1.00 USD (más difícil)
export const MIN_CASH_OUT_BILLS = 10000; // $5.00 USD (doble de difícil)

export const INITIAL_ADS: AdLink[] = [
  // Nivel 1 - Múltiples anuncios básicos
  { id: '1', title: 'Adsterra Basic', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 3, billReward: 1, requiredCoins: 0, icon: '🔗', description: 'Nivel Inicial - Opción 1' },
  { id: '1b', title: 'Adsterra Basic 2', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 3, billReward: 1, requiredCoins: 0, icon: '🔗', description: 'Nivel Inicial - Opción 2' },
  { id: '1c', title: 'Adsterra Basic 3', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 3, billReward: 1, requiredCoins: 0, icon: '🔗', description: 'Nivel Inicial - Opción 3' },
  
  // Nivel 2 - Múltiples anuncios rápidos
  { id: '2', title: 'Fast Click', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 6, billReward: 2, requiredCoins: 300, icon: '⚡', description: 'Nivel 2 - Opción 1' },
  { id: '2b', title: 'Fast Click 2', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 6, billReward: 2, requiredCoins: 300, icon: '⚡', description: 'Nivel 2 - Opción 2' },
  { id: '2c', title: 'Fast Click 3', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 6, billReward: 2, requiredCoins: 300, icon: '⚡', description: 'Nivel 2 - Opción 3' },
  
  // Nivel 3 - Múltiples anuncios ecológicos
  { id: '3', title: 'Eco Saver', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 15, billReward: 3, requiredCoins: 1500, icon: '🌿', description: 'Nivel 3 - Opción 1' },
  { id: '3b', title: 'Eco Saver 2', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 15, billReward: 3, requiredCoins: 1500, icon: '🌿', description: 'Nivel 3 - Opción 2' },
  { id: '3c', title: 'Eco Saver 3', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 15, billReward: 3, requiredCoins: 1500, icon: '🌿', description: 'Nivel 3 - Opción 3' },
  
  // Nivel 4 - Múltiples anuncios de bronce
  { id: '4', title: 'Bronze Ad', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 35, billReward: 5, requiredCoins: 6000, icon: '🥉', description: 'Nivel 4 - Opción 1' },
  { id: '4b', title: 'Bronze Ad 2', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 35, billReward: 5, requiredCoins: 6000, icon: '🥉', description: 'Nivel 4 - Opción 2' },
  { id: '4c', title: 'Bronze Ad 3', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 35, billReward: 5, requiredCoins: 6000, icon: '🥉', description: 'Nivel 4 - Opción 3' },
  
  // Nivel 5 - Múltiples anuncios de plata
  { id: '5', title: 'Silver Tier', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 80, billReward: 8, requiredCoins: 20000, icon: '🥈', description: 'Nivel 5 - Opción 1' },
  { id: '5b', title: 'Silver Tier 2', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 80, billReward: 8, requiredCoins: 20000, icon: '🥈', description: 'Nivel 5 - Opción 2' },
  { id: '5c', title: 'Silver Tier 3', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 80, billReward: 8, requiredCoins: 20000, icon: '🥈', description: 'Nivel 5 - Opción 3' },
  
  // Nivel 6 - Múltiples anuncios de oro
  { id: '6', title: 'Gold Partner', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 200, billReward: 12, requiredCoins: 50000, icon: '🥇', description: 'Nivel 6 - Opción 1' },
  { id: '6b', title: 'Gold Partner 2', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 200, billReward: 12, requiredCoins: 50000, icon: '🥇', description: 'Nivel 6 - Opción 2' },
  { id: '6c', title: 'Gold Partner 3', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 200, billReward: 12, requiredCoins: 50000, icon: '🥇', description: 'Nivel 6 - Opción 3' },
  
  // Nivel 7 - Múltiples anuncios de diamante
  { id: '7', title: 'Diamond Ad', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 500, billReward: 18, requiredCoins: 120000, icon: '💎', description: 'Nivel 7 - Opción 1' },
  { id: '7b', title: 'Diamond Ad 2', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 500, billReward: 18, requiredCoins: 120000, icon: '💎', description: 'Nivel 7 - Opción 2' },
  { id: '7c', title: 'Diamond Ad 3', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 500, billReward: 18, requiredCoins: 120000, icon: '💎', description: 'Nivel 7 - Opción 3' },
  
  // Nivel 8 - Múltiples anuncios legendarios
  { id: '8', title: 'Legendary Rev', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 1200, billReward: 25, requiredCoins: 300000, icon: '🏆', description: 'Nivel Máximo - Opción 1' },
  { id: '8b', title: 'Legendary Rev 2', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 1200, billReward: 25, requiredCoins: 300000, icon: '🏆', description: 'Nivel Máximo - Opción 2' },
  { id: '8c', title: 'Legendary Rev 3', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 1200, billReward: 25, requiredCoins: 300000, icon: '🏆', description: 'Nivel Máximo - Opción 3' },
  
  // Anuncios Effective Gate mezclados en diferentes niveles
  { id: '9', title: 'Effective Gate 1', url: 'https://www.effectivegatecpm.com/gs6yds3bbj?key=2bdbd4e60f386f9699b578e3391223d6', coinReward: 8, billReward: 2, requiredCoins: 800, icon: '🚪', description: 'Effective Gate Premium - Nivel 2' },
  { id: '10', title: 'Effective Gate 2', url: 'https://www.effectivegatecpm.com/fh8vdy4spd?key=edf23a75687ae90d55de20c58e675858', coinReward: 12, billReward: 3, requiredCoins: 1200, icon: '🎯', description: 'Effective Gate Pro - Nivel 3' },
  { id: '11', title: 'Effective Gate 3', url: 'https://www.effectivegatecpm.com/jp2a3zgc?key=3465dfe0111e3030fab202e231ae7ff6', coinReward: 18, billReward: 4, requiredCoins: 2000, icon: '⭐', description: 'Effective Gate Elite - Nivel 4' },
  { id: '12', title: 'Effective Gate 4', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 25, billReward: 6, requiredCoins: 3500, icon: '🔥', description: 'Effective Gate Ultra - Nivel 5' },
  { id: '13', title: 'Effective Gate 5', url: 'https://www.effectivegatecpm.com/m43yfg1g1?key=58f3dbd94e806ce50cd48dc3369eecae', coinReward: 40, billReward: 8, requiredCoins: 5500, icon: '💎', description: 'Effective Gate Diamond - Nivel 6' },
  { id: '14', title: 'Effective Gate 6', url: 'https://www.effectivegatecpm.com/c45kwkdv?key=c686587d40336fa94012c7482bfb7502', coinReward: 60, billReward: 10, requiredCoins: 8000, icon: '👑', description: 'Effective Gate Royal - Nivel 7' },
  { id: '15', title: 'Effective Gate 7', url: 'https://www.effectivegatecpm.com/xnyjrsmkcq?key=0dbeba5ad6ad84999d719fda1e40483a', coinReward: 90, billReward: 15, requiredCoins: 12000, icon: '🌟', description: 'Effective Gate Supreme - Nivel 8' },
  { id: '16', title: 'Effective Gate 8', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 120, billReward: 18, requiredCoins: 18000, icon: '🚀', description: 'Effective Gate Maximum - Nivel 9' },
  
  // Duplicados adicionales para más variedad
  { id: '17', title: 'Fast Click Extra', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 6, billReward: 2, requiredCoins: 300, icon: '⚡', description: 'Extra - Nivel 2' },
  { id: '18', title: 'Eco Saver Extra', url: 'https://www.effectivegatecpm.com/k4czsurww?key=0e37ae6e92b9ff506392a8a06aa4ad5b', coinReward: 15, billReward: 3, requiredCoins: 1500, icon: '🌿', description: 'Extra - Nivel 3' },
  { id: '19', title: 'Bronze Ad Extra', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 35, billReward: 5, requiredCoins: 6000, icon: '🥉', description: 'Extra - Nivel 4' },
  { id: '20', title: 'Silver Tier Extra', url: 'https://www.effectivegatecpm.com/icbr4z5psh?key=29abbd98b0a63e81679ad4fc320ffb52', coinReward: 80, billReward: 8, requiredCoins: 20000, icon: '🥈', description: 'Extra - Nivel 5' },
  { id: '21', title: 'Effective Gate 9', url: 'https://www.effectivegatecpm.com/g8q9e9mih?key=43d7abdb7a1c937c3f8d2ce22859ce55', coinReward: 180, billReward: 25, requiredCoins: 25000, icon: '💰', description: 'Effective Gate Legendary' }
];
