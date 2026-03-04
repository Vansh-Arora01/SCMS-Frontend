import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users,
  Settings,
  BarChart3,
  Inbox,
  CheckSquare,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
      roles: ['user', 'staff', 'admin'],
    },
    {
      name: 'Raise Complaint',
      to: '/complaints/raise',
      icon: PlusCircle,
      roles: ['user', 'staff', 'admin'],
    },
    {
      name: 'My Complaints',
      to: '/complaints/my',
      icon: FileText,
      roles: ['user', 'staff', 'admin'],
    },
    {
      name: 'Admin Dashboard',
      to: '/admin/dashboard',
      icon: Users,
      roles: ['admin'],
    },
    {
      name: 'Staff Dashboard',
      to: '/staff/dashboard',
      icon: CheckSquare,
      roles: ['staff', 'admin'],
    },
    {
      name: 'Analytics',
      to: '/analytics',
      icon: BarChart3,
      roles: ['admin'],
    },
  ];

  const filteredNavItems = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <nav className="h-full overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={clsx(
                        'w-5 h-5 mr-3',
                        isActive ? 'text-primary-600' : 'text-gray-400'
                      )}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )
              }
            >
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              Settings
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
