import React, { useEffect, useState } from "react";
import Task from "./Task";
import { fetchTasksFromJSON } from "./DueTasksWidgetWide";
import { TaskFetch } from "./DueTasksPopup";

interface DueTasksWidgetTightProps {
  tasks: Task[];
}

const fetchAndCountTasks = async () => {
  const data: Task[] = await fetchTasksFromJSON();
  const taskCounts = {
    high: data.filter((task: Task) => task.priority === "high").length,
    medium: data.filter((task: Task) => task.priority === "medium").length,
    low: data.filter((task: Task) => task.priority === "low").length,
  };
  return taskCounts;
};

const DueTasksWidgetTight: React.FC<DueTasksWidgetTightProps> = () => {
  const [taskCounts, setTaskCounts] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const counts = await fetchAndCountTasks();
      setTaskCounts(counts);
    };
    fetchData();
  }, []);

  return (
    <div className="text-center">
      <p className="text-lg font-bold">
        Tasks Left: {taskCounts.high + taskCounts.low + taskCounts.medium}
      </p>

      <div className="mt-4">
        <p className="text-sm font-semibold">
          High Priority: {taskCounts.high}
        </p>
        <p className="text-sm font-semibold">
          Medium Priority: {taskCounts.medium}
        </p>
        <p className="text-sm font-semibold">Low Priority: {taskCounts.low}</p>
      </div>
    </div>
  );
};

export default DueTasksWidgetTight;
