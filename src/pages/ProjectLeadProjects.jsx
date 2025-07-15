import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const ProjectLeadProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectStatus, setProjectStatus] = useState('all');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const navigate = useNavigate();

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: ''
  });

  const [eventForm, setEventForm] = useState({
    name: '',
    venue: '',
    date: '',
    time: '',
    volunteersRequired: '',
    eligibility: '',
    details: ''
  });

  // Sample projects data (will be replaced with backend data)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Community Garden Initiative",
      description: "Creating sustainable community gardens to promote local food production and environmental awareness.",
      status: "active",
      events: [
        {
          id: 1,
          name: "Garden Setup Day",
          venue: "Community Park",
          date: "2024-03-15",
          time: "09:00",
          volunteersRequired: 10,
          registeredVolunteers: 8,
          eligibility: "Anyone interested in gardening",
          details: "Help set up raised beds and plant initial vegetables"
        },
        {
          id: 2,
          name: "Gardening Workshop",
          venue: "Community Center",
          date: "2024-03-20",
          time: "14:00",
          volunteersRequired: 5,
          registeredVolunteers: 3,
          eligibility: "Basic gardening knowledge",
          details: "Teach community members about sustainable gardening practices"
        }
      ]
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      description: "Connecting experienced professionals with youth for career guidance and skill development.",
      status: "active",
      events: [
        {
          id: 1,
          name: "Career Fair",
          venue: "City Hall",
          date: "2024-03-25",
          time: "10:00",
          volunteersRequired: 15,
          registeredVolunteers: 12,
          eligibility: "Professionals willing to mentor",
          details: "Share career experiences and provide guidance to youth"
        }
      ]
    },
    {
      id: 3,
      title: "Digital Literacy Campaign",
      description: "Teaching essential digital skills to seniors and underprivileged communities.",
      status: "upcoming",
      events: [
        {
          id: 1,
          name: "Basic Computer Skills Workshop",
          venue: "Public Library",
          date: "2024-04-01",
          time: "13:00",
          volunteersRequired: 8,
          registeredVolunteers: 5,
          eligibility: "Basic computer knowledge, patience",
          details: "Teach basic computer operations and internet usage"
        }
      ]
    }
  ]);

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: projects.length + 1,
      ...projectForm,
      status: "active",
      events: []
    };
    setProjects([...projects, newProject]);
    setProjectForm({ title: '', description: '' });
    setShowAddProjectModal(false);
  };

  const handleEditProject = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map(project => 
      project.id === selectedProject.id 
        ? { ...project, ...projectForm }
        : project
    );
    setProjects(updatedProjects);
    setShowEditProjectModal(false);
    setSelectedProject(null);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: selectedProject.events.length + 1,
      ...eventForm,
      registeredVolunteers: 0
    };
    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id
        ? { ...project, events: [...project.events, newEvent] }
        : project
    );
    setProjects(updatedProjects);
    setEventForm({
      name: '',
      venue: '',
      date: '',
      time: '',
      volunteersRequired: '',
      eligibility: '',
      details: ''
    });
    setShowAddEventModal(false);
    setSelectedProject(null);
  };

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
    const matchesStatus = projectStatus === 'all' || project.status.toLowerCase() === projectStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const renderProjectCard = (project) => {
    const isExpanded = expandedProject === project.id;
    
    return (
      <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-100">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'active' ? 'bg-orange-100 text-orange-800' : 
              project.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {project.status === 'active' ? 'Active' : 
               project.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{project.events.length} events</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setShowAddEventModal(true);
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Event
              </button>
              <button
                onClick={() => toggleExpand(project.id)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
                  <div key={event.id} className="bg-orange-50 p-3 rounded-md">
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
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-orange-100 text-orange-800'
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
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Lead Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your projects and events
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Search projects..."
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
        {showAddProjectModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Project</h3>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Description</label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-base font-medium text-white hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Create Project
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddProjectModal(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
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
        {showAddEventModal && selectedProject && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event to {selectedProject.title}</h3>
                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Name</label>
                      <input
                        type="text"
                        value={eventForm.name}
                        onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        rows={2}
                        value={eventForm.details}
                        onChange={(e) => setEventForm({ ...eventForm, details: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Venue</label>
                      <input
                        type="text"
                        value={eventForm.venue}
                        onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Volunteers Required</label>
                      <input
                        type="number"
                        value={eventForm.volunteersRequired}
                        onChange={(e) => setEventForm({ ...eventForm, volunteersRequired: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                      <input
                        type="text"
                        value={eventForm.eligibility}
                        onChange={(e) => setEventForm({ ...eventForm, eligibility: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-base font-medium text-white hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Create Event
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddEventModal(false);
                          setSelectedProject(null);
                        }}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
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

        {/* Edit Project Modal */}
        {showEditProjectModal && selectedProject && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Project</h3>
                  <form onSubmit={handleEditProject} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Description</label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-base font-medium text-white hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditProjectModal(false);
                          setSelectedProject(null);
                        }}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default ProjectLeadProjects; 