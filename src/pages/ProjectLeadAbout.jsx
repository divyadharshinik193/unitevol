import React from 'react';
import {
  UserGroupIcon,
  BriefcaseIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const ProjectLeadAbout = () => {
  const features = [
    {
      title: 'Lead Projects',
      description: 'Initiate and manage impactful community projects.',
      icon: BriefcaseIcon,
    },
    {
      title: 'Build Teams',
      description: 'Assemble and guide teams toward social goals.',
      icon: UserGroupIcon,
    },
    {
      title: 'Track Progress',
      description: 'Monitor project milestones and measure impact.',
      icon: ChartBarIcon,
    },
    {
      title: 'Inspire Change',
      description: 'Drive positive transformation in communities.',
      icon: LightBulbIcon,
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
            Project Leadership
          </h1>
          <p className="mt-4 text-lg text-white max-w-3xl">
            Lead impactful projects and drive positive change in your community.
          </p>
        </div>
      </div>

      {/* Who is a Project Lead Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Who is a Project Lead?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Driving Social Impact
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A Project Lead is someone who initiates, manages, and drives social impact projects, ensuring timely execution and real-world results. On UniteVol, project leads can bring their ideas to life by assembling teams, assigning roles, and tracking progress.
          </p>
        </div>
      </div>

      {/* How Can You Contribute Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">How Can You Contribute?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Make Your Mark
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
              To empower changemakers with the tools and networks they need to bring positive change to society through structured and successful projects.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become a launchpad for impactful leaders shaping tomorrow's communities through action and collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLeadAbout; 