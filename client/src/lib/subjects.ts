import { Calculator, Microscope, Book, Landmark, Palette, Dumbbell } from "lucide-react";

export const subjectIcons = {
  calculator: Calculator,
  microscope: Microscope,
  book: Book,
  landmark: Landmark,
  palette: Palette,
  dumbbell: Dumbbell,
} as const;

export function getSubjectIcon(iconName: string) {
  return subjectIcons[iconName as keyof typeof subjectIcons] || Book;
}

export const subjectColors = {
  math: "hsl(0, 84%, 60%)",
  science: "hsl(217, 91%, 60%)",
  language: "hsl(262, 83%, 58%)",
  history: "hsl(142, 76%, 36%)",
  art: "hsl(32, 95%, 44%)",
  pe: "hsl(328, 86%, 70%)",
} as const;
