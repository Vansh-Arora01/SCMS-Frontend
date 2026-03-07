import ChangePassword from "../../components/shared/ChangePassword";
import { motion } from "framer-motion";

const ChangePasswordPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center px-4 py-12 overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[160px] animate-pulse" />
      </div>

      {/* Page Container */}
      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        {/* Title Animation */}
        <motion.div
          className="text-center mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Change Your Password
          </h1>

          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Keep your account secure by updating your password regularly
          </p>
        </motion.div>

        {/* Card Animation */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl shadow-black/40 p-2"
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
        >
          <ChangePassword />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;