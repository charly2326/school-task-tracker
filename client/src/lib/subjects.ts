import {
  Calculator,
  Microscope,
  Book,
  Landmark,
  Palette,
  Dumbbell,
} from "lucide-react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Íconos disponibles por nombre
export const subjectIcons = {
  calculator: Calculator,
  microscope: Microscope,
  book: Book,
  landmark: Landmark,
  palette: Palette,
  dumbbell: Dumbbell,
} as const;

// Función para obtener el ícono, o usar Book por defecto
export function getSubjectIcon(iconName: string) {
  return subjectIcons[iconName as keyof typeof subjectIcons] || Book;
}

// Colores por asignatura (puedes usarlos en los datos de Firestore o UI)
export const subjectColors = {
  math: "hsl(0, 84%, 60%)",
  science: "hsl(217, 91%, 60%)",
  language: "hsl(262, 83%, 58%)",
  history: "hsl(142, 76%, 36%)",
  art: "hsl(32, 95%, 44%)",
  pe: "hsl(328, 86%, 70%)",
} as const;

// Lista base de asignaturas predefinidas
export const subjects = [
  {
    id: "math",
    name: "Matemáticas",
    icon: "calculator",
    color: subjectColors.math,
  },
  {
    id: "science",
    name: "Ciencias",
    icon: "microscope",
    color: subjectColors.science,
  },
  {
    id: "language",
    name: "Lengua",
    icon: "book",
    color: subjectColors.language,
  },
  {
    id: "history",
    name: "Historia",
    icon: "landmark",
    color: subjectColors.history,
  },
  {
    id: "art",
    name: "Arte",
    icon: "palette",
    color: subjectColors.art,
  },
  {
    id: "pe",
    name: "Educación Física",
    icon: "dumbbell",
    color: subjectColors.pe,
  },
];

// Tipo inferido para una asignatura local (estática)
export type StaticSubject = typeof subjects[number];

// Tipo flexible para Firestore
export type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

// 🔥 Función para obtener asignaturas desde Firestore
export async function fetchSubjectsFromFirestore(): Promise<Subject[]> {
  const snapshot = await getDocs(collection(db, "subjects"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Subject[];
}

