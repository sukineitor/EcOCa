
import React, { useState } from 'react';
import { UserStats } from '../types';

interface ProfileViewProps {
  stats: UserStats;
}

const ProfileView: React.FC<ProfileViewProps> = ({ stats }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{name: string, email: string, photo: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: "Eco Professional",
        email: "eco.pro@verified.com",
        photo: "https://api.dicebear.com/7.x/shapes/svg?seed=Pro"
      });
      setIsLoggedIn(true);
      setLoading(false);
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-tr from-lime-400 to-emerald-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-lime-400/20 mb-8 rotate-3">
          <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.224 1.224-3.136 2.552-6.712 2.552-5.44 0-9.76-4.4-9.76-9.84s4.32-9.84 9.76-9.84c2.952 0 5.176 1.152 6.76 2.632l2.304-2.304C18.592 1.344 15.824 0 12.48 0 5.584 0 0 5.584 0 12.48s5.584 12.48 12.48 12.48c3.752 0 6.576-1.224 8.744-3.504 2.248-2.248 2.96-5.4 2.96-7.84 0-.752-.064-1.464-.184-2.128h-11.52z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-black mb-3 tracking-tighter">Acceso de Elite</h2>
        <p className="text-white/40 text-xs mb-10 leading-relaxed max-w-xs mx-auto font-medium">Sincroniza tus ganancias globales y desbloquea niveles premium con tu cuenta de Google.</p>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-5 bg-white text-black rounded-3xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl"
        >
          {loading ? (
            <div className="w-5 h-5 border-[3px] border-black/20 border-t-black rounded-full animate-spin"></div>
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Sincronizar Google
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white/5 border border-white/5 rounded-[40px] p-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-lime-400 to-emerald-600 p-1">
          <div className="w-full h-full rounded-[20px] bg-black flex items-center justify-center overflow-hidden">
            <img src={user?.photo} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-1">{user?.name}</h2>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 rounded-full border border-lime-400/20">
             <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
             <p className="text-lime-400 text-[9px] font-black uppercase tracking-widest">Cuenta Activa</p>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 flex justify-between items-center">
          <div>
            <span className="block text-[10px] font-black text-white/30 uppercase mb-2 tracking-widest">Monedas Acumuladas</span>
            <span className="text-4xl font-black tabular-nums">{stats.coins.toLocaleString()}</span>
          </div>
          <div className="text-3xl bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">🪙</div>
        </div>

        <div className="bg-white/5 rounded-[32px] p-8 border border-white/5">
          <span className="block text-[10px] font-black text-white/30 uppercase mb-6 tracking-widest">Estadísticas de Tráfico</span>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-white/50 uppercase">Nivel Desbloqueado</span>
              <span className="text-sm font-black text-lime-400">NIVEL {stats.unlockedCount} / 8</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-white/50 uppercase">Calidad de Clicks</span>
              <span className="text-sm font-black text-emerald-400 uppercase">Excelente</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-full py-5 text-rose-500 font-black text-[11px] uppercase tracking-[0.2em] border border-rose-500/10 rounded-3xl bg-rose-500/5 mt-6 transition-all active:scale-95"
        >
          Finalizar Sesión
        </button>
      </div>
      
      <p className="text-center text-[9px] text-white/20 font-black uppercase tracking-[0.3em] pb-10">
        EcoCash Network • Secure Node 0x77
      </p>
    </div>
  );
};

export default ProfileView;
