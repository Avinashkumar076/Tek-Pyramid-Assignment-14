import TaskManager from "./pages/TaskManager";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900 flex items-center justify-center py-20">
      <div className="w-full max-w-3xl p-6 space-y-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <TaskManager />
      </div>
    </div>
  );
}
