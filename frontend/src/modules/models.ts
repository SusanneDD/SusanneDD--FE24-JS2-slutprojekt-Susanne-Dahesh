export class TaskClass {
  title: string;
  description: string;
  role: string;
  assigned: string;
  assignedName: string;
  status: "new" | "inProgress" | "done";
  timestamp: number;
  key?: string;

  constructor(
    title: string,
    description: string,
    role: string,
    assigned: string,
    assignedName: string
  ) {
    this.title = title;
    this.description = description;
    this.role = role;
    this.assigned = assigned;
    this.assignedName = assignedName;
    this.status = "new";
    this.timestamp = Date.now();
  }

  markDone() {
    this.status = "done";
  }

  startTask() {
    this.status = "inProgress";
  }
}
