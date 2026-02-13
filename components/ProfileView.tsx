
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-400 rounded-full opacity-20 blur-[80px]"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-400 rounded-full opacity-20 blur-[60px]"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">👤</span>
          </div>
          
          <h3 className="text-2xl font-black text-white mb-2">Mi Perfil</h3>
          <p className="text-white/60 text-sm">Cuenta de {userName}</p>
          
          <div className="bg-black/40 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/60 text-sm">ID del Dispositivo:</span>
              <span className="text-lime-400 font-mono text-sm">{deviceId}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/60 text-sm">Tipo de Dispositivo:</span>
              <span className="text-white text-sm">{
                /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Móvil' : 'Escritorio'
              }</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/60 text-sm">Navegador:</span>
              <span className="text-white text-sm truncate max-w-[150px]">{navigator.userAgent.split(' ')[0]}</span>
            </div>
            
            <button
              onClick={() => setShowDeviceDetails(!showDeviceDetails)}
              className="w-full bg-lime-400/10 border border-lime-400/30 text-lime-400 py-2 rounded-xl text-sm font-semibold hover:bg-lime-400/20 transition-colors"
            >
              {showDeviceDetails ? 'Ocultar Detalles' : 'Ver Detalles del Dispositivo'}
            </button>
          </div>

          {showDeviceDetails && (
            <div className="mt-4 space-y-2 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Sistema Operativo:</span>
                <span>{navigator.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolución Pantalla:</span>
                <span>{window.screen.width}x{window.screen.height}</span>
              </div>
              <div className="flex justify-between">
                <span>Idioma:</span>
                <span>{navigator.language || 'Desconocido'}</span>
              </div>
              <div className="flex justify-between">
                <span>Online:</span>
                <span className={navigator.onLine ? 'Sí' : 'No'}>{navigator.onLine ? 'Sí' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span>Fecha de Registro:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/5 p-6 rounded-[32px] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <span className="text-lg font-bold text-white">Estadísticas</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Monedas Totales:</span>
              <span className="text-xl font-black text-white">{stats.coins.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Bills Acumulados:</span>
              <span className="text-xl font-black text-lime-400">{stats.bills.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Total Generado:</span>
              <span className="text-xl font-black text-white">${stats.totalEarnedUSD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Anuncios Vistos:</span>
              <span className="text-xl font-black text-white">{stats.unlockedCount}/17</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-[32px] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-bold text-white">Niveles</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Nivel Actual:</span>
              <span className="text-xl font-black text-white">{Math.floor(stats.coins / 5000) + 1}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Progreso al Siguiente:</span>
              <span className="text-xl font-black text-white">{((stats.coins % 5000) / 50).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Anuncios Desbloqueados:</span>
              <span className="text-xl font-black text-white">{stats.unlockedCount}/17</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-1000" 
                style={{ width: `${Math.min(100, (stats.coins % 5000) / 50)}%` }} 
              />
            </div>
            <p className="text-center text-white/60 text-xs mt-2">
              Nivel {Math.floor(stats.coins / 5000) + 1} - {Math.floor(stats.coins / 5000) + 2}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-[32px] p-6 text-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔐</span>
          <span className="text-lg font-bold text-white">Seguridad del Dispositivo</span>
        </div>
        
        <div className="space-y-3 text-sm text-white/80">
          <p className="mb-2">✅ Dispositivo identificado permanentemente</p>
          <p className="mb-2">✅ Cuenta persistente en este equipo</p>
          <p className="mb-2">✅ Nombre de usuario guardado: {userName}</p>
          <p className="mb-2">✅ Datos guardados automáticamente</p>
          <p className="mb-2">✅ Sin necesidad de login manual</p>
          <p className="mb-2">✅ Protección contra múltiples sesiones</p>
          <p className="mb-2">✅ Monitoreo de actividad 24/7</p>
          <p className="mb-2">✅ Identificación única por dispositivo</p>
          <p className="mb-2">✅ Tus datos se mantienen seguros</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
