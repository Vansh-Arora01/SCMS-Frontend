import { useState, useEffect } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { College } from "../../types/superadmin.types";

const CreateAdmin = (): JSX.Element => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    enrollment: "",
    collegeId: "",
  });

  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
  const fetchColleges = async () => {
    try {
      const res = await superAdminService.getColleges();
      setColleges(res.data.data);
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
    <div className="max-w-xl bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
      <h2 className="text-xl mb-4 font-semibold">Create Admin</h2>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input placeholder="Enrollment" onChange={(e) => setForm({...form, enrollment: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />

      <select onChange={(e) => setForm({...form, collegeId: e.target.value})}>
        <option>Select College</option>
        {colleges.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <button onClick={handleSubmit} className="mt-4 bg-indigo-600 px-4 py-2 rounded">
        Create Admin
      </button>
    </div>
  );
};

export default CreateAdmin;