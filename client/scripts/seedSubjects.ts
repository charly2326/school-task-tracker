// scripts/seedSubjects.ts

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUHZK-5B6t_nCiNLU7KO3aX6yu1Wn2WEE",
  authDomain: "school-youni.firebaseapp.com",
  projectId: "school-youni",
  storageBucket: "school-youni.appspot.com",
  messagingSenderId: "288320831466",
  appId: "1:288320831466:web:f254e1b78a1344d4f73c93",
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista de asignaturas con ID, nombre, ícono y color
const subjects = [
  { id: "math", name: "Matemáticas", icon: "calculator", color: "hsl(0, 84%, 60%)" },
  { id: "science", name: "Ciencias", icon: "microscope", color: "hsl(217, 91%, 60%)" },
  { id: "language", name: "Lengua", icon: "book", color: "hsl(262, 83%, 58%)" },
  { id: "history", name: "Historia", icon: "landmark", color: "hsl(142, 76%, 36%)" },
  { id: "art", name: "Arte", icon: "palette", color: "hsl(32, 95%, 44%)" },
  { id: "pe", name: "Educación Física", icon: "dumbbell", color: "hsl(328, 86%, 70%)" },
];

// Función principal para insertar las asignaturas
async function seedSubjects() {
  for (const subject of subjects) {
    // Usa el `subject.id` como ID del documento
    await setDoc(doc(db, "subjects", subject.id), subject);
    console.log(`✅ Asignatura añadida: ${subject.name}`);
  }
}

// Ejecuta el seeding
seedSubjects()
  .then(() => {
    console.log("🎉 Todas las asignaturas fueron insertadas.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error al insertar asignaturas:", error);
    process.exit(1);
  });



