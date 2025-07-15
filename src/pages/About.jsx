import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  ArrowRightIcon,
  StarIcon,
  HeartIcon,
  LightBulbIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    {
      title: 'She Leads',
      description: 'Empowering women leaders in social impact through mentorship and resources.',
      icon: SparklesIcon,
      color: 'sheleads',
      href: '/she-leads',
      gradient: 'from-pink-500 to-rose-600',
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
      gradient: 'from-purple-500 to-indigo-600',
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
      gradient: 'from-green-500 to-emerald-600',
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
      gradient: 'from-orange-500 to-amber-600',
      features: [
        'Team management',
        'Project planning',
        'Progress tracking',
        'Resource allocation'
      ]
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Volunteers', icon: UserGroupIcon },
    { number: '500+', label: 'NGO Partners', icon: BuildingOfficeIcon },
    { number: '1M+', label: 'Lives Impacted', icon: HeartIcon },
    { number: '50+', label: 'Cities Covered', icon: GlobeAltIcon }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-orange-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-pulse-slow">
                <SparklesIcon className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium">Connecting Hearts, Creating Impact</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              About{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse-slow">
                  UniteVol
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg blur opacity-30 animate-pulse-slow"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Empowering communities through meaningful connections and impactful volunteering experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/volunteer"
                className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                Learn More
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center group animate-fade-in-up hover-lift`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Impact Path
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking to volunteer, lead projects, or manage initiatives, we have the perfect platform for your social impact journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, index) => (
              <Link
                key={section.title}
                to={section.href}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fade-in-up ${
                  activeSection === index ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <section.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title and description */}
                  <h3 className={`text-2xl font-bold mb-4 group-hover:text-${section.color}-600 transition-colors duration-300`}>
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                    {section.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {section.features.map((feature, featureIndex) => (
                      <li
                        key={feature}
                        className={`flex items-center text-sm text-gray-700 group-hover:text-gray-900 transition-all duration-300 animate-slide-in-left`}
                        style={{ animationDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                      >
                        <CheckCircleIcon className={`h-5 w-5 mr-3 text-${section.color}-500 group-hover:scale-110 transition-transform duration-300`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <div className={`flex items-center text-${section.color}-600 font-semibold group-hover:text-${section.color}-700 transition-colors duration-300`}>
                    <span>Explore {section.title}</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-6">
                <LightBulbIcon className="h-5 w-5 text-primary-600" />
                <span className="text-primary-700 font-medium">Our Mission</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Making Social Impact{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  Accessible
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                UniteVol is dedicated to connecting individuals with social causes and organizations with volunteers. We believe that everyone has the power to make a difference, and we're here to make that journey easier and more impactful.
              </p>
              
              <div className="space-y-4">
                {[
                  'Seamless volunteer-organization matching',
                  'Real-time impact tracking and analytics',
                  'Community-driven project management',
                  'Skill-based volunteering opportunities'
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center animate-fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mr-4"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: HeartIcon, label: 'Passion-Driven', color: 'text-red-500' },
                      { icon: StarIcon, label: 'Excellence', color: 'text-yellow-500' },
                      { icon: UserGroupIcon, label: 'Community', color: 'text-blue-500' },
                      { icon: GlobeAltIcon, label: 'Global Impact', color: 'text-green-500' }
                    ].map((value, index) => (
                      <div
                        key={value.label}
                        className={`text-center p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 animate-scale-in`}
                        style={{ animationDelay: `${index * 300}ms` }}
                      >
                        <value.icon className={`h-8 w-8 ${value.color} mx-auto mb-2`} />
                        <span className="text-sm font-semibold text-gray-700">{value.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Join thousands of volunteers and organizations creating positive change in communities worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link
              to="/signup"
              className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span>Start Your Journey</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/about"
              className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <span>Learn More</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;