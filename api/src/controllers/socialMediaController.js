import { emitEvent } from '../sockets/socket.js';

// Mock data
const mockPosts = [
  { post: "#floodrelief Need food in NYC", user: "citizen1", type: "need" },
  { post: "Offering shelter in Brooklyn #floodrelief", user: "helper2", type: "offer" },
  { post: "Flood alert in Manhattan!", user: "alertbot", type: "alert" }
];

// GET /disasters/:id/social-media
export const getSocialMedia = async (req, res) => {
  emitEvent('social_media_updated', mockPosts);
  res.json(mockPosts);
};
