import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const StackNavigation = ({ data, onSelectCategory }) => {
  const [expandedNodes, setExpandedNodes] = useState({
    'Multifamily': true,
  });

  const toggleNode = (nodePath) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodePath]: !prev[nodePath]
    }));
  };

  const renderNode = (node, path = '', level = 0) => {
    if (!node || typeof node !== 'object') return null;
    
    // If it's an array of companies, don't render it in the navigation
    if (Array.isArray(node)) return null;
    
    return Object.entries(node).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      const isExpanded = !!expandedNodes[currentPath];
      const hasChildren = typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0;
      const hasCompanies = Array.isArray(value) && value.length > 0;
      const padding = level * 4;
      
      // If it's a category with companies
      if (hasCompanies) {
        return (
          <div 
            key={currentPath}
            className={`flex items-center py-2 pl-${padding} cursor-pointer hover:bg-gray-100 text-sm`}
            onClick={() => onSelectCategory(currentPath)}
          >
            <span className="ml-2 text-gray-800 hover:text-primary transition-colors">{key}</span>
          </div>
        );
      }
      
      return (
        <div key={currentPath}>
          <div 
            className={`flex items-center py-2 pl-${padding} cursor-pointer hover:bg-gray-100 text-sm ${level === 0 ? 'font-semibold' : ''}`}
            onClick={() => toggleNode(currentPath)}
          >
            {hasChildren ? (
              <span className="w-4 h-4 flex items-center justify-center text-gray-500">
                {isExpanded ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronRight size={12} />
                )}
              </span>
            ) : (
              <span className="w-4" />
            )}
            <span className="ml-2 text-gray-800">{key}</span>
          </div>
          
          {isExpanded && hasChildren && (
            <div className="ml-2 border-l border-gray-200 pl-2">
              {renderNode(value, currentPath, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">PropTech Categories</h2>
      </div>
      <div className="p-4 overflow-y-auto max-h-[70vh]">
        {renderNode(data)}
      </div>
    </div>
  );
};

export default StackNavigation;
