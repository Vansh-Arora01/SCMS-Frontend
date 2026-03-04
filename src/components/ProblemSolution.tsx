import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations.ts';

const ProblemSolution: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-20"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.div variants={fadeInUp} className="inline-flex">
              <span className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 rounded-full text-sm text-gray-300 backdrop-blur-sm">
                The Current Challenge
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              From <span className="text-gradient">Chaos</span> to{' '}
              <span className="text-gradient-yellow">Order</span>
            </motion.h2>
          </div>

          {/* Problem → Solution Visual */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Problem Side */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-red-400">Traditional Problems</h3>
                <p className="text-gray-400">Manual complaint systems lead to inefficiency and frustration</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Lost Complaints', desc: 'Paper-based tracking with no accountability' },
                  { title: 'Delayed Response', desc: 'Manual routing causes weeks of delays' },
                  { title: 'Zero Transparency', desc: 'No way to track complaint status' },
                  { title: 'Frustrated Users', desc: 'No feedback or resolution updates' },
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex gap-4 p-4 border border-red-500/20 rounded-xl bg-red-500/5 backdrop-blur-sm"
                    whileHover={{ x: 5, borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                      ✕
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{problem.title}</h4>
                      <p className="text-sm text-gray-400">{problem.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solution Side */}
            <motion.div variants={slideInRight} className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gradient">SCMS Solution</h3>
                <p className="text-gray-400">Intelligent automation brings efficiency and trust</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Digital Tracking', desc: 'Every complaint logged with unique ID', color: 'from-green-500/20' },
                  { title: 'Instant Routing', desc: 'Admin assigns to right department quickly', color: 'from-yellow-500/20' },
                  { title: 'Full Transparency', desc: 'Real-time status updates for everyone', color: 'from-blue-500/20' },
                  { title: 'Happy Users', desc: 'Clear communication and faster resolution', color: 'from-purple-500/20' },
                ].map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`flex gap-4 p-4 border border-cyan-500/20 rounded-xl bg-gradient-to-r ${solution.color} to-cyan-500/5 backdrop-blur-sm glow-border`}
                    whileHover={{ x: -5, scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{solution.title}</h4>
                      <p className="text-sm text-gray-400">{solution.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
          >
            {[
              { value: '10x', label: 'Faster Resolution' },
              { value: '95%', label: 'User Satisfaction' },
              { value: '100%', label: 'Accountability' },
              { value: '24/7', label: 'Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center space-y-2"
              >
                <p className="text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
