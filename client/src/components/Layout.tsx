import { ReactNode } from "react";
import { MobileFooterNav } from "./MobileFooterNav";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-20">
      {/* 🟣 Encabezado fijo estilo móvil */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b border-purple-200">
        {/* Logo y texto izquierdo */}
        <div className="flex items-center space-x-3">
          <img src="/icon-192.svg" alt="icono" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-bold text-violet-600">MiSemana</h1>
            <p className="text-xs text-gray-500">¡Organiza tu semana escolar!</p>
          </div>
        </div>

        {/* Botón de menú ☰ (opcional funcionalidad futura) */}
        <button className="text-violet-600 text-2xl">☰</button>
      </header>

      {/* 📄 Contenido principal */}
      <main className="p-4">{children}</main>

      {/* 📌 Pie de página */}
      <footer className="bg-gray-200 text-center text-sm p-2 mt-10 sm:block hidden">
        © {new Date().getFullYear()} Hecho por Charly
      </footer>

      {/* 📱 Barra inferior móvil */}
      <MobileFooterNav />
    </div>
  );
}

