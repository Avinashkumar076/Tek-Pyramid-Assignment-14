import type { Task, Status } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-medium text-white">{task.title}</h2>
          <p className="text-sm text-gray-300 mt-1">{task.description}</p>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
          className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/10 text-white outline-none cursor-pointer"
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
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="text-sm px-3 py-1 bg-white/10 border border-white/20 text-white rounded-md hover:bg-white/20 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm px-3 py-1 bg-red-500/20 border border-red-400/30 text-red-300 rounded-md hover:bg-red-500/30 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
