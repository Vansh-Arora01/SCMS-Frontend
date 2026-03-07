import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Complaint } from "../../types/complaint.types";

interface Props {
  complaints: Complaint[];
}

export default function ComplaintStatusChart({ complaints }: Props) {

  const data = [
    {
      name: "Open",
      value: complaints.filter((c) => c.status === "OPEN").length,
    },
    
    {
      name: "Assigned",
      value: complaints.filter((c) => c.status === "ASSIGNED").length,
    },
    {
      name: "In Progress",
      value: complaints.filter((c) => c.status === "IN_PROGRESS").length,
    },
    {
      name: "Resolved",
      value: complaints.filter((c) => c.status === "RESOLVED").length,
    },
  ];

  const COLORS = [
  "#f59e0b", // Open
  "#3b82f6", // In Progress
  "#6366f1", // Assigned
  "#22c55e", // Resolved
];

  return (
    <div className="group relative bg-slate-900/70 border border-slate-800 
rounded-2xl p-7 backdrop-blur-lg 
transition-all duration-300 
hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">

      <h3 className="text-white font-semibold mb-4">
        Complaint Status Distribution
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}