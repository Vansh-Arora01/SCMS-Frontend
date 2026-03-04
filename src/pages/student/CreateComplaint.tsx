import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useComplaintService } from "../../services/complaint.service";
import {
  CreateComplaintPayload,
  ComplaintCategory,
} from "../../types/complaint.types";
import api from "../../services/api";
import { PlusCircle, UploadCloud } from "lucide-react";

export default function CreateComplaint() {
  const navigate = useNavigate();
  const { createComplaint } = useComplaintService();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState<CreateComplaintPayload>({
    title: "",
    description: "",
    category: "INFRASTRUCTURE",
    isAnonymous: false,
    eligibleforVote: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create complaint first
      const complaint = await createComplaint(form);

      // 2️⃣ If file selected → upload
      if (file && complaint?._id) {
        const formData = new FormData();
        formData.append("file", file);

        await api.post(
          `/complain/${complaint._id}/media`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      navigate("/student");
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <PlusCircle className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-semibold text-white">
          Create New Complaint
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <input
          required
          placeholder="Complaint Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        />

        {/* Description */}
        <textarea
          required
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        />

        {/* Category */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value as ComplaintCategory,
            })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="INFRASTRUCTURE">Infrastructure</option>
          <option value="HOSTEL">Hostel</option>
          <option value="ACADEMIC">Academic</option>
          <option value="OTHER">Other</option>
        </select>

        {/* File Upload Section */}
        <div className="border border-slate-700 rounded-lg p-6 bg-slate-800/50 text-center">
          <label className="cursor-pointer flex flex-col items-center gap-2 text-slate-400">
            <UploadCloud size={24} />
            <span>Click to upload image or PDF</span>
            <input
              type="file"
              accept="image/*,.pdf"
              hidden
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
          </label>

          {file && (
            <p className="mt-3 text-indigo-400 text-sm">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Toggles */}
        <div className="flex gap-6 text-slate-300 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isAnonymous}
              onChange={(e) =>
                setForm({ ...form, isAnonymous: e.target.checked })
              }
              className="accent-indigo-600"
            />
            Submit Anonymously
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.eligibleforVote}
              onChange={(e) =>
                setForm({ ...form, eligibleforVote: e.target.checked })
              }
              className="accent-indigo-600"
            />
            Allow Voting
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}