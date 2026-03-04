import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations.ts';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Submit Complaint',
    description: 'Fill out the smart form with complaint details, category, and supporting documents.',
    icon: '📋',
    color: 'from-purple-500 to-pink-500',
  },
  {
  number: '02',
  title: 'Admin Assignment',
  description: 'Admin reviews the complaint and assigns it to the particular staff member or department best suited to handle the issue.',
  icon: '🎯',
  color: 'from-cyan-500 to-blue-500',  
  },
  {
    number: '03',
    title: 'Live Status Updates',
    description: 'Track progress in real-time. Get notifications at every stage: acknowledged, in-progress, resolved. Complete transparency.',
    icon: '📊',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    number: '04',
    title: 'Resolution & Feedback',
    description: 'Complaint resolved with detailed action taken report. Rate the service and provide feedback to improve the system.',
    icon: '✅',
    color: 'from-green-500 to-teal-500',
  },
];

const HowItWorks: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.div variants={fadeInUp} className="inline-flex">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-sm text-gray-300 backdrop-blur-sm">
                Simple Process
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
              How <span className="text-gradient">It Works</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps from complaint to resolution. Automated, transparent, and efficient.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-green-500 transform -translate-x-1/2 opacity-20" />

            {/* Steps */}
            <div className="space-y-12 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <motion.div
                      className="inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}>
                        {step.number}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Icon */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${step.color} p-1`}>
                      <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl">{step.icon}</span>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-50`}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>

                  {/* Visual element (alternating side) */}
                  <div className="flex-1 hidden md:flex justify-center">
                    <motion.div
                      className="glass-card p-6 max-w-xs space-y-3"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Step {step.number}</span>
                        <span className={`px-2 py-1 bg-gradient-to-r ${step.color} bg-opacity-20 rounded text-xs font-medium`}>
                          Active
                        </span>
                      </div>
                      <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${step.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: '100%' } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Automated process ensures quick {step.title.toLowerCase()}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center pt-12">
            <div className="glass-card-strong inline-block p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gradient">Ready to Get Started?</h3>
              <p className="text-gray-400 max-w-md">
                Experience the future of complaint management. Submit your first complaint in under 2 minutes.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white shadow-xl shadow-purple-500/30 inline-flex items-center gap-2"
              >
                Start Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
