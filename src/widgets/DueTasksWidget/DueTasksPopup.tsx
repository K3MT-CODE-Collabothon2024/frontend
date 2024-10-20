import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Task from "./Task"; // Ensure correct import path for Task interface

export type TaskFetch = {
  priority: number;
  description: string;
  deadline: string;
  category: string;
  url: string;
  state: string;
  title: string;
};

// Fetch tasks from JSON
async function fetchTasksFromJSON(): Promise<Task[]> {
  const response = await fetch("http://localhost:8080/tasks/1");
  const jsonData = await response.json();

  // Map JSON data to Task interface
  return jsonData.map((task: any) => ({
    description: task.description || task.title,
    completed: task.state === 1,
    priority:
      task.priority === 1 ? "high" : task.priority === 2 ? "medium" : "low",
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    category: task.category || "General",
    url: task.url || "",
  }));
}

interface DueTasksPopupProps {
  tasks?: Task[]; // Make tasks prop optional
}

const DueTasksPopup: React.FC<DueTasksPopupProps> = ({
  tasks: initialTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks || []);

  useEffect(() => {
    if (!initialTasks || initialTasks.length === 0) {
      fetchTasksFromJSON().then(setTasks).catch(console.error);
    }
  }, [initialTasks]);

  const getPriorityColor = (priority: Task["priority"], completed: boolean) => {
    if (completed) return "bg-gray-200 text-gray-500"; // Dim color for completed tasks
    switch (priority) {
      case "high":
        return "bg-commerzYellow text-black"; // High priority - commerzYellow
      case "medium":
        return "bg-commerzBlue text-white"; // Medium priority - commerzBlue
      case "low":
        return "bg-commerzBrightGreen text-black"; // Low priority - commerzBrightGreen
      default:
        return "bg-gray-300"; // No priority - gray
    }
  };

  // Function to format dates
  const formatDate = (date: Date | undefined) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full h-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Tasks List</h2>

        {/* Priority Legend */}
        <div className="border-b pb-2 mb-2">
          <div className="flex items-center">
            <span className="bg-commerzYellow w-4 h-4 mr-2"></span>
            <span className="text-sm">High Priority</span>
          </div>
          <div className="flex items-center">
            <span className="bg-commerzBlue w-4 h-4 mr-2"></span>
            <span className="text-sm">Medium Priority</span>
          </div>
          <div className="flex items-center">
            <span className="bg-commerzBrightGreen w-4 h-4 mr-2"></span>
            <span className="text-sm">Low Priority</span>
          </div>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 border rounded-lg ${getPriorityColor(
                task.priority,
                task.completed
              )}`}
            >
              <h3 className="font-semibold text-lg mb-1">{task.description}</h3>

              <div className="flex justify-between text-sm">
                <p>Category: {task.category}</p>
                <p>Status: {task.completed ? "Completed" : "In Progress"}</p>
              </div>

              <div className="flex justify-between mt-2">
                {task.deadline && (
                  <span className="text-xs">
                    Deadline: {formatDate(task.deadline)}
                  </span>
                )}
              </div>

              {task.url && (
                <a
                  href={task.url}
                  className="text-blue-200 underline text-xs mt-2 inline-block"
                >
                  View Task
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default DueTasksPopup;
