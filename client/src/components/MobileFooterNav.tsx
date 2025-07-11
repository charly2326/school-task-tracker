import { Home, Calendar, Plus, User } from "lucide-react";

export function MobileFooterNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center h-16 sm:hidden z-50">
      <button className="text-violet-600 hover:text-violet-800">
        <Home className="w-6 h-6" />
      </button>
      <button className="text-violet-600 hover:text-violet-800">
        <Calendar className="w-6 h-6" />
      </button>
      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-full shadow-md -mt-6">
        <Plus className="w-5 h-5" />
      </button>
      <button className="text-violet-600 hover:text-violet-800">
        <User className="w-6 h-6" />
      </button>
    </nav>
  );
}

