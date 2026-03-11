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
import { ArrowRight, Eye } from "lucide-react";

const ComplaintCard = ({ complaint, onAssign, onView }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-lg hover:border-indigo-500/40 transition-all"
    >
      {/* Subtle Gradient Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">

        {/* Title & Category */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-white">
            {complaint.title}
          </h3>

          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            {complaint.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-6 leading-relaxed break-words">
          {complaint.description}
        </p>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">

          {/* View Button */}
          <button
            type="button"
            onClick={() => onView(complaint)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl 
            bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition"
          >
            <Eye size={16} />
            View
          </button>

          {/* Assign Button */}
          <button
            type="button"
            onClick={() => onAssign(complaint)}
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