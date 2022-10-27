import { Router } from 'express';
import { receive } from '../controllers/file-receiver.controller';

export const receiveRouter = Router();
receiveRouter.post('/', receive);
