import { Request, Response } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../services/userService';
import { getUserByEmail } from '../models/modelUser';
import { createToken } from '../jwt/jwt';
import bcrypt from 'bcryptjs'

export const createUserController = async (req: Request, res: Response) => {
    try {
        console.log("Recebendo requisição para criar usuário:", req.body);
        const user = await createUser(req.body);
        console.log("Usuário criado com sucesso:", user);
        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: 'Erro interno ao criar usuário', error });
    }
};


export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users' });
    }
};


export const getUserController = async (req: Request, res: Response) => {
    try {
        const user = await getUser(parseInt(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting user' });
    }
};


export const updateUserController = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUser(parseInt(req.params.id), req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};


export const deleteUserController = async (req: Request, res: Response) => {
    try {
        await deleteUser(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export const logiUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            
            res.status(404).json({ error: 'User not found' });
            
            return;
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            res.status(401).json({ error: 'Incorrect Password' });
            return;
        }

        const userToken = createToken({ email: user.email, id: user.id });
        console.log("Token gerado com sucesso:", userToken);
        res.status(200).json({ message: 'Logging in', token: userToken });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}