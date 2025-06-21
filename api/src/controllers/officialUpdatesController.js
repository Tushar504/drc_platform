import axios from 'axios';
import * as cheerio from 'cheerio';
import supabase from '../supabaseClient.js';
import { emitEvent } from '../sockets/socket.js';

// GET /disasters/:id/official-updates
export const getOfficialUpdates = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `official_updates_${id}`;
  const now = new Date();

  // 1. Check cache
  const { data: cacheData } = await supabase
    .from('cache')
    .select('value, expires_at')
    .eq('key', cacheKey)
    .single();

  if (cacheData && new Date(cacheData.expires_at) > now) {
    return res.json(cacheData.value);
  }

  // 2. Scrape (example: FEMA)
  try {
    const url = 'https://www.redcross.org/about-us/news-and-events/news.html';
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    const $ = cheerio.load(html);
    const updates = [];
    // Replace selector with actual FEMA/Red Cross update selectors
    $('.some-update-class').each((i, el) => {
      updates.push({
        title: $(el).find('.title').text(),
        link: $(el).find('a').attr('href'),
        summary: $(el).find('.summary').text()
      });
    });

    // 3. Cache result
    await supabase.from('cache').upsert({
      key: cacheKey,
      value: updates,
      expires_at: new Date(now.getTime() + 60 * 60 * 1000).toISOString()
    });

    emitEvent('official_updates_updated', updates);
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch updates', details: err.message });
  }
};
