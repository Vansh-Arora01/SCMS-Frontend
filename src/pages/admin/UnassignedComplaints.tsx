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
}

const UnassignedComplaints = () => {
  const { getUnassigned } = useAdminService();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);

  useEffect(() => {
    getUnassigned().then(res => {
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
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Assign Modal */}
      {selected && (
        <AssignModal
          complaint={selected}
          onClose={() => {
            if (selected) {
              setComplaints(prev =>
                prev.filter(c => c._id !== selected._id)
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