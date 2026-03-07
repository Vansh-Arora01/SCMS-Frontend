import MyComplaintsSection from "../../components/student/MyComplaintsSection";
import StatsSection from "../../components/student/StatsSection";
import { useEffect, useState } from "react";
import { Complaint } from "../../types/complaint.types";
import { useComplaintService } from "../../services/complaint.service";
const MyComplaints = () => {
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
    <div className="w-full max-w-7xl mx-auto">

      {/* Stats */}
      <StatsSection complaints={complaints}/>

      {/* Complaints List */}
      <div className="mt-6 md:mt-8 lg:mt-10">
        <MyComplaintsSection />
      </div>

    </div>
  );
};

export default MyComplaints;