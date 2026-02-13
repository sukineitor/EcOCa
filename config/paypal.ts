// Configuración de PayPal - MANTENER ESTE ARCHIVO SECRETO
export const PAYPAL_CONFIG = {
  CLIENT_ID: process.env.VITE_PAYPAL_CLIENT_ID || "tu_paypal_client_id_aqui",
  SECRET_KEY: process.env.VITE_PAYPAL_SECRET_KEY || "tu_paypal_secret_key_aqui",
  SANDBOX_URL: "https://sandbox.paypal.com",
  SANDBOX_EMAIL: "sb-91row47471363@business.example.com",
  SANDBOX_PASSWORD: "G<xYqO9_",
  PRODUCTION_URL: "https://www.paypal.com",
  CURRENCY: "USD",
  INTENT: "capture" as const,
  SANDBOX: process.env.NODE_ENV !== 'production'
};

// Función para verificar el entorno
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// Configuración dinámica según entorno
export const getPayPalConfig = () => ({
  "client-id": PAYPAL_CONFIG.CLIENT_ID,
  currency: PAYPAL_CONFIG.CURRENCY,
  intent: PAYPAL_CONFIG.INTENT,
  "disable-funding": "credit,card" // Opcional: deshabilitar métodos de pago específicos
});
