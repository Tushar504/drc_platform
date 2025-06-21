import express from 'express';
import { getOfficialUpdates } from '../controllers/officialUpdatesController.js';
const router = express.Router();

router.get('/disasters/:id/official-updates', getOfficialUpdates);

export default router;
