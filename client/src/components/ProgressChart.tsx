import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Work", value: 25, color: "#6366f1" },
  { name: "Reading", value: 15, color: "#ec4899" },
  { name: "Learning", value: 10, color: "#06b6d4" },
  { name: "Design UI", value: 13, color: "#f59e0b" },
];

const ProgressChart = () => {
  return (
    <div className="bg-white p-4 dark:bg-black rounded-xl shadow w-full">
      <h3 className="font-semibold text-md mb-2">Yearly Progress</h3>
      <div className="flex flex-col items-center">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <p className="mt-2 font-semibold text-xl">63%</p>
        <p className="text-sm text-muted-foreground">Main Goals</p>
      </div>
    </div>
  );
};

export default ProgressChart;
