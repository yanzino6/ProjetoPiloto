import express from "express"
import userRoutes from './routes/usersRoutes'
import taskRoutes from './routes/tasksRoutes'
import cors from 'cors'


const app = express()
app.use(cors());
const db = require("./config/db")
app.use(cors());
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen({
    port: 3000,
    host: '0.0.0.0'
})

console.log("Server running on port 3000")