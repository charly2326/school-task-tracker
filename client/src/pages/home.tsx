import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { TaskList } from "@/components/task-list";
import { SubjectSidebar } from "@/components/subject-sidebar";
import { TaskModal } from "@/components/task-modal";
import type { TaskWithSubject, Subject } from "@shared/schema";
import Layout from "../components/Layout";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { data: subjects = [], isLoading: subjectsLoading } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  const { data: allTasks = [], isLoading: tasksLoading } = useQuery<TaskWithSubject[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: todayTasks = [] } = useQuery<TaskWithSubject[]>({
    queryKey: ["/api/tasks/date", selectedDate],
  });

  if (subjectsLoading || tasksLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-xl font-semibold text-gray-600">Cargando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          allTasks={allTasks}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <TaskList
            tasks={todayTasks}
            selectedDate={selectedDate}
            onAddTask={() => setIsTaskModalOpen(true)}
          />

          <SubjectSidebar
            subjects={subjects}
            allTasks={allTasks}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        subjects={subjects}
        selectedDate={selectedDate}
      />
    </Layout>
  );
}

