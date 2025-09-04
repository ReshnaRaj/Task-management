// client/src/components/TaskBox.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

interface TaskBoxProps {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "completed";
  dueDate: string;
  assignedTo?: string;
  onToggle?: (id: string) => void;
}

const TaskBox = ({ 
  id, 
  title, 
  description, 
  priority, 
  status, 
  dueDate, 
  assignedTo,
  onToggle 
}: TaskBoxProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "open": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="w-full h-48 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">{title}</h3>
          <Checkbox 
            checked={status === "completed"} 
            onCheckedChange={() => onToggle?.(id)}
            className="mt-1"
          />
        </div>
        
        <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge className={`text-xs ${getPriorityColor(priority)}`}>
            {priority}
          </Badge>
          <Badge className={`text-xs ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(dueDate).toLocaleDateString()}</span>
          </div>
          {assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span className="truncate">{assignedTo}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskBox;