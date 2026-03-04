import { useState } from "react";
import { Users, Layers } from "lucide-react";
import  Button  from "../components/ui/Button.tsx";


export default function ComplaintLifecycle3D() {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <section className="py-28 px-6 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.35em] mb-3 block">
          Ecosystem Architecture
        </span>

        <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
          Complaint Lifecycle
        </h2>

        <div className="flex justify-center gap-4">
          <Button
            variant={isRotating ? "primary" : "secondary"}
            onClick={() => setIsRotating(true)}
            className="rounded-full px-6 py-2"
          >
            Auto-Rotate
          </Button>

          <Button
            variant={!isRotating ? "primary" : "secondary"}
            onClick={() => setIsRotating(false)}
            className="rounded-full px-6 py-2"
          >
            Manual
          </Button>
        </div>
      </div>

      {/* 3D Container */}
      <div className="relative max-w-4xl mx-auto perspective-1000">
        <div
          className={`
            relative w-full h-[420px]
            preserve-3d
            transition-transform duration-1000 ease-in-out
            ${
              isRotating
                ? "animate-[rotate-3d_30s_linear_infinite]"
                : "hover:rotate-y-180 cursor-grab active:cursor-grabbing"
            }
          `}
        >
          {/* ================= USER VIEW ================= */}
          <div className="absolute inset-0 backface-hidden bg-white/[0.035] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-[2.5rem]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-8 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <Users className="w-9 h-9 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-black">Student Dashboard</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Complaint Preview
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                Live
              </span>
            </div>

            {/* Complaint Cards */}
            <div className="relative z-10 px-8 space-y-3">
              {[
                {
                  title: "Hostel Washroom Maintenance",
                  meta: "Boys Hostel · 3 days ago",
                  status: "In Progress",
                  statusColor: "amber",
                  votes: 86,
                },
                {
                  title: "Projector Not Working",
                  meta: "CSE Block · Yesterday",
                  status: "High",
                  statusColor: "rose",
                  votes: 214,
                },
                {
                  title: "Wi-Fi Connectivity Issue",
                  meta: "Library · Today",
                  status: "New",
                  statusColor: "cyan",
                  votes: 52,
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {c.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {c.meta}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase
                        bg-${c.statusColor}-500/10 text-${c.statusColor}-400`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">
                      ▲ <span className="text-white font-bold">{c.votes}</span>{" "}
                      votes
                    </span>
                    <button className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto py-4 text-center">
              <p className="text-cyan-400/60 font-bold uppercase tracking-[0.25em] text-[9px]">
                Flip to Admin View
              </p>
            </div>
          </div>

          {/* ================= ADMIN VIEW ================= */}
          {/* ================= ADMIN VIEW (BACK) ================= */}
<div className="absolute inset-0 rotate-y-180 backface-hidden bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col">

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-[2.5rem] pointer-events-none" />

  {/* Header */}
  <div className="relative z-10 flex items-center gap-3 px-8 pt-6 pb-4">
    <Layers className="w-9 h-9 text-purple-400" />
    <div>
      <h3 className="text-lg font-black">Admin Control</h3>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
        Operational Snapshot
      </p>
    </div>
  </div>

  {/* Primary Metrics */}
  <div className="relative z-10 px-8 grid grid-cols-2 gap-4 mb-4">
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-3xl font-black text-white">42</div>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
        New Complaints
      </div>
    </div>

    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-3xl font-black text-rose-400">12</div>
      <div className="text-[10px] text-rose-400/60 uppercase tracking-widest mt-1">
        SLA Alerts
      </div>
    </div>
  </div>

  {/* Secondary Metrics */}
  <div className="relative z-10 px-8 grid grid-cols-2 gap-4 mb-6">
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-2xl font-black text-cyan-400">31</div>
      <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
        Assigned
      </div>
    </div>

    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-2xl font-black text-emerald-400">19</div>
      <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
        Resolved
      </div>
    </div>
  </div>

  {/* Department Load */}
  <div className="relative z-10 px-8 mt-2 max-h-[140px] overflow-hidden">
    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
      Department Load
    </h4>

    <div className="space-y-2">
      {[
        { name: "Hostel", width: "70%", color: "bg-amber-400" },
        { name: "Academics", width: "45%", color: "bg-cyan-400" },
        { name: "IT Services", width: "30%", color: "bg-purple-400" },
      ].map((dept, i) => (
        <div key={i}>
          <div className="flex justify-between text-[9px] text-gray-400 mb-1">
            <span>{dept.name}</span>
            <span>{dept.width}</span>
          </div>

          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${dept.color}`}
              style={{ width: dept.width }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Footer */}
  <div className="mt-auto py-4 text-center">
    <p className="text-purple-400/60 font-bold uppercase tracking-[0.25em] text-[9px]">
      Assign · Monitor · Resolve
    </p>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
