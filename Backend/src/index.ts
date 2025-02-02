import express from "express"

const app = express()

const db = require("./db")

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: 'working'
    })
})

app.get('/users', async (req, res) => {
    const users = await db.selectUser()
    res.json(users)
})

app.post('/users', async (req, res) => {
    await db.createUser(req.body)
    res.sendStatus(201)
})

app.patch('/users/:id', async (req, res) => {
    await db.updateUser(req.params.id, req.body)
    res.sendStatus(200)
})
app.delete('/users/:id', async (req, res) => {
    await db.deleteUser(req.params.id)
    res.sendStatus(204)
})
app.post('/tasks', async (req, res) => {
    await db.createTask(req.body)
    res.sendStatus(201)
})
app.get('/tasks', async (req, res) => {
    const tasks = await db.selectTask(); 
    res.json(tasks);
})
app.delete('/tasks/:id', async (req, res) => {
    await db.deleteTask(req.params.id)
    res.sendStatus(204)
})
app.patch('/tasks/:id', async (req, res) => {
    await db.updateTask(req.params.id, req.body)
    res.sendStatus(200)
})
app.listen(3000)