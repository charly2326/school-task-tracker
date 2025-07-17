import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getSubjectIcon } from "@/lib/subjects";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import type { Subject, InsertTask } from "@shared/schema";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  selectedDate: string;
}

export function TaskModal({ isOpen, onClose, subjects, selectedDate }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [dueDate, setDueDate] = useState(selectedDate);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setDueDate(selectedDate);
  }, [selectedDate]);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSubjectId("");
    setDueDate(selectedDate);
    onClose();
  };

  const createTaskMutation = useMutation({
    mutationFn: async (data: InsertTask) => {
      const numericSubjectId = Number(data.subjectId);
      const subjectExists = subjects.some(s => s.id === numericSubjectId);

      if (!subjectExists) {
        throw new Error("La asignatura seleccionada no existe");
      }

      const taskData = {
        title: data.title.trim(),
        description: data.description?.trim() || null,
        subjectId: numericSubjectId,
        dueDate: Timestamp.fromDate(new Date(data.dueDate)),
        completed: false,
        createdAt: Timestamp.now(),
        // Incluir datos básicos del subject para evitar nulls
        subject: subjects.find(s => s.id === numericSubjectId) || {
          id: numericSubjectId,
          name: "Asignatura desconocida",
          color: "#CCCCCC",
          icon: "Book"
        }
      };

      const docRef = await addDoc(collection(db, "tasks"), taskData);
      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({ title: "¡Tarea creada!", description: "Nueva tarea agregada 🎉" });
      handleClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear la tarea",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !subjectId || !dueDate) {
      toast({
        title: "Campos requeridos",
        description: "Completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    createTaskMutation.mutate({
      title: title.trim(),
      description: description.trim(),
      subjectId: Number(subjectId),
      dueDate,
      completed: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex justify-between">
            Nueva Tarea
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
            className="text-black"
            required
          />

          <Select
            value={subjectId}
            onValueChange={setSubjectId}
          >
            <SelectTrigger className="text-black">
              <SelectValue placeholder="Seleccionar asignatura" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => {
                const Icon = getSubjectIcon(subject.icon);
                return (
                  <SelectItem
                    key={subject.id}
                    value={subject.id.toString()}
                    data-numeric-id={subject.id}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span>{subject.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            className="text-black"
          />

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-black"
            required
          />

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              {createTaskMutation.isPending ? "Creando..." : "Crear Tarea"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


