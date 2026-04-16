import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations.ts';

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: '📝',
    title: 'Easy Complaint Submission',
    description: 'Submit complaints in seconds with our intuitive form. Attach images, add details, and categorize automatically.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: '🔄',
    title: 'Real-Time Tracking',
    description: 'Track every update instantly. Get notifications at each stage from submission to resolution.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    icon: '🎯',
    title: 'Admin Assignment',
    description: 'Admin reviews and assigns complaints to the right staff member or department for quick resolution.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    icon: '⚡',
    title: 'Voting-Based Priority',
    description: 'Community voting determines complaint priority. High votes mark critical issues that need immediate attention.',
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    icon: '📊',
    title: 'Transparency & Accountability',
    description: 'Complete audit trail of every action. Department-wise analytics ensure accountability at all levels.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    icon: '💬',
    title: 'Two-Way Communication',
    description: 'Built-in messaging between users and departments. Get updates, ask questions, provide feedback seamlessly.',
    gradient: 'from-pink-500/20 to-red-500/20',
  },
];

const Features: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.div variants={fadeInUp} className="inline-flex">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-sm text-gray-300 backdrop-blur-sm">
                Powerful Features
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              Everything You Need,{' '}
              <span className="text-gradient">Built In</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete complaint management ecosystem designed for efficiency, transparency, and user satisfaction
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                className="relative group"
              >
                <motion.div
                  variants={cardHover}
                  className={`glass-card p-8 h-full space-y-4 bg-gradient-to-br ${feature.gradient} backdrop-blur-xl border-2 border-white/10 glow-border`}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm border border-white/10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-cyan-400 font-medium text-sm"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </div>


          {/* Bottom CTA */}
          {/* <motion.div variants={fadeInUp} className="text-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white shadow-xl shadow-purple-500/30 inline-flex items-center gap-2"
            >
              Explore All Features
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
