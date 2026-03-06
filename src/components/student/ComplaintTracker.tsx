import { ComplaintStatus } from "../../types/complaint.types";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const steps: ComplaintStatus[] = [
  "OPEN",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
];

interface Props {
  status: ComplaintStatus;
}

export default function ComplaintTracker({ status }: Props) {
  const currentIndex = steps.indexOf(status);
  const progressPercent =
    (currentIndex / (steps.length - 1)) * 100;

  return (
    <div className="mt-5 md:mt-6">

      {/* Progress Line Background */}
      <div className="relative w-full h-1 bg-slate-800 rounded-full mb-5 md:mb-6">

        {/* Animated Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-green-400 rounded-full"
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between relative">

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step}
              className="flex flex-col items-center relative flex-1 text-center"
            >

              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/40"
                    : isCurrent
                    ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-500/40 animate-pulse"
                    : "bg-slate-900 border-slate-700"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} className="text-white" />
                ) : (
                  <Circle
                    size={10}
                    className={
                      isCurrent
                        ? "text-white"
                        : "text-slate-500"
                    }
                  />
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={`mt-2 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide ${
                  isCompleted
                    ? "text-green-400"
                    : isCurrent
                    ? "text-indigo-400"
                    : "text-slate-500"
                }`}
              >
                {step.replace("_", " ")}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
}