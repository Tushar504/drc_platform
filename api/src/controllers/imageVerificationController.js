import ai from '../geminiApi.js';

// POST /disasters/:id/verify-image
export const verifyImage = async (req, res) => {
  const { image_url } = req.body;
  if (!image_url) return res.status(400).json({ error: 'image_url required' });

  try {
    const prompt = `Analyze image at ${image_url} for signs of manipulation or disaster context.`;
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    const analysis = result.text
    res.json({ analysis });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify image', details: err.message });
  }
};
