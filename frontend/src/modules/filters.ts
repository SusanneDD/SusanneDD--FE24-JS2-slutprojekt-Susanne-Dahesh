// filters.ts
import { Task } from "./models";

export type FilterOptions = {
  role: string; // "all" | "UX" | "Frontend" | "Backend"
  alpha: "none" | "az" | "za";
  date: "none" | "newest" | "oldest";
};

export function applyFilters(tasks: Task[], filters: FilterOptions): Task[] {
  let result = [...tasks];

  // Filter by role
  if (filters.role !== "all") {
    result = result.filter(task => task.role === filters.role);
  }

  // Sort by title (alphabetical)
  if (filters.alpha === "az") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.alpha === "za") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Sort by date
  if (filters.date === "newest") {
    result.sort((a, b) => b.timestamp - a.timestamp);
  } else if (filters.date === "oldest") {
    result.sort((a, b) => a.timestamp - b.timestamp);
  }

  return result;
}
