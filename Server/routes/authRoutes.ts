import express from 'express';
import { register, login, } from '../controllers/authController';
import { saveEnneagramResults, getEnneagramAnalysis } from '../controllers/enneagramController';
import { sendMessage } from '../controllers/chatController';
import { authenticateToken } from '../middleware/authMiddleware';
import { googleLogin } from '../controllers/authController';
import { addToWaitingList } from '../controllers/waitinglistController';
import { submitFeedback } from '../controllers/feedbackController';

const router = express.Router();

router.post('/waiting-list', addToWaitingList);
router.post('/register', register);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.post('/save-enneagram-results', authenticateToken, saveEnneagramResults);
router.post('/get-enneagram-analysis', authenticateToken, getEnneagramAnalysis);
router.post('/chat', authenticateToken, sendMessage);
router.post('/feedback', authenticateToken, submitFeedback);




export default router;


