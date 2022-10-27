import { Router } from "express";
import { router } from "../app";
import { upload } from "../controllers/file-upload.controller";

export const fileRouter = Router();
fileRouter.post('/', upload);