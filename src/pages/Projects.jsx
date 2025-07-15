import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Projects = () => {
  // Sample projects data (will be replaced with backend data)
  const projects = [
    {
      id: 1,
      title: "Teaching Assistant Program",
      organization: "Education For All NGO",
      status: "Active",
      type: "Education",
      description: "Supporting underprivileged children in after-school programs with their studies and activities.",
      location: "Chennai",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      nextSession: "2024-03-15",
      timeCommitment: "3 hours/week",
      totalHours: 24,
      role: "Teaching Assistant",
      impact: {
        studentsHelped: 25,
        sessionsCompleted: 8,
        upcomingSessions: 16
      },
      tasks: [
        "Assist primary school students with homework",
        "Conduct interactive learning activities",
        "Track student progress",
        "Prepare teaching materials"
      ]
    },
    {
      id: 2,
      title: "Environmental Clean-up Drive",
      organization: "Green Earth Project",
      status: "Upcoming",
      type: "Environment",
      description: "Community-driven initiative to clean up local beaches and raise awareness about marine pollution.",
      location: "Madurai",
      startDate: "2024-03-20",
      endDate: "2024-03-20",
      nextSession: "2024-03-20",
      timeCommitment: "One-time (4 hours)",
      totalHours: 0,
      role: "Volunteer",
      impact: {
        expectedParticipants: 50,
        areaTarget: "2km beach stretch",
        wasteTarget: "500kg"
      },
      tasks: [
        "Participate in beach clean-up",
        "Sort collected waste for recycling",
        "Engage in awareness activities",
        "Document the clean-up process"
      ]
    },
    {
      id: 3,
      title: "Women's Health Workshop",
      organization: "She Leads Initiative",
      status: "Registered",
      type: "Healthcare",
      description: "Monthly workshops focusing on women's health education and awareness in rural communities.",
      location: "Coimbatore",
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      nextSession: "2024-04-01",
      timeCommitment: "Monthly (6 hours)",
      totalHours: 0,
      role: "Health Educator",
      impact: {
        communitiesTargeted: 6,
        expectedReach: 300,
        workshopsPlanned: 6
      },
      tasks: [
        "Conduct health awareness sessions",
        "Distribute educational materials",
        "Collect feedback from participants",
        "Coordinate with local healthcare workers"
      ]
    }
  ];

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get type badge color
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'education':
        return 'bg-indigo-100 text-indigo-800';
      case 'environment':
        return 'bg-emerald-100 text-emerald-800';
      case 'healthcare':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600">View and manage your volunteering projects</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-xl rounded-xl overflow-hidden">
              {/* Project Header */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                    <p className="text-sm text-gray-600">{project.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{project.description}</p>

                {/* Project Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Project Details</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          <MapPinIcon className="inline-block h-4 w-4 mr-1" />
                          Location: {project.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <CalendarIcon className="inline-block h-4 w-4 mr-1" />
                          Duration: {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          <ClockIcon className="inline-block h-4 w-4 mr-1" />
                          Time Commitment: {project.timeCommitment}
                        </p>
                        <p className="text-sm text-gray-600">
                          <UserGroupIcon className="inline-block h-4 w-4 mr-1" />
                          Role: {project.role}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Your Tasks</h3>
                      <ul className="mt-2 space-y-1">
                        {project.tasks.map((task, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Impact & Progress</h3>
                      <div className="mt-2 space-y-2">
                        {project.status === 'Active' && (
                          <>
                            <p className="text-sm text-gray-600">Students Helped: {project.impact.studentsHelped}</p>
                            <p className="text-sm text-gray-600">Sessions Completed: {project.impact.sessionsCompleted}</p>
                            <p className="text-sm text-gray-600">Upcoming Sessions: {project.impact.upcomingSessions}</p>
                          </>
                        )}
                        {project.status === 'Upcoming' && (
                          <>
                            <p className="text-sm text-gray-600">Expected Participants: {project.impact.expectedParticipants}</p>
                            <p className="text-sm text-gray-600">Area Target: {project.impact.areaTarget}</p>
                            <p className="text-sm text-gray-600">Waste Collection Target: {project.impact.wasteTarget}</p>
                          </>
                        )}
                        {project.status === 'Registered' && (
                          <>
                            <p className="text-sm text-gray-600">Communities Targeted: {project.impact.communitiesTargeted}</p>
                            <p className="text-sm text-gray-600">Expected Reach: {project.impact.expectedReach}</p>
                            <p className="text-sm text-gray-600">Workshops Planned: {project.impact.workshopsPlanned}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        <CalendarIcon className="inline-block h-4 w-4 mr-1" />
                        {new Date(project.nextSession).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 