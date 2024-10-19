interface Task {
    id: number;
    text: string;
    // completed: 'toDo' | 'inProgress' | 'completed';
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
    deadline?: Date;
    category?: string;
  }
  
  export default Task;