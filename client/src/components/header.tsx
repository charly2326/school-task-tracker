import { GraduationCap, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddTask: () => void;
}

export function Header({ onAddTask }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b-4 border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Título */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MiSemana🐸</h1>
              <p className="text-sm text-gray-600">¡Organiza tu semana escolar!</p>
            </div>
          </div>

          {/* Botones + Usuario */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onAddTask}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-3 py-2 rounded-md"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="text-white w-5 h-5" />
            </div>
            <span className="hidden sm:block text-lg font-medium text-gray-700">Ana García</span>
          </div>
        </div>
      </div>
    </header>
  );
}

