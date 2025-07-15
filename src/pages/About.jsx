import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const About = () => {
  const sections = [
    {
      title: 'She Leads',
      description: 'Empowering women leaders in social impact through mentorship and resources.',
      icon: SparklesIcon,
      color: 'sheleads',
      href: '/she-leads',
      features: [
        'Women-led project management',
        'Mentorship programs',
        'Leadership development',
        'Community building'
      ]
    },
    {
      title: 'Volunteer',
      description: 'Find meaningful opportunities and make a difference in your community.',
      icon: UserGroupIcon,
      color: 'volunteer',
      href: '/volunteer',
      features: [
        'Skill-based matching',
        'Flexible scheduling',
        'Impact tracking',
        'Community engagement'
      ]
    },
    {
      title: 'NGO',
      description: 'Connect with passionate volunteers and scale your impact.',
      icon: BuildingOfficeIcon,
      color: 'ngo',
      href: '/ngo',
      features: [
        'Volunteer management',
        'Project tracking',
        'Impact analytics',
        'Resource optimization'
      ]
    },
    {
      title: 'Project Lead',
      description: 'Lead impactful projects and inspire change in your community.',
      icon: UserGroupIcon,
      color: 'projectlead',
      href: '/project-lead',
      features: [
        'Team management',
        'Project planning',
        'Progress tracking',
        'Resource allocation'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-70" />
          {/* Add decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-60 h-60 bg-primary-400 rounded-full opacity-20 transform rotate-45" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-primary-300 rounded-full opacity-20 transform -rotate-45" />
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
              About <span className="text-orange-400">UniteVol</span>
            </h1>
            <p className="mt-6 text-xl text-white max-w-2xl mx-auto animate-slide-up leading-relaxed">
              Empowering communities through meaningful connections and impactful volunteering.
            </p>
            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.title}
              to={section.href}
              className={`group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-t-4 border-${section.color}-500 overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-12 w-12 rounded-full bg-${section.color}-500 flex items-center justify-center shadow-md`}>
                <section.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-${section.color}-50 opacity-30`} />
              <h3 className={`text-xl font-bold text-${section.color}-700 mb-3`}>{section.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2">{section.description}</p>
              <ul className="space-y-3">
                {section.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-700 group-hover:text-gray-900">
                    <CheckCircleIcon className={`h-5 w-5 mr-3 text-${section.color}-500`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className={`mt-6 flex items-center text-${section.color}-600 font-medium group-hover:text-${section.color}-700 transition-colors duration-300`}>
                Learn more
                <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Making Social Impact Accessible
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              UniteVol is dedicated to connecting individuals with social causes and organizations with volunteers. We believe that everyone has the power to make a difference, and we're here to make that journey easier and more impactful.
            </p>
          </div>
        </div>
      </div>

      {/* Why UniteVol Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why UniteVol</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Benefits for Everyone
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-soft hover:shadow-glow transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">For Volunteers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-volunteer-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Find meaningful opportunities in your community</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-volunteer-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Track your impact and volunteer hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-volunteer-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Connect with like-minded individuals</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft hover:shadow-glow transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">For Organizations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-ngo-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Access a pool of dedicated volunteers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-ngo-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Streamline volunteer management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-ngo-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-500">Measure and showcase your impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Future Vision</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Building a Better Tomorrow
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We envision a world where volunteering is seamlessly integrated into everyday life, where organizations can easily connect with passionate individuals, and where social impact is measurable and celebrated. Through UniteVol, we're working to make this vision a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;