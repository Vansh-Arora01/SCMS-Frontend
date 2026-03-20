import { useEffect, useState } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { College } from "../../types/superadmin.types";
import { motion } from "framer-motion";
import { Building2, Hash } from "lucide-react";

const Colleges = (): JSX.Element => {
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await superAdminService.getColleges();
        setColleges(res.data); // ✅ FIXED
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };

    fetchColleges();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">
          Colleges
        </h2>
        <p className="text-sm text-slate-400">
          Total: {colleges.length}
        </p>
      </div>

      {/* Empty State */}
      {colleges.length === 0 && (
        <div className="text-center text-slate-400 py-10">
          No colleges found
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((c, index) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 
            rounded-2xl p-5 shadow-lg hover:border-indigo-500/40 transition relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-2xl" />

            {/* Top */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Building2 size={18} />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Institution
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Hash size={14} className="text-indigo-400" />
              Code: {c.code || "N/A"}
            </div>

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Colleges;