import { setupMemberListeners, updateAssignableMembers } from "./modules/memberHandlers";
import { renderTasks, setupTaskListeners, currentFilters } from "./modules/tasksHandlers";

// === Händelse: Uppdatera tillgängliga medlemmar vid rollbyte ===
document.getElementById("task-role")!.addEventListener("change", updateAssignableMembers);

// === Initiera eventlyssnare för medlem och uppgift ===
setupMemberListeners(updateAssignableMembers);
setupTaskListeners();

// === Filtreringsknappar ===
document.querySelectorAll(".filter-role").forEach(btn => {
  btn.addEventListener("click", () => {
    const role = (btn as HTMLElement).dataset.role!;
    currentFilters.role = role;
    renderTasks();
  });
});

document.querySelectorAll(".filter-alpha").forEach(btn => {
  btn.addEventListener("click", () => {
    const sort = (btn as HTMLElement).dataset.sort!;
    currentFilters.alpha = sort === "az" ? "az" : "za";
    renderTasks();
  });
});

document.querySelectorAll(".filter-date").forEach(btn => {
  btn.addEventListener("click", () => {
    const sort = (btn as HTMLElement).dataset.sort!;
    currentFilters.date = sort === "newest" ? "newest" : "oldest";
    renderTasks();
  });
});

// === Första rendering ===
renderTasks();
