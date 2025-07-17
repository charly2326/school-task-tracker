import { ReactNode } from "react";
import { MobileFooterNav } from "./MobileFooterNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 🟣 Encabezado fijo estilo móvil */}
      <header className="pt-6 px-4 pb-3 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/icon-192.svg" alt="icono" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-bold text-violet-600">Mi🦊Semana🐦</h1>
            <p className="text-xs text-gray-500">¡Organiza tu semana escolar!</p>
          </div>
        </div>
        <button className="text-violet-600 text-2xl">☰</button>
      </header>

      {/* 📄 Contenido principal con espacio para el footer móvil */}
      <main className="flex-1 p-4 pb-24">{children}</main>

      {/* 📌 Footer solo visible en pantallas grandes */}
      <footer className="bg-gray-200 text-center text-sm p-2 mt-10 hidden sm:block">
        © {new Date().getFullYear()} Hecho por Charly
      </footer>

      {/* 📱 Footer móvil fijo */}
      <MobileFooterNav />
    </div>
  );
}


