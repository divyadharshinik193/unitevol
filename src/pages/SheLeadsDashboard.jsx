import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ClipboardDocumentCheckIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  PlusIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  FolderIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const SheLeadsDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample metrics data
  const metrics = [
    {
      id: 1,
      name: 'Active Projects',
      value: '4',
      change: '+2 this month',
      changeType: 'positive',
      icon: FolderIcon,
      color: 'from-pink-400 to-rose-500',
      link: '/she-leads/projects'
    },
    {
      id: 2,
      name: 'Completed Projects',
      value: '8',
      change: '+3 this month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'from-purple-400 to-fuchsia-500',
      link: '/she-leads/projects'
    },
    {
      id: 3,
      name: 'Active Volunteers',
      value: '52',
      change: '+15 this month',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'from-rose-400 to-pink-500',
      link: '/she-leads/volunteers'
    },
    {
      id: 4,
      name: 'Total Volunteers',
      value: '145',
      change: '+32 this month',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'from-fuchsia-400 to-purple-500',
      link: '/she-leads/volunteers'
    },
    {
      id: 5,
      name: 'Total Events',
      value: '12',
      change: '+4 this month',
      changeType: 'positive',
      icon: CalendarIcon,
      color: 'from-pink-300 to-rose-400',
      link: '/she-leads/projects'
    },
    {
      id: 6,
      name: 'Total Participation',
      value: '92%',
      change: '+7% this month',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'from-purple-300 to-fuchsia-400',
      link: '/she-leads/projects'
    }
  ];

  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Women Empowerment Workshop',
      project: 'She Leads Initiative',
      date: '2024-03-18',
      time: '14:00',
      venue: 'Community Center',
      volunteersRequired: 8,
      registeredVolunteers: 6
    },
    {
      id: 2,
      title: 'Girls Education Drive',
      project: 'Education for Girls',
      date: '2024-03-22',
      time: '10:00',
      venue: 'Local School',
      volunteersRequired: 5,
      registeredVolunteers: 4
    },
    {
      id: 3,
      title: 'Women Health Awareness',
      project: 'Health for Her',
      date: '2024-03-25',
      time: '11:00',
      venue: 'City Hall',
      volunteersRequired: 6,
      registeredVolunteers: 3
    },
    {
      id: 4,
      title: 'Skill Development Session',
      project: 'Women Entrepreneurs',
      date: '2024-03-28',
      time: '15:00',
      venue: 'Business Center',
      volunteersRequired: 4,
      registeredVolunteers: 4
    },
    {
      id: 5,
      title: 'Women Safety Workshop',
      project: 'Safety First',
      date: '2024-03-30',
      time: '16:00',
      venue: 'Police Station',
      volunteersRequired: 3,
      registeredVolunteers: 2
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Link 
            key={metric.id} 
            to={metric.link}
            className="relative bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-pink-100"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 bg-gradient-to-r ${metric.color}`}>
                  <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{metric.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className={`text-sm ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 border border-pink-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/she-leads/projects"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Project
          </Link>
          <Link
            to="/she-leads/projects"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            Schedule New Event
          </Link>
          <Link
            to="/she-leads/volunteers"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Manage Volunteers
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white shadow rounded-lg p-6 border border-pink-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          <Link
            to="/she-leads/projects"
            className="text-sm font-medium text-pink-600 hover:text-pink-500"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volunteers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="hover:bg-pink-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.project}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.date}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.venue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {event.registeredVolunteers}/{event.volunteersRequired}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-rose-600 h-2.5 rounded-full"
                        style={{ width: `${(event.registeredVolunteers / event.volunteersRequired) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.registeredVolunteers >= event.volunteersRequired
                          ? 'bg-green-100 text-green-800'
                          : 'bg-pink-100 text-pink-800'
                      }`}
                    >
                      {event.registeredVolunteers >= event.volunteersRequired ? 'Filled' : 'Open'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">She Leads Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back, {user?.name || 'She Leads Admin'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-pink-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
          </nav>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default SheLeadsDashboard; 