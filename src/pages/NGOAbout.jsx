import React from 'react';
import {
  UserGroupIcon,
  MegaphoneIcon,
  UserPlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const NGOAbout = () => {
  const features = [
    {
      title: 'Connect with Volunteers',
      description: 'Find motivated and skilled volunteers who align with your mission.',
      icon: UserGroupIcon,
    },
    {
      title: 'Promote Your Causes',
      description: 'Share your initiatives and upcoming events with a wider audience.',
      icon: MegaphoneIcon,
    },
    {
      title: 'Collaborate Effectively',
      description: 'Work seamlessly with project leads and other NGOs.',
      icon: UserPlusIcon,
    },
    {
      title: 'Track Impact',
      description: 'Monitor volunteer engagement and measure your impact.',
      icon: ChartBarIcon,
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
            NGO Partnership
          </h1>
          <p className="mt-4 text-lg text-white max-w-3xl">
            Amplify your impact by connecting with dedicated volunteers and resources.
          </p>
        </div>
      </div>

      {/* What is an NGO Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">What is an NGO?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Driving Social Change
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A Non-Governmental Organization (NGO) is a group dedicated to addressing social, environmental, or economic issues. NGOs play a vital role in community upliftment, advocacy, and sustainable development. On UniteVol, NGOs can find the right volunteers and collaborate efficiently.
          </p>
        </div>
      </div>

      {/* How Can You Benefit Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">How Can You Benefit?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Maximize Your Impact
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
              To support NGOs in achieving their goals by simplifying volunteer management and building stronger community connections.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the most trusted partner for NGOs in driving meaningful impact and scaling their initiatives globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOAbout; 