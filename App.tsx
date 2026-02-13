
import React, { useState, useEffect, useCallback } from 'react';
import { UserStats, Tab, AdLink } from './types';
import { INITIAL_ADS, BILLS_TO_USD_RATE } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EarnView from './components/EarnView';
import WalletView from './components/WalletView';
import ProfileView from './components/ProfileView';
import LoginView from './components/LoginView';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const savedUser = localStorage.getItem('ecocash_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('ecocash_v2_stats', JSON.stringify(stats));
    }
  }, [stats, isAuthenticated]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('ecocash_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ecocash_user');
    localStorage.removeItem('ecocash_v2_stats');
  };

  const handleEarn = useCallback((coins: number, bills: number) => {
    if (!isAuthenticated) return;
    
    setStats(prev => {
      const newCoins = prev.coins + coins;
      let adjustedBillReward = bills;
      const current = prev.bills;

      // CURVA DE DIFICULTAD EXTREMA (Muro de los $5.00)
      if (current >= 9995) {
        adjustedBillReward = bills * 0.0001; // Casi imposible avanzar
      } else if (current >= 9900) {
        adjustedBillReward = bills * 0.001;
      } else if (current >= 9600) {
        adjustedBillReward = bills * 0.01;
      } else if (current >= 9000) {
        adjustedBillReward = bills * 0.1;
      } else if (current >= 8000) {
        adjustedBillReward = bills * 0.4;
      }

      const newUnlockedCount = INITIAL_ADS.filter(ad => newCoins >= ad.requiredCoins).length;
      
      return {
        ...prev,
        coins: newCoins,
        bills: prev.bills + adjustedBillReward,
        unlockedCount: newUnlockedCount
      };
    });
  }, [isAuthenticated]);

  const handleCashOut = useCallback((billsToDebit: number, usdToCredit: number) => {
    if (!isAuthenticated) return;
    
    setStats(prev => ({
      ...prev,
      bills: prev.bills - billsToDebit,
      totalEarnedUSD: prev.totalEarnedUSD + usdToCredit
    }));
  }, [isAuthenticated]);

  const renderContent = () => {
    switch (activeTab) {
      case 'earn':
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} />;
      case 'wallet':
        return <WalletView bills={stats.bills} totalUSD={stats.totalEarnedUSD} onCashOut={handleCashOut} />;
      case 'profile':
        return <ProfileView stats={stats} />;
      default:
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      <Header coins={stats.coins} bills={stats.bills} user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4 sm:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
