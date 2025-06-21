import 'dotenv/config';
import express from 'express';
import http from 'http';
import { initSocket } from './sockets/socket.js';
import cors from 'cors';
import disasterRoutes from './routes/disasterRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import officialUpdatesRoutes from './routes/officialUpdatesRoutes.js';
import imageVerificationRoutes from './routes/imageVerificationRoutes.js';
import geocodeRoutes from './routes/geocodeRoutes.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api', disasterRoutes);
app.use('/api', socialMediaRoutes);
app.use('/api', resourceRoutes);
app.use('/api', officialUpdatesRoutes);
app.use('/api', imageVerificationRoutes);
app.use('/api', geocodeRoutes);

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for connections`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});