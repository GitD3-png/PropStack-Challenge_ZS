/**
 * Utility functions for handling PropStack data
 */

/**
 * Extracts a specific category from the PropStack data structure
 * @param {Object} data - The full PropStack data
 * @param {String} path - Dot-separated path to the category (e.g., "Multifamily.PRE-OCCUPANCY.Pre-Discovery/Branding.MarTech")
 * @returns {Array|Object} - The data at the specified path
 */
export const getCategoryByPath = (data, path) => {
  if (!path) return data;
  
  const pathParts = path.split('.');
  let currentData = data;
  
  for (const part of pathParts) {
    if (currentData && currentData[part]) {
      currentData = currentData[part];
    } else {
      return null;
    }
  }
  
  return currentData;
};

/**
 * Extracts all categories from the PropStack data structure
 * @param {Object} data - The PropStack data
 * @param {String} prefix - Path prefix for recursion
 * @returns {Array} - Array of category objects with path and name
 */
export const getAllCategories = (data, prefix = '') => {
  let result = [];
  
  Object.entries(data).forEach(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && !Array.isArray(value)) {
      // It's a category node, add it
      result.push({ path: currentPath, name: key });
      
      // Recursively process its children
      result = [...result, ...getAllCategories(value, currentPath)];
    }
  });
  
  return result;
};

/**
 * Finds all leaf nodes (company lists) in the PropStack data
 * @param {Object} data - The PropStack data
 * @param {String} prefix - Path prefix for recursion
 * @returns {Array} - Array of objects with path and companies
 */
export const getAllCompanyLists = (data, prefix = '') => {
  let result = [];
  
  Object.entries(data).forEach(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (Array.isArray(value)) {
      // It's a company list
      result.push({ path: currentPath, companies: value });
    } else if (typeof value === 'object') {
      // Recursively process its children
      result = [...result, ...getAllCompanyLists(value, currentPath)];
    }
  });
  
  return result;
};

/**
 * Formats a category path for display
 * @param {String} path - Dot-separated path
 * @returns {String} - Formatted path for display
 */
export const formatCategoryPath = (path) => {
  if (!path) return '';
  return path.split('.').join(' > ');
};

/**
 * Checks if a company has all required fields
 * @param {Object} company - Company object
 * @returns {Boolean} - True if valid
 */
export const isValidCompany = (company) => {
  return company && company.name && company.url;
};
