import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleDashboardRedirect = () => {
    if (!user) return;

    switch (user.role) {
      case 'ADMIN':
        navigate('/admin', { replace: true });
        break;
      case 'STUDENT':
        navigate('/student', { replace: true });
        break;
      case 'STAFF':
        navigate('/staff', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
              SC
            </div>
            <span className="text-xl font-bold text-gradient">
              Smart Complaints
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'How It Works', 'Impact', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-300 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">

            {/* If NOT logged in */}
            {!user && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="hidden sm:block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(168, 85, 247, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-medium text-sm text-white shadow-lg shadow-purple-500/30"
                >
                  Get Started
                </motion.button>
              </>
            )}

            {/* If logged in */}
            {user && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDashboardRedirect}
                  className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg"
                >
                  {user.role === 'ADMIN'
                    ? 'Admin Dashboard'
                    : user.role === 'STAFF'
                    ? 'Staff Dashboard'
                    : user.role === 'STUDENT'
                    ? 'Student Dashboard'
                    : 'Dashboard'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-4 py-2 text-sm text-red-400 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </motion.button>
              </>
            )}

          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
