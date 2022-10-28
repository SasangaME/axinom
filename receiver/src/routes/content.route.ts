import { Router } from 'express';
import { receive, get } from '../controllers/content.controller';

export const receiveRouter = Router();
receiveRouter.post('/', receive);
receiveRouter.get('/', get);
