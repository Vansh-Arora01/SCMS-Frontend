import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge.tsx";

const ComplaintCard = ({ complaint }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-2">
        {complaint.title}
      </h3>

      <p className="text-gray-300 line-clamp-2">
        {complaint.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <StatusBadge status={complaint.status} />
        <Link
          to={`/staff/assigned/${complaint._id}`}
          className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
};

export default ComplaintCard;
