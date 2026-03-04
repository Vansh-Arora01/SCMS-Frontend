
// export default Register;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {  Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim() || !college.trim() || !enrollment.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        enrollment: enrollment.toUpperCase(),
        college: college.trim(),
      };

      await register(payload);
      toast.success("Account created successfully!");
      navigate("/login");

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071122] via-[#0d1116] to-[#071021] flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl min-h-[85vh] rounded-2xl shadow-2xl border border-[#1f1f2e] overflow-hidden"
      >

        <div className="flex flex-col md:flex-row h-full">

          {/* LEFT PANEL */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
           className="md:w-5/12 p-6 md:p-10 bg-gradient-to-br from-[#b45b1f] via-[#6f2b0b] to-[#0b1116] text-white flex flex-col justify-between"
          >
            <div>
              <p className="text-xs tracking-widest mb-4 opacity-80">WELCOME TO SCMS</p>
              <h2 className="text-3xl font-bold leading-tight mb-4">
                Create Your Student Account
              </h2>
              <p className="text-sm opacity-80">
                Smart Complaint Management System with secure access and streamlined workflows.
              </p>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-7/12 bg-[#060612] p-10 text-white flex flex-col justify-center"
          >

            <div className="mb-8">
              <h3 className="text-2xl font-bold">Register</h3>
              <p className="text-sm text-gray-400">
                Fill in your details to get started
              </p>
            </div>

            <motion.form
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {[
                { label: "FULL NAME", value: name, setter: setName, type: "text" },
                { label: "EMAIL", value: email, setter: setEmail, type: "email" },
                { label: "ENROLLMENT", value: enrollment, setter: (v: string) => setEnrollment(v.toUpperCase()), type: "text" },
                
              ].map((field, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                    
                  <label className="text-xs text-gray-400">{field.label}</label>
                  <input
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    type={field.type}
                    className="w-full bg-transparent border-b border-gray-700 py-2 outline-none focus:border-[#ff9a5a]"
                  />
                </motion.div>
              ))}
              <motion.div
  variants={{
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }}
>
  <label className="text-xs text-gray-400">COLLEGE</label>
  <select
    value={college}
    onChange={(e) => setCollege(e.target.value)}
    className="w-full bg-[#0f0f1a] border-b border-gray-700 py-2 outline-none focus:border-[#ff9a5a] text-white"
  >
    <option value="">Select College</option>
    <option value="CCSIT">CCSIT</option>
    <option value="Nursing">Nursing</option>
    <option value="Law">Law</option>
    <option value="FOE">FOE</option>
    <option value="Dental">Dental</option>
  </select>
</motion.div>

              {/* Password */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="text-xs text-gray-400">PASSWORD</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent border-b border-gray-700 py-2 pr-10 outline-none focus:border-[#ff9a5a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <label className="text-xs text-gray-400">CONFIRM PASSWORD</label>
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent border-b border-gray-700 py-2 outline-none focus:border-[#ff9a5a]"
                />
              </motion.div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-[#ff7a2a] to-[#ffb84d] text-black font-semibold hover:opacity-95 transition disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : "Register"}
              </button>

            </motion.form>

            {/* Bottom Link */}
            <div className="text-center mt-8">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#ff9a5a] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;