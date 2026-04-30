"use client";

import { useEffect, useState } from "react";

type Task = {
  status: string;
};

export default function DashboardPage() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");

    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress"
  ).length;

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold">
            Total Tasks
          </h2>

          <p className="text-3xl mt-4">
            {totalTasks}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold">
            Completed
          </h2>

          <p className="text-3xl mt-4 text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold">
            Pending
          </h2>

          <p className="text-3xl mt-4 text-yellow-500">
            {pendingTasks}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold">
            In Progress
          </h2>

          <p className="text-3xl mt-4 text-blue-500">
            {inProgressTasks}
          </p>
        </div>

      </div>
    </div>
  );
}