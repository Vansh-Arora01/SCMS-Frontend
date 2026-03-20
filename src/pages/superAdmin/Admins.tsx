import { useEffect, useState } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { Admin } from "../../types/superadmin.types";
import { motion } from "framer-motion";
import {  Mail, Building2, Trash2 } from "lucide-react";

const Admins = (): JSX.Element => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  const fetchAdmins = async () => {
    const res = await superAdminService.getAdmins();
    setAdmins(res.data.data); // ✅ fix based on ApiResponse
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete admin?")) return;

    await superAdminService.deleteAdmin(id);
    fetchAdmins();
  };

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
          Admin Management
        </h2>
        <p className="text-sm text-slate-400">
          Total: {admins.length}
        </p>
      </div>

      {/* Empty State */}
      {admins.length === 0 && (
        <div className="text-center text-slate-400 py-10">
          No admins found
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {admins.map((a, index) => (
          <motion.div
            key={a._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 
            rounded-2xl p-5 shadow-lg hover:border-indigo-500/40 transition relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-2xl" />

            {/* Top Section */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                {a.name?.[0]?.toUpperCase()}
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {a.name}
                </h3>
                <p className="text-xs text-slate-400">
                  Admin
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm">

              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={14} className="text-indigo-400" />
                {a.email}
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Building2 size={14} className="text-purple-400" />
                {a.collegeId?.name || "No College"}
              </div>

            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(a._id)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm 
                bg-red-500/10 text-red-400 border border-red-500/30 
                rounded-lg hover:bg-red-500/20 transition"
              >
                <Trash2 size={14} />
                Delete
              </motion.button>
            </div>

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Admins;