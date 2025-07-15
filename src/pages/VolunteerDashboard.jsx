import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  TagIcon,
  FunnelIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDomain, setSearchDomain] = useState('');
  const [filters, setFilters] = useState({
    state: 'Tamil Nadu',
    city: '',
    domains: [],
    availability: []
  });

  const cities = [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Thoothukudi',
    'Thanjavur',
    'Tiruppur',
    'Erode',
    'Vellore',
    'Dindigul',
    'Karur',
    'Namakkal',
    'Sivakasi',
    'Ooty',
    'Hosur',
    'Nagercoil',
    'Kanchipuram',
    'Cuddalore'
  ];

  const domains = [
    'Education & Literacy',
    'Healthcare & Medical Support',
    'Environment & Sustainability',
    'Women Empowerment',
    'Child Welfare',
    'Animal Welfare',
    'Disaster Relief & Crisis Management',
    'Elderly Support',
    'Disability Support',
    'Arts & Culture Promotion',
    'Rural Development',
    'Technology & Innovation',
    'Other'
  ];

  const availabilityOptions = [
    'Weekdays (Full-Time)',
    'Weekdays (Part-Time)',
    'Weekends Only',
    'Flexible/As per Requirement',
    'One-Time Event Based'
  ];

  // Sample data - replace with actual data from backend
  const stats = {
    eventsParticipated: 5,
    totalHours: 120,
    rolesPlayed: ['Event Coordinator', 'Mentor', 'Fundraiser'],
    registeredEvents: [
      {
        id: 1,
        title: 'Education Support Program',
        date: '2024-03-15',
        location: 'Mumbai',
        status: 'Upcoming'
      },
      {
        id: 2,
        title: 'Environmental Cleanup',
        date: '2024-03-20',
        location: 'Delhi',
        status: 'Upcoming'
      }
    ]
  };

  // Add this sample data for demonstration
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample opportunities data (this will come from backend later)
  const sampleOpportunities = [
    {
      id: 1,
      title: "Teaching Assistant Program",
      organization: "Education For All NGO",
      type: "NGO",
      location: "Chennai",
      domain: "Education & Literacy",
      availability: "Weekdays (Part-Time)",
      description: "Looking for volunteers to assist in after-school programs for underprivileged children",
      requirements: "Basic knowledge in teaching, patience with children",
      duration: "3 months",
      postedBy: "John Doe (NGO Coordinator)",
      postedDate: "2024-03-01",
      deadline: "2024-03-20",
      spots: 5,
      status: "Open"
    },
    {
      id: 2,
      title: "Women's Health Awareness Campaign",
      organization: "She Leads Initiative",
      type: "She Leads",
      location: "Coimbatore",
      domain: "Healthcare & Medical Support",
      availability: "Weekends Only",
      description: "Organizing health awareness sessions for women in rural areas. Looking for volunteers with healthcare background.",
      requirements: "Healthcare background preferred, good communication skills",
      duration: "2 months",
      postedBy: "Sarah Johnson (She Leads Coordinator)",
      postedDate: "2024-03-02",
      deadline: "2024-03-25",
      spots: 3,
      status: "Open"
    },
    {
      id: 3,
      title: "Environmental Clean-up Drive",
      organization: "Green Earth Project",
      type: "Project Lead",
      location: "Madurai",
      domain: "Environment & Sustainability",
      availability: "One-Time Event Based",
      description: "Community clean-up drive and awareness program to promote environmental consciousness",
      requirements: "Enthusiasm and commitment to environmental causes",
      duration: "1 day",
      postedBy: "Mike Wilson (Project Lead)",
      postedDate: "2024-03-03",
      deadline: "2024-03-15",
      spots: 20,
      status: "Open"
    },
    {
      id: 4,
      title: "Digital Literacy Workshop",
      organization: "Tech For All NGO",
      type: "NGO",
      location: "Chennai",
      domain: "Education & Literacy",
      availability: "Weekends Only",
      description: "Teaching basic computer skills to senior citizens and underprivileged youth",
      requirements: "Good knowledge of basic computer operations, patience in teaching",
      duration: "2 months",
      postedBy: "Alice Brown (NGO Director)",
      postedDate: "2024-03-04",
      deadline: "2024-03-30",
      spots: 8,
      status: "Open"
    },
    {
      id: 5,
      title: "Rural Entrepreneurship Program",
      organization: "She Leads Rural Initiative",
      type: "She Leads",
      location: "Tiruchirappalli",
      domain: "Women Empowerment",
      availability: "Flexible/As per Requirement",
      description: "Mentoring rural women entrepreneurs in business skills and digital marketing",
      requirements: "Business background, experience in mentoring",
      duration: "6 months",
      postedBy: "Emma Clark (She Leads Director)",
      postedDate: "2024-03-05",
      deadline: "2024-04-05",
      spots: 4,
      status: "Open"
    }
  ];

  const handleDomainChange = (domain) => {
    setFilters(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain]
    }));
  };

  const handleAvailabilityChange = (option) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(a => a !== option)
        : [...prev.availability, option]
    }));
  };

  const handleCityChange = (e) => {
    setFilters(prev => ({
      ...prev,
      city: e.target.value
    }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Enhanced filter logic
      const filteredResults = sampleOpportunities.filter(opportunity => {
        // Search query matching (title, description, organization)
        const matchesQuery = searchQuery.toLowerCase() === '' || 
          opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Location matching
        const matchesCity = filters.city === '' || opportunity.location === filters.city;
        
        // Domain matching
        const matchesDomain = filters.domains.length === 0 || 
          filters.domains.includes(opportunity.domain);
        
        // Availability matching
        const matchesAvailability = filters.availability.length === 0 || 
          filters.availability.includes(opportunity.availability);

        // Only show opportunities that are still open
        const isOpen = opportunity.status === 'Open';

        return matchesQuery && matchesCity && matchesDomain && matchesAvailability && isOpen;
      });

      // Sort results by posted date (most recent first)
      const sortedResults = filteredResults.sort((a, b) => 
        new Date(b.postedDate) - new Date(a.postedDate)
      );

      setSearchResults(sortedResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleEventClick = (eventId) => {
    navigate('/volunteer/projects', { state: { selectedEventId: eventId } });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'Volunteer'}! 👋</h1>
            <p className="mt-1 text-purple-100">Here's what's happening with your volunteering journey</p>
          </div>
          <div className="bg-white/10 p-3 rounded-full">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Events Participated</p>
              <p className="text-3xl font-bold mt-1">{stats.eventsParticipated}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <CalendarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-100">Total Hours</p>
              <p className="text-3xl font-bold mt-1">{stats.totalHours}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-pink-100">Roles Played</p>
              <p className="text-3xl font-bold mt-1">{stats.rolesPlayed.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <UserGroupIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              <p className="text-sm text-gray-500">Your next volunteering opportunities</p>
            </div>
            <button
              onClick={() => navigate('/volunteer/projects')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
            >
              View All
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
          <div className="space-y-4">
            {stats.registeredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg cursor-pointer hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-3 rounded-full group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    event.status === 'Upcoming' 
                      ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-800 group-hover:bg-gray-200'
                  } transition-colors duration-300`}>
                    {event.status}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Search Opportunities</h1>
          <p className="text-gray-600">Find volunteering opportunities that match your interests.</p>
        </div>

        <div className="space-y-6">
          {/* Search Form */}
          <div className="bg-white shadow-xl rounded-xl p-6">
            <div className="space-y-6">
              {/* Search Header */}
              <div className="flex items-center gap-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-primary-600" />
                <h4 className="text-lg font-medium text-gray-900">Search</h4>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for opportunities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Location Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value="Tamil Nadu"
                    disabled
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    value={filters.city}
                    onChange={handleCityChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Domain Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain of Interest (Select all that apply)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {domains.map((domain) => (
                    <label key={domain} className="inline-flex items-center p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.domains.includes(domain)}
                        onChange={() => handleDomainChange(domain)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{domain}</span>
                    </label>
                  ))}
                </div>
                {filters.domains.includes('Other') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Please specify other domain"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Availability Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {availabilityOptions.map((option) => (
                    <label key={option} className="inline-flex items-center p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.availability.includes(option)}
                        onChange={() => handleAvailabilityChange(option)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {(searchResults.length > 0 || isSearching) && (
            <div className="bg-white shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
              {isSearching ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Searching for opportunities...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No opportunities found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {searchResults.map((opportunity) => (
                    <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{opportunity.title}</h4>
                          <p className="text-sm text-gray-600">{opportunity.organization}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              opportunity.type === 'NGO' 
                                ? 'bg-blue-100 text-blue-800'
                                : opportunity.type === 'She Leads'
                                ? 'bg-pink-100 text-pink-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {opportunity.type}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {opportunity.domain}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {opportunity.availability}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {opportunity.spots} spots left
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            // This will be connected to backend later
                            alert('Application feature will be implemented with backend integration');
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Apply Now
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{opportunity.description}</p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <p><span className="font-medium">Location:</span> {opportunity.location}</p>
                          <p><span className="font-medium">Duration:</span> {opportunity.duration}</p>
                          <p><span className="font-medium">Requirements:</span> {opportunity.requirements}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Posted By:</span> {opportunity.postedBy}</p>
                          <p><span className="font-medium">Posted Date:</span> {new Date(opportunity.postedDate).toLocaleDateString()}</p>
                          <p><span className="font-medium">Application Deadline:</span> {new Date(opportunity.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRegisteredEvents = () => (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Registered Events</h3>
        <div className="mt-4 space-y-4">
          {stats.registeredEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'search':
        return renderSearch();
      case 'events':
        return renderRegisteredEvents();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.displayName || 'Volunteer'}!</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your volunteering activities and find new opportunities.</p>
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
            <button
              onClick={() => setActiveTab('search')}
              className={`${
                activeTab === 'search'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Search Opportunities
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Registered Events
            </button>
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default VolunteerDashboard; 