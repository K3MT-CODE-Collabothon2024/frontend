import React from "react";
import Task from "./Task"; // Importuj interfejs Task
import { useEffect, useState } from "react";

export async function fetchTasksFromJSON(): Promise<Task[]> {
  const response = await fetch("http://localhost:8080/tasks/1");
  const jsonData = await response.json();

  const tasks: Task[] = jsonData.map((task: any) => ({
    id: Math.random(),
    description: task.description || task.title,
    completed: task.state === 1,
    priority:
      task.priority === 1 ? "high" : task.priority === 2 ? "medium" : "low",
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    category: task.category || "General",
    url: task.url || "",
  }));

  console.log("Tasks fetched", tasks);
  return tasks;
}

interface DueTasksWidgetWideProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

const getPriorityColor = (
  priority: "low" | "medium" | "high" | undefined,
  completed: boolean
) => {
  if (completed) return "bg-gray-200 text-gray-500"; // Completed tasks get dimmed text
  switch (priority) {
    case "high":
      return "bg-commerzYellow text-black"; // Mocny kontrast dla wysokiego priorytetu
    case "medium":
      return "bg-blue-400 text-white"; // Średni kontrast dla medium
    case "low":
      return "bg-green-100 text-gray-700"; // Łagodny dla niskiego priorytetu
    default:
      return "bg-gray-300";
  }
};

const formatDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const DueTasksWidgetWide: React.FC<DueTasksWidgetWideProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasksFromJSON().then(setTasks);
    console.log("Tasks fetched");
    console.log(tasks);
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  return (
    <div className="flex flex-col w-full p-4 bg-transparent rounded-lg">
      {/* Header with Tasks title */}
      <div className="flex justify-between items-center mb-4">
        {/* Tasks Title */}
        <h2 className="text-3xl font-bold text-gray-800 p-2">Your Tasks</h2>
      </div>

      {/* Task list */}
      <ul className="space-y-4">
        {sortedTasks.slice(0, 3).map((task) => (
          <li
            key={task.id}
            className={`grid grid-cols-4 items-start ${getPriorityColor(
              task.priority,
              task.completed
            )} p-4 rounded relative shadow-md`}
          >
            {/* Task status */}
            <span className="col-span-1 text-sm font-semibold text-left">
              {task.completed
                ? "Completed"
                : task.priority === "high"
                ? "In Progress"
                : "To Do"}
            </span>

            {/* Task text */}
            <span
              className={`col-span-2 text-left ${
                task.completed ? "line-through" : ""
              } text-lg`}
            >
              {task.description}
            </span>

            {/* Task dates */}
            <div className="col-span-1 text-sm text-right text-gray-600">
              <span>Deadline: {formatDate(task.deadline)}</span>
            </div>

            {/* Task category */}
            <div className="col-span-1 text-sm text-left text-gray-600">
              <span>Category: {task.category}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Show ellipsis if more than 3 tasks */}
      {tasks.length > 3 && (
        <div className="text-center mt-4 text-gray-600">...</div>
      )}
    </div>
  );
};

export default DueTasksWidgetWide;
