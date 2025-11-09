import express from 'express';
import { getUsers, newMessage, getMessage } from '../controllers/messages.controller.ts';
import { routeProtect } from '../middleware/routeProtect.ts';

const router = express.Router();

router.get('/users', routeProtect, getUsers);
router.post('/send/:id', routeProtect, newMessage);
router.get('/:id', routeProtect, getMessage);


export default router