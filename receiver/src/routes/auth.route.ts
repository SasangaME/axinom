import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

export const authRouter = Router();
authRouter.post('/user', authController.createUser);
authRouter.post('/login', authController.login);