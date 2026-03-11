import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import StatusBadge from "../../components/staff/StatusBadge";
import { toast } from "sonner";
import { Eye, X } from "lucide-react";

const ComplaintDetails = () => {
  const { id } = useParams();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [reason, setReason] = useState("");
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const {
    data,
    loading,
    execute: refetchComplaint,
  } = useApi(
    () => staffService.getAssignedComplaintById(id as string),
    { immediate: true }
  );

  const complaint = data?.data;

  useEffect(() => {
    if (!complaint || complaint.status === "RESOLVED") return;

    const interval = setInterval(() => {
      refetchComplaint();
    }, 10000);

    return () => clearInterval(interval);
  }, [complaint?.status, refetchComplaint]);

  const { execute: updateStatus, loading: updating } = useApi(
    staffService.updateComplaintStatus,
    {
      onSuccess: () => {
        toast.success("Status updated successfully");
        setResolutionNote("");
        setSelectedStatus("");
        refetchComplaint();
      },
    }
  );

  const { execute: requestReassign, loading: requesting } = useApi(
    staffService.requestReassignment,
    {
      onSuccess: () => {
        toast.success("Reassignment requested");
        setReason("");
      },
    }
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );

  if (!complaint) return <div>Complaint not found</div>;

  const attachments = complaint.attachments || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 md:space-y-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Complaint Details
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-5 md:space-y-6">

          <div className="bg-slate-900/70 backdrop-blur-xl p-4 md:p-8 rounded-2xl border border-slate-700 shadow-lg space-y-4 md:space-y-5">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              {complaint.title}
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-line break-words overflow-hidden">
  {complaint.description}
</p>

            <div className="flex flex-wrap gap-3 md:gap-4 items-center">
              <StatusBadge status={complaint.status} />

              <span className="text-slate-400 text-xs md:text-sm">
                Created: {new Date(complaint.createdAt).toLocaleString()}
              </span>

              {complaint.category && (
                <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30">
                  {complaint.category}
                </span>
              )}

              <span className="flex items-center gap-2 text-xs text-indigo-400">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                Live Updates
              </span>
            </div>
          </div>

          {complaint.resolutionNote && (
            <div className="bg-green-500/10 border border-green-500/30 p-4 md:p-6 rounded-2xl backdrop-blur-xl">
              <h3 className="text-green-400 font-semibold mb-3">
                Resolution Summary
              </h3>

              <p className="text-slate-300 whitespace-pre-line leading-relaxed text-sm md:text-base">
                {complaint.resolutionNote}
              </p>
            </div>
          )}

          {attachments.length > 0 && (
            <div className="bg-slate-900/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-lg md:text-xl font-semibold">
                Attachments ({attachments.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {attachments.map((file: string, index: number) => (
                  <div
                    key={index}
                    className="relative group bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
                  >
                    <img
                      src={file}
                      alt="attachment"
                      className="w-full h-36 md:h-40 object-cover"
                    />

                    <button
                      onClick={() => setPreviewFile(file)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5 md:space-y-6">

          <div className="bg-slate-900/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base md:text-lg font-semibold">
              Update Status
            </h3>

            <select
              className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            {(selectedStatus === "RESOLVED" ||
              selectedStatus === "REJECTED" ||
              selectedStatus === "IN_PROGRESS") && (
              <textarea
                placeholder="Write resolution/rejection note..."
                className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:border-indigo-500"
                rows={4}
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
              />
            )}

            <button
              onClick={() => {
                if (!selectedStatus) return;

                if (
                  (selectedStatus === "RESOLVED" ||
                    selectedStatus === "REJECTED") &&
                  !resolutionNote.trim()
                ) {
                  toast.error("Resolution note is required");
                  return;
                }

                updateStatus(id as string, {
                  status: selectedStatus,
                  resolutionNote,
                });
              }}
              disabled={!selectedStatus || updating}
              className="w-full bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Status"}
            </button>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base md:text-lg font-semibold">
              Request Reassignment
            </h3>

            <textarea
              placeholder="Enter reason..."
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:border-red-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <button
              onClick={() =>
                requestReassign(id as string, reason)
              }
              disabled={!reason || requesting}
              className="w-full bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {requesting ? "Submitting..." : "Request Reassignment"}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-4 right-4 bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <X size={18} />
            </button>

            <img
              src={previewFile}
              alt="preview"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ComplaintDetails;