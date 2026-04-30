"use client";

import { useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  description: string;
};

export default function ProjectsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const response = await fetch("/api/projects");

    const data = await response.json();

    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const data = await response.json();

    alert(data.message);

    fetchProjects();

    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg mb-8"
      >
        <input
          type="text"
          placeholder="Project Title"
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

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded-lg"
          >
            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}