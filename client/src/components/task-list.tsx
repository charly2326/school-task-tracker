import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Circle, Clock, AlertTriangle, Trash2, Plus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { TaskWithSubject } from "@shared/schema";
import { getSubjectIcon } from "@/lib/subjects";

interface TaskListProps {
  tasks: TaskWithSubject[];
  selectedDate: string;
  onAddTask: () => void;
}

export function TaskList({ tasks, selectedDate, onAddTask }: TaskListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
      return apiRequest("PATCH", `/api/tasks/${taskId}`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/date"] });
      toast({
        title: "¡Buen trabajo!",
        description: "Tarea actualizada correctamente 🎉",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      return apiRequest("DELETE", `/api/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/date"] });
      toast({
        title: "Tarea eliminada",
        description: "La tarea se eliminó correctamente",
      });
    },
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    }
    
    return `${dayNames[date.getDay()]} ${date.getDate()}`;
  };

  const getStatusInfo = (task: TaskWithSubject) => {
    if (task.completed) {
      return {
        icon: CheckCircle,
        text: "¡Completado! Buen trabajo 🎉",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-500"
      };
    }
    
    const today = new Date().toISOString().split('T')[0];
    const isOverdue = task.dueDate < today;
    
    if (isOverdue) {
      return {
        icon: AlertTriangle,
        text: "Atrasado",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-500"
      };
    }
    
    return {
      icon: Clock,
      text: "Pendiente",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: `border-[${task.subject.color}]`
    };
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <ListTodo className="text-blue-500 mr-3" />
            Tareas de {formatDate(selectedDate)}
          </h2>
          <Button
            onClick={onAddTask}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hidden md:flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Tarea</span>
          </Button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¡No tienes tareas para hoy!</h3>
            <p className="text-gray-600 mb-4">Puedes relajarte o adelantar trabajo de otros días</p>
            <Button
              onClick={onAddTask}
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              Agregar nueva tarea
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const status = getStatusInfo(task);
              const SubjectIcon = getSubjectIcon(task.subject.icon);

              return (
                <div
                  key={task.id}
                  className={`flex items-center p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md ${
                    task.completed ? 'opacity-75 bg-green-50 border-green-500' : 
                    `${status.bgColor} border-l-4`
                  }`}
                  style={{ borderLeftColor: task.subject.color }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <button
                      onClick={() => toggleTaskMutation.mutate({
                        taskId: task.id,
                        completed: !task.completed
                      })}
                      disabled={toggleTaskMutation.isPending}
                      className={`w-8 h-8 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : `border-2 hover:bg-opacity-10 hover:text-white`
                      }`}
                      style={{
                        borderColor: task.subject.color,
                        backgroundColor: task.completed ? task.subject.color : 'transparent'
                      }}
                    >
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" style={{ color: task.subject.color }} />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-1">
                      <SubjectIcon className="w-4 h-4" style={{ color: task.subject.color }} />
                      <span className="text-sm font-medium" style={{ color: task.subject.color }}>
                        {task.subject.name}
                      </span>
                    </div>
                    <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Entrega: {formatDate(task.dueDate)}</span>
                      </div>
                      <div className={`flex items-center text-xs ${status.color}`}>
                        <status.icon className="w-3 h-3 mr-1" />
                        <span>{status.text}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <button
                      onClick={() => deleteTaskMutation.mutate(task.id)}
                      disabled={deleteTaskMutation.isPending}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
