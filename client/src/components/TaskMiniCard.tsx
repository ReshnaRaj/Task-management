 
export default function TaskMiniCard({
  task,
  onClick,
  onStatusClick,
  showStatusButton = false,
}: { 
  task: {
    _id: string;
    title: string;
    priority: "low"|"medium"|"high";
    status: "todo" | "in-progress" | "in-review" | "done";
    dueDate: string;
    assignedTo?: string | { _id: string; name: string } | null;
  };
  onClick: () => void;
  onStatusClick?: () => void;
  showStatusButton?: boolean;
}) {
  const { title, priority, dueDate, assignedTo } = task;
  const assignee = typeof assignedTo === "string" ? assignedTo : assignedTo?.name;
  const p = { low: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-red-100 text-red-700" }[priority];
  return (
    <div className="rounded-md border bg-white p-3 shadow-sm hover:shadow transition">
      <div 
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm line-clamp-2">{title}</h4>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${p}`}>{priority}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(dueDate).toLocaleDateString()}</span>
          {assignee ? <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px]">
            {assignee.slice(0,2).toUpperCase()}
          </span> : null}
        </div>
      </div>
      
      {showStatusButton && onStatusClick && (
        <div className="mt-2 pt-2 border-t">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusClick();
            }}
            className="w-full text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors"
          >
            Update Status
          </button>
        </div>
      )}
    </div>
  );
}