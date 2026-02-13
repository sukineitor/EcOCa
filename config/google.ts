// Configuración de Google OAuth - MANTENER ESTE ARCHIVO SECRETO
export const GOOGLE_CONFIG = {
  CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID || "tu_google_client_id_aqui",
  CLIENT_SECRET: process.env.VITE_GOOGLE_CLIENT_SECRET || "tu_google_client_secret_aqui",
  REDIRECT_URI: process.env.NODE_ENV === 'production' 
    ? "https://ecocash-pro.netlify.app" 
    : "http://localhost:5173",
  PRODUCTION_REDIRECT_URI: "https://ecocash-pro.netlify.app",
  SCOPE: "openid email profile",
  RESPONSE_TYPE: "token"
};

// Configuración para producción
export const getGoogleConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    client_id: GOOGLE_CONFIG.CLIENT_ID,
    redirect_uri: isProduction ? GOOGLE_CONFIG.PRODUCTION_REDIRECT_URI : GOOGLE_CONFIG.REDIRECT_URI,
    scope: GOOGLE_CONFIG.SCOPE,
    response_type: GOOGLE_CONFIG.RESPONSE_TYPE
  };
};
