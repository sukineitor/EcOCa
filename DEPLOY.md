# Guía de Despliegue - EcoCash Pro

## 🚀 Configuración para Producción

### 1. Configurar Google Cloud Console

Debes agregar los siguientes URIs autorizados en tu Google Cloud Console:

**Para desarrollo:**
- `http://localhost:5173`

**Para producción:**
- `https://tu-dominio.com` (reemplaza con tu dominio real)
- `https://ecocash-pro.vercel.app` (si usas Vercel)

### 2. Variables de Entorno Configuradas

✅ **Node Environment**: `production`
✅ **PayPal**: Modo producción activado
✅ **Google OAuth**: Redirect URI dinámico

### 3. Pasos para Desplegar

#### Opción A: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

#### Opción B: Netlify
```bash
# Construir
npm run build

# Desplegar carpeta dist
```

#### Opción C: Hosting Propio
```bash
# Construir
npm run build

# Subir carpeta dist a tu servidor
```

### 4. Configuración de Dominio

1. **Cambia el dominio** en `config/google.ts`:
   ```typescript
   PRODUCTION_REDIRECT_URI: "https://tu-dominio-real.com"
   ```

2. **Actualiza Google Cloud Console** con tu dominio real

3. **Configura SSL** (obligatorio para OAuth)

### 5. Verificación Post-Despliegue

- ✅ Login con Google funciona
- ✅ Pagos PayPal reales
- ✅ Estilos cargan correctamente
- ✅ No errores de consola

## 🔧 Archivos Modificados para Producción

- `config/google.ts` - Redirect URI dinámico
- `config/paypal.ts` - Modo producción
- `.env` - NODE_ENV=production

## 🚨 Notas Importantes

1. **Dominio HTTPS obligatorio** para Google OAuth
2. **PayPal en modo real** procesará dinero real
3. **Cambia el dominio** en Google Console antes de desplegar
4. **Prueba en desarrollo** antes de producción

## 📱 Flujo Completo en Producción

1. Usuario visita `https://tu-dominio.com`
2. Login con Google (cualquier cuenta)
3. Gana 10,000+ Eco-Bills
4. Ingresa email PayPal
5. Retiro real procesado

## 🛡️ Seguridad en Producción

- Autenticación OAuth2 verificada
- Pagos PayPal reales
- Monitoreo de seguridad activo
- Logs de eventos completos
