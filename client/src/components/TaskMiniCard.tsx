 
export default function TaskMiniCard({
  title, priority, dueDate, assignee,
}: { title: string; priority: "low"|"medium"|"high"; dueDate: string; assignee?: string; }) {
  const p = { low: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-red-100 text-red-700" }[priority];
  return (
    <div className="rounded-md border bg-white p-3 shadow-sm hover:shadow transition">
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
  );
}