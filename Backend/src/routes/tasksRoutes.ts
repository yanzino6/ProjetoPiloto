import { Router } from 'express';
import { createTaskController, getTasksController, updateTaskController, deleteTaskController } from '../controllers/taskController';
import { checkToken } from '../middlewares/authMiddleware';
import { getTasks } from '../models/modelTasks';

const router = Router();


router.get('/', checkToken, getTasksController);
router.post('/', checkToken, createTaskController);
router.patch('/:id', checkToken, updateTaskController);
router.delete('/:id', checkToken, deleteTaskController);

export default router;