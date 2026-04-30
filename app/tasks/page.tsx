"use client";

import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
};

export default function TasksPage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Todo");

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

  const updateStatus = async (
    id: string,
    status: string
  ) => {

    await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    fetchTasks();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);

    fetchTasks();

    setTitle("");
    setDescription("");
    setStatus("Todo");
  };

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg mb-8"
      >

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full border p-2 rounded"
        >
          <option value="Todo">
            Todo
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Done">
            Done
          </option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Task
        </button>

      </form>

      <div className="grid gap-4">

        {tasks.map((task) => (
          <div
            key={task._id}
            className="border p-4 rounded-lg"
          >

            <h2 className="text-xl font-semibold">
              {task.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {task.description}
            </p>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(
                  task._id,
                  e.target.value
                )
              }
              className="mt-3 border p-2 rounded"
            >
              <option value="Todo">
                Todo
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Done">
                Done
              </option>
            </select>

          </div>
        ))}

      </div>
    </div>
  );
}