import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  LinkIcon,
  BriefcaseIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const VolunteerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    email: user?.email || '',
    age: '',
    skills: '',
    location: '',
    availability: '',
    education: '',
    currentOrganization: '',
    linkedinProfile: '',
    experience: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save profile
    console.log('Profile data:', profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    min="16"
                    max="100"
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    disabled
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SparklesIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    placeholder="e.g., Teaching, Event Management, Fundraising"
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="availability"
                    value={profile.availability}
                    onChange={handleChange}
                    placeholder="e.g., Weekends, Afternoons"
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Education Qualification</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="education"
                    value={profile.education}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Current Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Organization/Institution</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="currentOrganization"
                    value={profile.currentOrganization}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn Profile Link</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={profile.linkedinProfile}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe your relevant experience..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Recommendation System Section */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Opportunities</h3>
          <div className="text-gray-600">
            <p>Our AI-powered recommendation system will analyze your profile and suggest the best opportunities based on:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your skills and experience</li>
              <li>Location preferences</li>
              <li>Availability</li>
              <li>Domain interests</li>
              <li>Previous volunteering history</li>
            </ul>
            <p className="mt-4">This feature is coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile; 