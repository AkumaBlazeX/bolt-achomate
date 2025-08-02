import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, PlusCircle, LogOut, MessageCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/create', icon: PlusCircle, label: 'Create' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/feed" className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-white glow" />
            </div>
            <span className="text-2xl font-bold text-white text-glow">
              EchoMateLite
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-xl smooth-transition ${
                  location.pathname === path
                    ? 'glass-button text-white glow scale-105'
                    : 'text-white/80 hover:text-white hover:glass-button hover:scale-105'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden md:block font-medium">{label}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-3">
              <img
                src={user?.profilePicture}
                alt={user?.username}
                className="h-10 w-10 rounded-full object-cover border-2 border-white/30 glow smooth-transition hover:scale-110"
              />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 text-white/80 hover:text-red-300 hover:glass-button rounded-xl smooth-transition hover:scale-105"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:block font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;