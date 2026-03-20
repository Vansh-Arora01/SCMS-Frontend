// import { useEffect, useState } from "react";
// import { useAdminService } from "../../services/admin.service";
// import { motion } from "framer-motion";
// import { AlertTriangle } from "lucide-react";

// const getPriorityStyle = (priority?: string) => {
//   switch (priority) {
//     case "critical":
//       return "bg-red-600/20 text-red-400 border-red-500/40";
//     case "high":
//       return "bg-orange-500/10 text-orange-400 border-orange-500/30";
//     case "medium":
//       return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
//     case "low":
//       return "bg-green-500/10 text-green-400 border-green-500/30";
//     default:
//       return "bg-slate-700 text-slate-300 border-slate-600";
//   }
// };

// const SortedComplaints = () => {
//   const { getSortedComplaints } = useAdminService();
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     getSortedComplaints().then((res) => {
//       setData(res.data.data);
//     });
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-lg"
//     >
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30">
//           <AlertTriangle size={18} className="text-red-400" />
//         </div>

//         <h2 className="text-2xl font-semibold text-white">
//           Priority Complaint Queue
//         </h2>
//       </div>

//       {data.length === 0 ? (
//         <div className="text-center py-12 text-slate-400">
//           <p className="text-lg">No prioritized complaints</p>
//           <p className="text-sm mt-2">
//             Complaints sorted by votes and priority will appear here.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {data.map((complaint) => (
//             <motion.div
//               key={complaint._id}
//               whileHover={{ y: -2 }}
//               transition={{ duration: 0.2 }}
//               className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-indigo-500/40 transition"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-start mb-3">

//                 <div>
//                   <h3 className="text-lg font-semibold text-white">
//                     {complaint.title}
//                   </h3>

//                   <p className="text-xs text-slate-400">
//                     Complaint ID: {complaint.complaintNumber}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 text-xs rounded-full border ${getPriorityStyle(
//                     complaint.priority
//                   )}`}
//                 >
//                   {complaint.priority?.toUpperCase()}
//                 </span>

//               </div>

//               {/* Description */}
//               <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-2">
//                 {complaint.description}
//               </p>

//               {/* Metadata */}
//               <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">

//                 <span>
//                   Category:{" "}
//                   <span className="text-slate-200">
//                     {complaint.category}
//                   </span>
//                 </span>

//                 <span>
//                   Votes:{" "}
//                   <span className="text-slate-200 font-medium">
//                     {complaint.voteCount || 0}
//                   </span>
//                 </span>

//                 <span>
//                   Status:{" "}
//                   <span className="text-slate-200">
//                     {complaint.status}
//                   </span>
//                 </span>

//               </div>

//               {/* Created By */}
//               <div className="text-xs text-slate-400 mt-3">
//   Created By:{" "}
//   <span className="text-slate-200">
//     {complaint.isAnonymous ? (
//       "Anonymous"
//     ) : (
//       <>
//         {complaint.createdBy?.name}
//         {complaint.createdBy?.enrollment && (
//           <> ({complaint.createdBy.enrollment})</>
//         )}
//       </>
//     )}
//   </span>
// </div>

//               {/* Assigned */}
//               {complaint.assignedTo && (
//                 <div className="text-xs text-slate-400 mt-1">
//                   Assigned To:{" "}
//                   <span className="text-slate-200">
//                     {complaint.assignedTo?.name}
//                   </span>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default SortedComplaints;
import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import { motion } from "framer-motion";
import { AlertTriangle, Search } from "lucide-react";

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

const SortedComplaints = () => {
  const { getSortedComplaints } = useAdminService();

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getSortedComplaints().then((res) => {
      setData(res.data.data);
    });
  }, []);

  // 🔍 Filtering Logic
  const filteredData = data.filter((complaint) => {
    const matchesSearch =
      complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.complaintNumber?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.category?.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || complaint.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30">
            <AlertTriangle size={18} className="text-red-400" />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Priority Complaint Queue
          </h2>
        </div>

        {/* 🔍 Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 🎯 Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-sm px-3 py-2 rounded-lg text-white"
        >
          <option value="all">All Priority</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-sm px-3 py-2 rounded-lg text-white"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

      </div>

      {/* Content */}
      {filteredData.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">No matching complaints</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredData.map((complaint) => (
            <motion.div
              key={complaint._id}
              whileHover={{ y: -3 }}
              className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-indigo-500/40 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {complaint.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    ID: {complaint.complaintNumber}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full border ${getPriorityStyle(
                    complaint.priority
                  )}`}
                >
                  {complaint.priority?.toUpperCase()}
                </span>

              </div>

              <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                {complaint.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span>
                  Category: <span className="text-white">{complaint.category}</span>
                </span>

                <span>
                  Votes: <span className="text-indigo-400 font-semibold">{complaint.voteCount || 0}</span>
                </span>

                <span>
                  Status: <span className="text-white">{complaint.status}</span>
                </span>
              </div>

              {/* Footer */}
              <div className="text-xs text-slate-400 mt-3 flex justify-between flex-wrap gap-2">
                <div>
                  Created By:{" "}
                  <span className="text-slate-200">
                    {complaint.isAnonymous
                      ? "Anonymous"
                      : `${complaint.createdBy?.name} (${complaint.createdBy?.enrollment || ""})`}
                  </span>
                </div>

                {complaint.assignedTo && (
                  <div>
                    Assigned:{" "}
                    <span className="text-slate-200">
                      {complaint.assignedTo?.name}
                    </span>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SortedComplaints;