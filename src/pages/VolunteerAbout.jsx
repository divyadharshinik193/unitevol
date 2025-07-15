import React from 'react';
import {
  UserGroupIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';

const VolunteerAbout = () => {
  const features = [
    {
      title: 'Join Community Initiatives',
      description: 'Participate in local events and social causes that matter to you.',
      icon: UserGroupIcon,
    },
    {
      title: 'Skills-Based Volunteering',
      description: 'Use your professional skills to support NGOs and their missions.',
      icon: BriefcaseIcon,
    },
    {
      title: 'Mentor Others',
      description: 'Share your experience and guide aspiring volunteers.',
      icon: AcademicCapIcon,
    },
    {
      title: 'Awareness Campaigns',
      description: 'Help spread the word about important social causes.',
      icon: MegaphoneIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Volunteer with UniteVol
          </h1>
          <p className="mt-4 text-lg text-white max-w-3xl">
            Make a difference in your community through meaningful volunteering opportunities.
          </p>
        </div>
      </div>

      {/* What is Volunteering Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">What is Volunteering?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Selfless Service for Social Good
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Volunteering is the act of selflessly offering your time, skills, and resources to support communities and causes that need help. Through UniteVol, you can find opportunities that match your interests and availability.
          </p>
        </div>
      </div>

      {/* How Can You Contribute Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">How Can You Contribute?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Make Your Impact
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To create a seamless and efficient platform that empowers individuals to contribute to social causes and make a difference in their communities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading digital hub for volunteerism, fostering social responsibility and sustainable change worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAbout; 