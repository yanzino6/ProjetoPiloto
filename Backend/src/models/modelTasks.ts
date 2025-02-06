
import { connect } from "../config/db";

export interface Task {
    id: number;
    label: string;
    categorie: string;
    user_id: number;
    done: boolean;
}


export async function createTask(task: { label: string; categorie: string; user_id: number }) {
    const client = await connect();
    try {
        console.log("📌 Tentando inserir no banco:", task);

        // 🔍 Garantir que os valores corretos estão sendo passados
        console.log("🔍 label:", task.label);
        console.log("🔍 categorie:", task.categorie);
        console.log("🔍 user_id:", task.user_id);

        const res = await client.query(
            `INSERT INTO tasks (label, categorie, done, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [task.label, task.categorie,  false, task.user_id]
        );

        console.log("✅ Tarefa salva no banco:", res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error("❌ Erro ao inserir tarefa no banco:", error);
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
        `UPDATE tasks SET label = COALESCE($1, label), categorie = COALESCE($2, categorie), done = COALESCE($3, done) 
        WHERE id = $4 RETURNING *`,
        [task.label, task.categorie, task.done, id]
    );
    client.release();
    return res.rows[0];
}


export async function deleteTask(id: number) {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    client.release();
}

export async function getTasks() {
    const client = await connect();
    const res = await client.query('SELECT * FROM tasks');
    client.release();
    return res.rows;
}