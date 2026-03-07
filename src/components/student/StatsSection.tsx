import {  useMemo } from "react";
import { Complaint } from "../../types/complaint.types";

import { motion } from "framer-motion";
import { FileText, Clock, Loader, CheckCircle, ThumbsUp } from "lucide-react";

interface Stats {
  total: number;
  open: number;
  Assigned: number;
  resolved: number;
  totalVotes: number;
}
interface Props {
  complaints: Complaint[];
}
export default function StatsSection({ complaints }: Props) {
 

  const stats: Stats = useMemo(() => {
    return {
      total: complaints.length,
      open: complaints.filter((c) => c.status === "OPEN").length,
      Assigned: complaints.filter((c) => c.status === "ASSIGNED").length,
      resolved: complaints.filter((c) => c.status === "RESOLVED").length,
      totalVotes: complaints.reduce((sum, c) => sum + (c.voteCount || 0), 0),
    };
  }, [complaints]);

  const cards = [
    {
      label: "Total Complaints",
      value: stats.total,
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Open",
      value: stats.open,
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Assigned",
      value: stats.Assigned,
      icon: Loader,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Total Votes",
      value: stats.totalVotes,
      icon: ThumbsUp,
      color: "from-pink-500 to-rose-500",
    },
  ];

  // if (loading) {
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
  //       {[...Array(5)].map((_, i) => (
  //         <div
  //           key={i}
  //           className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 animate-pulse"
  //         />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
          >
            {/* Gradient Glow Accent */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 hover:opacity-10 transition`}
            />

            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}
            >
              <Icon size={18} className="text-white" />
            </div>

            {/* Label */}
            <h3 className="text-slate-400 text-sm">{card.label}</h3>

            {/* Value */}
            <p className="text-3xl font-bold text-white mt-2">
              {card.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}