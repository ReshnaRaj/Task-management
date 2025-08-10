import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskCard from "@/components/TaskCard";
import ProgressChart from "@/components/ProgressChart";

const Home = () => {
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
  return (
     <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-black h-screen overflow-auto pt-[64px] lg:pt-0">
        <Header />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <TaskCard title="Daily Task" tasks={dailyTasks} />
            <TaskCard title="Weekly Task" tasks={weeklyTasks} />
            <ProgressChart />
          </div>
        </main>
      </div>
    </div>

  );
};

export default Home;
