import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BuildingOfficeIcon, IdentificationIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon, MapIcon, CalendarIcon } from '@heroicons/react/24/outline';

const NGOProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    ngoName: '',
    ngoId: '',
    email: '',
    website: '',
    address: '',
    contact: '',
    areaOfService: '',
    establishedYear: ''
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">NGO Profile</h1>
            <p className="mt-2 text-gray-600">Complete your organization's profile information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NGO Name */}
            <div>
              <label htmlFor="ngoName" className="block text-sm font-medium text-gray-700">
                NGO Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="ngoName"
                  id="ngoName"
                  required
                  value={profile.ngoName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your NGO name"
                />
              </div>
            </div>

            {/* NGO ID */}
            <div>
              <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700">
                NGO ID
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="ngoId"
                  id="ngoId"
                  required
                  value={profile.ngoId}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your NGO ID"
                />
              </div>
            </div>

            {/* Professional Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Professional Email ID
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={profile.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your professional email"
                />
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="website"
                  id="website"
                  required
                  value={profile.website}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your website URL"
                />
              </div>
            </div>

            {/* Location/Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Location (Address)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="address"
                  id="address"
                  required
                  rows={3}
                  value={profile.address}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your complete address"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Details
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  required
                  value={profile.contact}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>
            </div>

            {/* Area of Service */}
            <div>
              <label htmlFor="areaOfService" className="block text-sm font-medium text-gray-700">
                Area of Service
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="areaOfService"
                  id="areaOfService"
                  required
                  value={profile.areaOfService}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your area of service"
                />
              </div>
            </div>

            {/* Established Year */}
            <div>
              <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700">
                Established Year
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="establishedYear"
                  id="establishedYear"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  value={profile.establishedYear}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the year your NGO was established"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NGOProfile; 