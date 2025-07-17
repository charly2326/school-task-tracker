import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Circle, Clock, AlertTriangle, Trash2, Plus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { TaskWithSubject } from "@shared/schema";
import { getSubjectIcon } from "@/lib/subjects";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: TaskWithSubject[];
  selectedDate: Date;
  onAddTask: () => void;
}

const DEFAULT_SUBJECT = {
  id: 0,
  name: "Sin asignatura",
  color: "#CCCCCC",
  icon: "Book"
};

export function TaskList({ tasks, selectedDate, onAddTask }: TaskListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
      return apiRequest("PATCH", `/api/tasks/${taskId}`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "¡Buen trabajo!",
        description: "Tarea actualizada correctamente 🎉",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la tarea",
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      return apiRequest("DELETE", `/api/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Tarea eliminada",
        description: "La tarea se eliminó correctamente",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      });
    },
  });

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    
    if (target.toDateString() === today.toDateString()) return "Hoy";
    if (target.toDateString() === tomorrow.toDateString()) return "Mañana";
    return target.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getTaskStatus = (task: TaskWithSubject) => {
    if (task.completed) {
      return {
        icon: CheckCircle,
        text: "Completado",
        className: "text-green-600 bg-green-50",
      };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    
    if (due < today) {
      return {
        icon: AlertTriangle,
        text: "Atrasado",
        className: "text-red-600 bg-red-50",
      };
    }
    
    return {
      icon: Clock,
      text: "Pendiente",
      className: "text-orange-600 bg-orange-50",
    };
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom-4 duration-500">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <ListTodo className="text-blue-500 mr-3 w-5 h-5" />
            Tareas para {formatDate(selectedDate)}
          </h2>
        </header>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¡No hay tareas programadas!
            </h3>
            <p className="text-gray-600 mb-4">
              {formatDate(selectedDate) === "Hoy"
                ? "¿Quieres agregar una nueva tarea para hoy?"
                : "Puedes relajarte o adelantar trabajo"}
            </p>
            <Button
              onClick={onAddTask}
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar tarea
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => {
              // ✅ Verificación definitiva
              if (!task.subject) {
                if (process.env.NODE_ENV === "development") {
                  console.error("Tarea corrupta detectada:", task.id, task);
                }
                return null; // O podrías renderizar un fallback UI
              }

              const subject = task.subject;
              const SubjectIcon = getSubjectIcon(subject.icon);
              const status = getTaskStatus(task);
              const isPending = toggleTaskMutation.isPending && 
                toggleTaskMutation.variables?.taskId === task.id;

              return (
                <li
                  key={task.id}
                  className={cn(
                    "group flex items-start p-4 rounded-xl border transition-all duration-200",
                    "hover:shadow-md",
                    status.className,
                    task.completed ? "opacity-80" : "opacity-100",
                    isPending ? "animate-pulse" : ""
                  )}
                  style={{
                    borderLeftColor: subject.color,
                    borderLeftWidth: "4px",
                  }}
                >
                  <button
                    onClick={() => toggleTaskMutation.mutate({
                      taskId: task.id,
                      completed: !task.completed
                    })}
                    disabled={toggleTaskMutation.isPending}
                    className={cn(
                      "flex-shrink-0 mr-4 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      "border-2 hover:opacity-90",
                      task.completed
                        ? `bg-[${subject.color}] border-[${subject.color}] text-white`
                        : `border-[${subject.color}] hover:bg-[${subject.color}] hover:bg-opacity-10`
                    )}
                    aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completado"}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" style={{ color: subject.color }} />
                    )}
                  </button>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <SubjectIcon className="w-4 h-4 flex-shrink-0" style={{ color: subject.color }} />
                      <span className="text-sm font-medium truncate" style={{ color: subject.color }}>
                        {subject.name}
                      </span>
                    </div>
                    <h3 className={cn("font-medium text-gray-900 truncate", task.completed && "line-through")}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>Entrega: {formatDate(new Date(task.dueDate))}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <status.icon className={cn("w-3 h-3 mr-1", status.className.split(" ")[0])} />
                        <span className={status.className.split(" ")[0]}>{status.text}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTaskMutation.mutate(task.id)}
                    disabled={deleteTaskMutation.isPending}
                    className={cn(
                      "flex-shrink-0 ml-4 p-2 rounded-lg transition-colors",
                      "text-gray-400 hover:text-red-500 hover:bg-red-50",
                      "opacity-0 group-hover:opacity-100 focus:opacity-100"
                    )}
                    aria-label="Eliminar tarea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}



