import React, { useState } from "react";
import { KeyRound,  Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const ChangePassword: React.FC = () => {
  const { changePassword } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;

    try {
      setSubmitting(true);
      await changePassword({
        password: oldPassword,
        newPassword: newPassword,
      });
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071122] via-[#0d1116] to-[#071021] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-transparent relative">
        <div className="flex flex-col md:flex-row h-full">

          {/* LEFT PANEL */}
          <div className="md:w-5/12 p-6 md:p-10 bg-gradient-to-br from-[#b45b1f] via-[#6f2b0b] to-[#0b1116] text-white flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-widest mb-4 opacity-80">
                ACCOUNT SECURITY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Change your password
              </h2>
              <p className="text-sm opacity-80 max-w-md">
                Keep your account secure by updating your password regularly.
              </p>
            </div>

            <div className="pt-6 text-xs opacity-80">
              <p className="mb-1 font-medium">🔐 Security Tip</p>
              <p className="max-w-xs">
                Use a strong password with letters, numbers and symbols.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="md:w-7/12 bg-[#060612] p-6 md:p-10 text-white flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffb86b] to-[#ff6a3a] flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-[#071021]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Update Password</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Enter your current and new password
                </p>
              </div>
            </div>

            {success ? (
              <div className="bg-green-600/10 border border-green-500 text-green-400 p-4 rounded-lg text-sm">
                ✅ Password changed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Current Password */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    CURRENT PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-transparent border-b border-gray-700 py-2 px-2 pr-10 outline-none focus:border-[#ff9a5a]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute right-2 top-2 text-gray-400"
                    >
                      {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    NEW PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-transparent border-b border-gray-700 py-2 px-2 pr-10 outline-none focus:border-[#ff9a5a]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2 top-2 text-gray-400"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-[#ff7a2a] to-[#ffb84d] text-black font-semibold shadow-sm hover:opacity-95 transition disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            )}

            <div className="text-center mt-auto pt-6">
              <p className="text-sm text-gray-500">
                Smart Complaint Management System
              </p>
            </div>
          </div>
        </div>

        {/* Neon Border Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,80,50,0.08), 0 0 40px rgba(255,80,50,0.06)",
            borderRadius: 24,
            border: "1px solid rgba(255,80,50,0.12)",
          }}
        />
      </div>
    </div>
  );
};

export default ChangePassword;