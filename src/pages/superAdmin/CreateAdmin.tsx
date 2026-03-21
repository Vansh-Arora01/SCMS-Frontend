import { useState, useEffect } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { College } from "../../types/superadmin.types";
import { motion } from "framer-motion";
import { User, Mail, Lock, Hash } from "lucide-react";

const CreateAdmin = (): JSX.Element => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    enrollment: "",
    collegeId: "",
    college:"",
  });

  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await superAdminService.getColleges();
        setColleges(res.data);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async () => {
    try {
      await superAdminService.createAdmin(form);
      alert("Admin created ✅");
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-xl 
      border border-slate-700 rounded-2xl p-8 shadow-lg space-y-6 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none rounded-2xl" />

      <h2 className="text-2xl font-semibold text-white">
        Create Admin
      </h2>

      {/* Form */}
      <div className="space-y-4">

        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            placeholder="Email Address"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Enrollment */}
        <div className="relative">
          <Hash className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            placeholder="Enrollment Number"
            onChange={(e) => setForm({ ...form, enrollment: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* College Dropdown */}
        <div>
          <select
            onChange={(e) => setForm({ ...form, collegeId: e.target.value })}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Select College</option>
            {colleges.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleSubmit}
        className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
        text-white font-medium shadow-lg shadow-indigo-600/30 transition"
      >
        Create Admin
      </motion.button>

    </motion.div>
  );
};

export default CreateAdmin;