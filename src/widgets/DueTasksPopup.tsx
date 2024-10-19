import React from 'react';
import Task from './Task';
import deleteIcon from '../icons/delete_icon.png'; // Importuj ikonę

interface DueTasksPopupProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

// Funkcja zwracająca kolor w zależności od priorytetu
const getPriorityColor = (priority: 'low' | 'medium' | 'high' | undefined, completed: boolean) => {
  if (completed) return 'bg-gray-200 text-gray-500'; // Completed tasks get dimmed text
  switch (priority) {
    case 'high':
      return 'bg-commerzYellow text-black'; // Keep strong contrast
    case 'medium':
      return 'bg-blue-400 text-white'; // Lighten blue for better contrast
    case 'low':
      return 'bg-green-100 text-gray-700'; // Light green with dark text
    default:
      return 'bg-gray-300';
  }
};

// Funkcja do formatowania daty na czytelny format
const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const DueTasksPopup: React.FC<DueTasksPopupProps> = ({ tasks, toggleComplete, removeTask }) => {
  // Sortowanie zadań po deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  return (
    <div className="relative w-min-600 w-full h-min-600 h-full overflow-y-auto bg-transparent rounded-lg p-4">
      {/* Header with Tasks title and Priority Legend */}
      <div className="flex justify-between items-center mb-4">
        {/* Tasks Title */}
        <div className=' w-1/4'>
        <h2 className="text-4xl font-extrabold   text-gray-800">Tasks</h2>
        </div>
        {/* Priority Legend */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 text-center">Priority Legend</h2>
          {/* Legend for color coding */}
          <div className="flex justify-end space-x-4 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-commerzYellow mr-2"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 mr-2"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 mr-2"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task list */}
      <ul className="space-y-4">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`grid grid-cols-4 items-start ${getPriorityColor(task.priority, task.completed)} p-4 rounded relative shadow-md`}
          >
            {/* Task status */}
            <span className="col-span-1 text-sm font-semibold text-left">
              {task.completed ? "Completed" :  "To Do"}
            </span>

            {/* Task text */}
            <span className={`col-span-2 text-left ${task.completed ? 'line-through' : ''} text-lg`}>
              {task.text}
            </span>

            {/* Task dates */}
            <div className="col-span-1 text-sm text-right text-gray-600">
              <span>Deadline: {formatDate(task.deadline)}</span>
            </div>

            {/* Task category */}
            <div className="col-span-1 text-sm text-left text-gray-600">
              <span>Category: {task.category}</span>
            </div>

            {/* Remove button for completed tasks */}
            {task.completed && (
              <button onClick={() => removeTask(task.id)} className="absolute right-2 bottom-2 text-red-500">
                <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DueTasksPopup;
