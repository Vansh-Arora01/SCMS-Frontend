import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, buttonHover } from '../utils/animations.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">
      <motion.div
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Left Content */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Live & Transparent System</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
  <span className="text-gradient-yellow">
    Smart Complaint
  </span>
  <br />
  <span className="text-white">Management</span>
  <br />
  <span className="text-gradient">System.</span>
</h1>
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            A <span className="text-cyan-400 font-medium">future-ready complaint tracking system</span> built for transparency.
            Experience <span className="text-purple-400 font-medium">fully-automated</span>, 
            <span className="text-yellow-400 font-medium"> conflict-free</span>, 
            <span className="text-cyan-400 font-medium"> accountability-driven</span> complaint resolution
            — powered by intelligent routing.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <motion.button
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white shadow-xl shadow-purple-500/30 flex items-center gap-2"
            >
              Raise a Complaint
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            <motion.button
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 glass-card hover:bg-white/10 rounded-xl font-semibold text-white flex items-center gap-2 border-2 border-white/20"
            >
              Track Complaint
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-4">
            {[
  { icon: '⚡', text: 'Zero Conflicts', color: 'from-cyan-500/20 to-blue-500/20' },
  { icon: '🎯', text: 'Admin Controlled', color: 'from-purple-500/20 to-pink-500/20' },
  { icon: '📊', text: 'Real-time Sync', color: 'from-pink-500/20 to-red-500/20' },
  { icon: '✓', text: 'Transparent', color: 'from-teal-500/20 to-cyan-500/20' },
].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-4 py-2 bg-gradient-to-r ${item.color} border border-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2`}
              >
                <span>{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Visual Element */}
        <motion.div
          variants={fadeInUp}
          className="relative hidden md:block"
        >
          <div className="relative glass-card-strong p-8 rounded-3xl">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl" />
            
            <div className="relative space-y-6">
              {/* Mock complaint card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold">Complaint #12049</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-gray-300">Infrastructure issue in Block-A requiring immediate attention...</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">High Priority</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">Maintenance</span>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-4 text-center space-y-1"
                >
                  <p className="text-2xl font-bold text-gradient">98%</p>
                  <p className="text-xs text-gray-400">Resolution Rate</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-4 text-center space-y-1"
                >
                  <p className="text-2xl font-bold text-gradient">24h</p>
                  <p className="text-xs text-gray-400">Avg. Response</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
