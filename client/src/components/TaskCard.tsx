import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TaskCardProps {
  title: string;
  tasks: { id: number; label: string; checked: boolean }[];
}

const TaskCard = ({ title, tasks }: TaskCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-md">{title}</h3>
          <span className="text-blue-600 cursor-pointer text-sm">Details</span>
        </div>
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox id={`task-${task.id}`} defaultChecked={task.checked} />
              <Label htmlFor={`task-${task.id}`} className="text-sm cursor-pointer">
                {task.label}
              </Label>
            </div>
          ))}
        </div>
        <Input placeholder="Add new task" className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default TaskCard;

