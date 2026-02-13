
import React from 'react';
import { User } from '../types';
import { useAuth } from './AuthProvider';

interface HeaderProps {
  coins: number;
  bills: number;
  user?: User | null;
}

const Header: React.FC<HeaderProps> = ({ coins, bills, user }) => {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 ios-blur bg-black/60 border-b border-white/10 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-lime-300 to-white bg-clip-text text-transparent">EcoCash Pro</h1>
          <span className="text-[10px] text-lime-400 font-medium tracking-widest uppercase">Cuenta Verificada</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-semibold tabular-nums text-white">{coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/30 rounded-full px-3 py-1">
            <span className="text-sm">💵</span>
            <span className="text-sm font-semibold tabular-nums text-lime-400">{bills.toLocaleString()}</span>
          </div>
          
          {user && (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-lime-400/30 cursor-pointer hover:border-lime-400 transition-colors"
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-white/10 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-white/60 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/40">Verificado:</span>
                      <span className={user.verified_email ? "text-lime-400" : "text-red-400"}>
                        {user.verified_email ? "✅ Sí" : "❌ No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">ID Sesión:</span>
                      <span className="text-white/60 font-mono text-[10px]">{user.sessionId.slice(-6)}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full mt-3 bg-red-500/10 border border-red-500/30 text-red-400 py-2 rounded-xl text-xs font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
