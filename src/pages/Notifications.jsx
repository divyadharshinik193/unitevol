import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BellIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  BellSlashIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'project',
      title: 'New Project Assignment',
      message: 'You have been assigned to the "Community Garden" project',
      timestamp: '2 minutes ago',
      read: false,
      icon: DocumentTextIcon
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about the event planning',
      timestamp: '15 minutes ago',
      read: false,
      icon: ChatBubbleLeftIcon
    },
    {
      id: 3,
      type: 'event',
      title: 'Upcoming Event',
      message: 'The monthly volunteer meeting is scheduled for tomorrow',
      timestamp: '1 hour ago',
      read: true,
      icon: CalendarIcon
    },
    {
      id: 4,
      type: 'community',
      title: 'Community Update',
      message: 'New discussion started in the "Environmental Projects" group',
      timestamp: '2 hours ago',
      read: true,
      icon: UserGroupIcon
    }
  ]);
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    volunteerOpportunities: true,
    communityUpdates: true,
    marketing: false
  });

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'project':
        return DocumentTextIcon;
      case 'message':
        return ChatBubbleLeftIcon;
      case 'event':
        return CalendarIcon;
      case 'community':
        return UserGroupIcon;
      default:
        return BellIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Settings
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePreferenceChange('email')}
                    className={`${
                      preferences.email ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        preferences.email ? 'translate-x-5' : 'translate-x-0'
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
                    onClick={() => handlePreferenceChange('push')}
                    className={`${
                      preferences.push ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        preferences.push ? 'translate-x-5' : 'translate-x-0'
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
                    onClick={() => handlePreferenceChange('projectUpdates')}
                    className={`${
                      preferences.projectUpdates ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        preferences.projectUpdates ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-4">
                {notifications.map(notification => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start p-4 rounded-lg ${
                        notification.read ? 'bg-white' : 'bg-primary-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">{notification.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {notifications.length === 0 && (
                  <div className="text-center py-12">
                    <BellSlashIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You're all caught up! Check back later for new updates.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 