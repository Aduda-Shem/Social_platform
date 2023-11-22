// api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiEndpoints = {
  posts: `${BASE_URL}/posts`,
  users: `${BASE_URL}/users`,
  comments: `${BASE_URL}/comments`,

};

export const apiCalls = {
  fetchPosts: async () => {
    try {
      const response = await fetch(apiEndpoints.posts);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error; 
    }
  },

  fetchUsers: async () => {
    try {
      const response = await fetch(apiEndpoints.users);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  },

fetchComments: async () => {
    try {
      const response = await fetch(apiEndpoints.comments);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error; 
    }
  },

  
};
