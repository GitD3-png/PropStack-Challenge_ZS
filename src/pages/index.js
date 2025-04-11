import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { FaInfoCircle, FaChevronRight } from 'react-icons/fa';

export default function Home({ propStackData }) {
  const [activeTab, setActiveTab] = useState('popular');
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    // Extract some featured companies from the data for display
    const extractFeaturedCompanies = () => {
      const companies = [];
      
      // Get companies from different categories to showcase variety
      const categories = [
        'Multifamily.PRE-OCCUPANCY.Pre-Discovery/Branding.MarTech',
        'Multifamily.PRE-OCCUPANCY.Distribution/Discovery.Website',
        'Multifamily.OCCUPANCY.Move In.Tenant Tech Pkge',
        'Multifamily.OCCUPANCY.Occupy.Rent Payment',
        'Multifamily.POST-OCCUPANCY.Renew.Lease Renewal',
        'Multifamily.PRE-OCCUPANCY.Site Visit.Interior Access'
      ];
      
      categories.forEach(categoryPath => {
        const pathParts = categoryPath.split('.');
        let currentData = propStackData;
        
        for (const part of pathParts) {
          if (currentData && currentData[part]) {
            currentData = currentData[part];
          } else {
            return;
          }
        }
        
        if (Array.isArray(currentData) && currentData.length > 0) {
          // Filter out "see" references and get up to 3 companies
          const validCompanies = currentData
            .filter(company => !company.see)
            .slice(0, 3)
            .map(company => ({
              ...company,
              category: pathParts[pathParts.length - 1]
            }));
          
          companies.push(...validCompanies);
        }
      });
      
      // Limit to 6 companies for the grid
      return companies.slice(0, 6);
    };
    
    setFeaturedCompanies(extractFeaturedCompanies());
  }, [propStackData]);

  return (
    <Layout>
      <Head>
        <title>PropStack - Popular PropTech Stacks</title>
        <meta name="description" content="A visual map of technology companies in the Multifamily real estate industry" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link> / Browse Stacks
        </div>
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Popular PropTech Stacks</h1>
        <p className="text-gray-600 mb-4">
          The PropTech tools and tech behind popular real estate companies
        </p>
        
        {/* Dynamic Dropdown Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Browse PropTech Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Primary Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Category</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory('');
                  setSelectedTag('');
                }}
              >
                <option value="">Select Category</option>
                <option value="PRE-OCCUPANCY">PRE-OCCUPANCY</option>
                <option value="OCCUPANCY">OCCUPANCY</option>
                <option value="POST-OCCUPANCY">POST-OCCUPANCY</option>
              </select>
            </div>
            
            {/* Sub-Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSubCategory}
                onChange={(e) => {
                  setSelectedSubCategory(e.target.value);
                  setSelectedTag('');
                }}
                disabled={!selectedCategory}
              >
                <option value="">Select Sub-Category</option>
                {selectedCategory && propStackData?.Multifamily?.[selectedCategory] && 
                  Object.keys(propStackData.Multifamily[selectedCategory]).map(subCat => (
                    <option key={subCat} value={subCat}>{subCat}</option>
                  ))
                }
              </select>
            </div>
            
            {/* Tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                disabled={!selectedSubCategory}
              >
                <option value="">Select Tag</option>
                {selectedCategory && selectedSubCategory && 
                  propStackData?.Multifamily?.[selectedCategory]?.[selectedSubCategory] && 
                  Object.keys(propStackData.Multifamily[selectedCategory][selectedSubCategory]).map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))
                }
              </select>
            </div>
            
            {/* Action Button */}
            <div className="flex items-end">
              <Link 
                href={selectedTag ? `/stacks?category=${selectedCategory}&subcategory=${selectedSubCategory}&tag=${selectedTag}` : '/stacks'}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center ${(!selectedCategory) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  if (!selectedCategory) {
                    e.preventDefault();
                  }
                }}
              >
                Browse Stack
              </Link>
            </div>
          </div>
        </div>
        
        {/* What is a tech stack */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2" />
            <div>
              <h2 className="text-lg font-semibold text-blue-800 mb-2">What is a PropTech stack?</h2>
              <p className="text-gray-700">
                A PropTech stack is defined as the set of technologies a real estate organization uses to build a web or mobile application. It is a combination of programming languages, frameworks, libraries, patterns, servers, UI/UX solutions, software, and tools used by its developers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'popular' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('popular')}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'trending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </button>
          </div>
        </div>
        
        {/* Featured Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCompanies.map((company, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
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
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                    <div className="text-blue-500 text-sm">
                      {company.category}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {company.description || `${company.name} is a PropTech solution for the ${company.category} category in Multifamily real estate.`}
                </p>
                
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/company/${encodeURIComponent(company.name)}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
                  >
                    Follow
                  </Link>
                  
                  <Link 
                    href={`/company/${encodeURIComponent(company.name)}`}
                    className="text-gray-500 border border-gray-300 px-4 py-1 rounded text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
              
              {/* Tools section */}
              <div className="bg-yellow-50 p-2 text-xs font-medium text-gray-700">
                <span>5 PropTech Solutions</span>
              </div>
              
              <div className="bg-gray-800 p-4 grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <Image
                      src="/placeholder-logo.svg"
                      alt="Tool logo"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              
              <div className="p-2 text-center text-xs text-gray-500">
                {company.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/stacks"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            View all PropTech stacks <FaChevronRight className="ml-1" size={12} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    // Import the JSON data
    const propStackData = require('../../assets/PropStack_MF_Updated_Structure_Links.json');
    
    return {
      props: {
        propStackData,
      },
    };
  } catch (error) {
    console.error('Error loading PropStack data:', error);
    return {
      props: {
        propStackData: { Multifamily: {} },
      },
    };
  }
}
