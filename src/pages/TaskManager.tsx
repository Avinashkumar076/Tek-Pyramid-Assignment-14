import { useState } from "react";
import type { Task, Status } from "../types/task";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filters: (Status | "all")[] = ["all", "todo", "in-progress", "done"];

  const handleSubmit = (task: Omit<Task, "id">, id?: number) => {
    if (id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...task } : t)),
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id: number, status: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Task Manager</h1>

        <div className="text-sm text-gray-300">{tasks.length} tasks</div>
      </div>

      <TaskForm
        key={editingTask ? editingTask.id : "new"}
        editingTask={editingTask}
        onSubmit={handleSubmit}
      />

      <div className="flex gap-2 bg-white/10 backdrop-blur-md p-1 rounded-lg w-fit border border-white/10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-sm transition ${
              filter === f
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No tasks yet</div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
