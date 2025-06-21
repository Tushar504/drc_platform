import express from 'express';
import { createDisaster, getDisasters, updateDisaster, deleteDisaster } from '../controllers/disasterController.js';
const router = express.Router();


router.post('/disasters', createDisaster);
router.get('/disasters', getDisasters);
router.put('/disasters/:id', updateDisaster);
router.delete('/disasters/:id', deleteDisaster);

export default router;
