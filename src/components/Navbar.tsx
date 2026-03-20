import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

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
      case 'SUPER_ADMIN':
        navigate('/superadmin', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  };

  const navLinks = ['Home', 'Features', 'How It Works', 'Impact', 'About'];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card px-4 md:px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white">
              SC
            </div>
            <span className="text-lg md:text-xl font-bold text-gradient">
              Smart Complaints
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">

            {!user && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-medium text-sm text-white shadow-lg shadow-purple-500/30"
                >
                  Get Started
                </motion.button>
              </>
            )}

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
                    : user.role === 'SUPER_ADMIN'
                    ? 'Super Admin Dashboard'
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden mt-3 glass-card p-4 space-y-4">

            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileMenu(false)}
              >
                {item}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">

              {!user && (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-2 text-gray-300 border border-white/10 rounded-lg"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white"
                  >
                    Get Started
                  </button>
                </>
              )}

              {user && (
                <>
                  <button
                    onClick={handleDashboardRedirect}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg"
                  >
                    {user.role === 'ADMIN'
                      ? 'Admin Dashboard'
                      : user.role === 'STAFF'
                      ? 'Staff Dashboard'
                      : user.role === 'SUPER_ADMIN'
                      ? 'Super Admin Dashboard'
                      : user.role === 'STUDENT'
                      ? 'Student Dashboard'
                      : 'Dashboard'}
                  </button>

                  <button
                    onClick={logout}
                    className="w-full py-2 text-red-400 border border-red-400 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>
          </div>
        )}

      </div>
    </motion.nav>
  );
};

export default Navbar;