import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const SheLeadsProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const navigate = useNavigate();
  
  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'Women Empowerment Workshop',
      description: 'A series of workshops aimed at empowering women with leadership skills and career development tools.',
      status: 'active',
      events: [
        {
          id: 1,
          name: 'Leadership Skills Workshop',
          date: '2024-03-18',
          time: '14:00',
          venue: 'Community Center',
          volunteersRequired: 8,
          registeredVolunteers: 6
        },
        {
          id: 2,
          name: 'Career Development Session',
          date: '2024-03-25',
          time: '15:00',
          venue: 'Business Center',
          volunteersRequired: 5,
          registeredVolunteers: 3
        }
      ]
    },
    {
      id: 2,
      title: 'Education for Girls',
      description: 'Supporting girls\' education through mentorship, tutoring, and educational resources.',
      status: 'active',
      events: [
        {
          id: 3,
          name: 'Girls Education Drive',
          date: '2024-03-22',
          time: '10:00',
          venue: 'Local School',
          volunteersRequired: 5,
          registeredVolunteers: 4
        }
      ]
    },
    {
      id: 3,
      title: 'Health for Her',
      description: 'Promoting women\'s health awareness and providing access to healthcare resources.',
      status: 'active',
      events: [
        {
          id: 4,
          name: 'Women Health Awareness',
          date: '2024-03-25',
          time: '11:00',
          venue: 'City Hall',
          volunteersRequired: 6,
          registeredVolunteers: 3
        }
      ]
    },
    {
      id: 4,
      title: 'Women Entrepreneurs',
      description: 'Supporting women entrepreneurs with mentorship, resources, and networking opportunities.',
      status: 'completed',
      events: [
        {
          id: 5,
          name: 'Skill Development Session',
          date: '2024-03-28',
          time: '15:00',
          venue: 'Business Center',
          volunteersRequired: 4,
          registeredVolunteers: 4
        }
      ]
    },
    {
      id: 5,
      title: 'Safety First',
      description: 'Creating awareness about women\'s safety and providing self-defense training.',
      status: 'active',
      events: [
        {
          id: 6,
          name: 'Women Safety Workshop',
          date: '2024-03-30',
          time: '16:00',
          venue: 'Police Station',
          volunteersRequired: 3,
          registeredVolunteers: 2
        }
      ]
    }
  ];
  
  // Sample events data
  const events = [
    {
      id: 1,
      name: 'Leadership Skills Workshop',
      project: 'Women Empowerment Workshop',
      date: '2024-03-18',
      time: '14:00',
      venue: 'Community Center',
      volunteersRequired: 8,
      registeredVolunteers: 6
    },
    {
      id: 2,
      name: 'Career Development Session',
      project: 'Women Empowerment Workshop',
      date: '2024-03-25',
      time: '15:00',
      venue: 'Business Center',
      volunteersRequired: 5,
      registeredVolunteers: 3
    },
    {
      id: 3,
      name: 'Girls Education Drive',
      project: 'Education for Girls',
      date: '2024-03-22',
      time: '10:00',
      venue: 'Local School',
      volunteersRequired: 5,
      registeredVolunteers: 4
    },
    {
      id: 4,
      name: 'Women Health Awareness',
      project: 'Health for Her',
      date: '2024-03-25',
      time: '11:00',
      venue: 'City Hall',
      volunteersRequired: 6,
      registeredVolunteers: 3
    },
    {
      id: 5,
      name: 'Skill Development Session',
      project: 'Women Entrepreneurs',
      date: '2024-03-28',
      time: '15:00',
      venue: 'Business Center',
      volunteersRequired: 4,
      registeredVolunteers: 4
    },
    {
      id: 6,
      name: 'Women Safety Workshop',
      project: 'Safety First',
      date: '2024-03-30',
      time: '16:00',
      venue: 'Police Station',
      volunteersRequired: 3,
      registeredVolunteers: 2
    }
  ];
  
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
    }
  ];
  
  const toggleExpand = (projectId) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleCreateProject = () => {
    // Here you would typically make an API call to create the project
    console.log('Creating project:', newProject);
    
    // For demo purposes, we'll just close the modal and reset the form
    setShowAddProject(false);
    setNewProject({ title: '', description: '' });
    
    // Redirect to the projects page
    navigate('/she-leads/projects');
  };
  
  const handleAddEvent = (projectId) => {
    setSelectedProject(projectId);
    setShowAddEvent(true);
  };
  
  const renderProjectCard = (project) => {
    const isExpanded = expandedProject === project.id;
    
    return (
      <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-pink-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status === 'active' ? 'Active' : 'Completed'}
            </span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{project.events.length} events</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddEvent(project.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Event
              </button>
              <button
                onClick={() => toggleExpand(project.id)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                {isExpanded ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Events</h4>
              <div className="space-y-3">
                {project.events.map(event => (
                  <div key={event.id} className="bg-pink-50 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.name}</p>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <UserGroupIcon className="h-3 w-3 mr-1" />
                          <span>{event.registeredVolunteers}/{event.volunteersRequired} volunteers</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        event.registeredVolunteers >= event.volunteersRequired
                          ? 'bg-green-100 text-green-800'
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {event.registeredVolunteers >= event.volunteersRequired ? 'Filled' : 'Open'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your projects, events, and volunteers
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
                  placeholder="Search projects..."
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
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddProject(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>
        </div>
        
        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map(project => renderProjectCard(project))}
        </div>
        
        {/* Add Project Modal */}
        {showAddProject && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Project</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Description</label>
                      <textarea
                        rows={3}
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={handleCreateProject}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-base font-medium text-white hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Create Project
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Event Modal */}
        {showAddEvent && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        rows={2}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Venue</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Volunteers Required</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={() => {
                          // Here you would typically make an API call to create the event
                          console.log('Creating event for project:', selectedProject);
                          setShowAddEvent(false);
                        }}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-base font-medium text-white hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Create Event
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddEvent(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheLeadsProjects; 