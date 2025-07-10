import { Trophy, PieChart, Zap, Calendar, Bell, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Subject, TaskWithSubject } from "@shared/schema";
import { getSubjectIcon } from "@/lib/subjects";

interface SubjectSidebarProps {
  subjects: Subject[];
  allTasks: TaskWithSubject[];
}

export function SubjectSidebar({ subjects, allTasks }: SubjectSidebarProps) {
  function getSubjectStats(subjectId: number) {
    const subjectTasks = allTasks.filter(task => task.subject.id === subjectId);
    const pendingTasks = subjectTasks.filter(task => !task.completed).length;
    
    if (pendingTasks === 0) {
      return "¡Al día!";
    }
    
    return `${pendingTasks} tarea${pendingTasks > 1 ? 's' : ''} pendiente${pendingTasks > 1 ? 's' : ''}`;
  }

  function getWeekProgress() {
    const completedTasks = allTasks.filter(task => task.completed).length;
    const totalTasks = allTasks.length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const remaining = totalTasks - completedTasks;
    
    return { completed: completedTasks, total: totalTasks, percentage, remaining };
  }

  const progress = getWeekProgress();

  return (
    <div className="space-y-6">
      {/* Subject Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-4 duration-500">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <PieChart className="text-purple-500 mr-3" />
          Mis Asignaturas
        </h3>
        
        <div className="space-y-3">
          {subjects.map((subject) => {
            const SubjectIcon = getSubjectIcon(subject.icon);
            const stats = getSubjectStats(subject.id);
            
            return (
              <div
                key={subject.id}
                className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:shadow-sm"
                style={{ backgroundColor: `${subject.color}15` }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{subject.name}</div>
                    <div className="text-xs text-gray-500">{stats}</div>
                  </div>
                </div>
                <SubjectIcon className="w-5 h-5" style={{ color: subject.color }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white animate-in slide-in-from-right-4 duration-700">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Trophy className="mr-3" />
          Mi Progreso
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{progress.completed}</div>
          <div className="text-sm opacity-90 mb-4">tareas completadas esta semana</div>
          
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          
          <div className="text-sm opacity-90">
            {progress.remaining > 0 ? (
              <>
                <span className="font-semibold">{progress.remaining}</span> tarea
                {progress.remaining > 1 ? 's' : ''} por completar
              </>
            ) : (
              "¡Todas las tareas completadas! 🎉"
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-4 duration-1000">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Zap className="text-yellow-500 mr-3" />
          Acciones Rápidas
        </h3>
        
        <div className="space-y-3">
          <Button className="w-full p-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Ver próximas entregas</span>
          </Button>
          
          <Button className="w-full p-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Configurar recordatorio</span>
          </Button>
          
          <Button className="w-full p-3 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Descargar horario</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
