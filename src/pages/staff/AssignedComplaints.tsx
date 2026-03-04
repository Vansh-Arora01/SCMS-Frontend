import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import ComplaintCard from "../../components/staff/ComplaintCard";
import EmptyState from "../../components/staff/EmptyState";
import { ClipboardList, Clock, CheckCircle} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const AssignedComplaints = () => {
  const { data, loading } = useApi(
    staffService.getAssignedComplaints,
    { immediate: true }
  );

  const complaints = data?.data || [];

  const [search, setSearch] = useState("");

  // Filtered complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c: any) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [complaints, search]);

  // Stats
  const total = complaints.length;
  const pending = complaints.filter((c: any) => c.status !== "RESOLVED").length;
  const resolved = complaints.filter((c: any) => c.status === "RESOLVED").length;

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );

  if (!complaints.length) return <EmptyState />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">
          Assigned Complaints
        </h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-3 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:outline-none text-white"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm">Total</p>
          <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold">
                  {total}
                </h2>
                <ClipboardList className="text-blue-400" />
              </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl">
          <p className="text-yellow-400 text-sm">Pending</p>
          <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-yellow-300">
                  {pending}
                </h2>
                <Clock className="text-yellow-400" />
              </div>
            </div>

        <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl">
          <p className="text-green-400 text-sm">Resolved</p>
           <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-bold text-green-300">
                  {resolved}
                </h2>
                <CheckCircle className="text-green-400" />
              </div>
            </div>
      </div>

      {/* Complaint Grid */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
          No complaints match your search.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredComplaints.map((c: any) => (
            <ComplaintCard key={c._id} complaint={c} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AssignedComplaints;