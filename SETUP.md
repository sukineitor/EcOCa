# Guía de Configuración - EcoCash Pro

## 🔐 Configuración Requerida

### 1. Google OAuth
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google+ API" y "People API"
4. Ve a "APIs & Services" > "Credentials"
5. Click en "Create Credentials" > "OAuth 2.0 Client IDs"
6. Selecciona "Web application"
7. Agrega los siguientes "Authorized JavaScript origins":
   - `http://localhost:5173` (para desarrollo)
   - `https://ecocash-pro.netlify.app` (para producción)
8. Agrega los "Authorized redirect URIs":
   - `http://localhost:5173`
   - `https://ecocash-pro.netlify.app`

### 2. PayPal
1. Ve a [PayPal Developer](https://developer.paypal.com/)
2. Crea una aplicación nueva
3. Obtén tu Client ID y Secret Key
4. Configura modo Sandbox para pruebas

### 3. Configurar Variables de Entorno
Copia `.env.example` a `.env` y completa con tus credenciales:

```env
# Configuración de PayPal
VITE_PAYPAL_CLIENT_ID=tu_paypal_client_id_real
VITE_PAYPAL_SECRET_KEY=tu_paypal_secret_key_real

# Configuración de Google OAuth
VITE_GOOGLE_CLIENT_ID=tu_google_client_id_real
VITE_GOOGLE_CLIENT_SECRET=tu_google_client_secret_real

# Configuración del entorno
VITE_NODE_ENV=development
```

## 🚀 Iniciar la Aplicación

```bash
npm run dev
```

## 🔐 Flujo de Autenticación

1. **Login con Google**: Los usuarios inician sesión con su cuenta Google
2. **Verificación**: El sistema verifica el email y obtiene el perfil
3. **Sesión Segura**: Se crea una sesión única con tracking de IP y User-Agent
4. **Monitoreo**: Todos los eventos se registran para seguridad

## 💳 Flujo de Pagos PayPal

1. **Acumular Eco-Bills**: Los usuarios ganan viendo enlaces
2. **Alcanzar Mínimo**: Mínimo de retiro $5.00 USD (10,000 bills)
3. **Solicitar Retiro**: Click en "Retirar a PayPal"
4. **Ingresar Email**: Usuario proporciona su email de PayPal
5. **Procesamiento**: Redirección a PayPal y pago automático

## 🛡️ Características de Seguridad

- ✅ Autenticación OAuth2 con Google verificada
- ✅ Detección de Ad-Blockers
- ✅ Monitoreo de IP y User-Agent
- ✅ Sistema de puntuación de riesgo
- ✅ Registro de eventos de seguridad
- ✅ Integración con PayPal Sandbox/Producción
- ✅ Validación de sesiones únicas
- ✅ Centro de monitoreo en tiempo real

## 📊 Sistema de Ganancias

- **17 anuncios totales** (8 originales + 9 nuevos de effectivegatecpm.com)
- **Sistema progresivo** de desbloqueo
- **Curva de dificultad** ajustable
- **Retiros mínimos** de $5.00 USD (10,000 bills)

## 🔧 Archivos de Configuración

### Credenciales Seguras
- `config/paypal.ts` - Configuración de PayPal (usa variables de entorno)
- `config/google.ts` - Configuración de Google OAuth (usa variables de entorno)
- `.env` - Variables de entorno (NO subir a Git)

### Componentes Principales
- `components/AuthProvider.tsx` - Gestión de autenticación
- `components/PayPalIntegration.tsx` - Integración de pagos
- `components/SecuritySystem.tsx` - Monitoreo de seguridad

## 🚨 Notas Importantes

1. **Nunca subas `.env` a Git**
2. **Usa `.env.example` como plantilla**
3. **Configura dominios autorizados** en Google Console
4. **Para producción**, usa HTTPS obligatoriamente
5. **Monitorea los logs de seguridad** regularmente

## 🔄 Actualización a Producción

Cuando estés listo para producción:

1. **Cambiar entorno**:
   ```env
   VITE_NODE_ENV=production
   ```

2. **Configurar dominios en Google Console**:
   - Agrega tu dominio de producción
   - Actualiza redirect URIs

3. **Desplegar aplicación**:
   ```bash
   npm run build
   # Subir carpeta dist a Netlify/Vercel
   ```

## 📞 Soporte

Si encuentras problemas:
1. Revisa la configuración de variables de entorno
2. Verifica las credenciales en Google Console y PayPal Developer
3. Asegúrate de que los dominios estén autorizados
4. Revisa los logs de seguridad para detectar problemas
