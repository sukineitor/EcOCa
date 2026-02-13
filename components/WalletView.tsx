import React, { useState } from 'react';
import { BILLS_TO_USD_RATE } from '../constants';
import PayPalIntegration from './PayPalIntegration';
import SecuritySystem from './SecuritySystem';

interface WalletViewProps {
  bills: number;
  totalUSD: number;
  onCashOut: (bills: number, usd: number) => void;
  deviceId: string;
  userName: string;
}

const WalletView: React.FC<WalletViewProps> = ({ bills, totalUSD, onCashOut, deviceId, userName }) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [emailStep, setEmailStep] = useState<'email' | 'payment'>('email');
  const [paypalEmail, setPaypalEmail] = useState('');
  
  const currentUSDValue = bills / BILLS_TO_USD_RATE;
  const canCashOut = bills >= 10000;
  const progressPercent = Math.min(100, (bills / 10000) * 100);

  const handleWithdraw = () => {
    if (!canCashOut) return;
    setEmailStep('email');
    setShowPayPal(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paypalEmail && paypalEmail.includes('@')) {
      setEmailStep('payment');
    }
  };

  const handlePayPalSuccess = (details: any) => {
    console.log('PayPal payment successful:', details);
    setProcessing(true);
    
    // Simulación de proceso de verificación bancaria
    setTimeout(() => {
      onCashOut(bills, currentUSDValue);
      setProcessing(false);
      setSuccess(true);
      setShowPayPal(false);
      setEmailStep('email');
      setPaypalEmail('');
    }, 2000);
  };

  const handlePayPalError = (error: any) => {
    console.error('PayPal payment error:', error);
    setProcessing(false);
    alert('Error en el procesamiento del pago. Por favor intenta nuevamente.');
  };

  if (showPayPal) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="bg-white/[0.03] border border-white/10 rounded-[48px] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white">
              {emailStep === 'email' ? 'Configurar Retiro' : 'Procesar Pago PayPal'}
            </h3>
            <button
              onClick={() => {
                setShowPayPal(false);
                setEmailStep('email');
                setPaypalEmail('');
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          {emailStep === 'email' ? (
            <div className="space-y-6">
              <div className="bg-black/40 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/60">Monto a retirar:</span>
                  <span className="text-2xl font-black text-lime-400">${currentUSDValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Eco-Bills a canjear:</span>
                  <span className="text-lg font-bold text-white">{bills.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-white/80 mb-2">
                    Email de PayPal para recibir el pago
                  </label>
                  <input
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="tu-email@paypal.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-lime-400/50 focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-[10px] text-white/40 mt-2">
                    Asegúrate de que este email esté verificado en tu cuenta PayPal
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!paypalEmail || !paypalEmail.includes('@')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-black py-4 px-6 rounded-2xl hover:from-blue-400 hover:to-blue-600 transition-all duration-200 transform active:scale-95 shadow-2xl shadow-blue-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar al Pago
                </button>
              </form>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔒</span>
                  <span className="font-black text-blue-400 text-sm">Seguridad Garantizada</span>
                </div>
                <p className="text-white/60 text-xs">
                  Tu pago será procesado de forma segura a través de PayPal Sandbox
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-black/40 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/60">Monto a retirar:</span>
                  <span className="text-2xl font-black text-lime-400">${currentUSDValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/60">Email de destino:</span>
                  <span className="text-lg font-bold text-white">{paypalEmail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Eco-Bills a canjear:</span>
                  <span className="text-lg font-bold text-white">{bills.toLocaleString()}</span>
                </div>
              </div>

              <PayPalIntegration
                amount={currentUSDValue.toFixed(2)}
                onSuccess={handlePayPalSuccess}
                onError={handlePayPalError}
              />

              <button
                onClick={() => setEmailStep('email')}
                className="w-full bg-white/5 border border-white/10 text-white/60 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Cambiar Email
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="bg-white/[0.03] border border-white/10 rounded-[48px] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-400 rounded-full opacity-20 blur-[60px]"></div>
        
        <h3 className="text-3xl sm:text-4xl font-black mb-1 tracking-tighter">Billetera Digital</h3>
        <p className="text-[10px] font-black opacity-60 uppercase mb-8 tracking-wider">Usuario: {userName} | Dispositivo: {deviceId.slice(-8)}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-white/60">Balance Actual:</span>
            <span className="text-2xl font-black text-white">{bills.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-white/60">Valor USD:</span>
            <span className="text-2xl font-black text-white">${totalUSD.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-black/40 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-black mb-4 text-center">Progreso de Retiro</h3>
        <div className="h-3 bg-black/20 rounded-full overflow-hidden border border-black/5">
          <div 
            className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-1000" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
        <p className="text-center text-white/60 text-xs mt-2">
          {progressPercent.toFixed(0)}% completado
        </p>
      </div>

      <button
        disabled={!canCashOut || processing}
        onClick={handleWithdraw}
        className={`w-full py-6 rounded-3xl font-black text-lg transition-all transform active:scale-95 shadow-2xl ${
          canCashOut 
            ? 'bg-gradient-to-r from-lime-300 to-lime-600 text-white shadow-lime-400/20' 
            : 'bg-white/5 text-white/10 border border-white/5 cursor-not-allowed'
        }`}
      >
        {processing ? 'Procesando...' : 'Retirar a PayPal'}
      </button>
      
      {!canCashOut && (
        <p className="mt-6 text-[10px] text-white/30 uppercase font-black tracking-widest">
          Mínimo de retiro: $5.00 USD (10,000 Eco-Bills)
        </p>
      )}
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
              <span className="text-xl font-black text-white">{bills.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Eco-Bills Acumulados:</span>
              <span className="text-xl font-black text-lime-400">{bills.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Total Generado:</span>
              <span className="text-xl font-black text-white">${totalUSD.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60 text-sm">Retiros Realizados:</span>
              <span className="text-xl font-black text-white">0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-[32px] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-bold text-white">Niveles</span>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-1000" 
                style={{ width: `${Math.min(100, (bills % 5000) / 50)}%` }} 
              />
            </div>
            <p className="text-center text-white/60 text-xs mt-2">
              Nivel {Math.floor(bills / 5000) + 1} - {Math.floor(bills / 5000) + 2}
            </p>
          </div>
        </div>

        <SecuritySystem />
      
        {success && (
          <div className="fixed bottom-32 left-6 right-6 z-[110] bg-lime-400 text-black p-5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-2 duration-500 flex items-center gap-3">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <span className="text-lg">✅</span>
            </div>
            <div>
              <p className="font-black text-sm">¡Pago Exitoso!</p>
              <p className="text-xs">Tu pago de ${currentUSDValue.toFixed(2)} ha sido enviado a {paypalEmail}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default WalletView;
