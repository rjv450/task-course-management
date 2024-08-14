import express from 'express';
import { register, login } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../utils/validators/authValidator.js';


const router = express.Router();


router.post('/register',registerValidator, register);


router.post('/login',loginValidator, login);

export default router;
