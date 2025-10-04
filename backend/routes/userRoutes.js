import express from 'express';
const router = express.Router();
import { registerUser, authUser } from '../controllers/userController.js';

router.post('/', registerUser); // /api/users (Sign Up)
router.post('/login', authUser); // /api/users/login (Login)

export default router;