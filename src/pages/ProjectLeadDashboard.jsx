import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  FolderIcon,
  CheckCircleIcon,
  PlusIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const ProjectLeadDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  // Sample data - replace with actual data from your backend
  const metrics = [
    {
      id: 1,
      name: 'Active Projects',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: FolderIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/projects'
    },
    {
      id: 2,
      name: 'Completed Projects',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/projects'
    },
    {
      id: 3,
      name: 'Active Volunteers',
      value: '32',
      change: '+5',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/volunteers'
    },
    {
      id: 4,
      name: 'Total Volunteers',
      value: '45',
      change: '+8',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/volunteers'
    },
    {
      id: 5,
      name: 'Total Events',
      value: '15',
      change: '+3',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/projects'
    },
    {
      id: 6,
      name: 'Total Participation',
      value: '85%',
      change: '+5%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'from-orange-500 to-amber-600',
      link: '/project-lead/volunteers'
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: 'Community Clean-up Drive',
      project: 'Environmental Initiative',
      date: '2024-03-15',
      time: '09:00 AM',
      venue: 'Central Park',
      registeredVolunteers: 25,
      volunteersRequired: 30,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Youth Leadership Workshop',
      project: 'Education Program',
      date: '2024-03-20',
      time: '02:00 PM',
      venue: 'Community Center',
      registeredVolunteers: 15,
      volunteersRequired: 20,
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Food Distribution Drive',
      project: 'Hunger Relief',
      date: '2024-03-10',
      time: '10:00 AM',
      venue: 'City Hall',
      registeredVolunteers: 30,
      volunteersRequired: 30,
      status: 'Completed'
    }
  ];

  const activeProjects = [
    {
      id: 1,
      name: 'Environmental Initiative',
      description: 'Promoting sustainable practices and environmental awareness',
      progress: 75,
      volunteers: 25,
      events: 3,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Education Program',
      description: 'Providing educational support to underprivileged children',
      progress: 60,
      volunteers: 15,
      events: 2,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Hunger Relief',
      description: 'Addressing food insecurity in local communities',
      progress: 90,
      volunteers: 30,
      events: 4,
      status: 'Active'
    }
  ];

  const projectOptions = [
    { id: 'all', name: 'All Projects' },
    { id: 'env', name: 'Environmental Initiative' },
    { id: 'edu', name: 'Education Program' },
    { id: 'hunger', name: 'Hunger Relief' }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Lead Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Here's an overview of your project's activities.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'projects', 'events', 'volunteers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <Link 
                  key={metric.id}
                  to={metric.link}
                  className="relative bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow duration-300"
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
                        metric.changeType === 'increase' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Link
                  to="/project-lead/projects"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create New Project
                </Link>
                <Link
                  to="/project-lead/projects"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Schedule New Event
                </Link>
                <Link
                  to="/project-lead/volunteers"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Manage Volunteers
                </Link>
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Active Projects</h3>
                <Link
                  to="/project-lead/projects"
                  className="text-sm font-medium text-orange-600 hover:text-orange-500"
                >
                  View all projects
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <div className="grid grid-cols-1 gap-4 p-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{project.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {project.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Volunteers</span>
                          <p className="mt-1 text-lg font-semibold text-gray-900">{project.volunteers}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Events</span>
                          <p className="mt-1 text-lg font-semibold text-gray-900">{project.events}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Events</h3>
                <Link
                  to="/project-lead/projects"
                  className="text-sm font-medium text-orange-600 hover:text-orange-500"
                >
                  View all events
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteers</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50">
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
                            <div className="text-sm text-gray-900">{event.registeredVolunteers}/{event.volunteersRequired}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.status === 'Completed' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLeadDashboard; 