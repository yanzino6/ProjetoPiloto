
import { connect } from "../config/db";

export interface Task {
    id: number;
    label: string;
    user_id: number;
    done: boolean;
}


export async function createTask(task: { label: string; user_id: number }) {
    const client = await connect();
    try {
        const res = await client.query(
            `INSERT INTO tasks (label, done, user_id) VALUES ($1, $2, $3) RETURNING *`,
            [task.label, false, task.user_id]
        );

        
        return res.rows[0];
    } catch (error) {
        console.error("Erro ao inserir tarefa no banco:", error);
        throw error;
    } finally {
        client.release();
    }
}


export async function getTasksByUser(userId: number) {
    const client = await connect();
    const res = await client.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    client.release();
    return res.rows;
}


export async function updateTask(id: number, task: Partial<Task>) {
    const client = await connect();
    const res = await client.query(
        `UPDATE tasks SET label = COALESCE($1, label), done = COALESCE($2, done) 
        WHERE id = $3 RETURNING *`,
        [task.label, task.done, id]
    );
    client.release();
    return res.rows[0];
}


export async function deleteTask(id: number) {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    client.release();
}

