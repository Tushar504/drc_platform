import supabase from '../supabaseClient.js';
import DisasterSchema from '../models/disaster.js';
import { emitEvent } from '../sockets/socket.js';


// Create Disaster
export const createDisaster = async (req, res) => {
  const userId = req.user?.id || "netrunnerX";
  const now = new Date().toISOString();
  const parseResult = DisasterSchema.safeParse({
    ...req.body,
    owner_id: userId,
    audit_trail: [{
      action: "create",
      user_id: userId,
      timestamp: now
    }]
  });
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors });
  }
  const disaster = parseResult.data;
  const { coordinates } = disaster.location;
  const postgisLocation = `SRID=4326;POINT(${coordinates[0]} ${coordinates[1]})`;
  const { location, ...disasterData } = disaster;
  const { data, error } = await supabase.from('disasters').insert([{...disasterData, location: postgisLocation}]).select();
  if (error) return res.status(500).json({ error: error.message });
  emitEvent('disaster_updated', data[0]);
  res.status(201).json(data[0]);
};

// Get Disasters (with optional tag filter)
export const getDisasters = async (req, res) => {
  let query = supabase.from('disasters').select('*');
  if (req.query.tag) {
    query = query.contains('tags', [req.query.tag]);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Update Disaster
export const updateDisaster = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || "reliefAdmin";
  const now = new Date().toISOString();
  const updates = req.body;
  const { data: existing, error: err } = await supabase.from('disasters').select('audit_trail').eq('id', id).single();
  if (err) return res.status(500).json({ error: err.message });
  const auditTrail = existing?.audit_trail || [];
  const updatedAuditTrail = [
    ...auditTrail,
    { action: "update", user_id: userId, timestamp: now }
  ];
  const { data, error } = await supabase
    .from('disasters')
    .update({ ...updates, audit_trail: updatedAuditTrail })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  emitEvent('disaster_updated', data);
  res.json(data[0]);
};

// Delete Disaster
export const deleteDisaster = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('disasters').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  emitEvent('disaster_updated', { id, deleted: true });
  res.status(204).send();
};