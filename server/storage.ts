import { subjects, tasks, type Subject, type Task, type InsertSubject, type InsertTask, type TaskWithSubject } from "@shared/schema";

export interface IStorage {
  // Subjects
  getSubjects(): Promise<Subject[]>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  
  // Tasks
  getTasks(): Promise<TaskWithSubject[]>;
  getTasksByDate(date: string): Promise<TaskWithSubject[]>;
  createTask(task: InsertTask): Promise<TaskWithSubject>;
  updateTask(id: number, updates: Partial<Task>): Promise<TaskWithSubject>;
  deleteTask(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private subjects: Map<number, Subject>;
  private tasks: Map<number, Task>;
  private currentSubjectId: number;
  private currentTaskId: number;

  constructor() {
    this.subjects = new Map();
    this.tasks = new Map();
    this.currentSubjectId = 1;
    this.currentTaskId = 1;
    
    // Initialize with default subjects
    this.initializeSubjects();
  }

  private initializeSubjects() {
    const defaultSubjects: InsertSubject[] = [
      { name: "Matemáticas", color: "hsl(0, 84%, 60%)", icon: "calculator" },
      { name: "Ciencias Naturales", color: "hsl(217, 91%, 60%)", icon: "microscope" },
      { name: "Lengua", color: "hsl(262, 83%, 58%)", icon: "book" },
      { name: "Historia", color: "hsl(142, 76%, 36%)", icon: "landmark" },
      { name: "Arte", color: "hsl(32, 95%, 44%)", icon: "palette" },
      { name: "Educación Física", color: "hsl(328, 86%, 70%)", icon: "dumbbell" },
    ];

    defaultSubjects.forEach(subject => {
      const id = this.currentSubjectId++;
      this.subjects.set(id, { ...subject, id });
    });
  }

  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = this.currentSubjectId++;
    const subject: Subject = { ...insertSubject, id };
    this.subjects.set(id, subject);
    return subject;
  }

  async getTasks(): Promise<TaskWithSubject[]> {
    return Array.from(this.tasks.values()).map(task => ({
      ...task,
      subject: this.subjects.get(task.subjectId)!
    }));
  }

  async getTasksByDate(date: string): Promise<TaskWithSubject[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.dueDate === date)
      .map(task => ({
        ...task,
        subject: this.subjects.get(task.subjectId)!
      }));
  }

  async createTask(insertTask: InsertTask): Promise<TaskWithSubject> {
    const id = this.currentTaskId++;
    const task: Task = {
      ...insertTask,
      id,
      createdAt: new Date().toISOString(),
      description: insertTask.description || null,
      completed: insertTask.completed || false,
    };
    this.tasks.set(id, task);
    
    return {
      ...task,
      subject: this.subjects.get(task.subjectId)!
    };
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<TaskWithSubject> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    const updatedTask = { ...existingTask, ...updates };
    this.tasks.set(id, updatedTask);
    
    return {
      ...updatedTask,
      subject: this.subjects.get(updatedTask.subjectId)!
    };
  }

  async deleteTask(id: number): Promise<void> {
    if (!this.tasks.has(id)) {
      throw new Error(`Task with id ${id} not found`);
    }
    this.tasks.delete(id);
  }
}

export const storage = new MemStorage();
