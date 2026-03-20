import { useApi } from "../../hooks/useApi";
import { staffService } from "../../services/staff.service";
import ComplaintCard from "../../components/staff/ComplaintCard";
import EmptyState from "../../components/staff/EmptyState";
import { ClipboardList, Clock, CheckCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const AssignedComplaints = () => {
  const { data, loading } = useApi(
    staffService.getAssignedComplaints,
    { immediate: true }
  );

  const complaints = data?.data || [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // 🔥 Combined Filtering
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c: any) => {
      const matchesSearch =
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.complaintNumber?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  // 📊 Stats (based on filtered data)
  const total = filteredComplaints.length;
  const pending = filteredComplaints.filter(
    (c: any) => c.status !== "RESOLVED"
  ).length;
  const resolved = filteredComplaints.filter(
    (c: any) => c.status === "RESOLVED"
  ).length;

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
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Assigned Complaints
        </h1>

        {/* 🔥 Search + Filter (Fully Responsive) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

          {/* Search */}
          <div className="relative w-full sm:flex-1 md:w-72">
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-xl text-sm focus:border-indigo-500"
          >
            <option value="ALL">All</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="OPEN">OPEN</option>

            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm">Total</p>
          <div className="flex items-center justify-between mt-3">
            <h2 className="text-2xl font-bold text-white">{total}</h2>
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
          No complaints match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredComplaints.map((c: any) => (
            <ComplaintCard key={c._id} complaint={c} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AssignedComplaints;