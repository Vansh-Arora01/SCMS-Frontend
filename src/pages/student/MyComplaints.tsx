import MyComplaintsSection from "../../components/student/MyComplaintsSection";
import StatsSection from "../../components/student/StatsSection";

const MyComplaints = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* Stats */}
      <StatsSection />

      {/* Complaints List */}
      <div className="mt-6 md:mt-8 lg:mt-10">
        <MyComplaintsSection />
      </div>

    </div>
  );
};

export default MyComplaints;