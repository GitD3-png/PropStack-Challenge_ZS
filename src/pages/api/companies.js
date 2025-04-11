// This is a placeholder API that returns the initial data
// The actual data management will be done client-side with localStorage
import initialData from '../../utils/initialData';

export default async function handler(req, res) {
  // GET request - retrieve initial data
  if (req.method === 'GET') {
    try {
      // If category path is provided, return only that section
      if (req.query.path) {
        const pathParts = req.query.path.split('.');
        let currentData = initialData;
        
        for (const part of pathParts) {
          if (currentData && currentData[part]) {
            currentData = currentData[part];
          } else {
            return res.status(404).json({ error: 'Category not found' });
          }
        }
        
        return res.status(200).json(currentData);
      }
      
      // Return the full initial data
      return res.status(200).json(initialData);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to load data' });
    }
  }
  
  // For all other methods, return a message explaining that data is managed client-side
  return res.status(200).json({ 
    message: 'Data management is handled client-side with localStorage. This API only provides initial data.'
  });
}
