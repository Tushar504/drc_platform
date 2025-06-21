import express from 'express';
import { extractAndGeocode } from '../controllers/geocodeController.js';
const router = express.Router();

router.post('/geocode', extractAndGeocode);

export default router;