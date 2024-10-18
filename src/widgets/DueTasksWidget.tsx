import React, { useState } from 'react';
import taskIcon from '../icons/task_icon.png';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface DueTasksWidgetProps {
  isWide: boolean;
  tasks: Task[];
}

const DueTasksWidget: React.FC<DueTasksWidgetProps> = ({ isWide, tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = taskList.map(task =>
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    );
    setTaskList(updatedTasks);
  };

  const removeTask = (taskId: number) => {
    const updatedTasks = taskList.filter(task => task.id !== taskId);
    setTaskList(updatedTasks);
  };

  return (
    <div className={`p-8 bg-commerzBrightGreen text-commerzBlue h-auto rounded-lg ${isWide ? 'w-1/2' : 'w-1/4'}`}>
      <h1 className="text-4xl text-center mb-4">Tasks</h1>
      <img src={taskIcon} alt="Task Icon" className="w-12 h-12 mx-auto mb-4" />
      <ul className="list-disc pl-5">
        {taskList.map((task) => (
          <li key={task.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => toggleTaskCompletion(task.id)}
              className="mr-2"
            />
            <span className={`text-2xl ${task.isComplete ? 'line-through' : ''}`}>
              {task.title}
            </span>
            {task.isComplete && (
              <button
                onClick={() => removeTask(task.id)}
                className="ml-4 text-sm bg-red-500 text-white px-2 py-1 rounded">
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DueTasksWidget;