import express from 'express';
import { verifyImage } from '../controllers/imageVerificationController.js';
const router = express.Router();

router.post('/disasters/:id/verify-image', verifyImage);

export default router;
