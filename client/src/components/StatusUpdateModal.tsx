import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { updateTaskStatus } from "../../api/task";
import { toast } from "sonner";

interface StatusUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    _id: string;
    title: string;
    status: "todo" | "in-progress" | "in-review" | "done";
  } | null;
  onStatusUpdate: () => void;
}

export default function StatusUpdateModal({
  open,
  onOpenChange,
  task,
  onStatusUpdate,
}: StatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    if (!task || !selectedStatus) return;

    try {
      setLoading(true);
      const res = await updateTaskStatus(task._id, selectedStatus);
      
      if (res?.status === 200) {
        toast.success("Task status updated successfully");
        onStatusUpdate();
        onOpenChange(false);
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "in-review", label: "In Review" },
    { value: "done", label: "Done" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Task Status</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {task && (
            <div>
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">
                Task: {task.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Status: <span className="capitalize">{task.status.replace("-", " ")}</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">New Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={!selectedStatus || loading}
            >
              {loading ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
