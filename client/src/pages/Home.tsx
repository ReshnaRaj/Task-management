import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gradient-to-br from-purple-50 to-white h-full">
          <h2 className="text-lg font-medium mb-4">Create a Task</h2>
          {/* Task creation form will go here */}
        </main>
      </div>
    </div>
  );
};

export default Home;
