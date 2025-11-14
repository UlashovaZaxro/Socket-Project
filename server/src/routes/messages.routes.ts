import express from 'express';
import { getUser, newMessage, getMessage, getUsers } from '../controllers/messages.controller.ts';
import { routeProtect } from '../middleware/routeProtect.ts';

const router = express.Router();

router.get('/user', routeProtect, getUser);


router.get('/users', routeProtect, getUsers);
router.post('/send/:id', routeProtect, newMessage);
router.get('/:id', routeProtect, getMessage);


export default router