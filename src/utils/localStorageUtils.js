import initialData from './initialData';

const STORAGE_KEY = 'propstack_data';

/**
 * Initialize the PropStack data in localStorage if it doesn't exist
 */
export const initializeData = () => {
  if (typeof window === 'undefined') return null;
  
  // Check if data already exists in localStorage
  const existingData = localStorage.getItem(STORAGE_KEY);
  
  if (!existingData) {
    // Initialize with the default data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  
  return JSON.parse(existingData);
};

/**
 * Get all PropStack data from localStorage
 */
export const getAllData = () => {
  if (typeof window === 'undefined') return initialData;
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initializeData();
};

/**
 * Get companies for a specific category
 * @param {string} categoryPath - Dot-separated path to the category
 */
export const getCategoryCompanies = (categoryPath) => {
  if (typeof window === 'undefined') return [];
  
  const data = getAllData();
  if (!categoryPath) return data;
  
  const pathParts = categoryPath.split('.');
  let currentData = data;
  
  for (const part of pathParts) {
    if (currentData && currentData[part]) {
      currentData = currentData[part];
    } else {
      return [];
    }
  }
  
  return Array.isArray(currentData) ? currentData : [];
};

/**
 * Add a new company to a category
 * @param {string} categoryPath - Dot-separated path to the category
 * @param {object} company - Company data to add
 */
export const addCompany = (categoryPath, company) => {
  if (typeof window === 'undefined') return false;
  if (!categoryPath || !company || !company.name || !company.url) return false;
  
  const data = getAllData();
  const pathParts = categoryPath.split('.');
  
  // Navigate to the target category
  let currentObj = data;
  let parentObj = null;
  let lastKey = null;
  
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    
    if (i === pathParts.length - 1) {
      parentObj = currentObj;
      lastKey = part;
    }
    
    if (currentObj && currentObj[part]) {
      currentObj = currentObj[part];
    } else {
      return false; // Category not found
    }
  }
  
  // Ensure the target is an array
  if (!Array.isArray(currentObj)) {
    return false;
  }
  
  // Add the new company
  currentObj.push({
    name: company.name,
    url: company.url,
    logo: company.logo || '/placeholder-logo.svg'
  });
  
  // Save the updated data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return true;
};

/**
 * Update an existing company
 * @param {string} categoryPath - Dot-separated path to the category
 * @param {number} index - Index of the company to update
 * @param {object} company - Updated company data
 */
export const updateCompany = (categoryPath, index, company) => {
  if (typeof window === 'undefined') return false;
  if (!categoryPath || index === undefined || !company) return false;
  
  const data = getAllData();
  const pathParts = categoryPath.split('.');
  
  // Navigate to the target category
  let currentObj = data;
  
  for (const part of pathParts) {
    if (currentObj && currentObj[part]) {
      currentObj = currentObj[part];
    } else {
      return false; // Category not found
    }
  }
  
  // Ensure the target is an array
  if (!Array.isArray(currentObj)) {
    return false;
  }
  
  // Check if the index is valid
  if (index < 0 || index >= currentObj.length) {
    return false;
  }
  
  // Update the company
  currentObj[index] = {
    name: company.name || currentObj[index].name,
    url: company.url || currentObj[index].url,
    logo: company.logo || currentObj[index].logo
  };
  
  // Save the updated data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return true;
};

/**
 * Delete a company
 * @param {string} categoryPath - Dot-separated path to the category
 * @param {number} index - Index of the company to delete
 */
export const deleteCompany = (categoryPath, index) => {
  if (typeof window === 'undefined') return false;
  if (!categoryPath || index === undefined) return false;
  
  const data = getAllData();
  const pathParts = categoryPath.split('.');
  
  // Navigate to the target category
  let currentObj = data;
  
  for (const part of pathParts) {
    if (currentObj && currentObj[part]) {
      currentObj = currentObj[part];
    } else {
      return false; // Category not found
    }
  }
  
  // Ensure the target is an array
  if (!Array.isArray(currentObj)) {
    return false;
  }
  
  // Check if the index is valid
  if (index < 0 || index >= currentObj.length) {
    return false;
  }
  
  // Remove the company
  currentObj.splice(index, 1);
  
  // Save the updated data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return true;
};

/**
 * Reset the data to the initial state
 */
export const resetData = () => {
  if (typeof window === 'undefined') return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return true;
};
