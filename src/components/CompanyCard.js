import React from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

const CompanyCard = ({ company }) => {
  const { name, url, logo } = company;
  
  // Use a default logo if none is provided
  const logoSrc = logo || '/PTAG-logo.svg';
  
  return (
    <div className="tech-card">
      <div className="relative w-16 h-16 mb-3">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            fill
            className="object-contain"
            onError={(e) => {
              e.target.src = '/PTAG-logo.svg';
            }}
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-center">{name}</h3>
      
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-2 flex items-center text-xs text-primary hover:underline"
        >
          <FaExternalLinkAlt className="mr-1" size={10} />
          Visit
        </a>
      )}
    </div>
  );
};

export default CompanyCard;
