import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import ComplaintCard from "../../components/admin/ComplaintCard";
import AssignModal from "../../components/admin/AssignModal";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  department: string;
  createdBy?: {
    name: string;
    email: string;
  };
  createdAt?: string;
}

const UnassignedComplaints = () => {
  const { getUnassigned } = useAdminService();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [viewComplaint, setViewComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    getUnassigned().then((res) => {
      setComplaints(res.data.data);
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
          <ClipboardList size={18} className="text-indigo-400" />
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Unassigned Complaints
        </h2>
      </div>

      {/* Complaint List */}
      {complaints.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">🎉 No unassigned complaints</p>
          <p className="text-sm mt-2">
            All complaints are currently assigned.
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
          className="space-y-5"
        >
          {complaints.map((c) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ComplaintCard
                complaint={c}
                onAssign={setSelected}
                onView={setViewComplaint}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Complaint Details Modal */}
      {viewComplaint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl
          w-full max-w-2xl max-h-[90vh] overflow-y-auto
          p-8 relative shadow-xl">

            {/* Close */}
            <button
              onClick={() => setViewComplaint(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-white mb-4">
              {viewComplaint.title}
            </h2>

            {/* Department */}
            <div className="mb-4">
              <span className="text-slate-400 text-sm">Department:</span>
              <p className="text-white">{viewComplaint.department}</p>
            </div>

            {/* Created By */}
            <div className="mb-4">
              <span className="text-slate-400 text-sm">Created By:</span>
              <p className="text-white">
                {viewComplaint.createdBy?.name || "Anonymous"}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-slate-300 font-medium mb-2">
                Description
              </h4>

              <p className="text-slate-400 text-sm whitespace-pre-line">
                {viewComplaint.description}
              </p>
            </div>

            {/* Assign Button */}
            <div className="mt-8 flex justify-end">

              <button
                onClick={() => {
                  setSelected(viewComplaint);
                  setViewComplaint(null);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700
                text-white rounded-lg transition"
              >
                Assign Complaint
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Assign Modal */}
      {selected && (
        <AssignModal
          complaint={selected}
          onClose={() => {
            if (selected) {
              setComplaints((prev) =>
                prev.filter((c) => c._id !== selected._id)
              );
            }
            setSelected(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default UnassignedComplaints;