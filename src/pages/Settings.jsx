import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { currentUser, updateSettings } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      projectUpdates: true,
      volunteerOpportunities: true,
      communityUpdates: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
      showSkills: true,
      showAvailability: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
      emailFrequency: 'daily',
      dashboardLayout: 'default'
    }
  });

  useEffect(() => {
    if (currentUser?.settings) {
      setSettings(currentUser.settings);
    }
  }, [currentUser]);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateSettings(settings);
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Settings
              </h3>
              <div className="mt-5">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
                      <span className="block sm:inline">{success}</span>
                    </div>
                  )}

                  {/* Notifications Section */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      <BellIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Notifications
                    </h4>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('email')}
                          className={`${
                            settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                          <p className="text-sm text-gray-500">Receive push notifications</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('push')}
                          className={`${
                            settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.notifications.push ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Project Updates</label>
                          <p className="text-sm text-gray-500">Get notified about project changes</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNotificationChange('projectUpdates')}
                          className={`${
                            settings.notifications.projectUpdates ? 'bg-primary-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.notifications.projectUpdates ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Section */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Privacy Settings
                    </h4>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Show Email</label>
                          <p className="text-sm text-gray-500">Make your email visible to others</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePrivacyChange('showEmail')}
                          className={`${
                            settings.privacy.showEmail ? 'bg-primary-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.privacy.showEmail ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Show Phone</label>
                          <p className="text-sm text-gray-500">Make your phone number visible to others</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePrivacyChange('showPhone')}
                          className={`${
                            settings.privacy.showPhone ? 'bg-primary-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              settings.privacy.showPhone ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Preferences
                    </h4>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Theme</label>
                        <div className="mt-2 flex space-x-4">
                          <button
                            type="button"
                            onClick={() => handlePreferenceChange('theme', 'light')}
                            className={`${
                              settings.preferences.theme === 'light'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300'
                            } px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                          >
                            <SunIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePreferenceChange('theme', 'dark')}
                            className={`${
                              settings.preferences.theme === 'dark'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300'
                            } px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                          >
                            <MoonIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Language</label>
                        <select
                          value={settings.preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="it">Italian</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Email Frequency</label>
                        <select
                          value={settings.preferences.emailFrequency}
                          onChange={(e) => handlePreferenceChange('emailFrequency', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="daily">Daily Digest</option>
                          <option value="weekly">Weekly Summary</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 