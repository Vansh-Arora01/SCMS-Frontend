// import { useEffect, useState } from "react";
// import { useAdminService } from "../../services/admin.service";

// const SortedComplaints = () => {
//   const { getSortedComplaints } = useAdminService();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getSortedComplaints().then(res => {
//       setData(res.data.data);
//     });
//   }, []);

//   return (
//     <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">

//       <h2 className="text-xl font-semibold mb-6 text-indigo-400">
//         Complaints by Category
//       </h2>

//       {data.map((item: any) => (
//         <div key={item.category} className="mb-4">

//           <div className="flex justify-between text-sm mb-2">
//             <span>{item.category}</span>
//             <span>{item.count}</span>
//           </div>

//           <div className="h-2 bg-white/10 rounded-full">
//             <div
//               className="h-2 bg-indigo-500 rounded-full"
//               style={{ width: `${item.count * 10}%` }}
//             />
//           </div>

//         </div>
//       ))}

//     </div>
//   );
// };

// export default SortedComplaints;


import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";

const SortedComplaints = () => {
  const { getSortedComplaints } = useAdminService();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getSortedComplaints().then(res => {
      setData(res.data.data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
          <FolderKanban size={18} className="text-indigo-400" />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Complaints (Category Wise)
        </h2>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">No categorized complaints yet</p>
          <p className="text-sm mt-2">
            Sorted complaints will appear here.
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="space-y-6"
        >
          {data.map((complaint) => (
            <motion.div
              key={complaint._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-indigo-500/40 transition"
            >
              {/* Title & Category */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {complaint.title}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  {complaint.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {complaint.description}
              </p>

              {/* Status & Priority */}
              <div className="flex flex-wrap gap-3 text-xs mb-3">

                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Status: {complaint.status}
                </span>

                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Priority: {complaint.priority}
                </span>

              </div>

              {/* Created By */}
              <div className="text-xs text-slate-400 mb-2">
                Created By:{" "}
                <span className="text-slate-300">
                  {complaint.createdBy?.name} ({complaint.createdBy?.enrollment})
                </span>
              </div>

              {/* Assigned To */}
              {complaint.assignedTo && (
                <div className="text-xs text-slate-400">
                  Assigned To:{" "}
                  <span className="text-slate-300">
                    {complaint.assignedTo?.name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SortedComplaints;