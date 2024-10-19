interface Task {
    id: number;
    text: string;
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
    startDate?: Date;
    deadline?: Date;
  }
  
  export default Task;