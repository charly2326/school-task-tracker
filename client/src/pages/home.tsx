// src/pages/home.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
// import { WeeklyCalendar } from "@/components/weekly-calendar";
// import { TaskList } from "@/components/task-list";
// import { SubjectSidebar } from "@/components/subject-sidebar";
// import { TaskModal } from "@/components/task-modal";
import { fetchSubjectsFromFirestore } from "@/lib/subjects";
import { fetchTasksByDate, fetchAllTasksWithSubjects } from "@/lib/tasks";
import type { TaskWithSubject, Subject } from "@shared/schema";
import Layout from "../components/Layout";

import Bienvenida from "@/components/Bienvenida";
import SaldoDisponible from "@/components/SaldoDisponible";
import MetasAhorro from "@/components/MetasAhorro";





export default function Home({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // 🔹 Obtener asignaturas
  const { data: subjects = [], isLoading: subjectsLoading } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: fetchSubjectsFromFirestore,
  });

  // 🔹 Obtener todas las tareas con asignaturas (para WeeklyCalendar y Sidebar)
  const { data: allTasks = [], isLoading: tasksLoading } = useQuery<TaskWithSubject[]>({
    queryKey: ["tasks/all"],
    queryFn: fetchAllTasksWithSubjects,
  });

  // 🔹 Obtener tareas del día seleccionado
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const { data: todayTasks = [], isLoading: loadingTodayTasks } = useQuery<TaskWithSubject[]>({
    queryKey: ["tasks", formattedDate],
    queryFn: () => fetchTasksByDate(formattedDate),
  });

  if (subjectsLoading || tasksLoading || loadingTodayTasks) {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">


        <Bienvenida />

        <SaldoDisponible saldo={2500} />

        <MetasAhorro />


          {/* 🔹 SECCIÓN COMENTADA: Calendario semanal */}
          {/*
          <div className="space-y-6">
            <WeeklyCalendar
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                const fixed = new Date(date);
                fixed.setHours(12, 0, 0, 0);
                setSelectedDate(fixed);
              }}
              allTasks={allTasks}
            />
          </div>
          */}




          {/* 🔹 SECCIÓN COMENTADA: Lista de tareas y sidebar */}
          {/*
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TaskList
                tasks={todayTasks}
                selectedDate={selectedDate}
                onAddTask={() => setIsTaskModalOpen(true)}
              />
            </div>
            <div className="lg:col-span-1">
              <SubjectSidebar subjects={subjects} allTasks={allTasks} />
            </div>
          </div>
          */}
        </div>
      </div>

      {/* 🔹 SECCIÓN COMENTADA: Modal de tareas */}
      {/*
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        subjects={subjects}
        selectedDate={formattedDate}
      />
      */}
    </Layout>
  );
}



