import { db } from "./firebase";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import type { TaskWithSubject } from "@shared/schema";

export async function fetchTasksByDate(date: string): Promise<TaskWithSubject[]> {
  try {
    const targetDate = Timestamp.fromDate(new Date(date));
    const q = query(
      collection(db, "tasks"),
      where("dueDate", "==", targetDate)
    );

    const [tasksSnapshot, subjectsSnapshot] = await Promise.all([
      getDocs(q),
      getDocs(collection(db, "subjects"))
    ]);

    // Crear mapa de subjects para acceso rápido
    const subjectsMap = new Map(
      subjectsSnapshot.docs.map(doc => [
        Number(doc.id),
        { id: Number(doc.id), ...doc.data() }
      ])
    );

    return tasksSnapshot.docs.map(doc => {
      const data = doc.data();
      const subjectId = data.subjectId !== undefined ? Number(data.subjectId) : null;

      // Obtener subject o usar valor por defecto
      const subject = subjectId !== null 
        ? subjectsMap.get(subjectId) || {
            id: subjectId || 0,
            name: "Asignatura desconocida",
            color: "#CCCCCC",
            icon: "Book"
          }
        : {
            id: 0,
            name: "Sin asignatura",
            color: "#CCCCCC",
            icon: "Book"
          };

      return {
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        dueDate: data.dueDate?.toDate() || new Date(),
        completed: data.completed || false,
        createdAt: data.createdAt?.toDate() || new Date(),
        subjectId: subjectId || 0,
        subject // ✅ Siempre tendrá un objeto válido
      };
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export async function fetchAllTasksWithSubjects(): Promise<TaskWithSubject[]> {
  const tasksSnapshot = await getDocs(collection(db, "tasks"));
  const subjectsSnapshot = await getDocs(collection(db, "subjects"));

  const subjectsMap = new Map(
    subjectsSnapshot.docs.map(doc => [
      Number(doc.id),
      { id: Number(doc.id), ...doc.data() }
    ])
  );

  return tasksSnapshot.docs.map(doc => {
    const data = doc.data();
    const subjectId = data.subjectId !== undefined ? Number(data.subjectId) : null;

    const subject = subjectId !== null
      ? subjectsMap.get(subjectId) || {
          id: subjectId || 0,
          name: "Asignatura desconocida",
          color: "#CCCCCC",
          icon: "Book"
        }
      : {
          id: 0,
          name: "Sin asignatura",
          color: "#CCCCCC",
          icon: "Book"
        };

    return {
      id: doc.id,
      ...data,
      subjectId: subjectId || 0,
      subject,
      dueDate: data.dueDate?.toDate() || new Date(),
      createdAt: data.createdAt?.toDate() || new Date()
    };
  });
}
