import { Request, Response } from 'express';
import { createTask, getTasksByUser, updateTask, deleteTask } from '../models/modelTasks';
import { getUserByEmail } from '../models/modelUser';
import { createToken } from '../jwt/jwt';


export const createTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
       

        if (!req.user || !req.user.id) {
            console.error("❌ Erro: `req.user` está indefinido ou sem ID.");
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }

        const user_id = req.user.id;
        let { label, categorie } = req.body;

        if (typeof label === "object" && label !== null) {
            console.warn("⚠️ `label` está como objeto, corrigindo...");
            label = label.label || "Título Padrão"; 
        }

        if (!categorie || typeof categorie !== "string") {
            console.warn("⚠️ `categorie` não foi enviado corretamente. Definindo valor padrão.");
            categorie = "Uncategorized";
        }

        

        
        const task = await createTask({ label, categorie, user_id });

        
        res.status(201).json(task);
    } catch (error: any) {
        
        res.status(500).json({ message: "Erro interno ao criar tarefa", error: error.message });
    }
};

export const getTasksController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id; 
        const tasks = await getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tasks' });
    }
};


export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const { label, categorie, done } = req.body;
        const taskId = parseInt(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        
        const updateData: any = {};
        if (label) updateData.label = label;
        if (categorie) updateData.categorie = categorie;
        if (done !== undefined) updateData.done = done;

        const updatedTask = await updateTask(taskId, updateData);

        if (!updatedTask) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar tarefa", error: error.message });
    }
};


export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        await deleteTask(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

