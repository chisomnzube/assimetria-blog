const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const articlesApi = {
  // Get all articles
  async getAll() {
    const response = await fetch(`${API_URL}/api/articles`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await response.json();
    return data.data;
  },

  // Get single article by ID
  async getById(id) {
    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    const data = await response.json();
    return data.data;
  },

  // Generate new article
  async generate() {
    const response = await fetch(`${API_URL}/api/articles/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate article');
    }
    
    const data = await response.json();
    return data.data;
  }
};
