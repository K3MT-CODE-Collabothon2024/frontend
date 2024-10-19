import React, { useState } from 'react';
import './App.css';
import BaseWidget from './widgets/BaseWidget';
import DueTasksPopOut from './widgets/DueTasksWidget/DueTasksPopOut';
import DueTasksWidgetTight from './widgets/DueTasksWidget/DueTasksWidgetTight';
import DueTasksWidgetWide from './widgets/DueTasksWidget/DueTasksWidgetWide';
import Task from './widgets/DueTasksWidget/Task';


function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Finish project report', completed: false, priority: 'high' },
    { id: 2, text: 'Submit the assignment', completed: false, priority: 'medium' },
    { id: 3, text: 'Prepare for the presentation', completed: false, priority: 'low' },
    { id: 4, text: 'Call the manager', completed: false, priority: 'medium' },
    { id: 5, text: 'Buy groceries', completed: false, priority: 'low' },
  ]);
  
  const [isWide, setIsWide] = useState(false);

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const tasksLeft = tasks.filter(task => !task.completed).length;

  return (
    <div className="App">
      <BaseWidget
        contentWidget={
          isWide ? (
            <DueTasksWidgetWide tasks={tasks} toggleComplete={toggleComplete} removeTask={removeTask}/>
          ) : (
            <DueTasksWidgetTight tasks={tasks} />
          )
        }
        contentPopup={
          <DueTasksPopOut 
            tasks={tasks} 
            toggleComplete={toggleComplete} 
            removeTask={removeTask} 
          />
        }
      />
      <button
        onClick={() => setIsWide(!isWide)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle Widget Width
      </button>
    </div>
  );
}

export default App;

