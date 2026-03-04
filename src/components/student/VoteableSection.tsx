import { useEffect, useState } from "react";
import { Complaint } from "../../types/complaint.types";
import { useComplaintService } from "../../services/complaint.service";
import { motion } from "framer-motion";
import { ThumbsUp, Tag, AlertCircle, Paperclip } from "lucide-react";

export default function VoteableSection() {
  const { getVoteableComplaints, vote, unvote } = useComplaintService();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fetchVoteables = async () => {
    const data = await getVoteableComplaints();
    setComplaints(data);
  };

  useEffect(() => {
    fetchVoteables();
  }, []);

  const handleVote = async (id: string) => {
    setLoadingId(id);

    setComplaints((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, voteCount: c.voteCount + 1, hasVoted: true } : c,
      ),
    );

    try {
      await vote(id);
    } catch {
      fetchVoteables();
    } finally {
      setLoadingId(null);
    }
  };

  const handleUnvote = async (id: string) => {
    setLoadingId(id);

    setComplaints((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, voteCount: c.voteCount - 1, hasVoted: false }
          : c,
      ),
    );

    try {
      await unvote(id);
    } catch {
      fetchVoteables();
    } finally {
      setLoadingId(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      default:
        return "text-green-400 bg-green-500/10 border-green-500/30";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {complaints.map((c, index) => (
        <motion.div
          key={c._id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/10 transition-all"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg line-clamp-1">
                {c.title}
              </h3>
              <p className="text-slate-400 text-xs mt-1">{c.collegeId}</p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full border ${getPriorityColor(
                c.priority,
              )}`}
            >
              {c.priority}
            </span>
          </div>

          {/* Description */}
          <p
            className={`text-slate-400 text-sm mb-2 break-words ${
              expandedId === c._id ? "" : "line-clamp-3"
            }`}
          >
            {c.description}
          </p>

          <button
            onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
            className="text-xs text-indigo-400 hover:text-indigo-300 mb-4"
          >
            {expandedId === c._id ? "Show Less" : "View More"}
          </button>
          {expandedId === c._id && (
  <div className="space-y-3 mt-3 text-sm text-slate-300">

    {/* Created Date */}
    <div>
      <span className="text-slate-500 text-xs">Created At:</span>
      <p>{new Date(c.createdAt).toLocaleString()}</p>
    </div>

    {/* Attachments */}
    {Array.isArray(c.attachments) && c.attachments.length > 0 && (
  <div className="mt-3">
    <span className="text-slate-500 text-xs">Attachments:</span>

    <div className="grid grid-cols-2 gap-3 mt-2">
      {c.attachments.map((file, i) => (
        <div key={i} className="flex flex-col gap-2">
          <img
            src={file.url}
            alt="attachment"
            className="rounded-lg object-cover h-32 w-full"
          />

          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
          >
            View Full Image
          </a>
        </div>
      ))}
    </div>
  </div>
)}
  </div>
)}

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Tag size={12} />
              {c.category}
            </span>

            <span className="flex items-center gap-1">
              <AlertCircle size={12} />
              {c.status}
            </span>

            {(c.attachments?.length ?? 0) > 0 && (
              <span className="flex items-center gap-1 text-indigo-400">
                <Paperclip size={12} />
                {c.attachments?.length}
              </span>
            )}
          </div>

          {/* Voting Section */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2 text-slate-300">
              <ThumbsUp size={16} className="text-indigo-400" />
              <span className="font-semibold text-white">{c.voteCount}</span>
              <span className="text-xs">votes</span>
            </div>

            {c.hasVoted ? (
              <button
                disabled={loadingId === c._id}
                onClick={() => handleUnvote(c._id)}
                className="px-4 py-1.5 text-sm rounded-lg border border-indigo-500/30 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 transition"
              >
                Remove Vote
              </button>
            ) : (
              <button
                disabled={loadingId === c._id}
                onClick={() => handleVote(c._id)}
                className="px-4 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/30"
              >
                Vote
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
