import express from 'express';
import { addRequest, approveRequest, rejectRequest, requests } from '../controllers/request.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();
router.get('/requests', requests);
router.post('/add-request', verifyToken, addRequest);
router.post('/approve-request', approveRequest);
router.delete('/reject-request', rejectRequest);
export default router;