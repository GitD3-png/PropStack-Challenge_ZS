import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CompanyGrid = ({ companies, categoryName }) => {
  if (!companies || companies.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">No companies found</h2>
        <p className="text-gray-600">No companies are available in this category.</p>
      </div>
    );
  }

  // Filter out any "see" references
  const filteredCompanies = companies.filter(company => !company.see);
  
  // Handle "see" references separately
  const references = companies.filter(company => company.see);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-bold p-6 border-b border-gray-200">{categoryName}</h2>
      
      {references.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-md font-semibold mb-2 text-gray-700">Related Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {references.map((ref, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm">
                {ref.see}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-6">
        {filteredCompanies.map((company, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link 
              href={`/company/${encodeURIComponent(company.name)}`}
              className="group"
            >
              <div className="w-16 h-16 bg-white rounded-lg shadow mb-2 flex items-center justify-center relative group-hover:shadow-md transition-shadow">
                <Image
                  src={company.logo || '/placeholder-logo.svg'}
                  alt={`${company.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    e.target.src = '/placeholder-logo.svg';
                  }}
                />
              </div>
              <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                {company.name}
              </h3>
            </Link>
            
            {company.url && (
              <a 
                href={company.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-1 text-xs text-gray-500 hover:text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Visit site
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyGrid;
