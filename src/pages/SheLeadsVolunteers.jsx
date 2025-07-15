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
  SparklesIcon
} from '@heroicons/react/24/outline';

const SheLeadsVolunteers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Sample volunteers data
  const volunteers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'active',
      totalHours: 45,
      skills: ['Leadership', 'Public Speaking', 'Event Planning'],
      events: [
        { id: 1, name: 'Leadership Skills Workshop', date: '2024-03-18', role: 'Facilitator' },
        { id: 3, name: 'Girls Education Drive', date: '2024-03-22', role: 'Coordinator' }
      ]
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      status: 'active',
      totalHours: 32,
      skills: ['Teaching', 'Mentoring', 'Communication'],
      events: [
        { id: 3, name: 'Girls Education Drive', date: '2024-03-22', role: 'Volunteer' },
        { id: 4, name: 'Women Health Awareness', date: '2024-03-25', role: 'Coordinator' }
      ]
    },
    {
      id: 3,
      name: 'Jessica Wilson',
      email: 'jessica.wilson@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      status: 'inactive',
      totalHours: 18,
      skills: ['Healthcare', 'First Aid', 'Public Health'],
      events: [
        { id: 4, name: 'Women Health Awareness', date: '2024-03-25', role: 'Volunteer' }
      ]
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Miami, FL',
      status: 'active',
      totalHours: 28,
      skills: ['Spanish', 'Translation', 'Community Outreach'],
      events: [
        { id: 1, name: 'Leadership Skills Workshop', date: '2024-03-18', role: 'Volunteer' },
        { id: 5, name: 'Skill Development Session', date: '2024-03-28', role: 'Facilitator' }
      ]
    },
    {
      id: 5,
      name: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      phone: '+1 (555) 567-8901',
      location: 'San Francisco, CA',
      status: 'active',
      totalHours: 36,
      skills: ['Technology', 'Web Development', 'Mentoring'],
      events: [
        { id: 2, name: 'Career Development Session', date: '2024-03-25', role: 'Coordinator' },
        { id: 5, name: 'Skill Development Session', date: '2024-03-28', role: 'Facilitator' }
      ]
    }
  ];
  
  // Sample events data
  const events = [
    { id: 1, name: 'Leadership Skills Workshop' },
    { id: 2, name: 'Career Development Session' },
    { id: 3, name: 'Girls Education Drive' },
    { id: 4, name: 'Women Health Awareness' },
    { id: 5, name: 'Skill Development Session' }
  ];
  
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || 
                        volunteer.events.some(event => event.id.toString() === eventFilter);
    const matchesRole = roleFilter === 'all' || 
                       volunteer.events.some(event => event.role.toLowerCase() === roleFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesEvent && matchesRole;
  });
  
  const renderVolunteerCard = (volunteer) => {
    return (
      <div key={volunteer.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-pink-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                {volunteer.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{volunteer.name}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  <span>{volunteer.email}</span>
                </div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {volunteer.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-500">
              <PhoneIcon className="h-4 w-4 mr-1" />
              <span>{volunteer.phone}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{volunteer.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{volunteer.totalHours} hours contributed</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Events</h4>
            <div className="space-y-2">
              {volunteer.events.map(event => (
                <div key={event.id} className="bg-pink-50 p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.name}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                      {event.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track your volunteers
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  placeholder="Search volunteers..."
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="sm:w-48">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="facilitator">Facilitator</option>
                <option value="coordinator">Coordinator</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredVolunteers.map(volunteer => renderVolunteerCard(volunteer))}
        </div>
      </div>
    </div>
  );
};

export default SheLeadsVolunteers; 