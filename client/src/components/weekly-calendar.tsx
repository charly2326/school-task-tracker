import { Calendar } from "lucide-react";
import type { TaskWithSubject } from "@shared/schema";
import { getSubjectIcon } from "@/lib/subjects";

interface WeeklyCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  allTasks: TaskWithSubject[];
}

export function WeeklyCalendar({ selectedDate, onDateSelect, allTasks }: WeeklyCalendarProps) {
  const today = new Date();
  const currentWeek = getWeekDays(today);
  const dayNames = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

function getWeekDays(date: Date) {
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // domingo → -6, lunes → 0, martes → -1, etc.
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });
}


  function getTasksForDate(date: string) {
    return allTasks.filter(task => task.dueDate === date);
  }

  function formatWeekRange(days: Date[]) {
    const [start, end] = [days[0], days[6]];
    const month = start.toLocaleDateString('es', { month: 'long' });
    return `Semana del ${start.getDate()}-${end.getDate()} ${month}`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center mb-4">
        <Calendar className="text-purple-500 mr-3 w-5 h-5" />
        <h2 className="text-xl font-bold text-gray-900">
          {formatWeekRange(currentWeek)}
        </h2>
      </header>
      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((day, index) => {
          const dateStr = day.toISOString().split('T')[0];
          const isSelected = selectedDate.toDateString() === day.toDateString();
          const isWeekend = index >= 5;
          const tasksForDay = getTasksForDate(dateStr);
          const uniqueSubjects = new Set(tasksForDay.map(task => task.subject.id));

          return (
            <div key={dateStr} className="flex flex-col items-center">
              <button
                onClick={() => !isWeekend && onDateSelect(day)}
                className={`w-full p-2 rounded-xl font-medium mb-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isWeekend
                    ? 'bg-gray-50 text-gray-400'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                } ${isSelected ? 'ring-2 ring-blue-300' : ''}`}
                disabled={isWeekend}
                aria-label={`Seleccionar día ${dayNames[index]} ${day.getDate()}`}
              >
                <div className="text-xs sm:text-sm">{dayNames[index]}</div>
                <div className="text-base font-bold">{day.getDate()}</div>
              </button>
              <div className="min-h-[60px] flex flex-col items-center justify-center w-full">
                {isWeekend ? (
                  <span className="text-xs text-gray-400">Fin de semana</span>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-center gap-1 mb-1">
                      {Array.from(uniqueSubjects).slice(0, 3).map(subjectId => {
                        const task = tasksForDay.find(t => t.subject.id === subjectId);
                        return task ? (
                          <div
                            key={subjectId}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: task.subject.color }}
                            title={task.subject.name}
                          />
                        ) : null;
                      })}
                    </div>
                    {uniqueSubjects.size > 3 && (
                      <span className="text-xs text-gray-500">
                        +{uniqueSubjects.size - 3}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


