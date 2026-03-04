import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer, buttonHover } from '../utils/animations.ts';

const CTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center space-y-12"
        >
          {/* Main content card */}
          <motion.div
            variants={fadeInUp}
            className="glass-card-strong p-12 md:p-16 space-y-8 border-2 border-white/10"
          >
            {/* Decorative top accent */}
            <div className="flex justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl"
              >
                🚀
              </motion.div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Your Voice <span className="text-gradient">Matters</span>.
                <br />
                Raise It <span className="text-gradient-yellow">Smartly</span>.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              >
                Join thousands who've already transformed their complaint management experience.
                Start your journey to transparent, efficient resolution today.
              </motion.p>
            </div>
            
            

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <motion.button
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/40 overflow-hidden"
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <span className="relative flex items-center gap-3">
                  Raise Your First Complaint
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>

              <motion.button
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="px-10 py-5 glass-card hover:bg-white/10 rounded-2xl font-bold text-lg text-white border-2 border-white/20 flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10"
            >
              {[
                { value: '2 min', label: 'Average submission time' },
                { value: '100%', label: 'Secure & Private' },
                { value: '24/7', label: 'Always Available' },
              ].map((item, index) => (
                <div key={index} className="text-center space-y-1">
                  <p className="text-2xl font-bold text-gradient">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom message */}
          <motion.p variants={fadeInUp} className="text-gray-500 text-sm">
            No credit card required • Free to start • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
