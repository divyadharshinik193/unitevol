import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Volunteer', href: '/volunteer', color: 'volunteer' },
    { name: 'NGO', href: '/ngo', color: 'ngo' },
    { name: 'Project Lead', href: '/project-lead', color: 'projectlead' },
    { name: 'She Leads', href: '/she-leads', color: 'sheleads' },
  ];

  // Navigation items based on role
  const roleNavigation = {
    ngo: [
      { name: 'Dashboard', href: '/ngo/dashboard', icon: HomeIcon, color: 'ngo' },
      { name: 'Projects', href: '/ngo/projects', icon: ClipboardDocumentListIcon, color: 'ngo' },
      { name: 'Volunteers', href: '/ngo/volunteers', icon: UserGroupIcon, color: 'ngo' }
    ],
    projectlead: [
      { name: 'Dashboard', href: '/project-lead/dashboard', icon: HomeIcon, color: 'projectlead' },
      { name: 'Projects', href: '/project-lead/projects', icon: ClipboardDocumentListIcon, color: 'projectlead' }
    ],
    sheleads: [
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

    switch (user.role) {
      case 'volunteer':
        return roleNavigation.volunteer;
      case 'ngo':
        return roleNavigation.ngo;
      case 'project_lead':
        return roleNavigation.projectlead;
      case 'she_leads':
        return roleNavigation.sheleads;
      default:
        return [];
    }
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

  return (
    <nav className="bg-white shadow-lg transition-all duration-300 hover:shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/about" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300">
                UniteVol
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {!user ? (
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 ${
                      item.color 
                        ? `text-${item.color}-600 hover:text-${item.color}-700 hover:border-${item.color}-500` 
                        : 'text-gray-500 hover:text-gray-900'
                    } border-b-2 border-transparent hover:border-current`}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                getRoleSpecificNav().map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 text-${item.color}-600 hover:text-${item.color}-700 border-b-2 border-transparent hover:border-${item.color}-500`}
                  >
                    <item.icon className={`h-5 w-5 mr-1 text-${item.color}-500`} />
                    {item.name}
                  </Link>
                ))
              )}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          {user && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Notifications */}
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-1 rounded-full text-${user.role === 'she_leads' ? 'sheleads' : 
                  user.role === 'volunteer' ? 'volunteer' :
                  user.role === 'ngo' ? 'ngo' :
                  user.role === 'project_lead' ? 'projectlead' : 'primary'}-400 hover:text-${user.role === 'she_leads' ? 'sheleads' : 
                  user.role === 'volunteer' ? 'volunteer' :
                  user.role === 'ngo' ? 'ngo' :
                  user.role === 'project_lead' ? 'projectlead' : 'primary'}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${user.role === 'she_leads' ? 'sheleads' : 
                  user.role === 'volunteer' ? 'volunteer' :
                  user.role === 'ngo' ? 'ngo' :
                  user.role === 'project_lead' ? 'projectlead' : 'primary'}-500 transition-all duration-300`}
              >
                <BellIcon className="h-6 w-6" />
              </button>

              {/* User Menu */}
              <div className="ml-3 relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-full hover:bg-${user.role === 'she_leads' ? 'sheleads' : 
                    user.role === 'volunteer' ? 'volunteer' :
                    user.role === 'ngo' ? 'ngo' :
                    user.role === 'project_lead' ? 'projectlead' : 'primary'}-100 focus:outline-none focus:ring-2 focus:ring-${user.role === 'she_leads' ? 'sheleads' : 
                    user.role === 'volunteer' ? 'volunteer' :
                    user.role === 'ngo' ? 'ngo' :
                    user.role === 'project_lead' ? 'projectlead' : 'primary'}-500 transition-all duration-300`}
                >
                  <UserCircleIcon className={`h-8 w-8 text-${user.role === 'she_leads' ? 'sheleads' : 
                    user.role === 'volunteer' ? 'volunteer' :
                    user.role === 'ngo' ? 'ngo' :
                    user.role === 'project_lead' ? 'projectlead' : 'primary'}-400`} />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <ChevronDownIcon className={`h-4 w-4 text-${user.role === 'she_leads' ? 'sheleads' : 
                    user.role === 'volunteer' ? 'volunteer' :
                    user.role === 'ngo' ? 'ngo' :
                    user.role === 'project_lead' ? 'projectlead' : 'primary'}-400`} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-slide-down">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-300"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 mr-2 text-${user.role === 'she_leads' ? 'sheleads' : 
                          user.role === 'volunteer' ? 'volunteer' :
                          user.role === 'ngo' ? 'ngo' :
                          user.role === 'project_lead' ? 'projectlead' : 'primary'}-500`} />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {!user ? (
            navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  item.color 
                    ? `text-${item.color}-600 hover:text-${item.color}-700 hover:bg-${item.color}-50 hover:border-${item.color}-500` 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500'
                } border-l-4 border-transparent transition-all duration-300`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))
          ) : (
            getRoleSpecificNav().map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium text-${item.color}-600 hover:text-${item.color}-700 hover:bg-${item.color}-50 hover:border-${item.color}-500 border-transparent transition-all duration-300`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={`h-5 w-5 mr-2 text-${item.color}-500`} />
                {item.name}
              </Link>
            ))
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500 border-transparent transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500 border-transparent transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {userMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-primary-500 border-transparent transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex w-full items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 hover:border-red-500 border-transparent transition-all duration-300"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 