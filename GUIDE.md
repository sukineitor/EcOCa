
# 🚀 Guía de Integración Profesional: EcoCash Pro

Esta guía detalla cómo transformar este prototipo en una aplicación de producción funcional conectando los servicios requeridos.

---

## 1. 🔑 Autenticación con Google (Firebase)

Para que el botón de Google funcione realmente, debes usar **Firebase Auth**.

1.  **Crea un proyecto:** Ve a [Firebase Console](https://console.firebase.google.com/).
2.  **Habilita Google Sign-In:** En la sección "Authentication" > "Sign-in method", activa "Google".
3.  **Configura el Cliente:**
    *   Para la web, obtén el `apiKey` y `authDomain`.
    *   Instala el SDK: `npm install firebase`.
4.  **En el código (`components/ProfileView.tsx`):**
    ```javascript
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { auth } from "./firebaseConfig";

    const login = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user); // Aquí tienes el nombre, email y foto real.
    };
    ```

---

## 2. 💰 Pagos Automáticos con PayPal (Payouts API)

Para realizar pagos automáticos desde tu balance hacia el usuario:

1.  **Cuenta Business:** Necesitas una cuenta de PayPal Business.
2.  **Developer Portal:** Ve a [PayPal Developer](https://developer.paypal.com/) y crea una "App" para obtener el **Client ID** y **Secret**.
3.  **Habilitar Payouts:** Debes solicitar acceso a la "Payouts API" (PayPal requiere verificación de identidad para esto).
4.  **Backend (Requerido):** No puedes hacer esto desde el frontend por seguridad.
    *   Crea una función (ej. Node.js/Vercel Function).
    *   Cuando el usuario haga click en "Cash Out", tu backend llama a: `POST /v1/payments/payouts`.
    *   **Seguridad:** Resta los billetes en tu base de datos **antes** de llamar a la API de PayPal.

---

## 3. 📢 Integración con Adsterra

Adsterra funciona mejor en webapps mediante **Direct Links**.

1.  **Panel de Adsterra:** Ve a tu panel, añade tu dominio y genera un "Direct Link".
2.  **Implementación:**
    *   Copia el URL generado (ej. `https://www.highperformancegate.com/xxxx`).
    *   Pégalo en el array `INITIAL_ADS` dentro de `constants.ts`.
3.  **Estrategia Anti-Fraude:**
    *   El timer de 10 segundos que he implementado en `EarnView.tsx` es visual. Para evitar que la gente "hackee" el código, deberías validar en tu backend que el usuario no pida créditos más de una vez cada X segundos por el mismo link.

---

## 4. 📉 Control de Rentabilidad (Dificultad)

*   **Matemática de Ganancia:** Si Adsterra te paga $1.00 por cada 1000 clics (CPM de $1), y tú pagas 1 billete por clic ($1 por cada 1000 clics), estás en el punto de equilibrio.
*   **Margen:** Para ganar dinero, debes pagar **menos** de lo que recibes.
*   **Configuración Actual:** He seteado el mínimo en **25,000 billetes**. A un ritmo de 2 billetes por anuncio, el usuario debe ver **12,500 anuncios** para cobrar $25. Esto asegura que solo los usuarios más comprometidos lleguen al final, dándote tiempo de acumular ingresos de publicidad.
