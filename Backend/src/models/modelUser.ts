import { connect } from "../config/db";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}


export async function selectUsers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM users');
    client.release();
    return res.rows;
}


export async function getUserById(id: number) {
    const client = await connect();
    const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
    client.release();
    return res.rows[0];  
}


export async function createUser(user: User) {
    const client = await connect();
    const res = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [user.email, user.password]);
    client.release();
    return res.rows[0];
}


export async function updateUser(id: number, user: User) {
    const client = await connect();
    const res = await client.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [user.name, user.email, user.password, id]);
    client.release();
    return res.rows[0];
}


export async function deleteUser(id: number) {
    const client = await connect();
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    client.release();
}

export async function getUserByEmail(email: string) {
    const client = await connect();
    const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release();
    return res.rows[0];  
}