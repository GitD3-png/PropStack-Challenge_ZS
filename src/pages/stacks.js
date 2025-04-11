import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import StackNavigation from '../components/StackNavigation';
import CompanyGrid from '../components/CompanyGrid';
import { FaPlus } from 'react-icons/fa';
import { initializeData, getAllData, getCategoryCompanies } from '../utils/localStorageUtils';

export default function Stacks({ propStackData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]);

  // Initialize localStorage data when the component mounts
  useEffect(() => {
    // Initialize data in localStorage if it doesn't exist
    initializeData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Parse the category path
      const pathParts = selectedCategory.split('.');
      setCategoryPath(pathParts);
      
      // Get companies from localStorage
      const companiesData = getCategoryCompanies(selectedCategory);
      setCompanies(companiesData);
    }
  }, [selectedCategory]);

  return (
    <Layout>
      <Head>
        <title>PropStack - Browse PropTech Stacks</title>
        <meta name="description" content="Browse and explore PropTech stacks for the Multifamily real estate industry" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary">Home</Link> / Browse Stacks
        </div>
        
        {/* Page Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Popular Tech Stacks</h1>
            <p className="text-gray-600">
              The open source tools and tech behind popular PropTech companies
            </p>
          </div>
          
          <button className="flex items-center bg-primary text-white px-4 py-2 rounded">
            <FaPlus className="mr-2" />
            Add your company's stack
          </button>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-1/4">
            <StackNavigation 
              data={propStackData} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
          
          {/* Right Column - Companies */}
          <div className="w-full md:w-3/4">
            {selectedCategory ? (
              <CompanyGrid 
                companies={companies} 
                categoryName={categoryPath[categoryPath.length - 1]} 
              />
            ) : (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Welcome to PropStack</h2>
                <p className="text-gray-600 mb-4">
                  Select a category from the navigation menu to view PropTech companies in that segment.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-blue-800 mb-2">What is a tech stack?</h2>
                      <p className="text-gray-700">
                        A tech stack is defined as the set of technologies an organization uses to build a web or mobile application. It is a combination of programming languages, frameworks, libraries, patterns, servers, UI/UX solutions, software, and tools used by its developers.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Popular and Trending Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <div className="flex">
                    <button className="px-4 py-2 font-medium text-primary border-b-2 border-primary">
                      Popular
                    </button>
                    <button className="px-4 py-2 font-medium text-gray-500">
                      Trending
                    </button>
                  </div>
                </div>
                
                {/* Featured Companies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {['Pinterest', 'Uber Technologies', 'Airbnb'].map((name, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 relative mr-3">
                            <Image
                              src="/placeholder-logo.svg"
                              alt={`${name} logo`}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <h3 className="font-semibold">{name}</h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {name}'s profile on PropStack is not actively maintained, so the information here may be out of date...
                        </p>
                        
                        <div className="flex justify-between">
                          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                            + Follow
                          </button>
                          
                          <button className="border border-gray-300 px-4 py-1 rounded text-sm">
                            View
                          </button>
                        </div>
                      </div>
                      
                      {/* Tools section */}
                      <div className="bg-yellow-50 p-2 text-xs font-medium text-gray-700">
                        <span>5 PropTech Solutions</span>
                      </div>
                      
                      <div className="bg-gray-800 p-3 grid grid-cols-6 gap-1">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-2 text-center text-xs text-gray-500">
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
