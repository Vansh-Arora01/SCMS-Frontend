import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, BadgeCheck, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !enrollment) return;

    try {
      setSubmitting(true);
      await forgotPassword({ email, enrollment });
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-[#071122] via-[#0d1116] to-[#071021] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-transparent relative"
        style={{
          maxHeight: "calc(100vh - 48px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col md:flex-row h-full">

          {/* LEFT PANEL */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-5/12 p-6 md:p-10 bg-gradient-to-br from-[#b45b1f] via-[#6f2b0b] to-[#0b1116] text-white flex flex-col justify-between"
          >
            <div>
              <p className="text-xs tracking-widest mb-4 opacity-80">
                PASSWORD RECOVERY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Forgot your password?
              </h2>
              <p className="text-sm opacity-80 max-w-md">
                Enter your registered enrollment number and email to receive password reset instructions.
              </p>
            </div>

            <div className="pt-6 text-xs opacity-80">
              <p className="mb-1 font-medium">🔒 Security</p>
              <p className="max-w-xs">
                Make sure you use the email linked to your SCMS account.
              </p>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-7/12 bg-[#060612] p-6 md:p-10 text-white flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffb86b] to-[#ff6a3a] flex items-center justify-center"
              >
                <Calendar className="w-6 h-6 text-[#071021]" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">Reset Password</h3>
                <p className="text-sm text-gray-400 mt-1">
                  We’ll send you reset instructions
                </p>
              </div>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-green-600/10 border border-green-500 text-green-400 p-4 rounded-lg text-sm"
              >
                ✅ If an account exists, reset instructions have been sent to your email.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Enrollment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-xs text-gray-400 mb-2">
                    ENROLLMENT NUMBER
                  </label>
                  <div className="relative">
                    <input
                      value={enrollment}
                      onChange={(e) => setEnrollment(e.target.value)}
                      type="text"
                      placeholder="SCMS2023XXX"
                      className="w-full bg-transparent border-b border-gray-700 py-2 px-2 pr-8 outline-none focus:border-[#ff9a5a] transition-all duration-300"
                    />
                    <BadgeCheck className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs text-gray-400 mb-2">
                    EMAIL
                  </label>
                  <div className="relative">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent border-b border-gray-700 py-2 px-2 pr-8 outline-none focus:border-[#ff9a5a] transition-all duration-300"
                    />
                    <Mail className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-[#ff7a2a] to-[#ffb84d] text-black font-semibold shadow-sm hover:opacity-95 transition disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            )}

            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-6"
            >
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-[#ff9a5a] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign in
              </Link>
            </motion.div>

            {/* Footer (UNCHANGED) */}
            <div className="text-center mt-auto pt-6">
              <p className="text-sm text-gray-500">
                Smart Complaint Management System
              </p>
            </div>
          </motion.div>
        </div>

        {/* Neon Border Effect (UNCHANGED) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,80,50,0.08), 0 0 40px rgba(255,80,50,0.06)",
            borderRadius: 24,
            border: "1px solid rgba(255,80,50,0.12)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;