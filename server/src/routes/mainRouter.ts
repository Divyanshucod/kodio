import express from 'express'
import { userRouter } from './user';
import { videoRouter } from './video';

export const mainRouter = express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/video',videoRouter)