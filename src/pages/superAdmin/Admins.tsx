import { useEffect, useState } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { Admin } from "../../types/superadmin.types";

const Admins = (): JSX.Element => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  const fetchAdmins = async () => {
    const res = await superAdminService.getAdmins();
    setAdmins(res.data);
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
    <div>
      <h2 className="text-xl mb-4">Admins</h2>

      {admins.map(a => (
        <div key={a._id} className="bg-slate-700 p-4 mb-2 rounded">
          <p>{a.name}</p>
          <p>{a.email}</p>
          <p className="text-sm text-slate-400">
            {a.collegeId?.name}
          </p>

          <button
            onClick={() => handleDelete(a._id)}
            className="text-red-400 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admins;