import express from 'express';
import { login, register,logout } from '../controllers/authController.js';
import { validatorRequest } from '../middlewares/validatorRequest.js';
import { loginValidator, registerValidator } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validatorRequest(registerValidator), register);

router.post('/login', validatorRequest(loginValidator), login);

router.post('/logout', logout);


export default router;
