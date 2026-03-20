import { useState } from "react";
import { superAdminService } from "../../services/superadmin.service";

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
    <div className="max-w-xl bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
      <h2 className="text-xl mb-4 font-semibold">Create College</h2>

      <input
        placeholder="College Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-3 p-2 rounded bg-slate-800"
      />

      <input
        placeholder="College Code"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        className="w-full mb-3 p-2 rounded bg-slate-800"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create College"}
      </button>
    </div>
  );
};

export default CreateCollege;