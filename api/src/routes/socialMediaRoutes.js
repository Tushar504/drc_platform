import express from 'express';
import { getSocialMedia } from '../controllers/socialMediaController.js';
const router = express.Router();

router.get('/disasters/:id/social-media', getSocialMedia);

export default router;
