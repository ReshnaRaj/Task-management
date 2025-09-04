import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskCard from "@/components/TaskCard";
import ProgressChart from "@/components/ProgressChart";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import { useSelector } from "react-redux";
import { getTaskList } from "../../api/task";
import TaskMiniCard from "@/components/TaskMiniCard";
const Home = () => {
  const [open, setOpen] = useState(false);
  type Task = {
    _id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "completed";
    dueDate: string;
    assignedTo?: string | { _id: string; name: string } | null;
    attachments?: any[];
    comments?: any[];
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const userData = useSelector((state: any) => state.auth);

  const role = userData?.user?.role;
  const dailyTasks = [
    { id: 1, label: "Create a new post", checked: false },
    { id: 2, label: "Design an Instagram carousel", checked: true },
    { id: 3, label: "Create a new post", checked: false },
  ];

  const weeklyTasks = [
    { id: 1, label: "Create a new post", checked: false },
    { id: 2, label: "Design an Instagram carousel", checked: true },
    { id: 3, label: "Create a new post", checked: false },
  ];
  const fetchTasks = async () => {
    const response = await getTaskList();
    console.log(response, "get task list responsee");
    if (response?.status == 200) {
      setTasks(response.data.response);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  console.log(tasks, "taskss");
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-black h-screen overflow-auto pt-[64px] lg:pt-0">
        <Header />
        <main className="p-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <TaskCard title="Daily Task" tasks={dailyTasks} />
            <TaskCard title="Weekly Task" tasks={weeklyTasks} />
            <ProgressChart />
          </div> */}

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
                        title={t.title}
                        priority={t.priority}
                        dueDate={t.dueDate}
                        assignee={
                          typeof t.assignedTo === "string"
                            ? t.assignedTo
                            : t.assignedTo?.name
                        }
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
          {open && <TaskForm open={open} onOpenChange={setOpen} />}
        </main>
      </div>
    </div>
  );
};

export default Home;
