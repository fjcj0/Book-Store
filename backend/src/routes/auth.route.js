import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth, editUser, totalUsers, checkAuthAdmin, signupAdmin, loginAdmin, logoutAdmin } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../utils/multer.js';
import { verifyTokenAdmin } from '../middleware/verifyTokenAdmin.js';
const router = express.Router();
router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
/*
router.post('/reset-password/:token', resetPassword);
*/
router.post('/edit-user', verifyToken, upload.single('profilePicture'), editUser);
router.get('/total-user', totalUsers);
router.get('/check-auth-admin', verifyTokenAdmin, checkAuthAdmin);
router.post('/signup-admin', signupAdmin);
router.post('/login-admin', loginAdmin);
router.post('/logout-admin', logoutAdmin);
export default router;