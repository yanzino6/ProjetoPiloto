import { Request, Response } from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../services/userService';
import { getUserByEmail } from '../models/modelUser';
import { createToken } from '../jwt/jwt';
import bcrypt from 'bcryptjs'

// cria usuário e emite status de sucesso ou erro
export const createUserController = async (req: Request, res: Response) => {
    try {
        
        const user = await createUser(req.body);
        
        res.status(201).json(user);
    } catch (error) {
        
        res.status(500).json({ message: 'Erro interno ao criar usuário', error });
    }
};

// obtem os usuários e emite status de sucesso ou erro
export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users' });
    }
};

// obtem um usuário e emite status de sucesso ou erro
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

// atualiza usuário e emite status de sucesso ou erro
export const updateUserController = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUser(parseInt(req.params.id), req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// deleta usuário e emite status de sucesso ou erro
export const deleteUserController = async (req: Request, res: Response) => {
    try {
        await deleteUser(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

//  tenta fazer login de acordo com email e senha da requisição e emite status de erro ou sucesso, e se tiver sucesso gera uma token para o usuário
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
        
        res.status(200).json({ message: 'Logging in', token: userToken });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}