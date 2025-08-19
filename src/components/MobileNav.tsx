import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Calendar, User } from 'lucide-react';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/upload"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/upload') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Upload className="h-5 w-5" />
          <span className="text-xs">Upload</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Reminders</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;