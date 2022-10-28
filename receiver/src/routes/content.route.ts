import { Router } from 'express';
import { receive, get, getById } from '../controllers/content.controller';
import { authenticate } from '../middleware/auth.middleware';

export const receiveRouter = Router();
receiveRouter.post('/', authenticate, receive);
receiveRouter.get('/', get);
receiveRouter.get('/:id', getById);
