import { tasksRef } from "./firebase";
import { push, onValue, update, child, remove } from "firebase/database";
import { Task } from "./models";
import { applyFilters, FilterOptions } from "./filters";

export const currentFilters: FilterOptions = {
  role: "all",
  alpha: "none",
  date: "none"
};

export function setupTaskListeners() {
  document.getElementById("add-task-btn")!.addEventListener("click", () => {
    const title = (document.getElementById("task-title") as HTMLInputElement).value;
    const desc = (document.getElementById("task-desc") as HTMLTextAreaElement).value;
    const role = (document.getElementById("task-role") as HTMLSelectElement).value;
    const memberSelect = document.getElementById("task-member") as HTMLSelectElement;
    const assigned = memberSelect.value;
    const assignedName = memberSelect.options[memberSelect.selectedIndex]?.text;

    if (!title || !desc || !role || !assigned) {
      alert("Fyll i alla fält och välj en medlem med rätt roll.");
      return;
    }

    push(tasksRef, {
      title,
      description: desc,
      role,
      assigned,
      assignedName,
      status: "new",
      timestamp: Date.now()
    });

    // Rensa inputfält
    (document.getElementById("task-title") as HTMLInputElement).value = "";
    (document.getElementById("task-desc") as HTMLTextAreaElement).value = "";
  });
}

export function renderTasks() {
  onValue(tasksRef, snapshot => {
    const allTasks: Task[] = [];

    snapshot.forEach(childSnap => {
      const task = childSnap.val() as Task;
      task.key = childSnap.key!;
      allTasks.push(task);
    });

    const filtered = applyFilters(allTasks, currentFilters);

    document.getElementById("new-tasks")!.innerHTML = "";
    document.getElementById("in-progress-tasks")!.innerHTML = "";
    document.getElementById("done-tasks")!.innerHTML = "";

    for (const task of filtered) {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      const formattedTime = task.timestamp
        ? new Date(task.timestamp).toLocaleString("sv-SE", {
            dateStyle: "short",
            timeStyle: "short"
          })
        : "Okänt datum";

      taskDiv.innerHTML = `
        <strong>${task.title}</strong><br/>
        ${task.description}<br/>
        <div class="meta">
          ${task.assignedName} – ${task.role}<br/>
          Skapad: ${formattedTime}
        </div>
      `;

      if (task.status === "new") {
        const startBtn = document.createElement("button");
        startBtn.textContent = "➡ Starta";
        startBtn.onclick = () => updateTaskStatus(task.key!, "inProgress");
        startBtn.style.marginTop = "0.5rem";
        taskDiv.appendChild(startBtn);
      } else if (task.status === "inProgress") {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔ Klart";
        doneBtn.onclick = () => updateTaskStatus(task.key!, "done");
        doneBtn.style.marginTop = "0.5rem";
        taskDiv.appendChild(doneBtn);
      } else if (task.status === "done") {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Ta bort";
        deleteBtn.onclick = () => deleteTask(task.key!);
        deleteBtn.style.marginTop = "0.5rem";
        deleteBtn.style.backgroundColor = "#aa3333";
        deleteBtn.style.color = "#fff";
        taskDiv.appendChild(deleteBtn);
      }

      getColumnByStatus(task.status).appendChild(taskDiv);
    }
  });
}

function updateTaskStatus(taskId: string, newStatus: "new" | "inProgress" | "done") {
  update(child(tasksRef, taskId), { status: newStatus });
}

function deleteTask(taskId: string) {
  remove(child(tasksRef, taskId));
}

function getColumnByStatus(status: string): HTMLElement {
  switch (status) {
    case "inProgress":
      return document.getElementById("in-progress-tasks")!;
    case "done":
      return document.getElementById("done-tasks")!;
    default:
      return document.getElementById("new-tasks")!;
  }
}

