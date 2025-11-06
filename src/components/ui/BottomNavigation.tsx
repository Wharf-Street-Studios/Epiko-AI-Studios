import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'feed', label: 'Feed', path: '/discover', icon: '🏠' },
  { id: 'create', label: 'Create', path: '/tools', icon: '✨' },
  { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200
                ${isActive(item.path) ? 'text-gray-900' : 'text-gray-400'}
              `}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className={`text-xs font-medium ${isActive(item.path) ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
