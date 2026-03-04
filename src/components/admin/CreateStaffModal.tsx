import { useState } from "react";
import { useAdminService } from "../../services/admin.service";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const CreateStaffModal = ({ onClose }: Props) => {
  const { createStaff } = useAdminService(); // ✅ use hook pattern

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    
    enrollment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, password, department,  enrollment } = form;

    if (!name || !email || !password || !department ||  !enrollment) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createStaff({
        ...form,
        role: "STAFF",
         // ✅ required by backend
      });

      toast.success("Staff created successfully 🚀");
      onClose();

    } catch (error) {
      // handled by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-3xl shadow-2xl p-8">

        <h2 className="text-2xl font-semibold text-indigo-400 mb-6">
          Create Staff Member
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition"
          />

          {/* <select
  name="department"
  value={form.department}
  onChange={(e) =>
    setForm({ ...form, department: e.target.value })
  }
  className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition text-white"
>
  <option value="">Select Department</option>
  <option value="CSE">CSE</option>
  <option value="IT">IT</option>
  <option value="ECE">ECE</option>
  <option value="MECH">MECH</option>
  <option value="CIVIL">CIVIL</option>
</select> */}

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition"
          />

          <input
            type="text"
            name="enrollment"
            placeholder="Enrollment ID"
            value={form.enrollment}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none transition"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
          type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
          type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Staff"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreateStaffModal;
