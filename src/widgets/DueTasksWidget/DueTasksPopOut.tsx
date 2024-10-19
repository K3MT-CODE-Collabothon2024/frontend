import React from 'react';
import Task from './Task';
import deleteIcon from '../../icons/delete_icon.png'; // Importuj ikonę
import motion from 'framer-motion';

interface DueTasksPopOutProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

// Funkcja zwracająca kolor w zależności od priorytetu
const getPriorityColor = (priority: 'low' | 'medium' | 'high' | undefined) => {
  switch (priority) {
    case 'high':
      return 'bg-red-300';
    case 'medium':
      return 'bg-yellow-300';
    case 'low':
      return 'bg-green-300';
    default:
      return 'bg-gray-300';
  }
};

// Funkcja do formatowania daty na czytelny format
const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const DueTasksPopOut: React.FC<DueTasksPopOutProps> = ({ tasks, toggleComplete, removeTask }) => {
  // Sortowanie zadań po deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  return (
    <div className="relative w-[600px] h-[600px] overflow-y-auto">
      {/* Legend for color coding */}
      <div className="mb-4 p-2 bg-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold">Priority Legend</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-300 mr-2"></div>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-300 mr-2"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-300 mr-2"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Task list */}
      <ul className="space-y-4"> {/* Zwiększono odstęp między zadaniami */}
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-start ${getPriorityColor(task.priority)} p-4 rounded relative`} // Zwiększono padding dla lepszego rozdzielenia
          >
            {/* Checkbox for task completion */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="mr-2"
            />
            {/* Task text */}
            <span className={`flex-grow ${task.completed ? 'line-through' : ''} text-lg`}>
              {task.text}
            </span>
            {/* Remove button for completed tasks */}
            {task.completed && (
              <button
                onClick={() => removeTask(task.id)}
                className="ml-4 text-red-500"
              >
                <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
              </button>
            )}
            {/* Task dates */}
            <div className="absolute bottom-2 left-2 text-sm text-gray-600">
              <span>Start: {formatDate(task.startDate)}</span>
            </div>
            <div className="absolute bottom-2 right-2 text-sm text-gray-600">
              <span>Deadline: {formatDate(task.deadline)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DueTasksPopOut;
