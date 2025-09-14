import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const AVIATION_EDGE_API_KEY = process.env.AVIATION_EDGE_API_KEY;
const API_BASE_URL = 'https://aviation-edge.com/v2/public';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Aviation-Edge Proxy Server is running' });
});

// Proxy endpoint for flights
app.get('/api/flights', async (req, res) => {
  try {
    if (!AVIATION_EDGE_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Please set AVIATION_EDGE_API_KEY environment variable' 
      });
    }

    // Build the Aviation-Edge API URL
    const url = new URL(`${API_BASE_URL}/flights`);
    url.searchParams.append('key', AVIATION_EDGE_API_KEY);
    
    // Forward query parameters from the client
    Object.entries(req.query).forEach(([key, value]) => {
      if (value && key !== 'key') { // Don't allow key override
        url.searchParams.append(key, value.toString());
      }
    });

    console.log(`Fetching flights from: ${url.toString().replace(AVIATION_EDGE_API_KEY, '[API_KEY]')}`);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Aviation-Edge API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Log the response for debugging (without sensitive data)
    console.log(`Received ${Array.isArray(data) ? data.length : 'non-array'} flight records`);
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch flight data',
      message: error.message 
    });
  }
});

// Proxy endpoint for airports/cities
app.get('/api/airports', async (req, res) => {
  try {
    if (!AVIATION_EDGE_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Please set AVIATION_EDGE_API_KEY environment variable' 
      });
    }

    const url = new URL(`${API_BASE_URL}/cityDatabase`);
    url.searchParams.append('key', AVIATION_EDGE_API_KEY);
    
    // Forward query parameters
    Object.entries(req.query).forEach(([key, value]) => {
      if (value && key !== 'key') {
        url.searchParams.append(key, value.toString());
      }
    });

    console.log(`Fetching airports from: ${url.toString().replace(AVIATION_EDGE_API_KEY, '[API_KEY]')}`);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Aviation-Edge API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch airport data',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found` 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Aviation-Edge Proxy Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`✈️  Flights API: http://localhost:${PORT}/api/flights`);
  console.log(`🏢 Airports API: http://localhost:${PORT}/api/airports`);
  
  if (!AVIATION_EDGE_API_KEY) {
    console.warn('⚠️  WARNING: AVIATION_EDGE_API_KEY not set in environment variables');
  } else {
    console.log('✅ Aviation-Edge API key configured');
  }
});