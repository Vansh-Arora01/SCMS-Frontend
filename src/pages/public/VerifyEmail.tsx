import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import api from "../../services/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const [type, setType] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`auth/verify-email/${token}`);
        setStatus("Email verified successfully");
        setType("success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        setStatus("Invalid or expired verification link");
        setType("error");
      }
    };

    if (token) verifyEmail();
  }, [token]);

  const renderIcon = () => {
    if (type === "loading")
      return (
        <Loader2 className="w-12 h-12 animate-spin text-indigo-400" />
      );
    if (type === "success")
      return <CheckCircle2 className="w-12 h-12 text-green-400" />;
    if (type === "error")
      return <XCircle className="w-12 h-12 text-red-400" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-4">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            {renderIcon()}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold tracking-wide mb-3">
            Email Verification
          </h2>

          {/* Status */}
          <p
            className={`text-lg ${
              type === "success"
                ? "text-green-400"
                : type === "error"
                ? "text-red-400"
                : "text-slate-300"
            }`}
          >
            {status}
          </p>

          {/* Subtext */}
          {type === "loading" && (
            <p className="text-sm text-slate-400 mt-3">
              Please wait while we verify your email...
            </p>
          )}

          {type === "success" && (
            <p className="text-sm text-slate-400 mt-3">
              Redirecting you to dashboard...
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}