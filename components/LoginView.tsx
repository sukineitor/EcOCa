import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (userData: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login simple
    setTimeout(() => {
      const userData = {
        id: 'demo_' + Math.random().toString(36).substr(2, 9),
        email: email,
        name: email.split('@')[0],
        picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        verified_email: true,
        locale: 'es',
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        sessionId: 'session_' + Math.random().toString(36).substr(2, 9),
        ipHash: 'demo_ip',
        userAgentHash: 'demo_ua'
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-lime-400 rounded-full flex items-center justify-center mb-8">
            <span className="text-4xl">💰</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">EcoCash Pro</h1>
          <p className="text-lime-400 font-bold text-sm uppercase tracking-wider mb-8">Sistema de Ganancias</p>
          <p className="text-white/60 text-sm mb-8">Ingresa tus credenciales para comenzar a ganar</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-[48px] p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-email@ejemplo.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-lime-400/50 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-lime-400/50 focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-black font-black py-4 px-6 rounded-2xl hover:from-lime-300 hover:to-lime-500 transition-all duration-200 transform active:scale-95 shadow-2xl shadow-lime-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center space-y-4">
            <div className="bg-lime-400/10 border border-lime-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔐</span>
                <span className="font-black text-lime-400 text-sm">Acceso Rápido</span>
              </div>
              <p className="text-white/60 text-xs">
                Sin necesidad de Google OAuth - Acceso directo y seguro
              </p>
            </div>

            <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💳</span>
                <span className="font-black text-blue-400 text-sm">Pagos PayPal</span>
              </div>
              <p className="text-white/60 text-xs">
                Retiros automáticos a tu cuenta PayPal
              </p>
            </div>

            <div className="bg-purple-400/10 border border-purple-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🛡️</span>
                <span className="font-black text-purple-400 text-sm">Seguridad Total</span>
              </div>
              <p className="text-white/60 text-xs">
                Sistema protegido y monitoreado 24/7
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-xs">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
          <p className="text-white/20 text-xs mt-4">
            Versión 2.0 - Modo Demo
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
