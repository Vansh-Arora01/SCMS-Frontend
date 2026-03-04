import MyComplaintsSection from "../../components/student/MyComplaintsSection";
import StatsSection from "../../components/student/StatsSection";

const MyComplaints = () => {
  
  return (
    <div>
      <StatsSection />
      <div className="mt-8">
        <MyComplaintsSection />
      </div>
    </div>
  );
};

export default MyComplaints;