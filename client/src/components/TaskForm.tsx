import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createTask, getUsers, updateTask } from "../../api/task";
import { toast } from "sonner";
export default function TaskForm({
  open,
  onOpenChange,
  editTask,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTask?: {
    _id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "in-review" | "done";
    dueDate: string;
    assignedTo?: string | { _id: string; name: string } | null;
  } | null;
}) {
  interface Developer {
    id: string;
    name: string;
    email?: string;
  }

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    assignedTo: "",
  });
  const [developers, setDevelopers] = useState<Developer[]>([]);

  const fetchUsers = async () => {
    const res = await getUsers();

    setDevelopers(res?.data.response);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editTask) {
      setTask({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: (editTask.priority as any) || "medium",
        status: (editTask.status as any) || "todo",
        dueDate: editTask.dueDate ? new Date(editTask.dueDate).toISOString().slice(0, 10) : "",
        assignedTo:
          typeof editTask.assignedTo === "string"
            ? editTask.assignedTo
            : (editTask.assignedTo?._id as string) || "",
      });
    } else {
      setTask({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        assignedTo: "",
      });
    }
  }, [editTask]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editTask?._id) {
        res = await updateTask({
          id: editTask._id,
          ...task,
        });
      } else {
        res = await createTask(task as any);
      }

      if (res?.status == 200) {
        toast.success(res.data.message);
        onOpenChange(false);
      } else {
        toast.error("Something went wrong");
        onOpenChange(false);
      }
    } catch (error) {
      console.log(error, "errors data");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editTask ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Priority</Label>
              <Select
                value={task.priority}
                onValueChange={(value) => setTask({ ...task, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={task.status}
                onValueChange={(value) => setTask({ ...task, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                   <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Assign To</Label>
            <Select
              value={task.assignedTo}
              onValueChange={(value) => setTask({ ...task, assignedTo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select developer" />
              </SelectTrigger>
              <SelectContent>
                {developers.map((dev) => (
                  <SelectItem key={dev.id} value={dev.id}>
                    {dev.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="cursor-pointer">
              {editTask ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
