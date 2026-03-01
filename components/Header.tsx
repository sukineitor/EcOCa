import React from 'react';

interface HeaderProps {
  coins: number;
  bills: number;
}

const Header: React.FC<HeaderProps> = ({ coins, bills }) => {

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
        </div>
      </div>
    </header>
  );
};

export default Header;
