import { Calendar } from "lucide-react";
import type { TaskWithSubject } from "@shared/schema";
import { getSubjectIcon } from "@/lib/subjects";

interface WeeklyCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  allTasks: TaskWithSubject[];
}

export function WeeklyCalendar({ selectedDate, onDateSelect, allTasks }: WeeklyCalendarProps) {
  const today = new Date();
  const currentWeek = getWeekDays(today);

  function getWeekDays(date: Date) {
    const days = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  }

  function getTasksForDate(date: string) {
    return allTasks.filter(task => task.dueDate === date);
  }

  function formatWeekRange(days: Date[]) {
    const start = days[0];
    const end = days[6];
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleDateString('es', { month: 'long' });
    return `Semana del ${startDay}-${endDay} ${month}`;
  }

  const dayNames = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Calendar className="text-purple-500 mr-3" />
        {formatWeekRange(currentWeek)}
      </h2>
      
      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((day, index) => {
          const dateStr = day.toISOString().split('T')[0];
          const isSelected = dateStr === selectedDate;
          const isWeekend = index >= 5;
          const tasksForDay = getTasksForDate(dateStr);
          const uniqueSubjects = new Set(tasksForDay.map(task => task.subject.id));
          
          return (
            <div key={dateStr} className="text-center">
              <button
                onClick={() => onDateSelect(dateStr)}
                className={`w-full p-3 rounded-xl font-medium mb-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : isWeekend
                    ? 'bg-gray-50 text-gray-400 cursor-default'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
                disabled={isWeekend}
              >
                <div className="text-sm">{dayNames[index]}</div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </button>
              
              {!isWeekend && (
                <div className="flex flex-col space-y-1 min-h-[60px]">
                  {Array.from(uniqueSubjects).slice(0, 3).map(subjectId => {
                    const task = tasksForDay.find(t => t.subject.id === subjectId);
                    if (!task) return null;
                    
                    return (
                      <div
                        key={subjectId}
                        className="w-3 h-3 rounded-full mx-auto"
                        style={{ backgroundColor: task.subject.color }}
                        title={task.subject.name}
                      />
                    );
                  })}
                  {uniqueSubjects.size > 3 && (
                    <div className="text-xs text-gray-500">+{uniqueSubjects.size - 3}</div>
                  )}
                </div>
              )}
              
              {isWeekend && (
                <div className="text-xs text-gray-400 min-h-[60px] flex items-center justify-center">
                  Fin de semana
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
