import { motion } from 'framer-motion';

const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Large animated rings */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] border border-purple-500/10 rounded-full"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-32 right-32 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-20 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D Rotating geometric shape */}
      <motion.div
        className="absolute top-1/3 right-1/4 perspective-container"
        animate={{
          y: [0, -20, 0],
          rotateY: 360,
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateY: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-40 h-40 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 backdrop-blur-sm rounded-lg border border-white/10 transform rotate-45"
          style={{ 
            boxShadow: '0 0 60px rgba(168, 85, 247, 0.3)',
          }}
        />
      </motion.div>

      {/* Additional floating diamond shape */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 perspective-container"
        animate={{
          y: [0, 25, 0],
          rotateZ: 360,
        }}
        transition={{
          y: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotateZ: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg transform rotate-45 border border-white/10"
          style={{ 
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)',
          }}
        />
      </motion.div>

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/5 via-transparent to-cyan-900/5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
    </div>
  );
};

export default BackgroundOrbs;
