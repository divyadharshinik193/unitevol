import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const ProjectLeadVolunteers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Sample volunteers data
  const volunteers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      location: 'New York, NY',
      status: 'active',
      totalHours: 24,
      skills: ['Teaching', 'Communication', 'Organization'],
      events: [
        {
          id: 1,
          name: 'Weekly Tutoring Session',
          date: '2024-03-15',
          time: '14:00',
          role: 'Tutor',
          status: 'upcoming'
        },
        {
          id: 3,
          name: 'Parent-Teacher Meeting',
          date: '2024-02-10',
          time: '15:00',
          role: 'Coordinator',
          status: 'completed'
        }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '123-456-7891',
      location: 'Los Angeles, CA',
      status: 'active',
      totalHours: 18,
      skills: ['Teaching', 'Childcare'],
      events: [
        {
          id: 1,
          name: 'Weekly Tutoring Session',
          date: '2024-03-15',
          time: '14:00',
          role: 'Tutor',
          status: 'upcoming'
        }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '123-456-7892',
      location: 'Chicago, IL',
      status: 'active',
      totalHours: 12,
      skills: ['Physical labor', 'Teamwork'],
      events: [
        {
          id: 4,
          name: 'Beach Cleanup',
          date: '2024-03-25',
          time: '09:00',
          role: 'Participant',
          status: 'upcoming'
        },
        {
          id: 5,
          name: 'Park Cleanup',
          date: '2024-02-15',
          time: '10:00',
          role: 'Participant',
          status: 'completed'
        }
      ]
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '123-456-7893',
      location: 'Houston, TX',
      status: 'active',
      totalHours: 6,
      skills: ['First Aid', 'Healthcare'],
      events: [
        {
          id: 6,
          name: 'Community Health Camp',
          date: '2024-03-28',
          time: '11:00',
          role: 'Medical Assistant',
          status: 'upcoming'
        }
      ]
    },
    {
      id: 5,
      name: 'Emily Brown',
      email: 'emily@example.com',
      phone: '123-456-7894',
      location: 'Phoenix, AZ',
      status: 'active',
      totalHours: 30,
      skills: ['Companionship', 'Empathy', 'Communication'],
      events: [
        {
          id: 7,
          name: 'Senior Care Visit',
          date: '2024-03-30',
          time: '15:00',
          role: 'Companion',
          status: 'upcoming'
        },
        {
          id: 8,
          name: 'Holiday Celebration',
          date: '2023-12-25',
          time: '14:00',
          role: 'Organizer',
          status: 'completed'
        }
      ]
    }
  ];

  // Get unique events for filter dropdown
  const allEvents = [...new Set(volunteers.flatMap(volunteer => 
    volunteer.events.map(event => event.name)
  ))];

  // Get unique roles for filter dropdown
  const allRoles = [...new Set(volunteers.flatMap(volunteer => 
    volunteer.events.map(event => event.role)
  ))];

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || 
                        volunteer.events.some(event => event.name === eventFilter);
    const matchesRole = roleFilter === 'all' || 
                       volunteer.events.some(event => event.role === roleFilter);
    return matchesSearch && matchesStatus && matchesEvent && matchesRole;
  });

  const handleAddVolunteer = (e) => {
    e.preventDefault();
    // Add volunteer logic here
    setShowAddModal(false);
  };

  const handleEditVolunteer = (e) => {
    e.preventDefault();
    // Edit volunteer logic here
    setShowEditModal(false);
  };

  const handleDeleteVolunteer = (volunteerId) => {
    // Delete volunteer logic here
  };

  const renderVolunteerCard = (volunteer) => (
    <div key={volunteer.id} className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{volunteer.name}</h3>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                {volunteer.email}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <PhoneIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                {volunteer.phone}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <MapPinIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                {volunteer.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {volunteer.status}
            </span>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium text-gray-900">{volunteer.totalHours}</span> hours contributed
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Skills</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {volunteer.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Events</h4>
          <div className="mt-2 space-y-3">
            {volunteer.events.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-md p-3">
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-900">{event.name}</div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {event.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track your volunteers' activities and contributions
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
                Filters
                {showFilters ? (
                  <ChevronUpIcon className="h-5 w-5 ml-2 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 ml-2 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Volunteer
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project</label>
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Projects</option>
                  {allEvents.map((event) => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Volunteers Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volunteer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-600 font-medium">
                            {volunteer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{volunteer.skills.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{volunteer.totalHours}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        volunteer.status === 'active'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {volunteer.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedVolunteer(volunteer);
                        setShowEditModal(true);
                      }}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVolunteer(volunteer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Volunteer Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Volunteer</h3>
              <form onSubmit={handleAddVolunteer}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project</label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                      {allEvents.map((event) => (
                        <option key={event} value={event}>{event}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Add Volunteer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Volunteer Modal */}
        {showEditModal && selectedVolunteer && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Volunteer</h3>
              <form onSubmit={handleEditVolunteer}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      defaultValue={selectedVolunteer.name}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedVolunteer.email}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      defaultValue={selectedVolunteer.phone}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project</label>
                    <select
                      defaultValue={selectedVolunteer.events[0].name}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      {allEvents.map((event) => (
                        <option key={event} value={event}>{event}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      defaultValue={selectedVolunteer.status}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLeadVolunteers; 