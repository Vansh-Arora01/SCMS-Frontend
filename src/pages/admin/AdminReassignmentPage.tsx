import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

const AdminReassignmentPage = () => {
  const adminService = useAdminService();

  const [requests, setRequests] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reqRes, staffRes] = await Promise.all([
        adminService.getReassignmentRequests(),
        adminService.getAllStaff()
      ]);

      setRequests(reqRes.data.data);
      setStaff(staffRes.data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedStaff) return alert("Select staff");

    await adminService.handleReassignment(selectedComplaint._id, {
      action: "APPROVE",
      newStaffId: selectedStaff
    });

    setSelectedComplaint(null);
    setSelectedStaff("");
    fetchData();
  };

  const handleReject = async (id: string) => {
    await adminService.handleReassignment(id, {
      action: "REJECT"
    });

    fetchData();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 
                 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg flex flex-col 
                 min-h-[60vh] md:h-[75vh]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Reassignment Requests
        </h2>

        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
                     bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">

        {loading ? (
          <p className="text-slate-400">Loading requests...</p>
        ) : requests.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            No reassignment requests available
          </div>
        ) : (
          requests.map((req) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 bg-slate-800/50 border border-slate-700 
                         rounded-xl hover:border-indigo-500/40 transition"
            >

              {/* Top */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">

                <h3 className="text-base sm:text-lg font-semibold text-white break-words">
                  {req.title}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full 
                                 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 w-fit">
                  Pending
                </span>

              </div>

              {/* Details */}
              <p className="text-sm text-slate-300 break-words mb-1">
                Reason: {req.reassignmentReason}
              </p>

              <p className="text-sm text-slate-300">
                Requested By: {req.reassignmentRequestedBy?.name}
              </p>

              <p className="text-sm text-slate-300">
                Current Staff: {req.assignedTo?.name}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {new Date(req.reassignmentRequestedAt).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">

                <button
                  onClick={() => setSelectedComplaint(req)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg 
                             bg-green-600 hover:bg-green-500 text-white text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(req._id)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg 
                             bg-red-600 hover:bg-red-500 text-white text-sm"
                >
                  Reject
                </button>

              </div>

            </motion.div>
          ))
        )}
      </div>

      {/* 🔥 Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">

            <h3 className="text-lg font-semibold text-white mb-4">
              Assign New Staff
            </h3>

            <p className="text-sm text-slate-400 mb-3">
              {selectedComplaint.title}
            </p>

            <select
              className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 
                         text-white mb-4"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staff.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.department})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={handleApprove}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white"
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default AdminReassignmentPage;