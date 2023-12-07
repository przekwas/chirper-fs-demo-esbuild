import { Router } from 'express';
import chirpsRouter from './chirps';
import usersRouter from './users';
import mentionsRouter from './mentions';

const router = Router();

router.use('/chirps', chirpsRouter);
router.use('/users', usersRouter);
router.use('/mentions', mentionsRouter);

export default router;
