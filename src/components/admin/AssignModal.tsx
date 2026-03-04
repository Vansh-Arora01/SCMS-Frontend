// import { useState } from "react";
// import { useAdminService } from "../../services/admin.service";

// const AssignModal = ({ complaint, onClose }: any) => {
//   const { assignComplaint } = useAdminService();
//   const [staffId, setStaffId] = useState("");

//   const handleAssign = async () => {
//     await assignComplaint(complaint._id, { staffId });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

//       <div className="bg-[#111827] p-8 rounded-2xl w-96 border border-white/10">

//         <h3 className="text-lg font-semibold mb-4">
//           Assign Complaint
//         </h3>

//         <input
//           placeholder="Staff ID"
//           className="w-full mb-4 p-3 rounded-xl bg-white/10"
//           onChange={(e) => setStaffId(e.target.value)}
//         />

//         <div className="flex justify-end gap-3">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-xl">
//             Cancel
//           </button>

//           <button
//             onClick={handleAssign}
//             className="px-4 py-2 bg-indigo-600 rounded-xl"
//           >
//             Confirm
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AssignModal;
import { useState } from "react";
import { useAdminService } from "../../services/admin.service";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { UserPlus, X } from "lucide-react";

const AssignModal = ({ complaint, onClose }: any) => {
  const { assignComplaint } = useAdminService();
  const [enrollment, setEnrollment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!enrollment) {
      toast.error("Please enter staff enrollment");
      return;
    }

    try {
      setLoading(true);

      await assignComplaint(complaint._id, { enrollment });

      toast.success("Complaint assigned successfully ✅", {
        description: `${complaint.title} is now assigned.`,
      });

      onClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Assignment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />

        <div className="relative z-10">

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <UserPlus size={18} className="text-indigo-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Assign Complaint
            </h3>
          </div>

          {/* Complaint Title */}
          <p className="text-sm text-slate-400 mb-4">
            Assigning:{" "}
            <span className="text-slate-200 font-medium">
              {complaint.title}
            </span>
          </p>

          {/* Input */}
          <input
            type="text"
            placeholder="Enter Staff Enrollment ID"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            className="w-full mb-6 p-3 rounded-xl bg-slate-800/60 border border-slate-700 focus:border-indigo-500 focus:outline-none text-white placeholder:text-slate-500 transition"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAssign}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-90 text-white font-medium transition disabled:opacity-50"
            >
              {loading ? "Assigning..." : "Confirm Assignment"}
            </button>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AssignModal;