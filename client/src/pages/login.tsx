// src/pages/login.tsx
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  // Función de login ficticia (para redirigir a la home)
  const handleLogin = () => {
    console.log("🔑 Login simulado");
    setLocation("/"); // Redirige a la página principal
  };

  useEffect(() => {
    console.log("📄 LoginPage cargada");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
      <p className="text-gray-600">Inicia sesión para continuar</p>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </button>

      <div className="text-xs text-gray-400 text-center">
        Plataforma: 🌐 Web / 📱 App simulada
      </div>
    </div>
  );
}
