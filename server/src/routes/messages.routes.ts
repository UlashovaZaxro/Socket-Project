import express from 'express';
import { getUsers } from '../controllers/messages.controller.ts';
import { routeProtect } from '../middleware/routeProtect.ts';

const router = express.Router();

router.get('/users', routeProtect, getUsers);


export default router