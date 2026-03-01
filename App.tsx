
import React, { useState, useEffect, useCallback } from 'react';
import { UserStats, Tab, AdLink } from './types';
import { INITIAL_ADS, BILLS_TO_USD_RATE } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EarnView from './components/EarnView';
import WalletView from './components/WalletView';

const AppContent: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('ecocash_v2_stats');
    return saved ? JSON.parse(saved) : {
      coins: 0,
      bills: 0,
      totalEarnedUSD: 0,
      unlockedCount: 1
    };
  });

  const [activeTab, setActiveTab] = useState<Tab>('earn');

  useEffect(() => {
    // Guardar stats automáticamente cada vez que cambien
    localStorage.setItem('ecocash_v2_stats', JSON.stringify(stats));
  }, [stats]);

  const handleEarn = useCallback((coins: number, bills: number) => {
    setStats(prev => {
      const newCoins = prev.coins + coins;
      let adjustedBillReward = bills;
      const current = prev.bills;

      // CURVA DE DIFICULTAD EXTREMA (Muro de los $5.00)
      if (current >= 8000) {
        adjustedBillReward = Math.max(1, Math.floor(bills * 0.1)); // 90% reducción
      } else if (current >= 6000) {
        adjustedBillReward = Math.max(1, Math.floor(bills * 0.2)); // 80% reducción
      } else if (current >= 4000) {
        adjustedBillReward = Math.max(1, Math.floor(bills * 0.3)); // 70% reducción
      } else if (current >= 2000) {
        adjustedBillReward = Math.max(1, Math.floor(bills * 0.5)); // 50% reducción
      }

      const newBills = current + adjustedBillReward;
      const usdEarned = adjustedBillReward / BILLS_TO_USD_RATE;
      const newTotalUSD = prev.totalEarnedUSD + usdEarned;

      return {
        ...prev,
        coins: newCoins,
        bills: newBills,
        totalEarnedUSD: newTotalUSD
      };
    });
  }, []);

  const handleCashOut = useCallback((billsToDebit: number, usdToCredit: number) => {
    setStats(prev => ({
      ...prev,
      bills: prev.bills - billsToDebit,
      totalEarnedUSD: prev.totalEarnedUSD + usdToCredit
    }));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'earn':
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} />;
      case 'wallet':
        return <WalletView bills={stats.bills} totalUSD={stats.totalEarnedUSD} onCashOut={handleCashOut} />;
      default:
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      <Header coins={stats.coins} bills={stats.bills} />
      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4 sm:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
