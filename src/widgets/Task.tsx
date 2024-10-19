interface Task {
    id: number;
    description: string;
    // completed: 'toDo' | 'inProgress' | 'completed';
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
    deadline?: Date;
    category?: string;
    url?: string;
  }
  
  export default Task;