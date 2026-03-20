import { useState } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { motion } from "framer-motion";
import { Building2, Hash } from "lucide-react";

const CreateCollege = (): JSX.Element => {
  const [form, setForm] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.code) return alert("All fields required");

    try {
      setLoading(true);
      await superAdminService.createCollege(form);
      alert("College created ✅");
      setForm({ name: "", code: "" });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto bg-slate-900/60 backdrop-blur-xl 
      border border-slate-700 rounded-2xl p-8 shadow-lg space-y-6 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-2xl" />

      {/* Header */}
      <h2 className="text-2xl font-semibold text-white">
        Create College
      </h2>

      {/* Form */}
      <div className="space-y-4">

        {/* College Name */}
        <div className="relative">
          <Building2 className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            placeholder="College Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* College Code */}
        <div className="relative">
          <Hash className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            placeholder="College Code (e.g. ABES)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
        text-white font-medium shadow-lg shadow-indigo-600/30 transition disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create College"}
      </motion.button>

    </motion.div>
  );
};

export default CreateCollege;