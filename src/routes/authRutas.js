import { Router } from 'express';
import { registro, login, logout, forgotPassword, changePassword } from '../controllers/authController.js';
import { registroValidator, loginValidator, forgotPasswordValidator, changePasswordValidator } from '../validations/authValidacion.js';

const router = Router();

router.post('/registro', registroValidator, registro);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/change-password', changePasswordValidator, changePassword);
router.post('/logout', logout);

export default router;
