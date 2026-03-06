import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge.tsx";

const ComplaintCard = ({ complaint }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col gap-3"
    >
      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-white break-words">
        {complaint.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 text-sm md:text-base line-clamp-2 break-words">
        {complaint.description}
      </p>

      {/* Footer */}
      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <StatusBadge status={complaint.status} />

        <Link
          to={`/staff/assigned/${complaint._id}`}
          className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition text-sm font-medium text-white text-center w-full sm:w-auto"
        >
          View
        </Link>

      </div>
    </motion.div>
  );
};

export default ComplaintCard;