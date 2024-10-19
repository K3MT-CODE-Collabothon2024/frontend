import React from 'react';
import Task from './Task';

interface DueTasksWidgetTightProps {
  tasks: Task[];
}

const DueTasksWidgetTight: React.FC<DueTasksWidgetTightProps> = ({ tasks }) => {
  // Liczba zadań w zależności od priorytetu
  const taskCounts = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length,
  };

  return (
    <div className="text-center">
      <p className="text-lg font-bold">Tasks Left: {tasks.length}</p>
      
      <div className="mt-4">
        <p className="text-sm font-semibold">High Priority: {taskCounts.high}</p>
        <p className="text-sm font-semibold">Medium Priority: {taskCounts.medium}</p>
        <p className="text-sm font-semibold">Low Priority: {taskCounts.low}</p>
      </div>
    </div>
  );
};

export default DueTasksWidgetTight;
