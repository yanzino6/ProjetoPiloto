import { connect } from "../config/db";


//tipo usuario
export interface User {
    id: number;
    email: string;
    password: string;
}

//interação com o banco para selecionar todos os usuarios
export async function selectUsers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM users');
    client.release();
    return res.rows;
}

//interação com o banco para selecionar um usuario pelo id

export async function getUserById(id: number) {
    const client = await connect();
    const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    client.release();
    return res.rows[0];  
}

//interação com o banco para criar um usuario

export async function createUser(user: User) {
    const client = await connect();
    const res = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [user.email, user.password]);
    client.release();
    return res.rows[0];
}

//interação com o banco para atualizar um usuario
export async function updateUser(id: number, user: User) {
    const client = await connect();
    const res = await client.query('UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
        [ user.email, user.password, id]);
    client.release();
    return res.rows[0];
}

//interação com o banco para deletar um usuario
export async function deleteUser(id: number) {
    const client = await connect();
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    client.release();
}
//interação com o banco para pegar um usuario
export async function getUserByEmail(email: string) {
    const client = await connect();
    const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release();
    return res.rows[0];  
}