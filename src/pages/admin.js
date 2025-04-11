import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUndo } from 'react-icons/fa';
import initialData from '../utils/initialData';
import { 
  initializeData, 
  getAllData, 
  getCategoryCompanies, 
  addCompany, 
  updateCompany, 
  deleteCompany,
  resetData 
} from '../utils/localStorageUtils';

export default function Admin({ propStackData }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [companies, setCompanies] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newCompany, setNewCompany] = useState({ name: '', url: '', logo: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Initialize localStorage data when the component mounts
  useEffect(() => {
    // Initialize data in localStorage if it doesn't exist
    initializeData();
  }, []);

  // Extract all possible categories from the data
  useEffect(() => {
    const extractCategories = (data, prefix = '') => {
      let result = [];
      
      Object.entries(data).forEach(([key, value]) => {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && !Array.isArray(value)) {
          // It's a category node, add it
          result.push({ path: currentPath, name: key });
          
          // Recursively process its children
          result = [...result, ...extractCategories(value, currentPath)];
        }
      });
      
      return result;
    };
    
    // Get data from localStorage or use initial data as fallback
    const data = typeof window !== 'undefined' ? getAllData() : propStackData;
    const allCategories = extractCategories(data);
    setCategories(allCategories);
  }, [propStackData]);

  // Load companies when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      // Get companies from localStorage
      const companiesData = getCategoryCompanies(selectedCategory);
      setCompanies(companiesData);
    } else {
      setCompanies([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setEditingIndex(-1);
    setIsAdding(false);
    setMessage({ text: '', type: '' });
  };

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.url) {
      setMessage({ text: 'Name and URL are required', type: 'error' });
      return;
    }
    
    // Add company to localStorage
    const success = addCompany(selectedCategory, {
      ...newCompany,
      logo: newCompany.logo || '/placeholder-logo.svg'
    });
    
    if (success) {
      // Refresh the companies list
      const updatedCompanies = getCategoryCompanies(selectedCategory);
      setCompanies(updatedCompanies);
      
      // Reset form
      setNewCompany({ name: '', url: '', logo: '' });
      setIsAdding(false);
      setMessage({ text: 'Company added successfully', type: 'success' });
    } else {
      setMessage({ text: 'Failed to add company', type: 'error' });
    }
  };

  const handleUpdateCompany = (index) => {
    if (!companies[index].name || !companies[index].url) {
      setMessage({ text: 'Name and URL are required', type: 'error' });
      return;
    }
    
    // Update company in localStorage
    const success = updateCompany(selectedCategory, index, companies[index]);
    
    if (success) {
      // Refresh the companies list
      const updatedCompanies = getCategoryCompanies(selectedCategory);
      setCompanies(updatedCompanies);
      
      setEditingIndex(-1);
      setMessage({ text: 'Company updated successfully', type: 'success' });
    } else {
      setMessage({ text: 'Failed to update company', type: 'error' });
    }
  };

  const handleDeleteCompany = (index) => {
    if (!confirm('Are you sure you want to delete this company?')) return;
    
    // Delete company from localStorage
    const success = deleteCompany(selectedCategory, index);
    
    if (success) {
      // Refresh the companies list
      const updatedCompanies = getCategoryCompanies(selectedCategory);
      setCompanies(updatedCompanies);
      
      setMessage({ text: 'Company deleted successfully', type: 'success' });
    } else {
      setMessage({ text: 'Failed to delete company', type: 'error' });
    }
  };
  
  const handleResetData = () => {
    if (!confirm('Are you sure you want to reset all data to the initial state? This cannot be undone.')) return;
    
    // Reset data in localStorage
    const success = resetData();
    
    if (success) {
      // Refresh the companies list if a category is selected
      if (selectedCategory) {
        const updatedCompanies = getCategoryCompanies(selectedCategory);
        setCompanies(updatedCompanies);
      }
      
      setMessage({ text: 'Data reset successfully', type: 'success' });
    } else {
      setMessage({ text: 'Failed to reset data', type: 'error' });
    }
  };

  const handleEditChange = (index, field, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      [field]: value
    };
    setCompanies(updatedCompanies);
  };

  return (
    <Layout>
      <Head>
        <title>PropStack Admin - Manage PropTech Companies</title>
      </Head>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">PropStack Admin</h1>
        <p className="text-gray-600 mt-2">
          Manage PropTech companies in the Multifamily real estate industry
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Select Category</h2>
          
          <button
            onClick={handleResetData}
            className="flex items-center text-red-600 hover:text-red-800 text-sm"
          >
            <FaUndo className="mr-1" /> Reset All Data
          </button>
        </div>
        
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Select a category --</option>
          {categories.map((category) => (
            <option key={category.path} value={category.path}>
              {category.path}
            </option>
          ))}
        </select>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Companies in {selectedCategory.split('.').pop()}
            </h2>
            
            {!isAdding && (
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingIndex(-1);
                }}
                className="btn flex items-center"
              >
                <FaPlus className="mr-2" /> Add Company
              </button>
            )}
          </div>

          {isAdding && (
            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Add New Company</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                  <input
                    type="text"
                    value={newCompany.url}
                    onChange={(e) => setNewCompany({ ...newCompany, url: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={newCompany.logo}
                    onChange={(e) => setNewCompany({ ...newCompany, logo: e.target.value })}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://your-placeholder-logo-url.com/logo.png"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewCompany({ name: '', url: '', logo: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                
                <button
                  onClick={handleAddCompany}
                  className="btn flex items-center"
                >
                  <FaSave className="mr-2" /> Save
                </button>
              </div>
            </div>
          )}

          {companies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo URL
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={company.name}
                            onChange={(e) => handleEditChange(index, 'name', e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={company.url}
                            onChange={(e) => handleEditChange(index, 'url', e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <div className="text-sm text-gray-500">
                            <a href={company.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {company.url}
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={company.logo}
                            onChange={(e) => handleEditChange(index, 'logo', e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <div className="text-sm text-gray-500">{company.logo}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingIndex === index ? (
                          <>
                            <button
                              onClick={() => handleUpdateCompany(index)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingIndex(-1)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingIndex(index);
                                setIsAdding(false);
                              }}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteCompany(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No companies found in this category.
            </div>
          )}
        </div>
      )}
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
