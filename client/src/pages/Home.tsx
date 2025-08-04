import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create a New Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Input type="text" placeholder="Enter task title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea placeholder="Describe the task..." rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <Input type="date" />
          </div>

          <div className="pt-4">
            <Button className="w-full">Create Task</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
