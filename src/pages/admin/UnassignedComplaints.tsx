import { useEffect, useState } from "react";
import { useAdminService } from "../../services/admin.service";
import ComplaintCard from "../../components/admin/ComplaintCard";
import AssignModal from "../../components/admin/AssignModal";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

interface Attachment {
  url: string;
  fileType?: "IMAGE" | "PDF" | "OTHER";
}

interface Complaint {
  _id: string;
  complaintNumber?: string;
  title: string;
  description: string;
  category: string;
  voteCount?: number;
  isAnonymous?:boolean;
  priority?: "low" | "medium" | "high" | "critical";
  attachments?: Attachment[];
  createdBy?: {
    name?: string;
    email?: string;
    enrollment?:string;
  } | null;
  createdAt?: string;
}

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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative shadow-xl">

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

            {/* Complaint ID */}
            {viewComplaint.complaintNumber && (
              <div className="mb-4">
                <span className="text-slate-400 text-sm">Complaint ID:</span>
                <p className="text-white">{viewComplaint.complaintNumber}</p>
              </div>
            )}

            {/* Category */}
            <div className="mb-4">
              <span className="text-slate-400 text-sm">Category:</span>
              <p className="text-white">{viewComplaint.category}</p>
            </div>

            {/* Votes + Priority */}
           {/* Metadata Section */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

  {/* Votes */}
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col">
    <span className="text-xs text-slate-400 mb-1">Votes</span>
    <span className="text-lg font-semibold text-white">
      {viewComplaint.voteCount || 0}
    </span>
  </div>

  {/* Priority */}
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col">
    <span className="text-xs text-slate-400 mb-2">Priority</span>

    <span
      className={`px-3 py-1 text-xs rounded-full border w-fit ${getPriorityStyle(
        viewComplaint.priority
      )}`}
    >
      {(viewComplaint.priority || "low").toUpperCase()}
    </span>
  </div>

  {/* Created By */}
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col">
  <span className="text-xs text-slate-400 mb-1">Created By</span>

  <span className="text-white text-sm font-medium">
    {viewComplaint.isAnonymous
      ? "Anonymous"
      : viewComplaint.createdBy?.name}
  </span>

  {!viewComplaint.isAnonymous && viewComplaint.createdBy?.enrollment && (
    <span className="text-xs text-slate-400">
      {viewComplaint.createdBy.enrollment}
    </span>
  )}
</div>

</div>

            {/* Created At */}
            {viewComplaint.createdAt && (
              <div className="mb-4">
                <span className="text-slate-400 text-sm">Created At:</span>
                <p className="text-white">
                  {new Date(viewComplaint.createdAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-slate-300 font-medium mb-2">
                Description
              </h4>

              <p className="text-slate-400 text-sm whitespace-pre-line break-words">
                {viewComplaint.description}
              </p>
            </div>

            {/* Attachments */}
            {Array.isArray(viewComplaint.attachments) &&
              viewComplaint.attachments.length > 0 && (
                <div className="mt-6">

                  <h4 className="text-slate-300 font-semibold mb-4">
                    Attachments ({viewComplaint.attachments.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {viewComplaint.attachments.map((file, index) => {

                      const isImage =
                        file.fileType === "IMAGE" ||
                        file.url.match(/\.(jpeg|jpg|png|webp)$/i);

                      return (
                        <div
                          key={index}
                          className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 hover:border-indigo-500/40 transition"
                        >

                          {isImage ? (
                            <div className="relative group">

                              <img
                                src={file.url}
                                alt="Complaint Attachment"
                                className="rounded-lg max-h-40 sm:max-h-56 w-full object-cover"
                              />

                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm rounded-lg transition"
                              >
                                View Full Image
                              </a>

                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">

                              <span className="text-slate-400 text-xs">
                                Document Attachment
                              </span>

                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-2 rounded-lg w-fit transition"
                              >
                                Open File
                              </a>

                            </div>
                          )}

                        </div>
                      );
                    })}

                  </div>

                </div>
              )}

            {/* Assign Button */}
            <div className="mt-8 flex justify-end">

              <button
                onClick={() => {
                  setSelected(viewComplaint);
                  setViewComplaint(null);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
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