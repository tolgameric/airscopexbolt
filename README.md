# Aviation-Edge Flight Tracker

A modern, real-time flight tracking application built with React, TypeScript, and Tailwind CSS, using the Aviation-Edge API through a secure proxy server.

## Features

- 🔍 **Real-time Flight Search** - Search by flight number, route, or airline
- ✈️ **Live Flight Tracking** - Real-time flight status and position data
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, aviation-inspired design with smooth animations
- 🔒 **Secure API Proxy** - Server-side API key management with CORS handling
- 📊 **Detailed Flight Info** - Comprehensive flight details including gates, terminals, and aircraft data

## Setup Instructions

### 1. Get Aviation-Edge API Key

1. Sign up at [Aviation-Edge.com](https://aviation-edge.com/)
2. Navigate to your dashboard and get your API key
3. Note: Aviation-Edge offers both free and paid plans

### 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Aviation-Edge API key to the `.env` file:
   ```env
   AVIATION_EDGE_API_KEY=your_actual_api_key_here
   VITE_PROXY_URL=http://localhost:3001/api
   PORT=3001
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

#### Option 1: Run both proxy server and frontend together (Recommended)
```bash
npm run dev:full
```

#### Option 2: Run separately
```bash
# Terminal 1 - Start the proxy server
npm run dev:server

# Terminal 2 - Start the frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Proxy Server: http://localhost:3001
- Health Check: http://localhost:3001/health

## API Endpoints

The proxy server provides the following endpoints:

- `GET /api/flights` - Search flights with query parameters
- `GET /api/airports` - Get airport/city data
- `GET /health` - Server health check

### Example API Usage

```javascript
// Search by flight number
GET /api/flights?flight_iata=AA100

// Search by route
GET /api/flights?dep_iata=JFK&arr_iata=LAX

// Search by airline
GET /api/flights?airline_iata=AA
```

## Architecture

### Frontend (React + TypeScript)
- **Components**: Modular React components with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React hooks for local state
- **API Client**: Fetch-based service layer

### Backend (Express Proxy)
- **Proxy Server**: Express.js server handling Aviation-Edge API calls
- **CORS Handling**: Configured for cross-origin requests
- **Error Handling**: Comprehensive error handling and logging
- **Security**: API key stored server-side, not exposed to client

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── FlightSearch.tsx
│   │   ├── FlightCard.tsx
│   │   ├── FlightDetails.tsx
│   │   └── ...
│   ├── services/           # API service layer
│   │   └── aviationApi.ts
│   ├── types/              # TypeScript type definitions
│   │   └── flight.ts
│   └── App.tsx
├── server/
│   └── index.js           # Express proxy server
├── .env.example           # Environment variables template
└── package.json
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start proxy server only
- `npm run dev:full` - Start both proxy server and frontend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AVIATION_EDGE_API_KEY` | Your Aviation-Edge API key | Required |
| `VITE_PROXY_URL` | Proxy server URL | `http://localhost:3001/api` |
| `PORT` | Proxy server port | `3001` |

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the proxy server is running on port 3001
2. **API Key Issues**: Verify your Aviation-Edge API key is correct and active
3. **No Flight Data**: Check if the flight exists and try different search parameters
4. **Server Connection**: Ensure both frontend and proxy server are running

### Debug Mode

Check the browser console and server logs for detailed error messages. The proxy server logs all API requests and responses.

## Production Deployment

For production deployment:

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your static hosting service
3. Deploy the `server` folder to your Node.js hosting service
4. Update `VITE_PROXY_URL` to point to your production proxy server
5. Set environment variables on your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.