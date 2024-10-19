import React from 'react';
import Task from './Task'; // Importuj interfejs Task
import deleteIcon from '../icons/delete_icon.png'; // Importuj ikonę

interface DueTasksWidgetWideProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

const DueTasksWidgetWide: React.FC<DueTasksWidgetWideProps> = ({ tasks, toggleComplete, removeTask }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-center text-xl font-bold mb-4">Your Tasks</h2>
      <ul className="space-y-2">
        {tasks.slice(0, 3).map(task => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 rounded ${
              task.completed ? 'line-through' : ''
            } ${getPriorityColor(task.priority)}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="form-checkbox h-5 w-5 text-commerzYellow"
              />
              <span className="ml-2">{task.text}</span>
            </div>

            {/* Przycisk usuwania pojawi się tylko jeśli task jest completed */}
            {task.completed && (
              <button onClick={() => removeTask(task.id)} className="ml-4">
                <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                  <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                </div>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Pokaż trzy kropki, jeśli jest więcej niż 5 zadań */}
      {tasks.length > 3 && <div className="text-center mt-4">...</div>}
    </div>
  );
};

// Funkcja, która zwraca kolor tła w zależności od priorytetu
const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return 'bg-red-200';
    case 'medium':
      return 'bg-yellow-200';
    case 'low':
      return 'bg-green-200';
    default:
      return 'bg-gray-200';
  }
};

export default DueTasksWidgetWide;
