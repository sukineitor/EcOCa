
import React, { useState, useEffect } from 'react';
import { AdLink } from '../types';

interface EarnViewProps {
  ads: AdLink[];
  userCoins: number;
  onEarn: (coins: number, bills: number) => void;
  deviceId: string;
}

const EarnView: React.FC<EarnViewProps> = ({ ads, userCoins, onEarn, deviceId }) => {
  const [viewingAd, setViewingAd] = useState<AdLink | null>(null);
  const [timer, setTimer] = useState(0);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { method: 'HEAD', mode: 'no-cors' });
        setAdBlockDetected(false);
      } catch (e) {
        setAdBlockDetected(true);
      }
    };
    checkAdBlock();
  }, []);

  const startViewing = (ad: AdLink) => {
    if (userCoins < ad.requiredCoins || adBlockDetected) return;
    
    const adWindow = window.open(ad.url, '_blank');
    if (!adWindow) {
      alert(" Acción requerida: Debes permitir las ventanas emergentes (pop-ups) para que el anuncio se valide correctamente.");
      return;
    }
    
    setViewingAd(ad);
    setTimer(20);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onEarn(ad.coinReward, ad.billReward);
          setViewingAd(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {adBlockDetected && (
        <div className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-2xl text-center shadow-lg">
          <p className="text-rose-500 font-black text-[10px] uppercase tracking-widest">
            Bloqueador de anuncios activo. Desactívalo para poder ganar.
          </p>
        </div>
      )}

      <div className="bg-gradient-to-br from-lime-400 to-emerald-800 rounded-[32px] p-6 sm:p-10 text-black shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💸</div>
        <h2 className="text-3xl sm:text-4xl font-black mb-1 tracking-tighter">Gana con Enlaces</h2>
        <p className="text-[10px] font-black opacity-60 uppercase mb-8 tracking-wider">Dispositivo: {deviceId.slice(-8)}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-wider">Progreso de Nivel</span>
            <span className="text-xs font-black">Nivel {Math.floor(userCoins / 5000) + 1}</span>
          </div>
          <div className="h-3 bg-black/20 rounded-full overflow-hidden border border-black/5">
            <div 
              className="h-full bg-black transition-all duration-1000" 
              style={{ width: `${Math.min(100, (userCoins % 5000) / 50)}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {ads.map((ad) => {
          const isLocked = userCoins < ad.requiredCoins;
          return (
            <button
              key={ad.id}
              disabled={isLocked || !!viewingAd || adBlockDetected}
              onClick={() => startViewing(ad)}
              className={`group relative flex flex-col p-6 rounded-3xl transition-all duration-300 border text-left ${
                isLocked || adBlockDetected
                  ? 'bg-white/[0.02] border border-white/5 opacity-40 grayscale' 
                  : 'bg-white/5 border-white/10 hover:border-lime-400/30 hover:bg-white/[0.08] active:scale-95'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-black border border-white/10 shadow-lg shadow-black/40 ${
                  isLocked || adBlockDetected ? 'grayscale' : ''
                }`}>
                  {isLocked ? '🔒' : ad.icon}
                </div>
                {isLocked && (
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black text-lime-400/80 bg-lime-400/10 px-2 py-0.5 rounded-md uppercase mb-1">Bloqueado</span>
                      <span className="text-[9px] font-bold text-white/30">{ad.requiredCoins.toLocaleString()} XP</span>
                   </div>
                )}
              </div>
              
              <h3 className="font-black text-base mb-1 text-white">{ad.title}</h3>
              <p className="text-[11px] text-white/40 font-medium mb-5 line-clamp-2 leading-relaxed">{ad.description}</p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[10px] font-black text-lime-400 tracking-tighter uppercase">Recompensa Lista</span>
                 {!isLocked && (
                   <div className="w-2.5 h-2.5 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.6)] animate-pulse" />
                 )}
              </div>
            </button>
          );
        })}
      </div>

      {viewingAd && (
        <div className="fixed inset-0 z-[100] ios-blur bg-black/95 flex items-center justify-center p-6">
          <div className="bg-black border border-white/10 rounded-[40px] p-8 sm:p-12 w-full max-w-md text-center shadow-2xl animate-in zoom-in duration-300">
             <div className="w-24 h-24 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-lime-400/20 shadow-inner">
                <span className="text-5xl animate-bounce">{viewingAd.icon}</span>
             </div>
             <h3 className="text-2xl font-black mb-4">Verificando Enlace...</h3>
             <p className="text-white/40 text-[11px] font-bold mb-10 px-6 leading-relaxed uppercase tracking-[0.2em]">
                Mantén la ventana abierta para que el sistema procese tus ganancias correctamente.
             </p>
             
             <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" />
                  <circle 
                    cx="64" cy="64" r="58" 
                    fill="none" stroke="currentColor" strokeWidth="6" 
                    className="text-lime-400 transition-all duration-1000" 
                    strokeDasharray="364.4" 
                    strokeDashoffset={364.4 - (timer/20)*364.4} 
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-lime-400 tabular-nums">{timer}s</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarnView;
