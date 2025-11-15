# Frontend Integration Guide

Complete guide to integrate your React frontend with the Epiko AI Studio backend.

## 🔗 Backend URL

**Development:** `http://localhost:5001`
**Production:** Update after deployment

## 📦 Install Dependencies

In your frontend project:

```bash
npm install axios
# or
npm install @supabase/supabase-js
```

## 🔧 Setup API Client

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5001';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 🔐 Authentication

### Register User

```javascript
import api from './services/api';

async function register(fullName, email, username, password) {
  try {
    const response = await api.post('/api/auth/register', {
      fullName,
      email,
      username,
      password
    });

    const { token, user } = response.data;

    // Store token
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
}
```

### Login

```javascript
async function login(email, password) {
  try {
    const response = await api.post('/api/auth/login', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
}
```

### Get Current User

```javascript
async function getCurrentUser() {
  try {
    const response = await api.get('/api/auth/me');
    return response.data.user;
  } catch (error) {
    // Token expired or invalid
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return null;
  }
}
```

### Logout

```javascript
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
```

## 📱 Posts & Social Features

### Get Feed

```javascript
async function getFeed(page = 1, limit = 20) {
  try {
    const response = await api.get('/api/posts/feed', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Get feed error:', error);
    return { posts: [], pagination: {} };
  }
}
```

### Create Post

```javascript
async function createPost(imageUrl, tool, caption) {
  try {
    const response = await api.post('/api/posts', {
      image: imageUrl,
      tool, // 'face-swap', 'ai-avatar', etc.
      caption
    });
    return { success: true, post: response.data.post };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create post'
    };
  }
}
```

### Like Post

```javascript
async function likePost(postId) {
  try {
    const response = await api.post(`/api/posts/${postId}/like`);
    return response.data; // { liked: true/false, likesCount: number }
  } catch (error) {
    console.error('Like error:', error);
    return null;
  }
}
```

### Save Post

```javascript
async function savePost(postId) {
  try {
    const response = await api.post(`/api/posts/${postId}/save`);
    return response.data; // { saved: true/false }
  } catch (error) {
    console.error('Save error:', error);
    return null;
  }
}
```

### Add Comment

```javascript
async function addComment(postId, text) {
  try {
    const response = await api.post(`/api/posts/${postId}/comments`, {
      text
    });
    return { success: true, comment: response.data.comment };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to add comment'
    };
  }
}
```

## 🎨 AI Tools

### Generate AI Avatar

```javascript
async function generateAvatar(prompt, style = 'photorealistic') {
  try {
    const response = await api.post('/api/ai/avatar', {
      prompt,
      style
    });

    return {
      success: true,
      imageUrl: response.data.imageUrl,
      creditsUsed: response.data.creditsUsed,
      remainingCredits: response.data.remainingCredits
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Generation failed'
    };
  }
}
```

### Face Swap

```javascript
async function generateFaceSwap(sourceImage, targetImage) {
  try {
    const response = await api.post('/api/ai/face-swap', {
      sourceImage,
      targetImage
    });

    return {
      success: true,
      imageUrl: response.data.imageUrl,
      creditsUsed: response.data.creditsUsed,
      remainingCredits: response.data.remainingCredits
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Face swap failed'
    };
  }
}
```

### Other AI Tools

```javascript
// Duo Portrait
async function generateDuoPortrait(person1, person2, style) {
  const response = await api.post('/api/ai/duo-portrait', {
    person1, person2, style
  });
  return response.data;
}

// Poster Maker
async function generatePoster(theme, text, style) {
  const response = await api.post('/api/ai/poster', {
    theme, text, style
  });
  return response.data;
}

// Age Transform
async function transformAge(image, targetAge) {
  const response = await api.post('/api/ai/age-transform', {
    image, targetAge
  });
  return response.data;
}

// Enhance Image
async function enhanceImage(image, enhancementType) {
  const response = await api.post('/api/ai/enhance', {
    image, enhancementType
  });
  return response.data;
}

// Get AI History
async function getAIHistory() {
  const response = await api.get('/api/ai/history');
  return response.data.generations;
}
```

## 🎯 Complete React Example

```jsx
import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      loadFeed();
    }
  }, []);

  async function loadFeed() {
    const response = await api.get('/api/posts/feed');
    if (response.data.success) {
      setPosts(response.data.posts);
    }
  }

  async function handleLogin(email, password) {
    const response = await api.post('/api/auth/login', {
      email,
      password
    });

    if (response.data.success) {
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      loadFeed();
    }
  }

  async function handleGenerateAvatar(prompt) {
    const response = await api.post('/api/ai/avatar', {
      prompt,
      style: 'photorealistic'
    });

    if (response.data.success) {
      alert(`Avatar generated! Credits remaining: ${response.data.remainingCredits}`);
      // Create post with generated image
      await api.post('/api/posts', {
        image: response.data.imageUrl,
        tool: 'ai-avatar',
        caption: `Generated: ${prompt}`
      });
      loadFeed();
    }
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.fullName}!</h1>
          <p>Credits: {user.credits}</p>
          <button onClick={() => handleGenerateAvatar('professional avatar')}>
            Generate Avatar
          </button>
          <div>
            {posts.map(post => (
              <div key={post.id}>
                <img src={post.image} alt={post.caption} />
                <p>{post.caption}</p>
                <p>by @{post.creator.username}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  );
}
```

## 🔄 Update Existing AuthContext

Replace your mock auth with real API calls:

```javascript
// src/context/AuthContext.tsx
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      api.get('/api/auth/me')
        .then(response => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function register(fullName, email, username, password) {
    const response = await api.post('/api/auth/register', {
      fullName, email, username, password
    });

    if (response.data.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      return { success: true };
    }

    return {
      success: false,
      message: response.data.message
    };
  }

  async function login(email, password) {
    const response = await api.post('/api/auth/login', {
      email, password
    });

    if (response.data.success) {
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      return { success: true };
    }

    return { success: false };
  }

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 📊 Error Handling

```javascript
// Global error handler
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    if (error.response?.status === 429) {
      alert('Too many requests. Please try again later.');
    }

    return Promise.reject(error);
  }
);
```

## 🚀 Ready to Deploy

Once integrated:
1. Test all features locally
2. Update `API_URL` for production
3. Deploy backend to Railway/Render
4. Update CORS settings
5. Deploy frontend

Your backend is production-ready! 🎉
