import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Complaint } from "../../types/complaint.types";

interface Props {
  complaints: Complaint[];
}

export default function ComplaintTrendChart({ complaints }: Props) {

  // Generate last 6 months
  const months: { label: string; count: number }[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("default", { month: "short" });

    months.push({
      label,
      count: 0,
    });
  }

  // Count complaints per month
  complaints.forEach((c) => {
    const date = new Date(c.createdAt);
    const monthLabel = date.toLocaleString("default", { month: "short" });

    const month = months.find((m) => m.label === monthLabel);
    if (month) month.count++;
  });

  const data = months.map((m) => ({
    month: m.label,
    complaints: m.count,
  }));

  return (
    <div className="group relative bg-slate-900/70 border border-slate-800 
    rounded-2xl p-7 backdrop-blur-lg transition-all duration-300 
    hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">

      <h3 className="text-slate-200 font-semibold text-lg mb-5">
        Complaint Activity (Last 6 Months)
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              color: "#e2e8f0",
            }}
          />

          <Line
            type="monotone"
            dataKey="complaints"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive
            animationDuration={900}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}