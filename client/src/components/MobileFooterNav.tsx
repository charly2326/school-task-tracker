import { Home, Calendar, Plus, User, Wallet } from "lucide-react";

export function MobileFooterNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-between items-center h-16 z-50">
      
      {/* Botón: Inicio */}
      <button className="text-violet-600 hover:text-violet-800 flex-1 flex justify-center">
        <Home className="w-6 h-6" />
      </button>

      {/* Botón: Calendario */}
      <button className="text-violet-600 hover:text-violet-800 flex-1 flex justify-center">
        <Calendar className="w-6 h-6" />
      </button>

      {/* Botón flotante centrado */}
      <div className="flex-1 flex justify-center relative">
        <button className="absolute -top-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Botón: Wallet */}
      <button className="text-violet-600 hover:text-violet-800 flex-1 flex justify-center">
        <Wallet className="w-6 h-6" />
      </button>

      {/* Botón: Usuario */}
      <button className="text-violet-600 hover:text-violet-800 flex-1 flex justify-center">
        <User className="w-6 h-6" />
      </button>
      
    </nav>
  );
}

