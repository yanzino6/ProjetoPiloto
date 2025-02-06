import { Router } from 'express';
import { createUserController, getUsersController, getUserController, updateUserController, deleteUserController } from '../controllers/userController';
import { checkToken } from '../middlewares/authMiddleware';

const router = Router();

import { logiUser } from '../controllers/userController';

router.post('/login', logiUser);


router.post('/signup', createUserController);


router.get('/', checkToken, getUsersController);


router.get('/:id', checkToken, getUserController);


router.patch('/:id', checkToken, updateUserController);


router.delete('/:id', checkToken,deleteUserController);

export default router;