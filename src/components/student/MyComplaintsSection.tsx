import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Complaint } from "../../types/complaint.types";
import { useComplaintService } from "../../services/complaint.service";
import ComplaintTracker from "./ComplaintTracker";

export default function MyComplaintsSection() {
  const { getMyComplaints } = useComplaintService();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  useEffect(() => {
    getMyComplaints()
      .then(setComplaints)
      .finally(() => setLoading(false));
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "RESOLVED":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "REJECTED":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">
        Loading your complaints...
      </div>
    );
  }

  if (!complaints.length) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 text-center backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white">
          No Complaints Yet
        </h3>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          You haven’t submitted any complaints.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

      {complaints.map((c) => (
        <motion.div
          key={c._id}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-lg hover:shadow-indigo-500/10 transition flex flex-col"
        >

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">

            <h3 className="text-base sm:text-lg font-semibold text-white break-words">
              {c.title}
            </h3>

            <span
              className={`w-fit px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(
                c.status
              )}`}
            >
              {c.status}
            </span>

          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 break-words">
            {c.description}
          </p>

          {/* Tracker */}
          <div className="mt-auto pt-4 border-t border-slate-800 overflow-x-auto">
            <ComplaintTracker status={c.status} />
          </div>

          {/* Button */}
          <div className="mt-4 flex justify-start sm:justify-end">
            <button
              onClick={() => setSelectedComplaint(c)}
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition w-full sm:w-auto"
            >
              View Details
            </button>
          </div>

        </motion.div>
      ))}

      {/* Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl
            w-full max-w-2xl max-h-[90vh] overflow-y-auto
            p-4 sm:p-5 md:p-8 relative shadow-xl"
          >

            {/* Close */}
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 break-words">
              {selectedComplaint.title}
            </h2>

            {/* Status */}
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle(
                selectedComplaint.status
              )}`}
            >
              {selectedComplaint.status}
            </span>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-slate-300 font-medium mb-2">
                Description
              </h4>
              <p className="text-slate-400 text-sm whitespace-pre-line break-words">
                {selectedComplaint.description}
              </p>
            </div>

            {/* Attachments */}
            {Array.isArray(selectedComplaint.attachments) &&
              selectedComplaint.attachments.length > 0 && (
                <div className="mt-6">

                  <h4 className="text-slate-300 font-semibold mb-4">
                    Attachments ({selectedComplaint.attachments.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {selectedComplaint.attachments.map((file, index) => {

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

            {/* Tracker */}
            <div className="mt-6 pt-4 border-t border-slate-800 overflow-x-auto">
              <ComplaintTracker status={selectedComplaint.status} />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}