import StatsSection from "../../components/student/StatsSection";
import ComplaintStatusChart from "../../components/student/ComplaintStatusChart";
import ComplaintTrendChart from "../../components/student/ComplaintTrendChart";

import { useEffect, useState } from "react";
import { Complaint } from "../../types/complaint.types";
import { useComplaintService } from "../../services/complaint.service";


export default function StudentHome() {

  const { getMyComplaints } = useComplaintService();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const data = await getMyComplaints();
      setComplaints(data);
    };

    fetchComplaints();
  }, []);

  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <StatsSection complaints={complaints} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ComplaintStatusChart complaints={complaints} />

        <ComplaintTrendChart complaints={complaints}/>

      </div>

    </div>
  );
}
