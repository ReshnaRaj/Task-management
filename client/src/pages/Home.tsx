import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import { useSelector } from "react-redux";
import { getTaskList } from "../../api/task";
import TaskMiniCard from "@/components/TaskMiniCard";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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

  const userData = useSelector((state: any) => state.auth);

  const role = userData?.user?.role;
  

  
  const fetchTasks = async () => {
    const response = await getTaskList();
    
    if (response?.status == 200) {
      setTasks(response.data.response);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTask(null);
    fetchTasks();  
  };

  useEffect(() => {
    fetchTasks();
  }, []);
 
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-black h-screen overflow-auto pt-[64px] lg:pt-0">
        <Header />
        <main className="p-6">
          

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["todo", "in-progress", "in-review", "done"].map((col) => (
              <div key={col} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold capitalize">
                    {col.replace("-", " ")}
                  </h3>
                  <span className="text-[11px] text-gray-500">
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
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {role === "admin" && (
            <div
              className="fixed bottom-8 right-10 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Plus />
            </div>
          )}
          {open && <TaskForm open={open} onOpenChange={handleCloseModal} editTask={selectedTask} />}
        </main>
      </div>
    </div>
  );
};

export default Home;
