// src/pages/login.tsx
import { useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useLocation } from "wouter";
import { Capacitor } from "@capacitor/core";

const provider = new GoogleAuthProvider();

// Detecta si estás en PWA, WebView o app nativa
function isStandaloneMode() {
  return (
    Capacitor.isNativePlatform() || // App compilada (APK)
    window.matchMedia("(display-mode: standalone)").matches || // PWA
    (window.navigator as any).standalone === true // Safari iOS
  );
}

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleGoogleLogin = async () => {
    try {
      if (isStandaloneMode()) {
        console.log("📲 App/PWA detectada → usando redirect");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("🧭 Navegador detectado → usando popup");
        await signInWithPopup(auth, provider);
        setLocation("/");
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión con Google:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("✅ Usuario autenticado vía redirect:", result.user.email);
          setLocation("/");
        }
      } catch (error) {
        console.error("❌ Error al recuperar redirect:", error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Bienvenido a tu billetera</h1>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-white text-black px-4 py-2 rounded shadow flex items-center gap-2"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google logo"
          className="w-5 h-5"
        />
        Iniciar sesión con Google
      </button>
    </div>
  );
}


