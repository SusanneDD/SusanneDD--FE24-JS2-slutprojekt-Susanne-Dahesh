export interface Task {
    title: string;
    description: string;
    role: string;
    assigned: string;
    assignedName: string;
    status: "new" | "inProgress" | "done";
    timestamp: number;
    key?: string;
  }
  
  export interface Member {
    name: string;
    role: string;
    key?: string;
  }
  