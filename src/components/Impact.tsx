import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '../utils/animations.ts';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  gradient: string;
}

const StatIcon: React.FC<{ icon: string; gradient: string }> = ({ icon, gradient }) => {
  const iconMap: Record<string, JSX.Element> = {
    'check-circle': (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'users': (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    'clock': (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'trending-up': (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };

  return (
    <div className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
      {iconMap[icon] || iconMap['check-circle']}
    </div>
  );
};

const stats: Stat[] = [
  {
    value: 3,
    suffix: '',
    label: 'User Roles (User, Staff, Admin)',
    icon: 'users',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Anonymous Complaint Filing',
    icon: 'check-circle',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Email Notifications',
    icon: 'clock',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    value: 4,
    suffix: '',
    label: 'Priority Levels (Critical to Low)',
    icon: 'trending-up',
    gradient: 'from-cyan-500 to-blue-500',
  },
];



const Impact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" ref={ref} className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-cyan-900/10" />
      
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
  <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-full text-sm text-gray-300 backdrop-blur-sm">
    Core Features
  </span>
</motion.div>
<motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
  <span className="text-gradient">Smart</span> Complaint System
</motion.h2>
<motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto">
  Complete workflow from complaint filing to resolution with priority-based voting and real-time notifications
</motion.p>
          </div>

          {/* Stats Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      variants={fadeInUp}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        className="glass-card-strong p-8 text-center backdrop-blur-xl border-2 border-white/10"
      >
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`} />
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 border border-white/20`}>
            <StatIcon icon={stat.icon} gradient={stat.gradient} />
          </div>
        </div>

        {/* Label Only - No Numbers, No Certified Badge */}
        <p className="text-sm font-bold text-gray-200 uppercase tracking-wider leading-tight px-2">
          {stat.label}
        </p>

        {/* Hover Glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
        />
      </motion.div>
    </motion.div>
  ))}
</div>

          {/* Tagline Section */}
<motion.div variants={fadeInUp} className="pt-12">
  <div className="text-center max-w-4xl mx-auto space-y-6">
    {/* Main Quote */}
    <div className="relative">
      {/* Opening Quote */}
      <svg className="absolute -top-4 -left-4 w-16 h-16 text-purple-500/30" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      
      <div className="py-6 px-8 glass-card-strong border border-white/10">
        <h3 className="text-3xl md:text-5xl font-bold text-gradient leading-relaxed mb-4">
          Every Voice Deserves to be Heard.
          <br />
          Every Complaint Deserves Action.
        </h3>
        <p className="text-xl md:text-2xl text-gray-300 font-light italic">
          Transform frustration into resolution, anonymity into accountability
        </p>
      </div>
      
      {/* Closing Quote */}
      <svg className="absolute -bottom-4 -right-4 w-16 h-16 text-cyan-500/30 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    </div>

    {/* Supporting Text */}
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-sm text-gray-300">Transparent</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        <span className="text-sm text-gray-300">Accountable</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full">
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
        <span className="text-sm text-gray-300">Efficient</span>
      </div>
    </div>
  </div>
</motion.div>
          {/* Certification badges */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 pt-8">
     {[
  { 
    label: 'Photo & Video Upload', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    label: 'Anonymous Filing', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    label: 'Voting System', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    )
  },
  { 
    label: 'Status Tracking', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  { 
    label: 'Email Notifications', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    label: 'Priority Levels', 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    )
  },
].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass-card px-6 py-3 flex items-center gap-3"
              >
                <span className="text-cyan-400">{badge.icon}</span>
                <span className="text-sm font-medium text-gray-300">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
