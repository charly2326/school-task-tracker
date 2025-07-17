import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useTasksForDate(date: string) {
  return useQuery({
    queryKey: ["tasks", date],
    queryFn: async () => {
      const q = query(collection(db, "tasks"), where("dueDate", "==", date));
      const snapshot = await getDocs(q);
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));

      const subjectsSnapshot = await getDocs(collection(db, "subjects"));
      const subjects = subjectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return tasks.map((task) => {
        const subject = subjects.find((s) => s.id === task.subjectId);
        return { ...task, subject };
      });
    },
  });
}

