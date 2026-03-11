// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const ComplaintCard = ({ complaint, onAssign }: any) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.2 }}
//       className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-indigo-500/40 transition-all"
//     >
//       {/* Subtle Gradient Glow */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />

//       {/* Content */}
//       <div className="relative z-10">

//         {/* Title & Category */}
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="font-semibold text-lg text-white">
//             {complaint.title}
//           </h3>

//           <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
//             {complaint.category}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-slate-300 text-sm mb-6 leading-relaxed break-words">
//           {complaint.description}
//         </p>

//         {/* Footer */}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={() => onAssign(complaint)}
//             className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 text-white text-sm font-medium shadow-md transition"
//           >
//             Assign
//             <ArrowRight size={16} />
//           </button>
//         </div>

//       </div>
//     </motion.div>
//   );
// };

// export default ComplaintCard;

import { motion } from "framer-motion";
import { ArrowRight, Eye, ThumbsUp } from "lucide-react";

const getPriorityStyle = (priority?: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-600/20 text-red-400 border-red-500/40";
    case "high":
      return "bg-orange-500/10 text-orange-400 border-orange-500/30";
    case "medium":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    case "low":
      return "bg-green-500/10 text-green-400 border-green-500/30";
    default:
      return "bg-slate-700 text-slate-300 border-slate-600";
  }
};

const ComplaintCard = ({ complaint, onAssign, onView }: any) => {

  const handleView = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onView(complaint);
  };

  const handleAssign = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onAssign(complaint);
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-indigo-500/40 transition-all"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex justify-between items-start mb-4">

          <h3 className="font-semibold text-lg text-white break-words">
            {complaint.title}
          </h3>

          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            {complaint.category}
          </span>

        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-5 leading-relaxed line-clamp-2">
          {complaint.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-5">

          {/* Votes */}
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <ThumbsUp size={14} />
            {complaint.voteCount || 0}
          </div>

          {/* Priority */}
          <span
            className={`px-3 py-1 text-xs rounded-full border ${getPriorityStyle(
              complaint.priority
            )}`}
          >
            {(complaint.priority || "low").toUpperCase()}
          </span>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={handleView}
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
            bg-slate-700 hover:bg-slate-600 text-white text-sm transition"
          >
            <Eye size={16} />
            View
          </button>

          <button
            onClick={handleAssign}
            className="flex items-center gap-2 px-5 py-2 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-indigo-500 
            hover:opacity-90 text-white text-sm font-medium shadow-md transition"
          >
            Assign
            <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default ComplaintCard;