import React from 'react';
import { useAuth } from './AuthProvider';

const LoginView: React.FC = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-lime-400 rounded-full flex items-center justify-center mb-8">
            <span className="text-4xl">💰</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">
            EcoCash Pro
          </h1>
          <p className="text-lime-400 font-bold text-sm uppercase tracking-wider mb-8">
            Sistema Seguro de Ganancias
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-black text-white">
              Bienvenido de Nuevo
            </h2>
            <p className="text-white/60 text-sm">
              Inicia sesión con tu cuenta Google para acceder al sistema de ganancias seguro
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-lime-400/10 border border-lime-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔐</span>
                <span className="font-black text-lime-400 text-sm">Seguridad Garantizada</span>
              </div>
              <p className="text-white/60 text-xs">
                Autenticación OAuth2 de Google con encriptación de extremo a extremo
              </p>
            </div>

            <div className="bg-blue-400/10 border border-blue-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🛡️</span>
                <span className="font-black text-blue-400 text-sm">Protección Anti-Fraude</span>
              </div>
              <p className="text-white/60 text-xs">
                Monitoreo de IP, detección de bots y verificación de identidad
              </p>
            </div>

            <div className="bg-purple-400/10 border border-purple-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💳</span>
                <span className="font-black text-purple-400 text-sm">Pagos Seguros</span>
              </div>
              <p className="text-white/60 text-xs">
                Integración con PayPal API y transferencias automáticas verificadas
              </p>
            </div>
          </div>

          <button
            onClick={() => login()}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-black font-black py-4 px-6 rounded-2xl hover:from-lime-300 hover:to-lime-500 transition-all duration-200 transform active:scale-95 shadow-2xl shadow-lime-400/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Cargando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Iniciar con Google</span>
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-white/40 text-xs">
              Al continuar, aceptas nuestros términos de servicio y política de privacidad
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/20 text-xs">
            Versión 2.0 - Protegido con Google OAuth2
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
