import ai from '../geminiApi.js';
import axios from 'axios';


// POST /geocode
export const extractAndGeocode = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  // 1. Use Gemini to extract location name
  let locationName;
  try {
    console.log("hello")
    const prompt = `Extract the location name from this disaster description: "${description}". Only return the location name.`;
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    
    locationName = result.text
    if (!locationName) throw new Error('No location found');
  } catch (err) {
    return res.status(500).json({ error: 'Failed to extract location name', details: err.message });
  }

  // 2. Use Nominatim to geocode the location name
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
    const geoRes = await axios.get(nominatimUrl, { headers: { 'User-Agent': 'DisasterApp/1.0' } });
    if (!geoRes.data || geoRes.data.length === 0) {
      return res.status(404).json({ error: 'Location not found in geocoding service' });
    }
    const { lat, lon, display_name } = geoRes.data[0];
    return res.json({
      location_name: display_name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to geocode location', details: err.message });
  }
};