import { useState } from "react";
import type { Task, Status } from "../types/task";

interface Props {
  onSubmit: (task: Omit<Task, "id">, id?: number) => void;
  editingTask: Task | null;
}

const initialState: Omit<Task, "id"> = {
  title: "",
  description: "",
  status: "todo",
};

export default function TaskForm({ onSubmit, editingTask }: Props) {
  const [formData, setFormData] = useState<Omit<Task, "id">>(
    editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
        }
      : initialState,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as Status) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title required");
      return;
    }

    onSubmit(formData, editingTask?.id);

    setFormData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
    >
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 bg-transparent border border-white/20 rounded-lg text-white focus:outline-none"
      >
        <option value="todo" className="text-black">
          Todo
        </option>
        <option value="in-progress" className="text-black">
          In Progress
        </option>
        <option value="done" className="text-black">
          Done
        </option>
      </select>

      <button className="mt-2 bg-blue-500/80 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
