import { Request, Response } from 'express';
import { createTask, getTasksByUser, updateTask, deleteTask } from '../models/modelTasks';


// cria task, verificando se a mesma foi enviada corretamente e transformando no tipo de dado correto
export const createTaskController = async (req: Request, res: Response): Promise<void> => {
    try {


        if (!req.user || !req.user.id) {
            console.error("Erro: `req.user` está indefinido ou sem ID.");
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }

        const user_id = req.user.id;
        let { label } = req.body;
        
        //verifica se a label foi extraida de forma correta ou se está vazia
        if (typeof label === "object" && label !== null) {
            
            label = label.label || "Título Padrão";
        }


        const task = await createTask({ label, user_id });


        res.status(201).json(task);
    } catch (error: any) {

        res.status(500).json({ message: "Erro interno ao criar tarefa", error: error.message });
    }
};
// pega as tasks do usuário e em caso de erro, retorna o erro no servidor
export const getTasksController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const tasks = await getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tasks' });
    }
};

// realiza atualizações requisitadas nas tasks
export const updateTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { label, categorie, done } = req.body;
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
         res.status(400).json({ message: "ID inválido" });
        }


        const updateData: any = {};
        if (label) updateData.label = label;
        if (categorie) updateData.categorie = categorie;
        if (done !== undefined) updateData.done = done;

        const updatedTask = await updateTask(taskId, updateData);

        if (!updatedTask) {
            res.status(404).json({ message: "Tarefa não encontrada" });
            
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar tarefa", error});
    }
};

// deleta task
export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        await deleteTask(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

