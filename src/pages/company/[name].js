import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { FaBookmark, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaShare, FaComment } from 'react-icons/fa';

export default function CompanyDetail({ company, techStack }) {
  const [activeSection, setActiveSection] = useState('stack');
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    application: false,
    utilities: false,
    devops: false
  });

  return (
    <Layout>
      <Head>
        <title>{company.name} - PropStack Tech Stack</title>
        <meta name="description" content={`${company.name}'s PropTech stack and tools`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0 md:mr-8">
            <div className="w-16 h-16 relative mr-4">
              <Image
                src={company.logo || '/placeholder-logo.svg'}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                onError={(e) => {
                  e.target.src = '/placeholder-logo.svg';
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {company.name}
                {company.verified && (
                  <span className="ml-2 text-blue-500 text-sm bg-blue-100 px-1 rounded">✓</span>
                )}
              </h1>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Link href={company.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                  {company.url.replace(/^https?:\/\/(www\.)?/, '')}
                  <FaExternalLinkAlt className="ml-1" size={10} />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
              <FaBookmark className="text-gray-500" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
              <FaShare className="text-gray-500" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700">
            {company.description || `${company.name} is a PropTech solution for the ${company.category} category in Multifamily real estate.`}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-3/4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeSection === 'stack' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveSection('stack')}
              >
                Stack
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeSection === 'application' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveSection('application')}
              >
                Application and Data
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeSection === 'members' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveSection('members')}
              >
                Members
              </button>
            </div>

            {/* Tech Stack Section */}
            {activeSection === 'stack' && (
              <div className="space-y-6">
                {/* Application and Data Section */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => setSectionsCollapsed(prev => ({ ...prev, application: !prev.application }))}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"/>
                        </svg>
                      </div>
                      <h2 className="text-base font-medium">Application and Data <span className="text-gray-400 text-sm">(22)</span></h2>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      {sectionsCollapsed.application ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                  </div>

                  {!sectionsCollapsed.application && (
                    <div className="p-4 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {techStack.slice(0, 10).map((tech, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-md flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <Image
                              src={tech.logo || '/placeholder-logo.svg'}
                              alt={`${tech.name} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                              onError={(e) => {
                                e.target.src = '/placeholder-logo.svg';
                              }}
                            />
                          </div>
                          <span className="text-sm text-center">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Utilities Section */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => setSectionsCollapsed(prev => ({ ...prev, utilities: !prev.utilities }))}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"/>
                        </svg>
                      </div>
                      <h2 className="text-base font-medium">Utilities <span className="text-gray-400 text-sm">(13)</span></h2>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      {sectionsCollapsed.utilities ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                  </div>

                  {!sectionsCollapsed.utilities && (
                    <div className="p-4 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {techStack.slice(5, 15).map((tech, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-md flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <Image
                              src={tech.logo || '/placeholder-logo.svg'}
                              alt={`${tech.name} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                              onError={(e) => {
                                e.target.src = '/placeholder-logo.svg';
                              }}
                            />
                          </div>
                          <span className="text-sm text-center">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DevOps Section */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => setSectionsCollapsed(prev => ({ ...prev, devops: !prev.devops }))}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-500">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                          <path d="M13 7h-2v6h6v-2h-4z"/>
                        </svg>
                      </div>
                      <h2 className="text-base font-medium">DevOps <span className="text-gray-400 text-sm">(17)</span></h2>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      {sectionsCollapsed.devops ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                  </div>

                  {!sectionsCollapsed.devops && (
                    <div className="p-4 bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {techStack.slice(10, 20).map((tech, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-md flex items-center justify-center mb-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <Image
                              src={tech.logo || '/placeholder-logo.svg'}
                              alt={`${tech.name} logo`}
                              width={40}
                              height={40}
                              className="object-contain"
                              onError={(e) => {
                                e.target.src = '/placeholder-logo.svg';
                              }}
                            />
                          </div>
                          <span className="text-sm text-center">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Stack Decisions</h2>
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-500 text-xl">?</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Want more information about this stack?</p>
                  <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Ask a question</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium">James Man</h3>
                  <p className="text-xs text-gray-500">Software Engineer at {company.name} · Nov 19, 2019</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center mr-1">i</span>
                  <span>Shared insights on:</span>
                  <span className="ml-1 text-blue-500">React</span>
                  <span className="ml-1 text-blue-500">Python</span>
                </div>

                <div className="flex items-center text-xs mb-2">
                  <span className="bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center mr-1">
                    <span className="text-xs">R</span>
                  </span>
                  <span>React</span>
                  <span className="mx-2">·</span>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="ml-1">{company.name}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                One of our top priorities at {company.name} is fostering a safe and trustworthy experience for all clients. As {company.name}'s user base and business grow, the need to scale our...
              </p>

              <button className="text-blue-500 text-xs">read more</button>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <button className="flex items-center mr-4">
                    <span className="mr-1">Upvote</span>
                  </button>
                  <button className="flex items-center mr-4">
                    <FaComment className="mr-1" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center">
                    <FaShare className="mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  
  try {
    // In a real application, you would fetch this data from an API or database
    // For this example, we'll create mock data
    const company = {
      name: decodeURIComponent(name),
      logo: '/placeholder-logo.svg',
      url: 'https://example.com',
      category: 'PropTech',
      verified: true,
      description: `${decodeURIComponent(name)} is a leading PropTech solution that helps real estate professionals streamline their operations and improve tenant experience.`
    };
    
    // Mock tech stack data
    const techStack = [
      { name: 'React', logo: '/placeholder-logo.svg' },
      { name: 'Python', logo: '/placeholder-logo.svg' },
      { name: 'Java', logo: '/placeholder-logo.svg' },
      { name: 'MySQL', logo: '/placeholder-logo.svg' },
      { name: 'NGINX', logo: '/placeholder-logo.svg' },
      { name: 'Redis', logo: '/placeholder-logo.svg' },
      { name: 'Amazon S3', logo: '/placeholder-logo.svg' },
      { name: 'Amazon EC2', logo: '/placeholder-logo.svg' },
      { name: 'Django', logo: '/placeholder-logo.svg' },
      { name: 'Golang', logo: '/placeholder-logo.svg' }
    ];
    
    return {
      props: {
        company,
        techStack
      }
    };
  } catch (error) {
    console.error('Error fetching company data:', error);
    return {
      notFound: true
    };
  }
}
