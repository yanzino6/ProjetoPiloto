import { User } from '../models/modelUser';
import bcrypt from 'bcryptjs';
import { createUser as createUserModel, selectUsers, getUserById, updateUser as updateUserModel, deleteUser as deleteUserModel } from '../models/modelUser';

//criptografa a senha do usuario
export const createUser = async (user: User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await createUserModel({ ...user, password: hashedPassword });
};


export const getUsers = async () => {
    return await selectUsers();
};


export const getUser = async (id: number) => {
    return await getUserById(id);
};


export const updateUser = async (id: number, user: User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await updateUserModel(id, { ...user, password: hashedPassword });
};


export const deleteUser = async (id: number) => {
    return await deleteUserModel(id);
};

