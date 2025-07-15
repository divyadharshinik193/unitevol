import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BellIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChartBarIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Volunteer', href: '/volunteer', color: 'volunteer' },
    { name: 'NGO', href: '/ngo', color: 'ngo' },
    { name: 'Project Lead', href: '/project-lead', color: 'projectlead' },
    { name: 'She Leads', href: '/she-leads', color: 'sheleads' },
  ];

  const roleNavigation = {
    ngo: [
      { name: 'Dashboard', href: '/ngo/dashboard', icon: HomeIcon, color: 'ngo' },
      { name: 'Projects', href: '/ngo/projects', icon: ClipboardDocumentListIcon, color: 'ngo' },
      { name: 'Volunteers', href: '/ngo/volunteers', icon: UserGroupIcon, color: 'ngo' }
    ],
    project_lead: [
      { name: 'Dashboard', href: '/project-lead/dashboard', icon: HomeIcon, color: 'projectlead' },
      { name: 'Projects', href: '/project-lead/projects', icon: ClipboardDocumentListIcon, color: 'projectlead' },
      { name: 'Volunteers', href: '/project-lead/volunteers', icon: UserGroupIcon, color: 'projectlead' }
    ],
    she_leads: [
      { name: 'Dashboard', href: '/she-leads/dashboard', icon: HomeIcon, color: 'sheleads' },
      { name: 'Projects', href: '/she-leads/projects', icon: ClipboardDocumentListIcon, color: 'sheleads' },
      { name: 'Volunteers', href: '/she-leads/volunteers', icon: UserGroupIcon, color: 'sheleads' }
    ],
    volunteer: [
      { name: 'Dashboard', href: '/volunteer/dashboard', icon: HomeIcon, color: 'volunteer' },
      { name: 'Projects', href: '/volunteer/projects', icon: ClipboardDocumentListIcon, color: 'volunteer' }
    ]
  };

  const getRoleSpecificNav = () => {
    if (!user) return [];
    return roleNavigation[user.role] || [];
  };

  const userMenuItems = [
    { 
      name: 'Profile', 
      href: user?.role === 'volunteer' ? '/volunteer/profile' :
            user?.role === 'ngo' ? '/ngo/profile' :
            user?.role === 'project_lead' ? '/project-lead/profile' :
            user?.role === 'she_leads' ? '/she-leads/profile' : '/profile',
      icon: UserCircleIcon 
    },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftIcon },
    { name: 'Notifications', href: '/notifications', icon: BellIcon },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/about');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActiveRoute = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/about" 
                className="group flex items-center space-x-2 text-2xl font-bold text-gradient hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <SparklesIcon className="h-8 w-8 text-primary-600 animate-pulse-slow" />
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                  UniteVol
                </span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              {!user ? (
                navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                      isActiveRoute(item.href)
                        ? `text-${item.color || 'primary'}-700 bg-${item.color || 'primary'}-50`
                        : `text-gray-600 hover:text-${item.color || 'primary'}-700 hover:bg-${item.color || 'primary'}-50`
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-${item.color || 'primary'}-500 to-${item.color || 'primary'}-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  </Link>
                ))
              ) : (
                getRoleSpecificNav().map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                      isActiveRoute(item.href)
                        ? `text-${item.color}-700 bg-${item.color}-50 shadow-md`
                        : `text-gray-600 hover:text-${item.color}-700 hover:bg-${item.color}-50`
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className={`h-4 w-4 mr-2 text-${item.color}-500 group-hover:scale-110 transition-transform duration-300`} />
                    {item.name}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-${item.color}-500 to-${item.color}-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="hidden sm:flex sm:space-x-3">
                <Link
                  to="/login"
                  className="btn-secondary animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 group">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white animate-pulse"></span>
                  <div className="absolute inset-0 rounded-full bg-primary-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary-400 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user.role?.replace('_', ' ')}</p>
                    </div>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {userMenuItems.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary-500 transition-colors duration-300" />
                          {item.name}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="group flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
                        >
                          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
              >
                <div className="relative w-6 h-6">
                  <Bars3Icon className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <XMarkIcon className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50`}>
        <div className="px-4 py-6 space-y-2">
          {!user ? (
            <>
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 animate-slide-in-left ${
                    isActiveRoute(item.href)
                      ? `text-${item.color || 'primary'}-700 bg-${item.color || 'primary'}-50`
                      : `text-gray-600 hover:text-${item.color || 'primary'}-700 hover:bg-${item.color || 'primary'}-50`
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 text-base font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: '500ms' }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: '600ms' }}
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              {getRoleSpecificNav().map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 animate-slide-in-left ${
                    isActiveRoute(item.href)
                      ? `text-${item.color}-700 bg-${item.color}-50`
                      : `text-gray-600 hover:text-${item.color}-700 hover:bg-${item.color}-50`
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className={`h-5 w-5 mr-3 text-${item.color}-500`} />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {userMenuItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 animate-slide-in-left"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: '800ms' }}
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;