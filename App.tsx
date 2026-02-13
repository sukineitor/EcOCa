
import React, { useState, useEffect, useCallback } from 'react';
import { UserStats, Tab, AdLink } from './types';
import { INITIAL_ADS, BILLS_TO_USD_RATE } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EarnView from './components/EarnView';
import WalletView from './components/WalletView';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
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
  const [deviceId, setDeviceId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Generar o obtener ID único del dispositivo
    let storedDeviceId = localStorage.getItem('ecocash_device_id');
    let storedUserName = localStorage.getItem('ecocash_user_name');
    
    if (!storedDeviceId) {
      // Generar ID único basado en información del dispositivo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '16px Arial';
      const text = `${navigator.userAgent}${screen.width}${screen.height}`;
      ctx.fillText(text, 0, 0);
      const deviceFingerprint = canvas.toDataURL();
      const hash = btoa(deviceFingerprint).substring(0, 16);
      const newDeviceId = `device_${hash}_${Date.now()}`;
      
      localStorage.setItem('ecocash_device_id', newDeviceId);
      storedDeviceId = newDeviceId;
    }
    
    if (!storedUserName) {
      // Generar nombre de usuario aleatorio la primera vez
      const randomNames = ['Alex', 'Maria', 'Carlos', 'Sofia', 'Luis', 'Ana', 'Diego', 'Laura', 'Miguel', 'Elena', 'Pedro'];
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const generatedUserName = `${randomName}${Math.floor(Math.random() * 1000)}`;
      
      localStorage.setItem('ecocash_user_name', generatedUserName);
      storedUserName = generatedUserName;
    }
    
    setDeviceId(storedDeviceId);
    setUserName(storedUserName);
  }, []);

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
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} deviceId={deviceId} userName={userName} />;
      case 'wallet':
        return <WalletView bills={stats.bills} totalUSD={stats.totalEarnedUSD} onCashOut={handleCashOut} deviceId={deviceId} userName={userName} />;
      case 'profile':
        return <ProfileView stats={stats} deviceId={deviceId} userName={userName} />;
      default:
        return <EarnView ads={INITIAL_ADS} userCoins={stats.coins} onEarn={handleEarn} deviceId={deviceId} userName={userName} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      <Header coins={stats.coins} bills={stats.bills} deviceId={deviceId} userName={userName} />
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
