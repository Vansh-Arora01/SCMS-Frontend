import { useEffect, useState } from "react";
import { superAdminService } from "../../services/superadmin.service";
import { College } from "../../types/superadmin.types";

const Colleges = (): JSX.Element => {
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    superAdminService.getColleges().then(res => {
      setColleges(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Colleges</h2>

      {colleges.map(c => (
        <div key={c._id} className="bg-slate-700 p-4 mb-2 rounded">
          <p className="text-white">{c.name}</p>
          <p className="text-slate-400">{c.code}</p>
        </div>
      ))}
    </div>
  );
};

export default Colleges;