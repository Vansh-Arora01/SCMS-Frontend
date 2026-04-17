import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import CreateStaffModal from "../../components/admin/CreateStaffModal";
import UpdateStaffModal from "../../components/admin/UpdateStaffModel";
import { motion } from "framer-motion";
import { Pencil, Users,Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Staff {
  _id: string;
  name: string;
  email: string;
  department: string;
  college: string;
  enrollment: string;
}

const ManageStaff = () => {
  const { getAllStaff ,updateStaff ,deleteStaff} = useAdminService();
const [editOpen, setEditOpen] = useState(false);
const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [open, setOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await getAllStaff();
      setStaffList(res.data.data);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (id: string, data: any) => {
  await updateStaff(id, data);

  // Update UI instantly
  setStaffList(prev =>
    prev.map(s => (s._id === id ? { ...s, ...data } : s))
  );
};
const handleDelete = (id: string) => {
  toast("Delete this staff?", {
    description: "This action cannot be undone.",
    action: {
      label: "Delete",
      onClick: async () => {
        try {
          await deleteStaff(id);

          setStaffList(prev => prev.filter(s => s._id !== id));

          toast.success("Staff deleted successfully 🗑️");
        } catch (error) {
          toast.error("Delete failed");
        }
      },
    },
  });
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg flex flex-col min-h-[60vh] md:h-[75vh]"
    >

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Users size={18} className="text-indigo-400" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Staff Management
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 text-white font-medium transition"
        >
          + Create Staff
        </button>
       


      </div>

      {/* Scrollable Staff List */}
      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 sm:space-y-5">

        {loading ? (
          <p className="text-slate-400">Loading staff...</p>
        ) : staffList.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            No staff members found.
          </div>
        ) : (
          staffList.map((staff) => (
            <motion.div
              key={staff._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-indigo-500/40 transition"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">

                <h3 className="text-base sm:text-lg font-semibold text-white break-words">
                  {staff.name}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 w-fit">
                  STAFF
                </span>

              </div>

              <p className="text-sm text-slate-300 break-words">
                Email: {staff.email}
              </p>

              <p className="text-sm text-slate-300">
                Enrollment: {staff.enrollment}
              </p>

              <p className="text-sm text-slate-300">
                Department: {staff.department}
              </p>

              <p className="text-sm text-slate-400">
                College: {staff.college}
              </p>

              <div className="flex items-center gap-2 mt-4">

  {/* Edit */}
  <button
    onClick={() => {
      setSelectedStaff(staff);
      setEditOpen(true);
      
    }}
    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg 
               bg-blue-500/10 text-blue-400 border border-blue-500/20 
               hover:bg-blue-500/20 hover:border-blue-400 transition"
  >
    <Pencil size={14} />
     Edit
  </button>

  {/* Delete */}
  <button
    onClick={() => handleDelete(staff._id)}
    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg 
               bg-red-500/10 text-red-400 border border-red-500/20 
               hover:bg-red-500/20 hover:border-red-400 transition"
  >
    <Trash2 size={14} />
     Delete
  </button>

</div>

            </motion.div>
          ))
        )}

      </div>

      {/* Create Staff Modal */}
      {open && (
        <CreateStaffModal
          onClose={() => {
            setOpen(false);
            fetchStaff();
          }}
        />
      )}
      {editOpen && selectedStaff && (
  <UpdateStaffModal
    staff={selectedStaff}
    onClose={() => setEditOpen(false)}
    onUpdate={handleUpdate}
  />
)}

    </motion.div>
  );
};

export default ManageStaff;