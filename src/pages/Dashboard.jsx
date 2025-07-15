import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  UsersIcon,
  CalendarIcon,
  HandRaisedIcon,
  BellIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample metrics data (will be replaced with backend data)
  const metrics = [
    {
      id: 1,
      name: 'Active Projects',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      link: '/projects'
    },
    {
      id: 2,
      name: 'Completed Projects',
      value: '15',
      change: '+3',
      changeType: 'increase',
      icon: ClipboardDocumentCheckIcon,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      link: '/projects'
    },
    {
      id: 3,
      name: 'Active Volunteers',
      value: '45',
      change: '+8',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      link: '/volunteers'
    },
    {
      id: 4,
      name: 'Total Volunteers',
      value: '120',
      change: '+15',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      link: '/volunteers'
    },
    {
      id: 5,
      name: 'Total Events',
      value: '25',
      change: '+4',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      link: '/events'
    },
    {
      id: 6,
      name: 'Total Participation',
      value: '850',
      change: '+75',
      changeType: 'increase',
      icon: HandRaisedIcon,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      link: '/events'
    }
  ];

  // Sample recent activities data
  const recentActivities = [
    {
      id: 1,
      type: 'New Volunteer Registration',
      project: 'Education Support Program',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'Project Milestone Completed',
      project: 'Environmental Cleanup',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'Event Created',
      project: 'Community Health Camp',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      type: 'Volunteer Feedback Received',
      project: 'Youth Mentorship Program',
      timestamp: '2 days ago'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Link
            key={metric.id}
            to={metric.link}
            className="transform hover:scale-105 transition-all duration-300"
          >
            <div className={`rounded-xl shadow-lg overflow-hidden ${metric.color}`}>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white/20 rounded-md p-3">
                    <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-white truncate">{metric.name}</dt>
                      <dd>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-white">{metric.value}</p>
                          <p className={`ml-2 flex items-baseline text-sm font-semibold text-white/80`}>
                            {metric.change}
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          <div className="mt-4 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <BellIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.project}</p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.displayName || 'User'}!</h1>
          <p className="mt-1 text-sm text-gray-500">Here's an overview of your activities and impact.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 