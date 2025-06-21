import supabase from '../supabaseClient.js';
import { emitEvent } from '../sockets/socket.js';

// GET /disasters/:id/resources?lat=...&lon=...
export const getNearbyResources = async (req, res) => {
  const { id } = req.params;
  const { lat, lon, radius = 10000 } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });

  const { data, error } = await supabase.rpc('get_nearby_resources', {
    disaster_id: id,
    point: `SRID=4326;POINT(${lon} ${lat})`,
    radius: parseInt(radius)
  });

  if (error) return res.status(500).json({ error: error.message });
  emitEvent('resources_updated', data);
  res.json(data);
};
