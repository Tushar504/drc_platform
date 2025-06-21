import { Server } from 'socket.io';

let io = null;

function initSocket(server) {
  io = new Server(server, { 
    cors: { 
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });
  
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
    
    // Handle any custom events if needed
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });
}

function emitEvent(event, data) {
  if (io) {
    console.log(`Emitting event: ${event}`, data);
    io.emit(event, data);
  } else {
    console.warn('Socket.IO not initialized');
  }
}

export { initSocket, emitEvent };