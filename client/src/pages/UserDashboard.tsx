import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskMiniCard from "@/components/TaskMiniCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyTasks } from "../../api/task";
import TaskForm from "@/components/TaskForm";
import StatusUpdateModal from "@/components/StatusUpdateModal";

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusTask, setStatusTask] = useState<Task | null>(null);
  
  type Task = {
    _id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "in-review" | "done";
    dueDate: string;
    assignedTo?: string | { _id: string; name: string } | null;
    attachments?: any[];
    comments?: any[];
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state: any) => state.auth);
  const userName = userData?.user?.name || "User";

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const response = await getMyTasks();
      if (response?.status === 200) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTask(null);
    fetchMyTasks(); // Refresh the task list
  };

  const handleStatusClick = (task: Task) => {
    setStatusTask(task);
    setStatusModalOpen(true);
  };

  const handleStatusModalClose = () => {
    setStatusModalOpen(false);
    setStatusTask(null);
    fetchMyTasks(); // Refresh the task list
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const getStatusCount = (status: string) => {
    return tasks.filter((t) => t.status === status).length;
  };

  const getPriorityCount = (priority: string) => {
    return tasks.filter((t) => t.priority === priority).length;
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 dark:bg-black h-screen overflow-auto pt-[64px] lg:pt-0">
          <Header />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading your tasks...</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-black h-screen overflow-auto pt-[64px] lg:pt-0">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here are your assigned tasks
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</h3>
              <p className="text-2xl font-bold text-blue-600">{getStatusCount("in-progress")}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</h3>
              <p className="text-2xl font-bold text-red-600">{getPriorityCount("high")}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{getStatusCount("done")}</p>
            </div>
          </div>

          {/* Task Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["todo", "in-progress", "in-review", "done"].map((col) => (
              <div key={col} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold capitalize text-gray-900 dark:text-white">
                    {col.replace("-", " ")}
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {tasks.filter((t) => t.status === col).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === col)
                    .map((t) => (
                      <TaskMiniCard
                        key={t._id}
                        task={t}
                        onClick={() => handleTaskClick(t)}
                        onStatusClick={() => handleStatusClick(t)}
                        showStatusButton={true}
                      />
                    ))}
                  {tasks.filter((t) => t.status === col).length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                      No tasks in this status
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {open && <TaskForm open={open} onOpenChange={handleCloseModal} editTask={selectedTask} />}
          {statusModalOpen && (
            <StatusUpdateModal
              open={statusModalOpen}
              onOpenChange={handleStatusModalClose}
              task={statusTask}
              onStatusUpdate={fetchMyTasks}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
