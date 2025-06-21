import express from 'express';
import { getNearbyResources } from '../controllers/resourceController.js';
const router = express.Router();

router.get('/disasters/:id/resources', getNearbyResources);

export default router;
