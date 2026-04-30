import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">

      <h1 className="text-5xl font-bold mb-6">
        Team Task Manager
      </h1>

      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Manage projects, assign tasks, track progress,
        and collaborate with your team efficiently.
      </p>

      <div className="flex gap-4">

        <Link
          href="/signup"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </Link>

        <Link
          href="/dashboard"
          className="border px-6 py-3 rounded-lg"
        >
          Dashboard
        </Link>

      </div>

    </div>
  );
}